import database from "infra/database.js";

export async function getDerpName(employeeDerpId) {
  try {
    const dbDepartmentName = (
      await database.query({
        text: "SELECT department_name FROM departments WHERE id = $1;",
        values: [employeeDerpId],
      })
    ).rows[0].department_name;

    return dbDepartmentName;
  } catch (error) {
    console.error("Error to get department name:", error);
    throw new Error("Unable to get department name");
  }
}
export async function getderpHisotry(employeeDerpId) {
  try {
    console.log("oie");
    const dbDerpHisotry = await database.query({
      text: "SELECT * FROM employee_dept_history WHERE id = $1;",
      values: [employeeDerpId],
    });

    return dbDerpHisotry;
  } catch (error) {
    console.error("Error to get derp Hisotry name:", error);
    throw new Error("Unable to get derp Hisotry name");
  }
}

export async function insertEmployee(
  first_name,
  last_name,
  hire_date,
  department_id,
  phone,
  address,
  department_name,
) {
  try {
    const result = await database.query({
      text: "INSERT INTO employees (first_name, last_name, hire_date, department_id, phone, address, department_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;",
      values: [
        first_name,
        last_name,
        hire_date,
        department_id,
        phone,
        address,
        department_name,
      ],
    });
    return result;
  } catch (error) {
    console.error("Error inserting employee:", error);
    throw new Error("Unable to insert employee");
  }
}

export async function insertEmployeeDerpHistory(
  employeeId,
  department_id,
  currentDate,
) {
  try {
    await database.query({
      text: "INSERT INTO employee_dept_history (employee_id, departments_id, start_date) VALUES ($1, $2, $3);",
      values: [employeeId, department_id, currentDate],
    });

    return true;
  } catch (error) {
    console.error("Error inserting employee derpartment history:", error);
    throw new Error("Unable to insert employee derpartment history");
  }
}

export async function removeEmployee(employeeId) {
  try {
    await database.query({
      text: "UPDATE employees SET active = false, deleted = true WHERE id = $1;",
      values: [employeeId],
    });
    return true;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return employeeId.status(500).json({ error: "Internal server error" });
  }
}
