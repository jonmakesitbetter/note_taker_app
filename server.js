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
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(notesList),
      "utf-8",
      (err, data) => {
        if (err) throw err;
        res.json(notesList);
      }
    );
  });
  //readfile
  //parsefile
  //take parsed file and set variable to be used in line 31. Parsed file is now an array.
  //push array req.body to  the variable array
  //stringify and overwrite file with db.json, which will require fs.writeFile
  //send file back to the user via res.json(JSON.parse)

  //readFile, parse file, add the new file(change contents), re-stringify whole array, put back in json box,
});

// app.delete("/api/notes/:id", (req, res) => {

// });

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
