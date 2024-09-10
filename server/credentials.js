const mysql = require('mysql2'); 
const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require('bcryptjs');

class Credentials {
    con; 
    constructor() {
        const dbOptions = {
            host: "localhost",
            user: "root", 
            password: "root", 
            database: "mernfoliodb"
        }
        this.con = mysql.createConnection(dbOptions);
    }

    doesUserExist(username) {
        const query = `
            SELECT 1
            FROM mernfoliodb.users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise( (resolve) => {
            this.con.query(query, (err, result) => {
                if (err) console.error(error); 
                console.log(`Query returned: ${JSON.stringify(result)}`);  
                resolve(result.length > 0);  
            });
        }) 
        return promise;
    }

    // This is redundant with doesUserExist, but I'm lazy and will fix it later. 
    isPasswordCorrect(username, password) {
        const query = `
            SELECT password
            FROM mernfoliodb.users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise( (resolve) => {
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
            INSERT INTO mernfoliodb.users 
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

    requireAuth(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

    async getCredentials(username) {
        const query = `
            SELECT *
            FROM mernfoliodb.users
            WHERE username = \"${username}\";
        `;
        console.log(`Query: ${query}`);
        let promise = new Promise( (resolve) => {
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
        const id = await uuidv4();
        const query = `
            INSERT INTO mernfoliodb.comments 
            VALUES (
                \"${id}\",
                \"${comment}\", 
                \"pending\", 
                \"${userId}\"
            );
        `;
        console.log(`Query: ${query}`); 
        this.con.query(query, (err, result, fields) => {
            if (err) console.error(`SQL error: ${err}`); 
            console.log(result); 
        });
    }

    async fetchComments(status) {
        const query = `
            SELECT comments.id, comment, status, userid, username, fname, lname, isadmin
            FROM mernfoliodb.comments 
            INNER JOIN users on comments.userid=users.id
            WHERE status = "${status}";
        `;
        console.log(`Query: ${query}`); 
        let promise = new Promise( (resolve) => {
            this.con.query(query, (err, result) => {
                if (err) console.error(error); 
                console.log(`Query returned: ${JSON.stringify(result)}`);  
                resolve(result);  
            });
        }) 
        return promise;
    }
}

exports.Credentials = Credentials;