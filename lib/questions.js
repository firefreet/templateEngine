
function requireAnswer(value) {
    if (value !== "" && value !== null && !Number.isNaN(value)) {
        return true
    }
    if (Number.isNaN(value)){return "Must be a number"}
    return "Must provide a valid response."
}
const questions = [
    {
        name: "employeeName",
        message: "Please enter employee full name.",
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
        name: "role",
        message: "Select persons's role",
        type: "list",
        choices: ["Manager", "Intern", "Engineer"],
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
        name: "officeNumber",
        message: "Enter Manager's office number.",
        type: "number",
        default: "123",
        when: ({ role }) => {
            if (role === "Manager") { return true }
            return false
        },
        validate: requireAnswer
    },
    {
        name: "githubUserName",
        message: "Enter Engineer's github user name.",
        type: "input",
        default: "firefreet",
        when: ({ role }) => {
            if (role === "Engineer") { return true }
            return false
        },
        validate: requireAnswer
    },
    {
        name: "anotherPerson",
        message: "Do you want to add another person?",
        type: "confirm",
        default: false,
        validate: requireAnswer
    }
]

module.exports = questions



