require("dotenv").config();
const { Client } = require("pg");
const connectionString =
  process.env.POSTGRES_DIRECT_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username)
SELECT seed.text, seed.username
FROM (
    VALUES
        ('Hi chud', 'Aziz'),
        ('AI is gonna take ur job', 'Techbro')
) AS seed(text, username)
WHERE NOT EXISTS (
    SELECT 1
    FROM messages
    WHERE messages.text = seed.text
      AND messages.username = seed.username
);
`;

const main = async () => {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Database initialization failed:", err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
};
main();
