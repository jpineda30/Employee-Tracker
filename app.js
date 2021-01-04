var inquirer = require("inquirer");
var mysql = require("mysql");



var menu = [
    
    {
        
    type: 'rawlist',
    name: 'type',
    message: 'Select an option',
    choices: [

       new inquirer.Separator('-------Menu-------'),
       new inquirer.Separator(' '),
       {name:"Add Department"},
       {name:"Add Role"},
       {name:"Add Employee"},
       {name:"Update Employee Role"},
       new inquirer.Separator(' '),
       {name:"View Departments"},
       {name:"View Roles"},
       {name:"View Employees"},
      
    ],
  }
];


//Add departments, roles, employees

function addDepartment(){};

function addRole(){};

function addEmployee(){};

function updateEmployeeRole(){};

//View departments, roles, employees

function viewDepartments(){};

function viewRoles(){};

function viewEmployees(){};

//Update employee roles