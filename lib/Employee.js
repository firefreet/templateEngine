class Employee {
    /** 
    * @param {string} name Employee's name
    * @param {number} id Employee ID
    * @param {string} email Employee's email address
    */
    constructor(name,id,email){
        this.name = name
        this.id = id
        this.title = ""
        this.email = email
    }
    getName(){return this.name}
    getId(){return this.id}
    getEmail(){return this.email}
    getRole(){return this.constructor.name}

}

module.exports = Employee