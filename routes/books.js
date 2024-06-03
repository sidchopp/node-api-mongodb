import express from "express";
import {
  getBook,
  getBooks,
  createBook,
  deleteBook,
} from "../controllers/bookControllers.js";

const router = express.Router();

// GET all books
router.get("/", getBooks);

// GET a Book
router.get("/:id", getBook);

//POST/CREATE a book
router.post("/", createBook);

//DELETE a book
router.delete("/:id", deleteBook);

export default router;
