import mysql from 'mysql2/promise';


const db = {

    connectToDatabase: async () => {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            port: 3306,
            database: "app_activities",
        });
        return con;
    },


    getAllActivities: async () => {
        let con;
        try {
            //the getAllActivities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            con = await db.connectToDatabase();
            const [rows] = await con.query('SELECT * FROM activities');
            return rows;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },


    getActivityById: async (id) => {
        //this syntax (prepared statement, parameters used in the query) prevents from SQL injections
        let con;
        try {
            con = await db.connectToDatabase();
            const [rows] = await con.query('SELECT * FROM activities WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },


    createActivity: async ({name, starting_date, duration}) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const [result] = await con.query(
                'INSERT INTO activities (name, starting_date, duration) VALUES (?, ?)',
                [name, starting_date, duration]);
            return {id: result.insertId, name, starting_date, duration};
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },


    updateActivity: async (id, {name, starting_date, duration}) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const[result] = await con.query(
                'UPDATE activities SET name = ?, starting_date = ?, duration = ? WHERE id = ?',
                [name, starting_date, duration, id]);
            return result.affectedRows;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },


    deleteActivity: async (id) => {
        let con;
        try {
            con = await db.connectToDatabase();
            const [result] = await con.query('DELETE FROM activities WHERE id = ?', [id]);
            if (result.affectedRows.length > 0) {
                return {success: true};
            } else {
                return {success: false};
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },


    disconnectFromDatabase: async (connection) => {
        try {
            await connection.end();
            console.log('Successfully disconnected from database');
        } catch (error) {
            console.error('An error occurred during disconnection from database :', error);
            throw error;
        }
    }
}

export { db }