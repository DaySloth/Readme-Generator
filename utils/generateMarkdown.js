// function to generate markdown for README
function generateMarkdown(data) {
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

module.exports = generateMarkdown;
