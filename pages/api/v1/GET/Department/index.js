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
    console.log(dbInsertDepartmentValue);
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({
      id: dbInsertDepartmentValue.id,
      department_name: dbInsertDepartmentValue.department_name,
      active: dbInsertDepartmentValue.active,
      deleted: dbInsertDepartmentValue.deleted,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default getDepartment;
