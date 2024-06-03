import express from "express";

//init app and middleware
const app = express();

// routes
app.get("/", (req, res) => {
  res.json("Welcome to Node MongoDB API!");
});

app.listen(4000, () => {
  console.log("Listening on prt 4000.. ");
});
