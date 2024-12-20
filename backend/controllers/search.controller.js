import { User } from "../models/user.model.js";
import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Search for books by query.
 */
export async function searchBook(req, res) {
	const { query } = req.params;

	try {
		const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=10`);

		if (!response.data.items || response.data.items.length === 0) {
			return res.status(404).send(null);
		}

		const firstBook = response.data.items[0].volumeInfo;

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.data.items[0].id,
					image: firstBook.imageLinks?.thumbnail || null,
					title: firstBook.title,
					searchType: "book",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.data.items });
	} catch (error) {
		console.log("Error in searchBook controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

/**
 * Get search history for the user.
 */
export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

/**
 * Remove an item from the search history by ID.
 */
export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
