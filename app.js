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
    connection.query('select * from department',(err, results) => {
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

function addEmployee(){
    //get all roles
    connection.query('select * from role',(err,res)=>{
        if (err) throw err;
        let parsedRes = JSON.stringify(res); 
        let roles = JSON.parse(parsedRes);
        

        let roleList = roles.map(function(key){
            var option = {name:key.name,value:key.id}
            return option;
        });

        //get managers 
        connection.query('select * from employee where role_id = 1',(err,res)=>{
            if (err) throw err;
            let parsedRes = JSON.stringify(res); 
            let managers = JSON.parse(parsedRes);
            
    
            let managerList = managers.map(function(key){
                var option = {name:key.first_name + " "+key.last_name,value:key.id}
                return option;
            });
            
            let employeeAdd = [
                {
                        
                    type: 'input',
                    name: 'first_name',
                    message: 'Insert the first name of the employee'
        
                },
                {
                        
                    type: 'input',
                    name: 'last_name',
                    message: 'Insert the last name of the employee'
        
                },
                {
                        
                    type: 'list',
                    name: 'role',
                    choices : roleList,
                    message: 'Select the role of the employee'
        
                },
                {
                        
                    type: 'list',
                    name: 'manager',
                    choices : managerList,
                    message: 'Select the manager of the employee'
        
                }
            ];

            inquirer.prompt(employeeAdd).then(function(response){
                
                let query = connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      
                      first_name: response.first_name,   
                      last_name:response.last_name,
                      role_id:response.role,
                      manager_id:response.manager            
                    },
                    function(err, res) {
                      if (err) throw err;
                      runApp();
                    }
                  );

            });
            
           
        });
    });
    
};

function updateEmployeeRole(){

    connection.query("select * from employee",(err,res)=>{
        if(err) throw err
        let resParsed = JSON.stringify(res);
        let listEmployee = JSON.parse(resParsed);
        
        let optionsEmp = listEmployee.map(function(key){
            var option = {name:key.name,value:key.id}
            return option;

        });

        let employeeSelect = [
            {
                type:"list",
                name: "employee",
                choices: optionsEmp,
                message: "Select the employee you want to update"
            }
        ];

        inquirer.prompt(employeeSelect).then(function(response){

            let empQquery = 'select * from employee where id =' + response.employee;
            console.log(empQquery);
            let selectedEmployee = response.employee;
            connection.query("select * from role",(err,res)=>{
                if(err) throw err

                let parsedRes = JSON.stringify(res); 
                let roles = JSON.parse(parsedRes);

                let roleList = roles.map(function(key){
                    var option = {name:key.name,value:key.id}
                    return option;
                });

                let optionsUpdate = [
                    {
                        type:"list",
                        name:"role",
                        choices: roleList,
                        message: "Select the new role for the employee"

                    }
                ];
                
                inquirer.prompt(optionsUpdate).then(function(response){
                    let queryUpdate = "update employee set role_id = "+ response.role +" where id = " + selectedEmployee;
                    connection.query(queryUpdate,(err,res)=>{
                        if(err) throw err
                        console.log("employee updated");
                        runApp();
                    });
                });

            });
            /*connection.query(empQquery,(err,res)=>{
                if(err) throw err
                let resParsed = JSON.stringify(res);
                let resultEmployee = JSON.parse(resParsed);
    
                if(resultEmployee.length = 0)
                {console.log("The employee id doesnt exist");}
                else
                {}
            });*/
    
        });

    });

   

    
};

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
            case "Add Employee":
                addEmployee();
                break;   
            case "Update Employee Role":
                    updateEmployeeRole();
                break;     
            default:
                console.log(response.type);
            

        }
           

    });
}

startConection();
runApp();