class Employee {
  constructor(
    first_name,
    last_name,
    hire_date,
    department_id,
    department_name,
    phone,
    address,
    active,
    deleted,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.hire_date = hire_date;
    this.department_id = department_id;
    this.department_name = department_name;
    this.phone = phone;
    this.address = address;
    this.active = active;
    this.deleted = deleted;
  }
}

module.exports = Employee;
