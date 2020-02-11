
// provides validation against invalid responses
// must provide a response, and for Number type questions...
// must be a number
function requireAnswer(value) {
    if (value !== "" && value !== null && !Number.isNaN(value)) {
        return true
    }
    if (Number.isNaN(value)) { return "Must be a number" }
    return "Must provide a valid response."
}

const questions = [
    {
        name: "name",
        message: "Please enter Manager's full name.",
        type: "input",
        default: "Jeremy Marotta",
        validate: requireAnswer
    },
    {
        name: "email",
        message: "Enter person's email address.",
        type: "input",
        default: "user@domain.com",
        validate: requireAnswer
    },
    {
        name: "id",
        message: "Enter person's ID.",
        type: "number",
        default: "12345",
        validate: requireAnswer
    },
    {
        name: "officeNumber",
        message: "Enter Manager's office number.",
        type: "number",
        default: "123",
        validate: requireAnswer
    },
    {
        name: "anotherPerson",
        message: "Do you want to add another person?",
        type: "confirm",
        default: true,
        validate: requireAnswer
    },
    {
        name: "openFile",
        message: "Do you want to open the webpage now?",
        type: "confirm",
        default: true,
        when: ({ anotherPerson }) => {
            if (anotherPerson === false) { return true }
            return false
        }
    }
]

const questions1 = questions.slice(0)

questions[0] = {
    name: "name",
    message: "Please enter employee/intern full name.",
    type: "input",
    default: "Jeremy Marotta",
    validate: requireAnswer
}
questions.splice(3, 1,
    {
        name: "role",
        message: "Select persons's role",
        type: "list",
        choices: ["Intern", "Engineer"],
        validate: requireAnswer
    },
    {
        name: "school",
        message: "Enter Intern's school name.",
        type: "input",
        default: "UCONN",
        when: ({ role }) => {
            if (role === "Intern") { return true }
            return false
        },
        validate: requireAnswer
    },
    {
        name: "gitName",
        message: "Enter Engineer's github user name.",
        type: "input",
        default: "firefreet",
        when: ({ role }) => {
            if (role === "Engineer") { return true }
            return false
        },
        validate: requireAnswer
    })

const questions2 = questions

module.exports = { questions1, questions2 }



