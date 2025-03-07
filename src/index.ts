// Import required modules
import { pool } from "./connection.js";
import inquirer from "inquirer";

// Import query functions
import getDepartmentsQuery from "./queries/getDepartements.js";
import getRolesQuery from "./queries/getRole.js";
import getEmployeesQuery from "./queries/getEmployee.js";
import insertDepartmentQuery from "./queries/addDept.js";
import insertRoleQuery from "./queries/addRoles.js";
import insertEmployeeQuery from "./queries/addEmploy.js";
import updateEmployeeQuery from "./queries/updateEmployee.js";

// Define TypeScript interfaces for expected data
interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  title: string;
  salary: number;
  department_id: number;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  manager_id: number | null;
}

class DatabaseService {
  // Fetch all departments
  static async getDepartments(): Promise<Department[]> {
    try {
      const { rows } = await pool.query(getDepartmentsQuery());
      return rows;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw new Error("Could not retrieve departments.");
    }
  }

  // Fetch all roles
  static async getRoles(): Promise<Role[]> {
    try {
      const { rows } = await pool.query(getRolesQuery());
      return rows;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw new Error("Could not retrieve roles.");
    }
  }

  // Fetch all employees
  static async getEmployees(): Promise<Employee[]> {
    try {
      const { rows } = await pool.query(getEmployeesQuery());
      return rows;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Could not retrieve employees.");
    }
  }

  // Add a new department
  static async addDepartment(): Promise<void> {
    try {
      const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter department name:",
        validate: (input: string) => (input.trim() ? true : "Department name cannot be empty."),
      });

      await pool.query(insertDepartmentQuery(name));
      console.log(`Department "${name}" added successfully.`);
    } catch (error) {
      console.error("Error adding department:", error);
      throw new Error("Could not add department.");
    }
  }

  // Add a new role
  static async addRole(): Promise<void> {
    try {
      const departments = await this.getDepartments();
      const { title, salary, departmentId } = await inquirer.prompt<{ title: string; salary: string; departmentId: number }>([
        {
          type: "input",
          name: "title",
          message: "Enter role title:",
          validate: (input: string) => (input.trim() ? true : "Role title cannot be empty."),
        },
        {
          type: "input", // Change from "number" to "input"
          name: "salary",
          message: "Enter role salary:",
          validate: (input: string) => {
            const num = Number(input);
            return num > 0 ? true : "Salary must be a positive number.";
          },
          filter: (input: string) => Number(input), // Convert input to number
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select department:",
          choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
        },
      ]);
      
      // Ensure `salary` is a number
      const numericSalary = Number(salary);
      

      await pool.query(insertRoleQuery(title, numericSalary, departmentId));
      console.log(`Role "${title}" added successfully.`);
    } catch (error) {
      console.error("Error adding role:", error);
      throw new Error("Could not add role.");
    }
  }

  // Add a new employee
  static async addEmployee(): Promise<void> {
    try {
      const roles = await this.getRoles();
      const employees = await this.getEmployees();

      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter employee's first name:",
          validate: (input: string) => (input.trim() ? true : "First name cannot be empty."),
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter employee's last name:",
          validate: (input: string) => (input.trim() ? true : "Last name cannot be empty."),
        },
        {
          type: "list",
          name: "roleId",
          message: "Select employee role:",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
        {
          type: "list",
          name: "managerId",
          message: "Select manager (if applicable):",
          choices: [{ name: "None", value: null }, ...employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))],
        },
      ]);

      await pool.query(insertEmployeeQuery(firstName, lastName, roleId, managerId));
      console.log(`Employee "${firstName} ${lastName}" added successfully.`);
    } catch (error) {
      console.error("Error adding employee:", error);
      throw new Error("Could not add employee.");
    }
  }

  // Update an employee's role
  static async updateEmployeeRole(): Promise<void> {
    try {
      const employees = await this.getEmployees();
      const roles = await this.getRoles();

      const { employeeId, roleId } = await inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select employee to update:",
          choices: employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        },
        {
          type: "list",
          name: "roleId",
          message: "Select new role:",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
      ]);

      await pool.query(updateEmployeeQuery(roleId, employeeId));
      console.log("Employee role updated successfully.");
    } catch (error) {
      console.error("Error updating employee role:", error);
      throw new Error("Could not update employee role.");
    }
  }
}

export default DatabaseService;
