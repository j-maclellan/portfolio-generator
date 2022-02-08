const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHMTL = generatePage(name, github);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:"
        }
    ]);
};
promptUser().then(answers => console.log(answers));

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
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)"
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
            message: "Enter the GitHub link to your project. (Required)"
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
        console.log(porfolioData)
    });

// fs.writeFile("index.html", pageHMTL, err => {
//     if (err) throw new Error(err);

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });
