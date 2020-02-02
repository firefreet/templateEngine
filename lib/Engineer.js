const Employee = require("./Employee")

class Engineer extends Employee {
    /**
    * @param {string} name Engineer's name
    * @param {number} id Employee ID
    * @param {string} email Employee's email address
    * @param {string} github Engineer's github name
    */
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
        this.role = "Engineer"
    }
    getGithub() { return this.github }
}

module.exports = Engineer