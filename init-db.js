require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
};

const db_name = process.env.DB_NAME;
const schemaPath = path.join(__dirname, 'db', 'schema.sql');
const seedsPath = path.join(__dirname, 'db', 'seeds.sql');

async function setup_db() {
  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection(db_config);

    // Create the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(db_name)}`);
    await connection.query(`USE ${mysql.escapeId(db_name)}`);

    // Apply the schema
    const schema = await fs.readFile(schemaPath, 'utf8');
    await connection.query(schema);

    // Apply the seed data
    const seeds = await fs.readFile(seedsPath, 'utf8');
    await connection.query(seeds);

    console.log('Database setup completed successfully.');
  } catch (err) {
    console.error('Database setup failed:', err);
  } finally {
    if (connection) await connection.end();
  }
}

setup_db();
