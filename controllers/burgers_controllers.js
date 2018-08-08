var express = require("express");
var burgersCtrl = require("../models/burger.js");
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burgersCtrl.all(function (data) {
        var hbsObject = {
            burgersCtrl: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/cats", function (req, res) {
    burgersCtrl.create([
        "name", "sleepy"
    ], [
            req.body.name, req.body.sleepy
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

router.put("/api/cats/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burgersCtrl.update({
        sleepy: req.body.sleepy
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;