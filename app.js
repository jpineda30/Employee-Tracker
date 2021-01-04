var inquirer = require("inquirer");
var mysql = require("mysql");

//conection

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Sonata00",
    database: "employee_trackerDB"
  
  });

function startConection(){
    connection.connect(function(err) {
        if (err) throw err;
        
        
      });
}  

  



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

function viewDepartments(){

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        
        runApp();
      });
    

};

function viewRoles(){

   connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
       
        runApp();
      });
  
};

function viewEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        
        runApp();
      });
    
};

function exit(){
    connection.end();
}

//Update employee roles

//main function

function runApp(){
    

    inquirer.prompt(menu).then(function(response){

        switch(response.type){

            case "View Departments":
                viewDepartments();
                break;
            case "View Employees":
                    viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                
                
                
                break;    
            default:
                console.log(response.type);
            

        }
           

    });
}

startConection();
runApp();