import express from "express";
import { getDb, connectToDb } from "./db.js";

//init app and middleware
const app = express();

// routes
app.get("/", (req, res) => {
  res.json("Welcome to Node MongoDB API!");
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

    //console log to test db object that's received
    console.log(db);
  }
});
