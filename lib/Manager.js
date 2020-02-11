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
    }
    getOfficeNumber() { return this.officeNumber }
    // getRole() does not need to be overriden, 
    // already dynamic to the sub Class it is called from
}

module.exports = Manager
