
const inquirer = require('inquirer');
const mysql = require('mysql2');
const figlet = require('figlet');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tc31415926.",
    database: "employeeTracker_db"
});

db.connect(function(err) {
    if (err) throw err
    console.log("MySQL Successfully Connected")
    startPrompt();
});


figlet("EMPLOYEE  TRACKER", function(err, res) {
    if (err) {
        console.log('Something Went Wrong, Please Try Again');
        console.dir(err);
        return;
    }
    console.log(res)
});


const startPrompt = () => {
    return inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add a Employee", "Update a Employee Role"]
    }]).then(function(val) {
        switch (val.action) {
            case "View All Departments":
                console.log(val.action);
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "View All Employees":
                viewAllEmployees();
                break;

            case "Add a Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add a Employee":
                addEmployee();
                break;

            case "Update a Employee Role":
                updateEmployee();
        }
    });
}


const viewAllDepartments = () => {
    figlet("ALL  DEPARTMENTS", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT * FROM departments`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};


const viewAllRoles = () => {
    figlet("ALL  ROLES", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT roles.id, roles.title, roles.salary FROM roles`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

const viewAllEmployees = () => {
    figlet("ALL  EMPLOYEES", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT employees.id, employees.first_name, employees.last_name, departments.name, roles.title, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};


const addDepartment = () => {
    figlet("ADD a DEPARTMENT", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    inquirer.prompt([{
        name: "Name",
        type: "input",
        message: "What department would you like to add?"
    }]).then(function(res) {
        const query = "INSERT INTO departments SET ?";
        db.query(
            query, {
                name: res.Name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
};

// selectRole function used in add/update employee prompt 
let roleArr = [];
const selectRole = () => {
    const query = "SELECT * FROM roles";
    db.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

let managersArr = [];
const selectManager = () => {
    const query = `SELECT first_name, last_name FROM employees WHERE manager_id IS NULL`;
    db.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
};


const addRole = () => {
    figlet("ADD a ROLE", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT roles.title, roles.salary FROM roles`;
    db.query(query, function(err, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(function(res) {
            db.query(
                "INSERT INTO roles SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
};


const addEmployee = () => {
    figlet("ADD a EMPLOYEE", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "Please enter employee's first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter employee's last name"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee' role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Who is the employee's manager?",
            choices: selectManager()
        }
    ]).then(function(val) {
        const roleId = selectRole().indexOf(val.role) + 1;
        const managerId = selectManager().indexOf(val.choice) + 1;
        db.query("INSERT INTO employees SET ?", {
            first_name: val.first_name,
            last_name: val.last_name,
            manager_id: managerId,
            role_id: roleId
        }, function(err) {
            if (err) throw err
            console.table(val)
            startPrompt()
        })
    })
};


const updateEmployee = () => {
    figlet("UPDATE a EMPLOYEE", function(err, res) {
        if (err) {
            console.log('Something Went Wrong, Please Try Again');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    const query = `SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id`;
    db.query(query, function(err, res) {
        if (err) throw err
        inquirer.prompt([{
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    let lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employee's new title?",
                choices: selectRole()
            },
        ]).then(function(val) {
            let roleId = selectRole().indexOf(val.role) + 1;
            db.query("UPDATE employees SET ? WHERE ?", [{
                    last_name: val.lastName,

                }, {
                    role_id: roleId

                }],
                function(err) {
                    if (err) throw err
                    console.table(val)
                    startPrompt()
                })
        });
    });
};