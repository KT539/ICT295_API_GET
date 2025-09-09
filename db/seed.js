import mysql from "mysql2/promise";
import activities from "./mock-activities.js";


const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "app_activities",
});

for (const { name, starting_date, duration } of activities) {
    await con.query(
        "INSERT INTO activities (name, starting_date, duration) VALUES (?, ?, ?)",
        [name, starting_date, duration]
    );
}

console.log("Mock data inserted!");
await con.end();