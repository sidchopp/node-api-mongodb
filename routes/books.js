import express from "express";
import { getBook, getBooks } from "../controllers/bookControllers.js";

const router = express.Router();

// GET all books
router.get("/", getBooks);

// GET a Book
router.get("/:id", getBook);

export default router;
