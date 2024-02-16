import database from "infra/database.js";

async function addDepartment(request, response) {
  try {
    const { department_name } = request.body;
    await database.query({
      text: "INSERT INTO departments (department_name) VALUES ($1)",
      values: [department_name],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({ message: "Department added successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default addDepartment;
