const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function getUserInfo(){
    return inquirer.prompt([
        {
        type: "input",
        message: "What is the title of your project?",
        name: "title" 
        },
        {
        type: "input",
        message: "Please enter the description of your project:",
        name: "desc" 
        },
        {
        type: "input",
        message: "Please enter the installation instructions:",
        name: "installInfo" 
        },
        {
        type: "input",
        message: "Please enter the Usage information:",
        name: "usageInfo" 
        },
        {
        type: "input",
        message: "Please enter the contribution guidelines for the project:",
        name: "contrib" 
        },
        {
        type: "input",
        message: "Please enter the test instructions:",
        name: "testInfo" 
        },
        {
        type: "list",
        message: "Please select a license:",
        name: "license",
        choices: [
            "GPLv3",
            "GPLv2",
            "BSD",
            "MIT",
            "Apache License 2.0"
        ]
        },
        {
        type: "input",
        message: "Please enter your GitHub username:",
        name: "gitHubUserName" 
        },
        {
        type: "input",
        message: "Please enter your email:",
        name: "userEmail" 
        }
    ]);
};

function generateREADMEText(answers){
    return `# ${answers.title}

## Table of Contents
1. [ Description ](#desc)
2. [ Installation ](#install)
3. [ Usage ](#usage)
4. [ License ](#lic)
5. [ Contributing ](#contrib)
6. [ Tests ](#test)
7. [ Questions ](#quest)
    
<a name="desc"></a>
## 1. Description
${answers.desc}
    
<a name="install"></a>
## 2. Installation
${answers.installInfo}
    
<a name="usage"></a>
## 3. Usage
${answers.usageInfo}
    
<a name="lic"></a>
## 4. License
${answers.license}
    
<a name="contrib"></a>
## 5. Contributing
${answers.contrib}
    
<a name="test"></a>
## 6. Tests
${answers.testInfo}
    
<a name="quest"></a>
## 7. Questions
Please visit my GitHub to view all of my work:\n
https://www.github.com/${answers.gitHubUserName} \n
Contact me at: ${answers.userEmail}`;
}
    
getUserInfo()
    .then(function(answers){
        const text = generateREADMEText(answers);
        return writeFileAsync("createdFile/README.md", text);
    })
    .then(function(){
        console.log("Successfully created README file")
    })
    .catch(function(err) {
        console.log(err);
    });