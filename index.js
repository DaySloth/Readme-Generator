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

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    inquirer.prompt(questions[0]);
}

// function call to initialize program
init();
