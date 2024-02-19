// // pages/api/v1/employee/index.js

// import database from "infra/database.js";
// import corsMiddleware from "middleware/cors";

// export default async function addEmployee(request, response) {
//   try {
//     const { first_name, last_name, hire_date, department_id, phone, address } =
//       request.body;

//     if (
//       !first_name ||
//       !last_name ||
//       !hire_date ||
//       !department_id ||
//       !phone ||
//       !address
//     ) {
//       return response
//         .status(422)
//         .json({ error: "Please provide all required fields" });
//     }

//     // Begin transaction
//     await database.query("BEGIN");

//     // Get department name
//     const dbDepartmentName = (
//       await database.query({
//         text: "SELECT department_name FROM departments WHERE id = $1",
//         values: [department_id],
//       })
//     ).rows[0].department_name;

//     // Insert into employees table
//     const employeeInsertResult = await database.query({
//       text: "INSERT INTO employees (first_name, last_name, hire_date, department_id, phone, address, department_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
//       values: [
//         first_name,
//         last_name,
//         hire_date,
//         department_id,
//         phone,
//         address,
//         dbDepartmentName,
//       ],
//     });

//     const employeeId = employeeInsertResult.rows[0].id;
//     const currentDate = new Date().toISOString().slice(0, 10);

//     // Insert into employee_dept_history table
//     await database.query({
//       text: "INSERT INTO employee_dept_history (employee_id, departments_id, start_date) VALUES ($1, $2, $3)",
//       values: [employeeId, department_id, currentDate],
//     });

//     // Commit transaction
//     await database.query("COMMIT");
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.status(200).json({ message: "Employee added successfully." });
//   } catch (error) {
//     // Rollback transaction on error
//     await database.query("ROLLBACK");
//     console.error(error);
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.status(500).json({ error: "Internal server error" });
//   }
// }
