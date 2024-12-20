import express from "express";
import {
	searchStories,
	getStoryDetails,
	getStoriesByCategory,
	getRandomStory,
	getSimilarStories,
	getTrendingStories,
} from "../controllers/stories.controller.js";

const router = express.Router();

router.get("/search/:query", searchStories);
router.get("/trending", getTrendingStories);
router.get("/random/:query", getRandomStory);
router.get("/:id/details", getStoryDetails);
router.get("/:id/similar", getSimilarStories);
router.get("/category/:category", getStoriesByCategory);

export default router;
