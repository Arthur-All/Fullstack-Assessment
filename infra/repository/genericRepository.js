import database from "infra/database.js";

export async function getById(entityName, id) {
  try {
    const dbDepartmentName = await database.query({
      text: "SELECT * FROM $2 WHERE id = $1;",
      values: [id, entityName],
    });

    return dbDepartmentName;
  } catch (error) {
    console.error("Error to get department name:", error);
    throw new Error("Unable to get department name");
  }
}

export async function remove(entityName, id) {
  try {
    await database.query({
      text: "UPDATE $2 SET active = false, deleted = true WHERE id = $1;",
      values: [id, entityName],
    });
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return employeeId.status(500).json({ error: "Internal server error" });
  }
}
