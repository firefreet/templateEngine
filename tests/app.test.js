const app = require('../app')
const Intern = require('../lib/Intern')
const Manager = require('../lib/Manager')
const Engineer = require('../lib/Engineer')
const { JSDOM } = require('jsdom')


const testAnswers = {
    name: "Test Name",
    email: "test@email.com",
    id: 123,
    role: "Manager",
    school: "UCONN",
    officeNumber: "12",
    gitName: "firefreet",
    anotherPerson: false

}


test("When passed the Intern role, is a Intern object created with the school property?", () => {
    testAnswers.role = "Intern"
    const newPerson = app.createPerson(testAnswers)
    expect(newPerson instanceof Intern).toBe(true)
    expect(newPerson.getSchool()).toEqual(testAnswers.school)
})

test("When passed the Manager role, is a manager object created with the officeNumber property?", () => {
    testAnswers.role = "Manager"
    const newPerson = app.createPerson(testAnswers)
    expect(newPerson instanceof Manager).toBe(true)
    expect(newPerson.getOfficeNumber()).toEqual(testAnswers.officeNumber)
})

test("When passed the Engineer role, is a Engineer object created with the git user name property?", () => {
    testAnswers.role = "Engineer"
    const newPerson = app.createPerson(testAnswers)
    expect(newPerson instanceof Engineer).toBe(true)
    expect(newPerson.getGithub()).toEqual(testAnswers.gitName)
})

test("When calling create Person, the new object is added to the personArray", () => {
    testAnswers.role = "Engineer"
    app.createPerson(testAnswers)
    var index = app.personArray.length - 1
    expect(app.personArray[index] !== null).toBe(true)
    expect(app.personArray[index] instanceof Engineer).toBe(true)
})

test("ReadFile creates a new JSDOM object and $ is assigned the jquery object", async () => {
    var result = await app.readFile()
    expect(result[0] instanceof JSDOM).toBe(true)
    expect(result[1]["0"].hasOwnProperty("Window")).toBe(true)
})

test("readFilePromise returns a string", async () => {
    var result = await app.readFilePromise("./assets/template.html","utf8")
    expect(typeof result).toBe("string")
})

