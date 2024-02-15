import database from "infra/database.js";

async function getEmployee(request, response) {
  const employeeId = await request.query.id;
  const dbgetEmployeeById = await database.query({
    text: "SELECT * FROM employees WHERE id = $1",
    values: [employeeId],
  });
  const dbGetEmployeeValue = dbgetEmployeeById.rows[0];
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json({
    id: dbGetEmployeeValue.id,
    FirstName: dbGetEmployeeValue.FirstName,
    LastName: dbGetEmployeeValue.LastName,
    HireDate: dbGetEmployeeValue.HireDate,
    DepartmentID: dbGetEmployeeValue.DepartmentID,
    Phone: dbGetEmployeeValue.Phone,
    Address: dbGetEmployeeValue.Address,
  });
}

async function addEmployee(request, response) {
  const { id, FirstName, LastName, HireDate, DepartmentID, Phone, Address } =
    request.body;
  const dbInsertEmployee = await database.query(
    "INSERT INTO employees (id, 'FirstName', 'LastName', 'DepartmentID', 'Phone', 'Address', 'HireDate') VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [id, FirstName, LastName, HireDate, DepartmentID, Phone, Address],
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json({ message: "Employee added successfully." });
}

export default getEmployee;
