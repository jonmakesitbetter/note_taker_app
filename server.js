const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("./api/notes", (req, res) => {
  fs.readFile("./notes.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    return res.json({
      error: true,
      data: null,
      message: "Unable to retreive notes.",
    });
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile(
    "./students.json",
    "utf-8",
    (err, data) => {
      if (err) console.log(err);
      return res.json({
        error: true,
        data: null,
        message: "Unable to retreive notes.",
      });
    },
    console.log(data)
  );
  const updatedData = JSON.parse(data);
  updatedData.push(req.body);
  console.log(updatedData);
  fs.writeFile("./notes.json", JSON.stringify(updatedData), (err) => {
    if (err) throw err;
    res.json({
      error: false,
      data: null,
      message: "Successfully added note.",
    });
  });
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
