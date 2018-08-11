var connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    // Select all burgers
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";

        console.log("ORM selectAll query: " + queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("ORM selectAll result: " + result)
            cb(result);
        });
    },
    // Insert one buger into the database
    insertOne: function (tableInput, cols, vals, cb) {
        var queryString = "INSERT INTO " + tableInput;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log("ORM insertOne query: " + queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("ORM insertOne result: " + result)
            cb(result);
        });
    },

    updateOne: function (tableInput, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableInput;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE " + condition;

        console.log("ORM updateOne query: " + queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("ORM updateOne result: " + result)
            cb(result);
        });
    },

    deleteOne: function (tableInput, condition, cb) {
        var queryString = "DELETE FROM " + tableInput;

        queryString += " WHERE " + condition;

        console.log("ORM deleteOne query: " + queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("ORM deleteOne result: " + result)
            cb(result);
        });
    }
}

module.exports = orm;