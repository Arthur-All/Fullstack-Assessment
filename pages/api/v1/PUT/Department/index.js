import database from "infra/database.js";

async function updateDepartment(request, response) {
  try {
    const { id, department_name } = request.body;
    await database.query({
      text: "UPDATE departments SET department_name = $1 WHERE id = $2;",
      values: [department_name, id],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({ message: "Department updated successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default updateDepartment;
