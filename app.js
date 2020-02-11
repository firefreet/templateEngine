// module to create DOM like object without a browser
const { JSDOM } = require('jsdom')
// module to create promises from functions with standard call back models
const { promisify } = require('util')
// module for file access read and write
const fs = require('fs')
// class files
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
// question file for input to inquirer prompt
const { questions1 } = require('./lib/questions')
const { questions2 } = require('./lib/questions')
// start off with 1st question set
var questions = questions1
// opens apps in default applications
const open = require('open');
// module to interact with user at the command line
var openOnRun = false
const inquirer = require('inquirer')
// array for list of people created from prompt
const personArray = []
// promisify readFile
const readFilePromise = promisify(fs.readFile)
// location for HTML file to be created
const outPutFileName = "./output/index.html"
// placeholder variables
var dom
var $ = null;
var htmlString

// to be used as cb function after HTML is written
function openFile() {
    if (openOnRun) { open(outPutFileName, { wait: false }) };
}

// create the imaginary DOM and set up jquery. To be called after the template file is read
function createDOM(fileString) {
    // create a Document Object Model type object
    dom = new JSDOM(fileString);
    // pass the DOM object into the jquery module and set as the normal $ variable
    $ = require("jquery")(dom.window);
    return [dom, $]
}

// creates a new Employee based on answers to prompt. Called when the prompt completes.
function createPerson(answers) {
    // deconstruct the answers object
    var { name, email, id, role, school, officeNumber, gitName, anotherPerson, openFile } = answers
    // set flag to open or not the html result based on user's choice
    if (openFile === true) { openOnRun = true }
    else { openOnRun = false }
    // if role doesn't exist, it is the first run, set it to manager
    if (role === undefined) { role = "Manager" }
    // depending on the type of person, creates appropriate Employee 
    var newPerson
    switch (role) {
        case 'Intern': newPerson = new Intern(name, id, email, school);
            break;
        case 'Manager': newPerson = new Manager(name, id, email, officeNumber)
            break;
        case 'Engineer': newPerson = new Engineer(name, id, email, gitName)
            break;
    }
    // add new Employee to array
    personArray.push(newPerson)
    // if user decided to add another person...
    if (anotherPerson) {
        // switch to 2nd question set after first time
        questions = questions2
        // restart with the prompt 
        runApp()
        return anotherPerson
    }
    else { return newPerson }
}
// called after create person
function modifyDOM(result) {
    //  if user chose to add another user, exit
    if (result === true) { return false }
    // otherwise start updatitng the DOM, starting by getting the .container-slot element
    var containerEl = $(".container-slot")
    // create a copy for later use
    var containerElTemplate = containerEl.clone()
    // remove all content from template 2 levels down
    containerElTemplate.children(".columns").empty()
    // grab the current column to be updatedd
    var columnEl = containerEl.find(".column-slot")
    // loop through personArray
    personArray.forEach((person, index) => {
        // deconstruct each person object
        const { name, id, email, school, officeNumber, github, title } = person
        // define text to display which is unique to each Class type, based on if the properties exist on this Employee
        var other
        if (school) { other = `School: ${school}` }
        else if (officeNumber) { other = `Office#: ${officeNumber}` }
        else { other = `Github Profile: ${github}` }
        // after the first person, start cloning the column, instead of overwriting
        if (index > 0) {
            columnEl = columnEl.clone()
        }
        // starting at the 4th person and every 3 after, 
        if (index % 3 === 0 && index > 0) {
            // create a new container from the template
            containerEl = containerElTemplate.clone()
            // and append it to the overall section
            $(".section-slot").append(containerEl)
        }
        // chose an icon based on the role/title
        var icon
        switch (title) {
            case "Manager": icon = `<i class="fab fa-galactic-senate fa-3x has-text-primary"></i>`
                break
            case "Engineer": icon = `<i class="fas fa-jedi fa-3x has-text-success"></i>`
                break
            case "Intern": icon = `<i class="fab fa-galactic-republic fa-3x has-text-info"></i>`
        }
        // set all the user information to respective elements
        columnEl.find("figure").html(icon)
        columnEl.find(".name-slot").text(name)
        columnEl.find(".email-slot").text(email).attr("href",`mailto:${email}`)
        columnEl.find(".id-slot").text(`ID#:${id}`)
        columnEl.find(".other-slot").text(other)
        columnEl.find(".role-slot").text(title)
        // if it is a new column, append it to the current .container-slot>.columns element
        if (index > 0) {
            containerEl.children(".columns").append(columnEl)
        }


    })
    // get the resulting HTML 
    htmlString = dom.window.document.documentElement.outerHTML
    // write it back out to a file
    try {
        fs.writeFileSync(outPutFileName, htmlString)
    }
    catch (err) {
        console.log(err)
    }
    console.log("Write HTML Success")
}


// primary app functions
async function runApp() {
    inquirer
        // prompt for employee information
        .prompt(questions)
        // create appropriate emmployee objects loop back to prompt based on user's choice
        .then(createPerson)
        // if no more employees to enter, create webpage from template
        .then(modifyDOM)
        // if user chose to open the end file, open the file
        .then(openFile)

}
// read template file
async function readFile() {
    return await readFilePromise("./assets/template.html", "utf8")
        // use file string data to create a DOM browser like object
        .then(createDOM)

}

readFile()
runApp()

// export various variables and functions for testing
module.exports = {
    createPerson,
    personArray,
    readFile,
    readFilePromise,
    dom,
    modifyDOM
}