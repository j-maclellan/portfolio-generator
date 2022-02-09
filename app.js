const inquirer = require('inquirer');
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require('./src/page-template.js');
const { prototype } = require('events');



const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your username!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};
// promptUser().then(answers => console.log(answers));

const promptProject = porfolioData => {
    // If there's no "projects" array property, create one
    if (!porfolioData.projects) {
    porfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a description!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you buld this project with? (Check all that apply)",
            choices: ["Javascript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        porfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(porfolioData);
        } else {
            return porfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(porfolioData => {
        return generatePage(porfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

