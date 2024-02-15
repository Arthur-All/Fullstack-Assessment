import database from "infra/database.js";

async function getDepartment(request, response) {
  try {
    const departmentID = await request.query.id;
    console.log(departmentID);
    const dbInsertDepartment = await database.query({
      text: "SELECT * FROM departments WHERE id = $1",
      values: [departmentID],
    });
    const dbInsertDepartmentValue = dbInsertDepartment.rows[0];
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({
      id: dbInsertDepartmentValue.id,
      DepartmentName: dbInsertDepartmentValue.DepartmentName,
      Active: dbInsertDepartmentValue.Active,
      Deleted: dbInsertDepartmentValue.Deleted,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

async function addDepartment(request, response) {
  try {
    const { id, DepartmentName, Active, Deleted } = request.body;
    await database.query({
      text: "INSERT INTO departments (id, 'Active', 'Deleted', 'DepartmentName') VALUES ($1, $2, $3, $4)",
      values: [id, Active, Deleted, DepartmentName],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({ message: "Department added successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default getDepartment;
