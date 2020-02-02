class Employee {
    /** 
    * @param {string} name Employee's name
    * @param {number} id Employee ID
    * @param {string} email Employee's email address
    */
    constructor(name,id,email){
        this.name = name
        this.id = id
        this.email = email
        this.role = "Employee"
    }
    getName(){return this.name}
    getId(){return this.id}
    getEmail(){return this.email}
    getRole(){return this.role}

}

module.exports = Employee