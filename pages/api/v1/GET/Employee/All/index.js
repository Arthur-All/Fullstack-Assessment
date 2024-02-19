import database from "infra/database.js";

async function getEmployeeList(request, response) {
  try {
    const dbGetEmployees = await database.query({
      text: "SELECT * FROM employees WHERE active = true and deleted= false;",
    });
    const employees = dbGetEmployees.rows.map((row) => ({
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
    response.status(200).json(employees);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default getEmployeeList;
