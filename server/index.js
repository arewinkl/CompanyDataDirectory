const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3001;
const data = require("./deals.json");
const app = express();
const server = http.createServer(app);
var fs = require("fs");

app.get("/api/deals", function (req, res) {
  res.json({ message: data });
});

app.get("/api/deals/id/:dealID", function (req, res) {
  fs.readFile(__dirname + "/" + "deals.json", "utf8", function (err, entries) {
    var deals = JSON.parse(entries);
    var deal = deals.filter((deal) => deal.dealID === req.params.dealID);

    res.end(JSON.stringify(deal));
  });
});

app.get("/api/deals/id/:name", function (req, res) {
  // fs.readFile(__dirname + "/" + "deals.json", 'utf8', function(err,entries) {
  //     var names = JSON.parse(entries);
  //     var name = names.filter(name => name.name === req.params.name);
  //     res.end(JSON.stringify(name));
  // })
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.use(express.json({ limit: "1mb" }));
app.post("/api/deals", function (req, res) {
  // fs.readFile(__dirname + "/" + "deals.json", "utf8", function (err, entries){
  //    let cat = JSON.parse(entries);
  //     cat[cat.length] = {...req, dealID: makeid(16)};
  //     console.log( cat[cat.length-1] );
  //     res.end();

  // })
  //! fs.readFile(__dirname + "/" +  'deals.json', function (err, entries) {
  //     var json = JSON.parse(entries)
  //     console.log({req})

  //     json.push({...req.body, dealID: makeid(16)})
  // console.log({req})
  //     fs.writeFile(__dirname + "/" + "deals.json", JSON.stringify(json))
  //! })

  console.log(req.body);
  console.log(res);
  res.json({
    status: "success",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
