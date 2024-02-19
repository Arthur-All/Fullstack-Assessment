test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/GET/status");
  expect(response.status).toBe(200);
  const OpenConnectionSuccess = false;
  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  const openConnections =
    responseBody.dependencies.database.opened_connections.openConnections;

  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  if (openConnections >= 1) {
    OpenConnectionSuccess = true;
    expect(OpenConnectionSuccess).toEqual(true);
  }
});
