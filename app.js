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
       {name:"Update employee manager"},
       {name:"View employees by manager"},
       {name:"View Departments"},
       {name:"View Roles"},
       {name:"View Employees"},
       {name:"View budget by department"},
       {name:"Delete Department"},
       {name:"Delete Role"},
       {name:"Delete Employee"},
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
            var option = {name:key.title,value:key.id}
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
            var option = {name:key.first_name + " "+ key.last_name,value:key.id}
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
                    var option = {name:key.title,value:key.id}
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

function updateEmployeeManager(){
    
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);

        var optionsList = list.map(function(key){
            let option = {name:key.first_name + " "+ key.last_name,value:key.id}
            return option;

        })
        
       
        let filtered = list.filter((key)=>{
            if(key.role_id == "1") 
            {return key;}
        });
        var managerList = filtered.map(key=>{
            
            if(key.role_id == "1")
            {
                let optionManager = {name:key.first_name + " "+ key.last_name,value:key.id}
                return optionManager;
    
             
            }
           
            
        });

 

        let menu = [
            {
                type:"list",
                name: "employee",
                choices: optionsList,
                message:"Select the employee to update"
            }
    
        ];
    
        inquirer.prompt(menu).then((response)=>{
                      
    
            let selected = response.employee;
    
            let menuManagers = [
                {
                    type:"list",
                    name: "Manager",
                    choices: managerList,
                    message:"Select the new manager"
                }
        
            ];
            inquirer.prompt(menuManagers).then((response)=>{
                let query = "update employee set manager_id ="+response.Manager+" where id="+ selected;
                connection.query(query,(err, res)=>{
                    if(err) throw err
                    console.log("Success");
                    runApp();
                });
            });
    
            
            
    
        });

    })
    

   
};

//View departments, roles, employees

function viewDepartments(){

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        
        runApp();
      });
    

};

function getDepartments(){
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.title,value:key.id}
            return option;

        })

        return optionsList;
    })
};

function getRoles(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.title,value:key.id}
            return option;

        })

        return optionsList;
    })
};

function getEmployees(){

     connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.title,value:key.id}
            return option;

        })

        return optionsList;
    })
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

function viewByManager(){

    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);

        var optionsList = list.map(function(key){
            let option = {name:key.first_name + " "+ key.last_name,value:key.id}
            return option;

        })
        
       
        let filtered = list.filter((key)=>{
            if(key.role_id == "1") 
            {return key;}
        });

        var managerList = filtered.map(key=>{
            
            if(key.role_id == "1")
            {
                let optionManager = {name:key.first_name + " "+ key.last_name,value:key.id}
                return optionManager;
    
             
            }
           
            
        });

 

        let menu = [
            {
                type:"list",
                name: "employee",
                choices: managerList,
                message:"Select the manager to view employees"
            }
    
        ];
    
        inquirer.prompt(menu).then((response)=>{
                      
    
            let selected = response.employee;
            let query = "get * from employee where manager_id ="+selected;
            
            connection.query(query,(err, res)=>{
                if(err) throw err
                console.table(res);
                runApp();
            });
           
            
            
            
    
        });

    })
}

function getBudget(){

    let query ='SELECT *, SUM(salary) AS budget FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id group by name;';
    connection.query(query, function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);

        var budget = list.map(function(key){
            let department = {name:key.name,budget:key.budget}
            return department;

        })

        console.table(budget);
        
    }) 
        
}

//delete functions

function deleteDepartment(){

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.name,value:key.id}
            return option;

        })
        

        let menu = [

            {
                type:"list",
                name:"department",
                choices: optionsList,
                message:"Select the department to delete"
            }
        ];
        
        inquirer.prompt(menu).then((response)=>{
            let query = "delete from department where id ="+response.department;
            connection.query(query,(err,res)=>{
                console.log("Succesfull delete");
                runApp();
            });
        });
    })

};

function deleteEmployee(){

    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.first_name + " "+key.last_name,value:key.id}
            return option;

        })
        

        let menu = [

            {
                type:"list",
                name:"employee",
                choices: optionsList,
                message:"Select the employee to delete"
            }
        ];
        
        inquirer.prompt(menu).then((response)=>{
            let query = "delete from employee where id ="+response.employee;
            connection.query(query,(err,res)=>{
                console.log("Succesfull delete");
                runApp();
            });
        });
    })

};

function deleteRole(){

    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        let parsed = JSON.stringify(res);
        let list = JSON.parse(parsed);
        let optionsList = list.map(function(key){
            var option = {name:key.title,value:key.id}
            return option;

        })
        

        let menu = [

            {
                type:"list",
                name:"role",
                choices: optionsList,
                message:"Select the role to delete"
            }
        ];
        
        inquirer.prompt(menu).then((response)=>{
            let query = "delete from role where id ="+response.role;
            connection.query(query,(err,res)=>{
                console.log("Succesfull delete");
                runApp();
            });
        });
    })

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
            case "View employees by manager":
                viewByManager();
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
            case "Update employee manager":
                    updateEmployeeManager();
                break;  
            case "Delete Department":
                    deleteDepartment();
                break;      
            case "Delete Employee":
                    deleteEmployee();
                break; 
            case "Delete Role":
                    deleteRole();
                break; 
            case "View budget by department":
                    getBudget();
                break; 
                        
            default:
                console.log(response.type);
            

        }
           

    });
}

startConection();
runApp();