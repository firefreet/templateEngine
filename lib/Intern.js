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
    }
    getSchool() { return this.school }
    // getRole() does not need to be overriden, 
    // already dynamic to the sub Class it is called from
}

module.exports = Intern