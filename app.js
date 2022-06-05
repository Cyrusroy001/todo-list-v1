const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // working with date formats
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    // rendering the template ejs file
    res.render("list", {
        listTitle: day,
        newItems: items,
    });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
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

app.listen(3000, function () {
    console.log("Server running on port 3000");
});