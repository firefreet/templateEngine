const $ = require('jquery')
const jsdom = require('jsdom')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const questions = require('./lib/questions')
const inquirer = require('inquirer')

function app(answers){
    console.log(answers)
}

inquirer
    .prompt(questions)
    .then(app)

module.exports = {}