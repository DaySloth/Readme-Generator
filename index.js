// required npm packages
const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
function promptQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "list",
            name: "customImage",
            message: "Would you like to add a custom image to your README?",
            choices: ["Yes", "No"]
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

//takes in the passed in object and returns code for the readme
function generateREADME(data) {
    return `
# ${data.title}

![Image of Project](${data.imageAddress})

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
// asks for a custom url if chosen during the prompts
function askURL() {
    return inquirer.prompt([
        {
            type: "input",
            name: "customURL",
            message: "What is the URL for your custom image?"
        }
    ])
};

// function to write README file
function writeToFile(fileName, data) {
    //writes to a specific folder so it does not mess up the current project readme
    fs.writeFile("./GeneratedREADME/" + fileName, data, function (err) {
        if (err) {
            return console.log(err)
        };
        //console logs a success message
        console.log("Successfully wrote 'README.md' to '/generatedREADME/README.md'");
    });
};

// function to initialize program
function init() {
    //prompts for the questions
    promptQuestions()
        .then(function (answers) {
            let providedAnswers = answers;
            //checks the obj to replace the license to a good markdown code for the selected license
            if (providedAnswers.license === "Apache") {
                providedAnswers.license = "[Apache](http://www.apache.org/licenses/LICENSE-2.0)";
            } else if (providedAnswers.license === "MIT") {
                providedAnswers.license = "[MIT](https://choosealicense.com/licenses/mit/)";
            } else {
                providedAnswers.license = "[ISC](https://choosealicense.com/licenses/isc/)";
            };

            //checks to see if the user wanted a custom url
            if(providedAnswers.customImage === "Yes"){
                //asking for the custom url
                askURL()
                    .then(function(response){
                        //adds url to the obj
                        providedAnswers.imageAddress = response.customURL;
                        //generates markdown for readme
                        const README = generateREADME(providedAnswers);
                        //writes to a README.md file
                        writeToFile("README.md", README);
                    })
            }else{
                //if they did not want a custom image a selected default image is supplied in its place
                providedAnswers.imageAddress = 'https://images.unsplash.com/photo-1504198266287-1659872e6590?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
                //generates markdown for readme
                const README = generateREADME(providedAnswers);
                //write to a README.md file
                writeToFile("README.md", README);
            }
        });
};

// function call to initialize program
init();
