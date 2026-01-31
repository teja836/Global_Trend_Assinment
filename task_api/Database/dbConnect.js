const mysql = require("mysql2")

const database = mysql.createConnection({
    host: process.env.DB_SERVER,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
});

database.connect((err) => {
    if (err) {
        console.log("Database Connect Failed", err);
    } else {
        console.log("Database Connect Success")
    }
})

module.exports = database