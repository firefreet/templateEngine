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
        // set title based on the Class name
        this.title = this.constructor.name
    }
    getName(){return this.name}
    getId(){return this.id}
    getEmail(){return this.email}
    // since this will be dynamic to the Class it is called from, 
    // there will be no need to overwrite it on subClasses
    getRole(){return this.title}

}

module.exports = Employee