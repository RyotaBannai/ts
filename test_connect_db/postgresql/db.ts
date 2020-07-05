const { Client, Pool } = require("pg");
const client = new Client({
  user: "ryota",
  host: "localhost",
  database: "apparatus",
  password: "bannai",
  port: 5432,
});

// const pool = new Pool({
//   user: "ryota",
//   host: "localhost",
//   database: "apparatus",
//   password: "bannai",
//   port: 5432,
// });

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const main = async () => {
  await client.connect();
  const res = await client.query("SELECT * from item;");
  console.log(res.rows[0]);
  await client.end();
};

main().catch((err) => console.log(err));
