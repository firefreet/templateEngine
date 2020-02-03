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
        this.title = this.constructor.name
    }
    getName(){return this.name}
    getId(){return this.id}
    getEmail(){return this.email}
    getRole(){return this.title}

}

module.exports = Employee