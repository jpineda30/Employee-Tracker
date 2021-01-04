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

function addDepartment(){

    let departmentAdd = [
        {
                
            type: 'input',
            name: 'name',
            message: 'Insert the name of the department'

        }
    ];

    inquirer.prompt(departmentAdd).then(function(response){

        let query = connection.query(
            "INSERT INTO department SET ?",
            {
              name: response.name              
            },
            function(err, res) {
              if (err) throw err;
              runApp();
            }
          );

    });

};

function addRole(){
    let departments = connection.query('select * from department',(err, results) => {
        if (err) throw err;
        let alldeps = JSON.stringify(results);
        var options = JSON.parse(alldeps);
        
       
        

         let newOptions = options.map(function(key){
            var option = {name:key.name,value:key.id}
            return option;
        });
        console.log(newOptions);

        let roleAdd = [
            {
                    
                type: 'input',
                name: 'name',
                message: 'Insert the name of the role'
    
            },
            {
                    
                type: 'input',
                name: 'title',
                message: 'Insert the title of the role'
    
            },
            {
                    
                type: 'input',
                name: 'salary',
                message: 'Insert the salary for the role'
    
            },
            {
                    
                type: 'list',
                name: 'department',
                choices : newOptions,
                message: 'Insert the name of the department'
    
            }
        ];
        
        inquirer.prompt(roleAdd).then(function(response){
            let query = connection.query(
                "INSERT INTO role SET ?",
                {
                  name: response.name,
                  title: response.title,   
                  salary:response.salary,
                  department_id:response.department         
                },
                function(err, res) {
                  if (err) throw err;
                  runApp();
                }
              );
        });
        
    });

    
};

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
            case "Add Department":
                addDepartment();
                break; 
            case "Add Role":
                addRole();
                break;       
            default:
                console.log(response.type);
            

        }
           

    });
}

startConection();
runApp();