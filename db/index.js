const { Pool } = require('pg');
require('dotenv').config(); //подключаем переменные окружения

//создаем клиент с настройками из .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;