import inquirer from 'inquirer';
import DatabaseService from './index.js';
async function showMenu() {
    console.log('\nWelcome\n');
    while (true) {
        try {
            const { action } = await inquirer.prompt([
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
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
}
async function handleUserSelection(action) {
    try {
        switch (action) {
            case 'View all departments':
                console.table(await DatabaseService.getDepartments());
                break;
            case 'View all roles':
                console.table(await DatabaseService.getRoles());
                break;
            case 'View all employees':
                console.table(await DatabaseService.getEmployees());
                break;
            case 'Add a department': {
                await DatabaseService.addDepartment();
                break;
            }
            case 'Add a role': {
                await DatabaseService.addRole();
                break;
            }
            case 'Add an employee': {
                await DatabaseService.addEmployee();
                break;
            }
            case 'Update an employee role': {
                await DatabaseService.updateEmployeeRole();
                break;
            }
            default:
                console.log('Invalid option, please try again.');
        }
    }
    catch (error) {
        console.error('Error processing request:', error.message);
    }
}
showMenu();
