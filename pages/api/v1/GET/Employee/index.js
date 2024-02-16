import database from "infra/database.js";

async function getEmployeeById(request, response) {
  const employeeId = await request.query.id;
  const dbgetEmployeeById = await database.query({
    text: "SELECT * FROM employees WHERE id = $1;",
    values: [employeeId],
  });
  const dbGetEmployeeValue = dbgetEmployeeById.rows[0];
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json({
    id: dbGetEmployeeValue.id,
    first_name: dbGetEmployeeValue.first_name,
    last_name: dbGetEmployeeValue.last_name,
    hire_date: dbGetEmployeeValue.hire_date,
    department_id: dbGetEmployeeValue.department_id,
    phone: dbGetEmployeeValue.phone,
    address: dbGetEmployeeValue.address,
    active: dbGetEmployeeValue.active,
    deleted: dbGetEmployeeValue.deleted,
  });
}

async function getEmployeeList(response) {
  const dbgetEmployeeById = await database.query("SELECT * FROM employees;");
  const dbGetEmployeeValue = dbgetEmployeeById.rows[0];
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json({
    id: dbGetEmployeeValue.id,
    first_name: dbGetEmployeeValue.first_name,
    last_name: dbGetEmployeeValue.last_name,
    hire_date: dbGetEmployeeValue.hire_date,
    department_id: dbGetEmployeeValue.department_id,
    phone: dbGetEmployeeValue.phone,
    address: dbGetEmployeeValue.address,
    active: dbGetEmployeeValue.active,
    deleted: dbGetEmployeeValue.deleted,
  });
}

export default getEmployeeById;
