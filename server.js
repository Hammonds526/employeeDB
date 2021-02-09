const inquirer = require('inquirer');
const { async } = require('rxjs');
const db = require('./db')
require('console.table')

function home() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices:
                [
                    'View Departments',
                    'View Employees',
                    'View Roles',
                    'Create Department',
                    'Create Employee',
                    'Create Role',
                    'Delete Department',
                    'Delete Employee',
                    'Delete Role',
                    'Update Employee Role',
                    'Done'
                ]
        }
    ]).then(answers => {
        switch (answers.options) {
            case 'View Departments':
                viewAllDepartments();
                break;
            case 'View Employees':
                viewAllEmployees();
                break;
            case 'View Roles':
                viewAllRoles();
                break;
            case 'Create Department':
                createDepartment();
                break;
            case 'Create Employee':
                createEmployee();
                break;
            case 'Create Role':
                createRole();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Done':
                console.log("See you next time!");
                break;

            default:
                console.log("No worries, this was probably the coders fault");
                break;
        }
    })

};



// ---------------------------------

async function viewAllDepartments() {
    const departments = await db.viewAllDepartments();
    console.table(departments);
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do we do next?',
            choices: [
                'Back to Home',
                'Done'
            ]
        }
    ]).then(answers => {
        switch (answers.options) {
            case 'Back to Home':
                home()
                break;
            case 'Done':
                console.log("See you next time!")
                break;
            default:
                console.log("No worries, this was probably the coders fault")
                break;
        };
    })
}
async function pizza(order) {
    const employees = await db.viewAllEmployees(order)
        console.table(employees);
        await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                case 'Done':
                    console.log("See you next time!");
                    break;
                default:
                    console.log("No worries, this was probably the coders fault");
                    break;
            }
        })
}

async function viewAllEmployees() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'order',
            choices: [
                {name: 'Last Name', value: 'last'},
                {name: 'ID', value: 'id'},
                {name: 'Manager', value: 'manager_last'},
                {name: 'Department', value: 'department_id'},
                {name: 'Role', value: 'role_id'}
                
            ]
        }
    ]).then(answers => {
        pizza(answers.order)
    })

};

async function viewAllRoles() {
    const roles = await db.viewAllRoles();
    console.table(roles);
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do we do next?',
            choices: [
                'Back to Home',
                'Done'
            ]
        }
    ]).then(answers => {
        switch (answers.options) {
            case 'Back to Home':
                home()
                break;
            case 'Done':
                console.log("See you next time!");
                break;
            default:
                console.log("No worries, this was probably the coders fault");
                break;
        }
    })
};

// ---------------------------------
async function createDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ]);

    await db.createDepartment(department);
    console.log("-----Department successfully created!-----")
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do we do next?',
            choices: [
                'Back to Home',
                'Create Another Department',
                'Done'
            ]
        }
    ]).then(answers => {
        switch (answers.options) {
            case 'Back to Home':
                home()
                break;
            case 'Create Another Department':
                createDepartment()
                break;
            case 'Done':
                console.log("See you next time!");
                break;
            default:
                console.log("No worries, this was probably the coders fault");
                break;
        }
    })

};

async function createEmployee() {
    const roles = await db.viewAllRoles();
    const employees = await db.viewAllEmployees('last');
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            async choices() {
                const choiceArray = [];
                roles.forEach(({ id, title }) => {
                    choiceArray.push(`${id}: ${title}`)
                });
                return choiceArray
            }
        },
        {
            type: 'list',
            name: 'managerID',
            message: "Who is the employee's manager?",
            async choices() {
                const choiceArray = ['No Manager'];
                employees.forEach(({ id, first, last }) => {
                    choiceArray.unshift(`${id}: ${first} ${last}`)
                });
                return choiceArray
            }
        }
    ])
        .then(async function (answers) {
            const role_id = answers.role.split(':')[0];
            if (answers.managerID === 'No Manager') {
                await db.createEmployee(answers.first_name, answers.last_name, role_id);
            }
            else {
                const manager_id = answers.managerID.split(':')[0];
                await db.createEmployee(answers.first_name, answers.last_name, role_id, manager_id);
            };
            console.log('-----Employee has been added!-----');
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'options',
                    message: 'What do we do next?',
                    choices: [
                        'Back to Home',
                        'Add Another Employee',
                        'Done'
                    ]
                }
            ]).then(answers => {
                switch (answers.options) {
                    case 'Back to Home':
                        home()
                        break;
                    case 'Add Another Employee':
                        createEmployee()
                        break;
                    case 'Done':
                        console.log("See you next time!");
                        break;
                    default:
                        console.log("No worries, this was probably the coders fault");
                        break;
                }
            })
        })

};

async function createRole() {
    const departments = await db.viewAllDepartments();
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is name of the new role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'what is the salary?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the department for new role?',
            async choices() {
                const choiceArray = [];
                departments.forEach(({ id, name }) => {
                    choiceArray.push(`${id}: ${name}`);
                });
                return choiceArray
            }
        }
    ]).then(async function (answers) {
        const id = answers.department.split(':')[0]
        await db.createRole(answers.title, answers.salary, parseInt(id));

        console.log('-----Role has been created!-----');

        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                case 'Done':
                    console.log("See you next time!");
                    break;
                default:
                    console.log("No worries, this was probably the coders fault");
                    break;
            }
        })

    })
};


// --------------------------------- 
async function deleteDepartment() {
    const departments = await db.viewAllDepartments();
    inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department is being removed?',
            async choices() {
                const choiceArray = [];
                departments.forEach(({ id, name }) => {
                    choiceArray.push(`${id}: ${name}`);
                });
                return choiceArray
            }
        }
    ]).then(async function (answers) {
        const id = answers.department.split(':')[0]
        await db.deleteDepartment(parseInt(id));
        
        console.log('-----Department has been deleted!-----');

        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                    case 'Done':
                        console.log("See you next time!");
                        break;
                        default:
                            console.log("No worries, this was probably the coders fault");
                    break;
                }
            })

        })
};

async function deleteEmployee() {
    const employees = await db.viewAllEmployees('last');
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee is being removed?',
            async choices() {
                const choiceArray = [];
                employees.forEach(({ id, first, last }) => {
                    choiceArray.push(`${id}: ${first} ${last}`);
                });
                return choiceArray
            }
        }
    ]).then(async function (answers) {
        const id = answers.employee.split(':')[0]
        await db.deleteEmployee(parseInt(id));
        
        console.log('-----Employee has been deleted!-----');

        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                    case 'Done':
                        console.log("See you next time!");
                        break;
                        default:
                            console.log("No worries, this was probably the coders fault");
                    break;
                }
            })

        })
};

async function deleteRole() {
    const roles = await db.viewAllRoles();
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which role is being removed?',
            async choices() {
                const choiceArray = [];
                roles.forEach(({ id, title }) => {
                    choiceArray.push(`${id}: ${title}`);
                });
                return choiceArray
            }
        }
    ]).then(async function (answers) {
        const id = answers.role.split(':')[0]
        await db.deleteRole(parseInt(id));
        
        console.log('-----Role has been deleted!-----');

        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                    case 'Done':
                        console.log("See you next time!");
                        break;
                        default:
                            console.log("No worries, this was probably the coders fault");
                    break;
                }
            })

        })
};

// --------------------------------- 
async function updateEmployee() {
    const roles = await db.viewAllRoles();
    const employees = await db.viewAllEmployees();
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Who is the employee we are updating?',
            async choices() {
                const choiceArray = [];
                employees.forEach(({ id, first, last }) => {
                    choiceArray.push(`${id}: ${first} ${last}`)
                });
                return choiceArray
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their new role?',
            async choices() {
                const choiceArray = [];
                roles.forEach(({ id, title }) => {
                    choiceArray.push(`${id}: ${title}`)
                });
                return choiceArray
            }
        }
    ]).then(async function (answers) {
        const role_id = answers.role.split(':')[0];
        const id = answers.employee.split(':')[0];
        await db.updateEmployee(parseInt(role_id), parseInt(id))

        console.log('-----Employee has been updated!-----');

        inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do we do next?',
                choices: [
                    'Back to Home',
                    'Done'
                ]
            }
        ]).then(answers => {
            switch (answers.options) {
                case 'Back to Home':
                    home()
                    break;
                case 'Done':
                    console.log("See you next time!");
                    break;
                default:
                    console.log("No worries, this was probably the coders fault");
                    break;
            }
        })

    })
};

home()

