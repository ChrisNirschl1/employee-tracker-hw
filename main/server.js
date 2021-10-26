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

  start= () =>{
      inquirer.prompt([
          {
              type: 'list',
              name: 'starter',
              message: 'What would you like to do?',
              choices: ['view all departments', 'view all roles', 'view all employees','add a department', 'add a role', 'add an employee', 'update an employee role']
          }
      ]).then(data =>{
          if(data.choice === 'view all departments'){
              db.query('SELECT * FROM department', (err, data) =>{
              if (err){
                  throw err;
              } else{
                  viewDepartments();
                  console.table("All departments", data);

              }
            });
          } else if (data.choice === 'view all roles'){
            db.query('SELECT * FROM roles', (err, data) =>{
                if (err){
                    throw err;
                } else {
                    console.table("All Roles", data)
                }

            });
          }
      })


  }

  start();

//   viewDepartments= () =>{
//       db.query ('SELECT * FROM department' );
//       console.table( db.query ('SELECT * FROM department' ));
//   }

//   app.listen( PORT,()=>{
//     console.log("listenin to port "+ PORT)
// })