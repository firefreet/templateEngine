const { JSDOM } = require('jsdom')
const { promisify } = require('util')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const questions = require('./lib/questions')
const inquirer = require('inquirer')
const personArray = []
const readFilePromise = promisify(fs.readFile)
var dom
var $ = null;

function createDOM(fileString) {
    // create a Document Object Model type object
    dom = new JSDOM(fileString);
    // pass the DOM object into the jquery module and set as the normal $ variable
    $ = require("jquery")(dom.window);
    return [dom,$]
}

function createPerson(answers) {
    const { name, email, id, role, school, officeNumber, gitName } = answers
    var newPerson
    switch (role) {
        case 'Intern': newPerson = new Intern(name, id, email, school);
            break;
        case 'Manager': newPerson = new Manager(name, id, email, officeNumber)
            break;
        case 'Engineer': newPerson = new Engineer(name, id, email, gitName)
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
async function readFile() {
    return await readFilePromise("./assets/template.html","utf8")
        .then(createDOM)
        
}

readFile()
getInfo()

module.exports = {
    createPerson,
    personArray,
    readFile,
    readFilePromise
}