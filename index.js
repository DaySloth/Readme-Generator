// array of questions for user
//title, description, table of content, installation, usage, license
//contributing, tests and questions
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");



const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Describe your project?"
    },
    {
        type: "input",
        name: "tableOfContent",
        message: "Provide a table of content"
    },
    {
        type: "input",
        name: "installation",
        message: "How would a user INSTALL your program?"
    },
    {
        type: "input",
        name: "usage",
        message: "How would a user USE your program?"
    },
    {
        type: "list",
        name: "license",
        choices: ["MIT", "Apache", "ISC"],
        message: "Choose a license for your project"
    },
    {
        type: "input",
        name: "contributing",
        message: "How can a user CONTRIBUTE to the project?"
    },
    {
        type: "input",
        name: "tests",
        message: "How can a user TEST your project?"
    },
    {
        type: "input",
        name: "questions",
        message: "What questions are left after this project?"
    },
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    const answers = inquirer.prompt(questions);
}

// function call to initialize program
init();
