const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const notesList = JSON.parse(data);
    req.body.id = uuidv4();
    notesList.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notesList), "utf-8", (err) => {
      if (err) throw err;
      res.json(notesList);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const list = JSON.parse(data);
    notesList = list.filter((data) => {
      return data.id != req.params.id;
    });
    fs.writeFile("./db/db.json", JSON.stringify(notesList), "utf-8", (err) => {
      if (err) throw err;
      res.json(notesList);
    });
  });
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
