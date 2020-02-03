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
var htmlString
function createDOM(fileString) {
    // create a Document Object Model type object
    dom = new JSDOM(fileString);
    // pass the DOM object into the jquery module and set as the normal $ variable
    $ = require("jquery")(dom.window);
    return [dom, $]
}

function createPerson(answers) {
    const { name, email, id, role, school, officeNumber, gitName, anotherPerson } = answers
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
    if (anotherPerson) {
        runApp()
        return anotherPerson
    }
    else { return newPerson }
}

function modifyDOM(result) {
    if (result === true) { return false }
    var containerEl = $(".container-slot")
    var containerElTemplate = containerEl.clone()
    containerElTemplate.children(".columns").empty()
    var columnEl = containerEl.find(".column-slot")
    personArray.forEach((person, index) => {
        const { name, id, email, school, officeNumber, github, role } = person
        var other
        if (school) { other = `School: ${school}` }
        else if (officeNumber) { other = `Office#: ${officeNumber}` }
        else { other = `Github Profile: ${github}` }
        if (index > 0) {

            columnEl = columnEl.clone()
        }
        if (index % 3 === 0 && index > 0) {
            containerEl = containerElTemplate.clone()
            $(".section-slot").append(containerEl)
        }
        columnEl.find(".name-slot").text(name)
        columnEl.find(".email-slot").text(email)
        columnEl.find(".id-slot").text(`ID#:${id}`)
        columnEl.find(".other-slot").text(other)
        columnEl.find(".role-slot").text(role)
        if(index >0 ) {
            containerEl.children(".columns").append(columnEl)
        }


    })
    htmlString = dom.window.document.documentElement.outerHTML
    fs.writeFile("./output/index.html", htmlString, function (err) {
        if (err) {
            console.log(err);
        } else { console.log("Write HTML Success"); }
    })
}



async function runApp() {
    inquirer
        .prompt(questions)
        .then(createPerson)
        .then(modifyDOM)
}
async function readFile() {
    return await readFilePromise("./assets/template.html", "utf8")
        .then(createDOM)

}

readFile()
runApp()

module.exports = {
    createPerson,
    personArray,
    readFile,
    readFilePromise,
    dom
}