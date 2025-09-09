import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port:3306,
    database: "app_activities",
});


const db = {

    getAllActivities: async () => {
        //the getAllActivities function waits until the query is finished to execute
        //if there is some code after the call of this function, it will be executed without waiting the execution of this function
        const [rows] = await con.query('SELECT * FROM activities');
        return rows;
    },

    getActivityById: async (id) => {
        //this syntax (prepared statement, parameters used in the query) prevents from SQL injections
        const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
        return rows[0];
    },

    createActivity: async ({name, starting_date, duration}) => {
        const [result] = await con.query(
            'INSERT INTO activities (name, starting_date, duration) VALUES (?, ?)',
            [name, starting_date, duration]
        );
        return {id: result.insertId, name, starting_date, duration};
    },

    updateActivity: async (id, {name, starting_date, duration}) => {
        await con.query(
            'UPDATE activities SET name = ?, starting_date = ?, duration = ? WHERE id = ?',
            [name, starting_date, duration, id]
        );
        return {id, name, starting_date, duration};
    },

    deleteActivity: async (id) => {
        await con.query('DELETE FROM activities WHERE id = ?', [id]);
        return {success: true};
    },
}

export { db }