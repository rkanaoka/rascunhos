test("API status returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("Database variables", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseJson = await response.json();

  const databaseVersion = responseJson.dependencies.database.version;
  const databaseMaxConnections = responseJson.dependencies.database.max_connections;
  const databaseCurrentConnections = responseJson.dependencies.database.current_connections;

  expect(databaseVersion).toBeDefined();
  expect(databaseVersion).toBe("16.0");

  expect(databaseMaxConnections).toBeDefined();
  expect(databaseMaxConnections).toBe("100");

  expect(databaseCurrentConnections).toBeDefined();
  expect(parseInt(databaseCurrentConnections)).toBe(1);

});

test("Database SQL Injection", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status?dbname=local_db");
  //const response = await fetch("http://localhost:3000/api/v1/status?dbname='; SELECT pg_sleep(2); --");
});
