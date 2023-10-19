const path = require('path');
const {Pool} = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', 'config', 'credential.env') });

// set up a PostgreSQL server and fill this in from db details
const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}
/*Just some logging to make sure .env works
console.log("DB_USER", process.env.DB_USER);
console.log("DB_HOST", process.env.DB_HOST);
console.log("DB_DATABASE", process.env.DB_DATABASE);
console.log("DB_PASSWORD", process.env.DB_PASSWORD);
console.log("DB_PORT", process.env.DB_PORT);*/