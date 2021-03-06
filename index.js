// required npm packages
const fs = require("fs");
const inquirer = require("inquirer");
//requires generate markdown file provided
const genReadme = require("./utils/generateMarkdown");

// array of questions for user
function promptQuestions() {

    //uses inquirer to prompt the user for answers in the terminal
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
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is your GitHub username?"
        },
    ]);
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
                providedAnswers.licenseBadge = "![Apache License](https://img.shields.io/badge/License-Apache-blue)";
            } else if (providedAnswers.license === "MIT") {
                providedAnswers.license = "[MIT](https://choosealicense.com/licenses/mit/)";
                providedAnswers.licenseBadge = "![MIT License](https://img.shields.io/badge/License-MIT-green)";
            } else {
                providedAnswers.license = "[ISC](https://choosealicense.com/licenses/isc/)";
                providedAnswers.licenseBadge = "![ISC License](https://img.shields.io/badge/License-ISC-red)";
            };

            //checks to see if the user wanted a custom url
            if(providedAnswers.customImage === "Yes"){
                //asking for the custom url
                askURL()
                    .then(function(response){
                        //adds url to the obj
                        providedAnswers.imageAddress = response.customURL;
                        //generates markdown for readme
                        const README = genReadme(providedAnswers);
                        //writes to a README.md file
                        writeToFile("README.md", README);
                    })
            }else{
                //if they did not want a custom image a selected default image is supplied in its place
                providedAnswers.imageAddress = 'https://images.unsplash.com/photo-1504198266287-1659872e6590?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
                //generates markdown for readme
                const README = genReadme(providedAnswers);
                //write to a README.md file
                writeToFile("README.md", README);
            }
        });
};

// function call to initialize program
init();
