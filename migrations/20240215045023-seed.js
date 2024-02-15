"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db
    .createTable("employees", {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      FirstName: { type: "varchar(100)", notNull: true },
      LastName: { type: "varchar(100)", notNull: true },
      HireDate: { type: "date", notNull: true },
      DepartmentID: { type: "int", notNull: true },
      Phone: { type: "bigint", notNull: true },
      Address: { type: "text", notNull: true },
    })
    .then(function () {
      return db.createTable("departments", {
        id: { type: "int", primaryKey: true, autoIncrement: true },
        DepartmentName: { type: "varchar(100)", notNull: true },
        Active: { type: "boolean", notNull: true },
        Deleted: { type: "boolean", notNull: true },
      });
    })
    .then(function () {
      return db.createTable("employee_dept_history", {
        id: { type: "int", primaryKey: true, autoIncrement: true },
        EmployeeID: { type: "int", notNull: true },
        DepartmentsID: { type: "int", notNull: true },
        StartDate: { type: "date", notNull: true },
        EndDate: { type: "date", notNull: true },
      });
    });
};

exports.down = function (db) {
  return db
    .dropTable("employee_dept_history")
    .then(function () {
      return db.dropTable("departments");
    })
    .then(function () {
      return db.dropTable("employees");
    });
};

exports._meta = {
  version: 1,
};
