import {
  getDerpName,
  insertEmployee,
  insertEmployeeDerpHistory,
  removeEmployee,
  getderpHisotry,
} from "../infra/repository/EmployeeRepository";

export async function deleteEmployee(employeeId, resp) {
  if (!employeeId) {
    return resp.status(422).json({
      error: "Please provide employee Id required fields",
    });
  }
  const deleteEmployee = await removeEmployee(employeeId);
  if (deleteEmployee == false) {
    return resp.status(404).json({
      error: "Internal server error",
    });
  }
  return (resp = "Deleted");
}

export async function getderpHisotryById(employeeId, resp) {
  if (!employeeId) {
    return resp.status(422).json({
      error: "Please provide employee Id required fields",
    });
  }
  const dbDerpHisotryResult = await getderpHisotry(employeeId);
  if (deleteEmployee == false) {
    return resp.status(404).json({
      error: "Internal server error",
    });
  }
  const derpHisotryValue = dbDerpHisotryResult.rows.map((row) => ({
    id: row.id,
    employee_id: row.employee_id,
    department_id: row.department_id,
    address: row.address,
    start_date: row.start_date,
    end_date: row.end_date,
    active: row.active,
  }));
  return (resp = derpHisotryValue);
}

//#region CREATE EMPLOYEE
export async function createEmployee(
  first_name,
  last_name,
  hire_date,
  department_id,
  phone,
  address,
  resp,
) {
  if (!first_name) {
    return resp.status(422).json({
      error: "Please provide all required fields",
    });
  }
  if (!last_name) {
    return resp.status(422).json({
      error: "Please provide last name field",
    });
  }
  if (!hire_date) {
    return resp.status(422).json({
      error: "Please provide last name field",
    });
  }
  if (!phone) {
    return resp.status(422).json({
      error: "Please provide last name field",
    });
  }
  if (!address) {
    return resp.status(422).json({
      error: "Please provide last name field",
    });
  }

  const getDepartmentName = await getDerpName(department_id);
  if (getDepartmentName.length == false) {
    return resp.status(404).json({
      error: "Department not found",
    });
  }

  const createEmployee = await insertEmployee(
    first_name,
    last_name,
    hire_date,
    department_id,
    phone,
    address,
    getDepartmentName,
  );
  if (!createEmployee) {
    return resp.status(500).json({
      error: "Unable to create employee",
    });
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const employeeId = createEmployee.rows[0].id;

  const newEmployeeDerpHistory = await insertEmployeeDerpHistory(
    employeeId,
    department_id,
    currentDate,
  );
  if (!newEmployeeDerpHistory) {
    return resp.status(500).json({
      error: "Unable to create department history",
    });
  }

  return (resp = "Created");
}
//#endregion CREATE EMPLOYEE

export async function getEmployeeById(resp) {
  return (resp = "test");
}
