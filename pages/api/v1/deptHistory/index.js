import database from "infra/database.js";

async function getDerpHistory(request, response) {
  try {
    const id = request.query.id;
    const dbGetDerpHistory = await database.query({
      text: "SELECT * FROM employee_dept_history WHERE id = $1;",
      values: [id],
    });
    const derpHistory = dbGetDerpHistory.rows.map((row) => ({
      id: row.id,
      employee_id: row.employee_id,
      department_id: row.department_id,
      start_date: row.start_date,
      end_date: row.end_date,
    }));

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json(derpHistory);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default getDerpHistory;
