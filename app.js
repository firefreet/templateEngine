const $ = require('jquery')
const jsdom = require('jsdom')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const questions = require('./lib/questions')
const inquirer = require('inquirer')
const personArray = []

function createPerson(answers) {
    const {name,email,id,role,school,officeNumber, gitName} = answers
    var newPerson
    switch (role) {
        case 'Intern': newPerson = new Intern(name,id,email,school);
        break;
        case 'Manager': newPerson = new Manager(name,id,email,officeNumber)
        break;
        case 'Engineer': newPerson =  new Engineer(name,id,email,gitName)
        break;
    }
    personArray.push(newPerson)

    return newPerson  
}
function getInfo() {
    inquirer
        .prompt(questions)
        .then(createPerson)
}
getInfo()
module.exports = {createPerson, personArray}