const express = require("express");
const app = express();
const port = 3000;

var levelup = require("levelup");
var leveldown = require("leveldown");

// 1) Create our store
var db = levelup(leveldown("./mydb"));

db_get_async = key =>
  new Promise((resolve, reject) => {
    db.get(key, function(err, value) {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });

db_set_async = (key, value) =>
  new Promise((resolve, reject) => {
    db.put(key, value, function(err, value) {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });

app.get("/test3", async (req, res) => {
  await db_set_async("Riste3", "Samardjiev3");

  let value = await db_get_async("Riste3");
  console.log("name=" + value);

  return res.send("Hello World 3!");
});

app.listen(port, () => console.log(`CashFlow BE listening on port ${port}!`));
