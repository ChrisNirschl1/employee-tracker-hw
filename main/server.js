const inquirer = require("inquirer");
const mysql = require("mysql2");
 require('console.table');

// const PORT = process.env.PORT || 3009;

// app.use(express.urlencoded({extended:true}))
// app.use(express.json())

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'workplace_db'
    },
    console.log(`Connected to the workplace_db database.`)
  );
//start the prompt, became a giant if statment 
  start= () =>{
      inquirer.prompt([
          {
              type: 'list',
              name: 'starter',
              message: 'What would you like to do?',
              choices: ['view all departments', 'view all roles', 'view all employees','add a department', 'add a role', 'add an employee', 'update an employee role', 'Done']
          }
      ]).then(data =>{
          //view the departments
          if(data.starter === 'view all departments'){
              db.query('SELECT * FROM department;', (err, data) =>{
              if (err){
                  throw err;
              } else{
                  console.table("All department", data);
                  start();

              }
            });
            //view the roles
          } else if (data.starter === 'view all roles'){
            db.query('SELECT * FROM role;', (err, data) =>{
                if (err){
                    throw err;
                } else {
                    console.table("All Roles", data)
                    start();
                }

            });
            //view the employees
          }else if (data.starter === 'view all employees'){
            db.query('SELECT * FROM employee;', (err, data) =>{
                if (err){
                    throw err;
                } else {
                    console.table("All Roles", data)
                    start();
                }

            });
            //add a department
        } else if (data.starter === 'add a department'){
            inquirer.prompt([
                {
                name: "name",
                type: "iput",
                message: "New department?"
                },
            ]).then((answer) =>{
                db.query('INSERT INTO department VALUES (?,?);', [null, answer.name], (err,data) =>{
                    if(err){
                        throw err;
                    } else {
                        console.table("All Departments", data);
                        start();
                    };
                });
            });
            //add a new role
        }else if (data.starter === 'add a role'){
            inquirer.prompt([
                {
                name: "title",
                type: "iput",
                message: "New role title?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "salary for role?"
                },
                {
                    name: "departmentID",
                    type: "input",
                    message: "Department ID for role"
                },
            ]).then((answers) =>{
                db.query('INSERT INTO role VALUES (?,?,?,?);', [null, answers.title, answers.salary, answers.departmentID], (err,data) =>{
                    if(err){
                        throw err;
                    } else {
                        console.table("All Roles", data);
                        start();
                    };
                });
            });
            //add an employee
        }else if (data.starter === 'add an employee'){
            inquirer.prompt([
                {
                name: "firstname",
                type: "iput",
                message: "Employee first name?"
                },
                {
                    name: "lastname",
                    type: "iput",
                    message: "Employee last name?"
                    },
                    {
                        name: "roleid",
                        type: "iput",
                        message: "Employee role id?"
                        },
                        {
                            name: "managerid",
                            type: "iput",
                            message: "Employee manager id?"
                            },
            ]).then((results) =>{
                db.query('INSERT INTO employee VALUES (?,?,?,?,?)', [null, results.firstname, results.lastname, results.roleid, results.managerid], (err,data) =>{
                    if(err){
                        throw err;
                    } else {
                        console.table("All Employees", data);
                        start();
                    };
                });
            });
        }
      })


  }

  start();




//   app.listen( PORT,()=>{
//     console.log("listenin to port "+ PORT)
// })