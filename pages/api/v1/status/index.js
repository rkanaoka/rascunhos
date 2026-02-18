import database from "infra/database.js";

async function status(request, response) {

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConnections = await database.query("SHOW max_connections;");

  //const databaseName = request.query.dbname || process.env.POSTGRES_DB;
  //const databaseCurrentConnections = await database.query(`SELECT COUNT(*) FROM pg_stat_activity where datname = '${databaseName}';`);

  const databaseName = process.env.POSTGRES_DB;
  const databaseCurrentConnections = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({ 
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
      version: databaseVersionResult.rows[0].server_version,
      max_connections: databaseMaxConnections.rows[0].max_connections,
      current_connections: databaseCurrentConnections.rows[0].count,
    }
    }, 
  });
}
export default status;
