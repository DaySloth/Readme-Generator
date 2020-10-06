// array of questions for user
//title, description, table of content, installation, usage, license
//contributing, tests and questions
const fs = require("fs");
const inquirer = require("inquirer");

function promptQuestions() {
    return inquirer.prompt([
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
    ]);
};

function generateREADME(data){
    return `
# ${data.title}

## Description

${data.description}

## Table of Content

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)

## Installation

${data.installation}

## Usage

${data.usage}

## Contribution

${data.contributing}

## Tests

${data.tests}

## Questions

${data.questions}

## License

Licensed under the ${data.license} license


`
};

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile("./GeneratedREADME/"+fileName, data, function(err){
        if(err){
            return console.log(err)
        };

        console.log("Successfully wrote 'README.md'");
    });
};

// function to initialize program
function init() {
    promptQuestions().then(function(answers){
        let providedAnswers = answers;
        console.log(providedAnswers);
        if(providedAnswers.license === "Apache"){
            providedAnswers.license = "[Apache](http://www.apache.org/licenses/LICENSE-2.0)";
        }else if(providedAnswers.license === "MIT"){
            providedAnswers.license = "[MIT](https://choosealicense.com/licenses/mit/)";
        }else{
            providedAnswers.license = "[ISC](https://choosealicense.com/licenses/isc/)";
        };

        console.log(providedAnswers);

        const README = generateREADME(providedAnswers);

        writeToFile("README.md", README);
    })
};

// function call to initialize program
init();
