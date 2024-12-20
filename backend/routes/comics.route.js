import express from "express";
import { 
	getTrendingComics, 
	getComicDetails, 
	getComicTrailers, 
	getSimilarComics, 
	getComicsByCategory 
} from "../controllers/comics.controller.js";

const router = express.Router();

router.get("/trending", getTrendingComics);
router.get("/details/:id", getComicDetails);
router.get("/trailers/:id", getComicTrailers);
router.get("/similar/:id", getSimilarComics);
router.get("/category/:category", getComicsByCategory);

export default router;
