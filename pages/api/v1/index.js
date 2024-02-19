import {
  createEmployee,
  deleteEmployee,
  getderpHisotryById,
} from "services/EmployeeService";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case "POST":
      createEntity(req, res, req.query.entityName);
      break;
    case "DELETE":
      deleteEntity(req, res, req.query.entityName);
      break;
    case "GET":
      getEntityById(req, res, req.query.entityName);
      break;
    default:
      res.status(404).json({ error: "Not find Request method " });
  }
}

async function getEntityById(req, res, entityName) {
  try {
    switch (entityName) {
      case "employee":
        break;
      case "derpHisotry":
        const id = req.query.id;
        const result = await getderpHisotryById(id);
        console.log(result);
        res.status(200).json(result);
        break;
      default:
        res.status(404).json({ error: "Entity not found" });
    }
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteEntity(req, res, entityName) {
  try {
    switch (entityName) {
      case "employee":
        const employeeId = req.query.id;
        const result = await deleteEmployee(employeeId);
        res.status(200).json(result);
        break;
      case "department":
        break;
      default:
        res.status(404).json({ error: "Entity not found" });
    }
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createEntity(req, res, entityName) {
  try {
    switch (entityName) {
      case "employee":
        const {
          first_name,
          last_name,
          hire_date,
          department_id,
          phone,
          address,
        } = req.body;
        const result = await createEmployee(
          first_name,
          last_name,
          hire_date,
          department_id,
          phone,
          address,
        );

        res.status(200).json(result);
        break;
      case "department":
        break;
      default:
        res.status(404).json({ error: "Entity not found" });
    }
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
