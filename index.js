import express from "express";
import { ObjectId } from "mongodb";

import { getDb, connectToDb } from "./db.js";

//init app and middleware
const app = express();

// routes

// GET all books
app.get("/books", async (req, res) => {
  let books = [];

  try {
    await db
      .collection("books")
      .find()
      .sort({ author: 1 })
      .forEach((book) => books.push(book));

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch the documents" });
  }
});

// GET a Book
app.get("/books/:id", async (req, res) => {
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
});

//db connection
let db; // a variable to store the db object we receive after connection is set

connectToDb((err) => {
  console.log("DB connected..");
  if (!err) {
    app.listen("4000", () => {
      console.log("Server is listening on port 4000..");
    });
    db = getDb();
  }
});
