const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class Credentials {
    con;
    constructor() {
        const dbOptions = {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        }
        this.con = mysql.createConnection(dbOptions);
    }

    doesUserExist(username) {
        const query = `
            SELECT 1
            FROM users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise((resolve) => {
            this.con.query(query, (err, result) => {
                if (err) console.error(error);
                console.log(`Query returned: ${JSON.stringify(result)}`);
                resolve(result.length > 0);
            });
        })
        return promise;
    }

    // TODO This is redundant with doesUserExist, but I'm lazy and will fix it later. 
    isPasswordCorrect(username, password) {
        const query = `
            SELECT password
            FROM users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise((resolve) => {
            this.con.query(query, async (err, result) => {
                if (err) console.error(error);
                console.log(`Query returned: ${JSON.stringify(result)}`);
                console.log(`Checking stored password vs entered password: \"${result[0].password}\" vs \"${password}\"`);
                const passwordCompare = await bcrypt.compare(password, result[0].password);
                resolve(passwordCompare);
            });
        })
        return promise;
    }

    async registerUser(username, password, fname, lname) {
        const id = await uuidv4();
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);
        const query = `
            INSERT INTO users 
            VALUES (
                \"${id}\",
                \"${username}\", 
                \"${secPassword}\", 
                \"${fname}\", 
                \"${lname}\", 
                \"0\"
            );
        `;
        console.log(`Query: ${query}`);

        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }

    async getCredentials(username) {
        const query = `
            SELECT *
            FROM users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise((resolve) => {
            this.con.query(query, (err, result) => {
                if (err) console.error(error);
                console.log(`Query returned: ${JSON.stringify(result)}`);
                delete result[0].password;
                resolve(result[0]);
            });
        })
        return promise;
    }

    async storeComment(comment, userId) {
        const date = Date.now();
        console.log(date);
        const id = await uuidv4();
        const query = `
            INSERT INTO comments 
            VALUES (
                \"${id}\",
                \"${comment}\", 
                \"pending\", 
                \"${userId}\", 
                \"${date}\"
            );
        `;
        console.log(`Query: ${query}`);
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }

    async fetchComments(status) {
        let queryStatus = "";
        switch (status) {
            case "all":
                break;
            default:    // default is "approved"
                queryStatus = "WHERE status = \"approved\"";
        }
        const query = `
            SELECT comments.id, comment, status, userid, dateposted, username, fname, lname, isadmin
            FROM comments 
            INNER JOIN users on comments.userid=users.id
            ${queryStatus};
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise((resolve) => {
            this.con.query(query, (err, result) => {
                if (err) console.error(error);
                console.log(`Query returned: ${JSON.stringify(result)}`);
                resolve(result);
            });
        })
        return promise;
    }

    async approveComment(commentId) {
        const query = `
            UPDATE comments 
            SET status = "approved"
            WHERE id = \"${commentId}\";
        `;
        console.log(`Query: ${query}`);
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }

    async deleteComment(commentId) {
        const query = `
            DELETE FROM comments 
            WHERE id = \"${commentId}\";
        `;
        console.log(`Query: ${query}`);
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }

    async deleteAccount(userId) {
        const query = `
            DELETE FROM users 
            WHERE id = \"${userId}\";
        `;
        console.log(`Query: ${query}`);
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }

    async hideComment(commentId) {
        const query = `
            UPDATE comments 
            SET status = "hidden"
            WHERE id = \"${commentId}\";
        `;
        console.log(`Query: ${query}`);
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`);
            console.log(result);
        });
    }
}

exports.Credentials = Credentials;