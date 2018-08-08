var connection = require("./connection.js");

var orm = {
    // Select all burgers
    selectAll: function (tableInput) {
        console.error("selectAll function");
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            console.log(result);
            connection.end();
        });
    },
    // Insert one buger into the database
    insertOne: function (valOfCol, tableInput) {
        var queryString = "SELECT ?? FROM ??"
        connection.query(queryString, [valOfCol, tableInput], function (err, result) {
            if (err) throw err;
            console.log(result);
            connection.end();
        });
    },
    // // Updates the burgers in the database
    // updateOne: function (tableInput, attr, valOfCol) {
    //     var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    //     connection.query(queryString, [tableInput, attr, valOfCol], function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         console.log("Client parties function is not complete.");
    //         connection.end();
    //     });
    // },
};

module.exports = orm;