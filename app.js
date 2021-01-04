var inquirer = require("inquirer");
var mysql = require("mysql");



var menu = [
    
    {
        
    type: 'rawlist',
    name: 'type',
    message: '-------Menu-------',
    choices: [

       new inquirer.Separator(' '),
       {name:"Add Department"},
       {name:"Add Role"},
       {name:"Add Employee"},
       {name:"Update Employee Role"},
       new inquirer.Separator(' '),
       {name:"View Departments"},
       {name:"View Roles"},
       {name:"View Employees"},
       {name:"Exit"}
      
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

//main function

function runApp(){

    inquirer.prompt(menu).then(function(response){

        console.log(response);

    });
}

runApp();