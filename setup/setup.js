/* eslint-disable no-var */
var rimraf = require('rimraf');
var chalk = require('chalk');
var replace = require('replace');
var prompt = require('prompt');
var prompts = require('./setupPrompts');

var chalkSuccess = chalk.green;
var chalkProcessing = chalk.blue;
var chalkWarn = chalk.red;

/* eslint-disable no-console */

console.log(chalkSuccess('Dependencies installed.'));

prompt.start();

console.log(chalkWarn("WARNING:  Preparing to delete local git repository..."));
prompt.get([{ name: 'deleteGit', description: "Delete the git repository?  [y/n]" }], function (err, result) {
    var deleteGit = result.deleteGit.toUpperCase();

    if (err) {
        process.exit(1);
    }

    function updatePackage() {
        console.log(chalkProcessing('Updating package.json settings:'));

        prompt.get(prompts, function (err, result) {
            // parse user responses
            // default values provided for fields that will cause npm to complain if left empty
            const responses = [
                {
                    key: 'name',
                    value: result.projectName || 'project-name'
                },
                {
                    key: 'route',
                    value: result.route || (result.projectName || 'project-name')
                },
                {
                    key: 'version',
                    value: result.version || '1.0.0'
                },
                {
                    key: 'author',
                    value: result.author
                },
                {
                    key: 'license',
                    value: result.license || 'MIT'
                },
                {
                    key: 'description',
                    value: result.description
                },
                // simply use an empty URL here to clear the existing repo URL
                {
                    key: 'url',
                    value: ''
                }
            ];

            // update package.json with the user's values
            responses.forEach(res => {
                replace({
                    regex: `("${res.key}"): "(.*?)"`,
                    replacement: `$1: "${res.value}"`,
                    paths: ['package.json'],
                    recursive: false,
                    silent: true
                });
            });

            // remove setup script from package.json
            replace({
                regex: /\s*"setup":.*,/,
                replacement: "",
                paths: ['package.json'],
                recursive: false,
                silent: true
            });

            // replace appName in config.json
            replace({
                regex: `("appName"): "(.*?)"`,
                replacement: `$1: "${responses[0].value}"`,
                paths: ['config/config.json'],
                recursive: false,
                silent: true
            });

            // replace hostName in config.json
            replace({
                regex: `("hostName"): "(amf2)`,
                replacement: `$1: "${responses[0].value}`,
                paths: ['config/config.json'],
                recursive: false,
                silent: true
            });

            // replace title in index.html
            replace({
                regex: `(<title>Angular Framework<\/title>)`,
                replacement: `<title>${responses[0].value}</title>`,
                paths: ['src/index.html'],
                recursive: false,
                silent: true
            });

            // replace title in README.md
            replace({
                regex: `(Angular Framework)`,
                replacement: `${responses[0].value}`,
                paths: ['README.md'],
                recursive: false,
                silent: true
            });

            // replace info and demos sections of README.md
            replace({
                regex: `(\\*\\*NOTE:(.|\n)*?Project Setup)`,
                replacement: `Project Setup`,
                paths: ['README.md'],
                recursive: false,
                silent: true
            });

            // remove all setup scripts from the 'setup' folder
            console.log(chalkSuccess('\nSetup complete! Cleaning up...\n'));
            rimraf('./setup', error => {
                if (error) throw new Error(error);
            });
            rimraf('CHANGELOG.md', error => {
                if (error) throw new Error(error);
            });
        });

    }

    if (deleteGit.match(/^N.*/)) {
        updatePackage();
    }
    else {
        // remove the original git repository
        rimraf('.git', error => {
            if (error) throw new Error(error);
            console.log(chalkSuccess('Original Git repository removed.\n'));
            updatePackage();
        });
    }
});
