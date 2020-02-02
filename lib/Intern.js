const Employee = require("./Employee")

class Intern extends Employee {
    /**
    * @param {string} name Intern's name
    * @param {number} id Intern ID
    * @param {string} email Employee's email address
    * @param {string} school Intern's school name
    */
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
        this.role = "Intern"
    }
    getSchool() { return this.school }
}

module.exports = Intern