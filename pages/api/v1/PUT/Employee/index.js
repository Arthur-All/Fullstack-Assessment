import database from "infra/database.js";

async function updateEmployee(request, response) {
  try {
    const {
      id,
      first_name,
      last_name,
      hire_date,
      department_id,
      phone,
      address,
    } = request.body;
    await database.query({
      text: "UPDATE employees SET first_name = $2, last_name = $3, hire_date = $4, department_id = $5, phone = $6, address = $7 WHERE id = $1;",
      values: [
        id,
        first_name,
        last_name,
        hire_date,
        department_id,
        phone,
        address,
      ],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({ message: "Employee updated successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default updateEmployee;
