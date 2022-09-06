const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const port = 3001;

app.use(cors({ credentials: true,origin: "*"}));

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

// database connection
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "_hostport_",
  user: "_username_",
  password: "_password_",
  database: "_databaseName_",
  port:"3306"
});

conn.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server Hello.");
});

//getData
app.get("/data", (req, res) => {
  conn.connect(() => {
    conn.query("SELECT * FROM hdata", (err, rows, fields) => {
      res.json(rows);
    });
  });
});

// postdata
app.post("/addData", function (req, res) {
  console.log(req.body);
  let data = {
    "id": req.body.id,
    "Hname": req.body.Hname,
    "image": req.body.image,
  };
  console.log(data);
    conn.query('INSERT INTO Hdata SET ?', data,
   function (err, rows, fields) {
        if (err) throw error;
      //   console.log(rows);
        res.json(data);
    });
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
