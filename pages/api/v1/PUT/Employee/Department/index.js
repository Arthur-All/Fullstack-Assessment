import database from "infra/database.js";

async function updateEmployeeDepartment(request, response) {
  try {
    const { id, department_id } = request.body;
    await database.query({
      text: "UPDATE employees SET department_id = $2 WHERE id = $1;",
      values: [id, department_id],
    });
    const currentDate = new Date().toISOString().slice(0, 10);
    await database.query({
      text: "UPDATE employee_dept_history SET end_date = $2, active = false WHERE employee_id = $1;",
      values: [id, currentDate],
    });
    const departments_id = department_id;
    await database.query({
      text: "INSERT INTO employee_dept_history (employee_id, departments_id, start_date) VALUES ($1, $2, $3);",
      values: [id, departments_id, currentDate],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response
      .status(200)
      .json({ message: "The employee's department was updated successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default updateEmployeeDepartment;
