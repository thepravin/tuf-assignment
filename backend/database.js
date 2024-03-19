const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

const dbUrl = `mysql://root:PbCopkAUDNwBLdOUxOGEmJXupzQWCULL@viaduct.proxy.rlwy.net:44116/railway`

const connection = mysql.createConnection(dbUrl);

module.exports = connection;
