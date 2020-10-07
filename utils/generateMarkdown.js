// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.title}

${data.licenseBadge}

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

You can contact me with any questions:

Email: ${data.email}
GitHub: [${data.gitHub}](https://github.com/${data.gitHub})

## License

Licensed under the ${data.license} license

`
};

module.exports = generateMarkdown;
