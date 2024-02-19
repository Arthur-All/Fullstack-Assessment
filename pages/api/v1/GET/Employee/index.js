import database from "infra/database.js";

async function getEmployeeById(request, response) {
  const employeeId = await request.query.id;
  const dbgetEmployeeById = await database.query({
    text: "SELECT * FROM employees WHERE id = $1;",
    values: [employeeId],
  });

  const employee = dbgetEmployeeById.rows.map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    hire_date: row.hire_date,
    department_id: row.department_id,
    phone: row.phone,
    address: row.address,
    active: row.active,
    deleted: row.deleted,
    department_name: row.department_name,
  }));

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json(employee);
}

export default getEmployeeById;
