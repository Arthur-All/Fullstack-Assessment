import database from "infra/database.js";

async function deleteDepartment(request, response) {
  try {
    const id = await request.query.id;
    await database.query({
      text: "UPDATE departments SET active = false, deleted = true WHERE id = $1;",
      values: [id],
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json({ message: "Department deleted successfully." });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default deleteDepartment;
