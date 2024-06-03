import express from "express";
import { getDb, connectToDb } from "./db.js";
import booksRoutes from "./routes/books.js";

//init app and middleware
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/books", booksRoutes);

//db connection
let db;

connectToDb((err) => {
  console.log("DB connected..");
  if (!err) {
    app.listen("4000", () => {
      console.log("Server is listening on port 4000..");
    });

    db = getDb();
    console.log("db:", db);
  }
});

export { db };
