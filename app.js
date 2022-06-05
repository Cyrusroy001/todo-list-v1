const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// we are varying this but still const!!, because JS 
// allows pushing but not reassigning
const items = [];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = date.getDate();
    // rendering the template ejs file
    res.render("list", {
        listTitle: day,
        newItems: items,
    });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

// using the ejs template to create a new work list
app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newItems: workItems,
    });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});