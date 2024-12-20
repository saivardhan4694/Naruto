import { fetchFromGoogleBooks } from "../services/googlebooks.service.js";

// Get books by query (title, author, or keyword)
export async function searchBooks(req, res)  {
	const { query } = req.params;
	try {
		const data = await fetchFromGoogleBooks(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		res.json({ success: true, books: data.items });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get book details by ID
export async function getBookDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromGoogleBooks(`https://www.googleapis.com/books/v1/volumes/${id}`);
		res.json({ success: true, book: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get books by category
export async function getBooksByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromGoogleBooks(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}`);
		res.json({ success: true, books: data.items });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get a random book from a search query
export async function getRandomBook(req, res) {
	const { query } = req.params;
	try {
		const data = await fetchFromGoogleBooks(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		const randomBook = data.items[Math.floor(Math.random() * data.items.length)];
		res.json({ success: true, book: randomBook });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
