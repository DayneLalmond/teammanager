const inquirer = require('inquirer');
const jest = require('jest');
const chalk = require('chalk');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const employeeArray = []

const HTML = (employeeArray) => {
  var employeeHtml = "";
  for (i = 0; i < employeeArray.length; i++) {
    if (employeeArray[i].getRole() === 'Manager') {
      employeeHtml = employeeHtml + `
      <div class="card myCard">
            <div class="card-content">
              <div class="content">
                <h2>${employeeArray[i].getRole()}</h2>
                <h3>${employeeArray[i].getName()}</h3>
                <a class="tooltip" href="#"><i class="material-icons">person</i><span class="tooltiptext">${employeeArray[i].getId()}</span></a>
                <a href="mailto:${employeeArray[i].getEmail()}" class="tooltip"><i class="material-icons">mail</i><span class="tooltiptext">${employeeArray[i].getEmail()}</span></a>
                <a class="tooltip" href="#"><i class="material-icons">call</i><span class="tooltiptext">${employeeArray[i].getOfficeNumber()}</span></a>
              </div>
            </div>
          </div>
          `
    } else if (employeeArray[i].getRole() === 'Engineer') {
      employeeHtml = employeeHtml + `
      <div class="card myCard">
            <div class="card-content">
              <div class="content">
                <h2>${employeeArray[i].getRole()}</h2>
                <h3>${employeeArray[i].getName()}</h3>
                <a class="tooltip" href="#"><i class="material-icons">person</i><span class="tooltiptext">${employeeArray[i].getId()}</span></a>
                <a href="mailto:${employeeArray[i].getEmail()}" class="tooltip"><i class="material-icons">mail</i><span class="tooltiptext">${employeeArray[i].getEmail()}</span></a>
                <a class="tooltip" href="#"><i class="material-icons">share</i><span class="tooltiptext">${employeeArray[i].getgitHub()}</span></a>
              </div>
            </div>
          </div>
          `



    } else if (employeeArray[i].getRole() === 'Intern') {
      employeeHtml = employeeHtml + `
      <div class="card myCard">
            <div class="card-content">
              <div class="content">
                <h2>${employeeArray[i].getRole()}</h2>
                <h3>${employeeArray[i].getName()}</h3>
                <a class="tooltip" href="#"><i class="material-icons">person</i><span class="tooltiptext">${employeeArray[i].getId()}</span></a>
                <a href="mailto:${employeeArray[i].getEmail()}" class="tooltip"><i class="material-icons">mail</i><span class="tooltiptext">${employeeArray[i].getEmail()}</span></a>
                <a class="tooltip" href="#"><i class="material-icons">history_edu</i><span class="tooltiptext">${employeeArray[i].getSchool()}</span></a>
              </div>
            </div>
          </div>
          `
    }
  };


  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="./assets/images/favicon.ico" rel="icon" type="image/favicon">
        <link rel="stylesheet" href="./assets/style.css">
        <title>Team Members</title>
    </head>
    <body>
      <section>
        <h1><i class="material-icons">segment</i>Team Members<i class="material-icons">notes</i></h1>
        ${employeeHtml}
      </section>
    </body>
    </html>`
}

inquirer.prompt([
  {
    type: "input",
    message: chalk.inverse('\nWhat is your username?\n'),
    name: "username",
  }, {
    type: "input",
    message: chalk.inverse('\nWhat is your email?\n'),
    name: "email",
  }, {
    type: "input",
    message: chalk.inverse('\nWhat is your employee ID?\n'),
    name: "employeeId",
  }, {
    type: "input",
    message: chalk.inverse('\nWhat is your office number?\n'),
    name: "officeNumber",
  }])

  .then(answers => {
    const manager = new Manager(answers.username, answers.employeeId, answers.email, answers.officeNumber)
    employeeArray.push(manager)
    check()
  });


function check() {
  inquirer.prompt({ 
    type: "list",
    message: chalk.inverse('\nWho is employeed?\n'), 
    name: "choice", 
    choices: ["Add Engineer", "Add Intern", "Finish"]
  })
    .then(answers => {
      if (answers.choice === "Add Engineer") {
        inquirer.prompt([
          {
            type: "input",
            message: chalk.inverse('\nWhat is your username?\n'),
            name: "username",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your email?\n'),
            name: "email",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your employee ID?\n'),
            name: "employeeId",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your github?\n'),
            name: "github",
          }]).then(answers => {
            const engineer = new Engineer(answers.username, answers.employeeId, answers.email, answers.github)
            employeeArray.push(engineer)
            check()
          })
      } else if (answers.choice === "Add Intern") {
        inquirer.prompt([
          {
            type: "input",
            message: chalk.inverse('\nWhat is your username?\n'),
            name: "username",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your email?\n'),
            name: "email",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your employee ID?\n'),
            name: "employeeId",
          }, {
            type: "input",
            message: chalk.inverse('\nWhat is your school?\n'),
            name: "school",
          }]).then(answers => {
            const intern = new Intern(answers.username, answers.employeeId, answers.email, answers.school)
            employeeArray.push(intern)
            check()
          })
      } else if (answers.choice === "Finish") {
        const genHtml = HTML(employeeArray)
        console.log(genHtml)

        fs.writeFile("index.html", genHtml, (err) =>
          err ? console.log(err) : console.log("File Created"))
      }

    })
}