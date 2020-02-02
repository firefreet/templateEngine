const Employee = require("./Employee")

class Manager extends Employee {
    /**
    * @param {string} name Manager's name
    * @param {number} id Employee ID
    * @param {string} email Employee's email address
    * @param {number} officeNumber Manager's office number
    */
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber
        this.role = "Manager"
    }
    getOfficeNumber() { return this.officeNumber }
}

module.exports = Manager
