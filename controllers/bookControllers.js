import { ObjectId } from "mongodb";
import { db } from "../index.js";

// GET all books
const getBooks = async (req, res) => {
  let books = [];

  try {
    await db
      .collection("books")
      .find()
      .sort({ author: 1 })
      .forEach((book) => books.push(book));

    res.status(200).json(books);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

// GET a book
const getBook = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const doc = await db
        .collection("books")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Document not found" });
      }
    } else {
      res.status(400).json({ error: "Invalid ID format" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the document" });
  }
};

// POST/CREATE a book
const createBook = async (req, res) => {
  try {
    const book = req.body;
    const result = await db.collection("books").insertOne(book);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create new document" });
  }
};

// UPDATE a book
const updateBook = async (req, res) => {
  try {
    const updates = req.body;
    if (ObjectId.isValid(req.params.id)) {
      const result = await db
        .collection("books")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "Invalid ID format" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update document" });
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const result = await db
        .collection("books")
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "Invalid ID format" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete document" });
  }
};

export { getBooks, getBook, createBook, updateBook, deleteBook };
