"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.up = function (db) {
  return db
    .createTable("departments", {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      department_name: { type: "text", notNull: true },
      active: { type: "boolean", defaultValue: true },
      deleted: { type: "boolean", defaultValue: false },
    })
    .then(function () {
      return db.createTable("employees", {
        id: {
          type: "int",
          primaryKey: true,
          unsigned: true,
          autoIncrement: true,
        },
        first_name: { type: "text", notNull: true },
        last_name: { type: "text", notNull: true },
        hire_date: { type: "date", notNull: true },
        department_id: { type: "int", notNull: true },
        department_name: { type: "text", notNull: true },
        phone: { type: "bigint", notNull: true },
        address: { type: "text", notNull: true },
        active: { type: "boolean", defaultValue: true },
        deleted: { type: "boolean", defaultValue: false },
      });
    })
    .then(function () {
      return db.createTable("employee_dept_history", {
        id: { type: "int", primaryKey: true, autoIncrement: true },
        employee_id: { type: "int", notNull: true },
        departments_id: { type: "int", notNull: true },
        start_date: { type: "date", notNull: true },
        end_date: { type: "date", notNull: false },
        active: { type: "boolean", defaultValue: true },
      });
    })
    .then(function () {
      return db.addForeignKey("employees", "departments", "fk_department_id", {
        department_id: "id",
      });
    })
    .then(function () {
      return db.addForeignKey(
        "employee_dept_history",
        "employees",
        "fk_employee_id",
        {
          employee_id: "id",
        },
      );
    })
    .then(function () {
      return db.addForeignKey(
        "employee_dept_history",
        "departments",
        "fk_department_history_department_id",
        {
          departments_id: "id",
        },
      );
    })
    .catch(function (err) {
      console.error("Error in migration:", err);
      throw err;
    });
};

exports.down = function (db) {
  return db
    .dropTable("employee_dept_history")
    .then(function () {
      return db.dropTable("employees");
    })
    .then(function () {
      return db.dropTable("departments");
    })
    .catch(function (err) {
      console.error("Error in migration:", err);
      throw err;
    });
};

exports._meta = {
  version: 1,
};
