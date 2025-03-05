
import inquirer from 'inquirer';
import DatabaseService from './index.js'; 


interface DepartmentInput {
  deptName: string;
}

interface RoleInput {
  roleName: string;
  roleSalary: number;
  roleDept: number;
}

interface EmployeeInput {
  empName: string;
  empRole: number;
  empManager?: number;
}

interface UpdateEmployeeInput {
  empId: number;
  newRoleId: number;
}

const dbService = new DatabaseService();

async function showMenu(): Promise<void> {
  console.log('\nWelcome to teamDepo!\n');

  while (true) {
    try {
      const { action }: { action: string } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Choose an option:',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ]);

      if (action === 'Exit') {
        console.log('Closing the CMS. Goodbye!');
        process.exit(0);
      }

      await handleUserSelection(action);
    } catch (error) {
      console.error('An error occurred:', (error as Error).message);
    }
  }
}

async function handleUserSelection(action: string): Promise<void> {
  try {
    switch (action) {
      case 'View all departments':
        console.table(await dbService.getDepartments());
        break;

      case 'View all roles':
        console.table(await dbService.getRoles());
        break;

      case 'View all employees':
        console.table(await dbService.getEmployees());
        break;

      case 'Add a department': {
        const { deptName }: DepartmentInput = await inquirer.prompt([
          { type: 'input', name: 'deptName', message: 'Enter new department name:' },
        ]);
        console.log('Added Department:', await dbService.addDepartment(deptName));
        break;
      }

      case 'Add a role': {
        const { roleName, roleSalary, roleDept }: RoleInput = await inquirer.prompt([
          { type: 'input', name: 'roleName', message: 'Enter role name:' },
          { type: 'number', name: 'roleSalary', message: 'Enter role salary:' },
          { type: 'number', name: 'roleDept', message: 'Enter department ID:' },
        ]);
        console.log('Added Role:', await dbService.addRole(roleName, roleSalary, roleDept));
        break;
      }

      case 'Add an employee': {
        const { empName, empRole, empManager }: EmployeeInput = await inquirer.prompt([
          { type: 'input', name: 'empName', message: 'Enter employee name:' },
          { type: 'number', name: 'empRole', message: 'Enter role ID:' },
          { type: 'number', name: 'empManager', message: 'Enter manager ID (or leave blank):', default: null },
        ]);
        console.log('Added Employee:', await dbService.addEmployee(empName, empRole, empManager));
        break;
      }

      case 'Update an employee role': {
        const { empId, newRoleId }: UpdateEmployeeInput = await inquirer.prompt([
          { type: 'number', name: 'empId', message: 'Enter employee ID:' },
          { type: 'number', name: 'newRoleId', message: 'Enter new role ID:' },
        ]);
        console.log('Updated Employee:', await dbService.updateEmployeeRole(empId, newRoleId));
        break;
      }

      default:
        console.log('Invalid option, please try again.');
    }
  } catch (error) {
    console.error('Error processing request:', (error as Error).message);
  }
}

showMenu();
