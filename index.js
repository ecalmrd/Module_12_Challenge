const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: '',
        database: 'employee_db'
    },
    console.log(`connected to employee tracker`)
);

async function viewDepartments() {
    const results = await db.promise().query("SELECT * FROM departments;")
    if (results) {
        console.table(results[0]);
    }
}

async function viewRoles() {
    const roles = await db.promise().query("SELECT * FROM roles;")
    if (roles) {
        console.table(roles[0]);
    }
}

async function addDepartment() {
    const newDepartment = await db.promise().query("SELECT * FROM departments;")
    const addedDepartment = newDepartment[0].map(({ name }) => ({ name: name }))
    console.log(addedDepartment)
    const data = await inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'addDepartment',
        },
    )

    if (data) {
        const res = db.promise().query(`INSERT INTO departments (name) VALUES ("${data.addDepartment}");`);
        console.log("success", res);
        const results = await db.promise().query("SELECT * FROM departments;")
        if (results) {
            console.table(results[0]);
        }
    }
}

async function addRole() {
    const roles = await db.promise().query("SELECT * FROM departments;")
    const departmentList = roles[0].map(({ id, name }) => ({ name: name, value: id }))

    const data = await inquirer.prompt([{
        type: "input",
        message: "What is the name of this role?",
        name: "role",
    },

    {
        type: 'list',
        message: 'What is the salary of the role?',
        name: 'roleSalary',
        choices: [
            "100000",
            "150000",
            "200000",
            "250000",
        ],
    },

    {
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'roledepartment',
        choices: departmentList,
    },

    ])

    if (data) {
        const res = db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.role}", ${data.roleSalary}, ${data.roledepartment});`);
        console.log("success", res);
        const results = await db.promise().query("SELECT * FROM roles;")
        if (results) {
            console.table(results[0]);
        }
    }
}

async function addEmployee() {
    const roles = await db.promise().query("SELECT * FROM roles;")
    const roleList = roles[0].map(({ id, title }) => ({ name: title, value: id }))

    const data = await inquirer.prompt([{
        type: 'input',
        message: "What is the employee's first name?",
        name: 'employeeFirstName',
    },

    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'employeeLastName',
    },

    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'employeeRole',
        choices: roleList,
    },

    {
        type: 'input',
        message: "What is the employee's manager?",
        name: 'employeeManager',
    },
    ])

    if (data) {
        const res = db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.employeeFirstName}", "${data.employeeLastName}", ${data.employeeRole}, ${data.employeeManager});`);
        console.log("success", res);
        const results = await db.promise().query("SELECT * FROM employees;")
        if (results) {
            console.table(results[0]);
        }
    }
}

async function viewEmployees() {
    const results = await db.promise().query("SELECT * FROM employees;")
    if (results) {
        console.table(results[0]);
    }
}

async function updateEmployee() {
    const employees = await db.promise().query("SELECT * FROM employees;")
    const employeeList = employees[0].map(({ id, first_name, last_name }) => ({ name: first_name, last_name, value: id }))
    console.log(employeeList)

    const roles = await db.promise().query("SELECT * FROM roles;")
    const roleList = roles[0].map(({ id, title }) => ({ name: title, value: id }))

    const data = await inquirer.prompt([{
        type: 'list',
        message: "Which employee do you want to update?",
        name: 'employee',
        choices: employeeList,
    },

    {
        type: 'list',
        message: "What role would you like to update this employee to",
        name: 'updateEmployeeRole',
        choices: roleList,
    }

    ])

    if (data) {
        const res = db.promise().query(`UPDATE employees SET role_id = ${data.employee} WHERE id = ${data.updateEmployeeRole};`);
        console.log("success", res);
    }
}

async function menu() {
    const results = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'manageDepartment',
                choices: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Departments",
                    "View All Employees",
                    "View All Roles",
                ],
            },

        ]);

    if (results.manageDepartment === "Add Department") {
        addDepartment()

    } if (results.manageDepartment === "View All Departments") {
        viewDepartments()

    } if (results.manageDepartment === "Add Role") {
        addRole()

    } if (results.manageDepartment === "View All Roles") {
        viewRoles()

    } if (results.manageDepartment === "Add Employee") {
        addEmployee()

    } if (results.manageDepartment === "View All Employees") {
        viewEmployees()

    } if (results.manageDepartment === "Update Employee Role") {
        updateEmployee()
    }
}

menu()
