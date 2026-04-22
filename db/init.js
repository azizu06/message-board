require("dotenv").config();
const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.DB_URL;
const useSsl =
  connectionString &&
  !connectionString.includes("localhost") &&
  !connectionString.includes("127.0.0.1");

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text TEXT,
    username VARCHAR(255),
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO messages (text,username)
VALUES
    ('Hi chud', 'Aziz'),
    ('AI is gonna take ur job', 'Techbro');
`;

const main = async () => {
  const client = new Client({
    connectionString,
    ssl: useSsl
      ? {
          rejectUnauthorized: false,
        }
      : false,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
};
main();
