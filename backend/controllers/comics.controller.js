import { fetchFromComicsAPI } from "../services/comics.service.js";

// Get trending comics
export async function getTrendingComics(req, res) {
	try {
		const data = await fetchFromComicsAPI("https://api.example.com/trending/comics?language=en-US");
		const randomComic = data.results[Math.floor(Math.random() * data.results?.length)];

		res.json({ success: true, content: randomComic });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get comic details by ID
export async function getComicDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromComicsAPI(`https://api.example.com/comics/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get comic trailers (if applicable)
export async function getComicTrailers(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromComicsAPI(`https://api.example.com/comics/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get similar comics
export async function getSimilarComics(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromComicsAPI(`https://api.example.com/comics/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get comics by category
export async function getComicsByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromComicsAPI(`https://api.example.com/comics/category/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
