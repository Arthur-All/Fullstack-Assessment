import { getById, remove } from "../infra/repository/genericRepository";

export async function getByEntityId(entityName, employeeId, resp) {
  try {
    if (!entityName) {
      return resp.status(422).json({
        error: "Please provide the entity name.",
      });
    }
    if (!employeeId) {
      return resp.status(422).json({
        error: "Please provide the employee ID.",
      });
    }

    const getByEntityId = await getById(entityName, employeeId);

    let formattedData;

    switch (entityName) {
      case "employee":
        formattedData = getByEntityId.rows.map((row) => ({
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          hire_date: row.hire_date,
          department_id: row.department_id,
          phone: row.phone,
          address: row.address,
          active: row.active,
          deleted: row.deleted,
          department_name: row.department_name,
        }));
        break;
      case "department":
      case "employee_dept_history": // Handling both department and employee_dept_history the same way
        formattedData = getByEntityId.rows.map((row) => ({
          id: row.id,
          department_name: row.department_name,
          active: row.active,
          deleted: row.deleted,
        }));
        break;
      default:
        return resp.status(404).json({ error: "Requested method not found." });
    }

    return (resp = formattedData);
  } catch (error) {
    console.error("Error:", error);
    return resp.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteEntity(entityName, employeeId, resp) {
  if (!entityName) {
    return resp.status(422).json({
      error: "Please provide entity name required fields",
    });
  }
  if (!employeeId) {
    return resp.status(422).json({
      error: "Please provide id required fields",
    });
  }

  const deleteEntity = await remove(entityName, employeeId);
  if (deleteEntity == false) {
    return resp.status(404).json({
      error: "Internal server error",
    });
  }
  return (resp = "Deleted");
}
