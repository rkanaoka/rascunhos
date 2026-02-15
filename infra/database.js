import { Client } from "pg";
async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  console.log("DB: " + process.env.POSTGRES_DB);
  console.log("USER: " + process.env.POSTGRES_USER);
  console.log("PASSWORD: " + process.env.POSTGRES_PASSWORD);

  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};

//docker compose -f infra/compose.yaml up -d
//docker ps -a
//docker logs <container_id>
//docker compose -f infra/compose.yaml down
//psql -U postgres -h localhost -p 5432 -d postgres
