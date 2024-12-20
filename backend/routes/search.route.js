import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchstories,
	searchPerson,
	searchcomics,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchstories);
router.get("/tv/:query", searchcomics);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
