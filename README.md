**Angular Framework**  
===================  
**NOTE: If your development team would like to contribute, please contact Matthew McElhaney (matthew_mcelhaney@homedepot.com)**  

Simple app architecture to quickly start up an Angular 2 project utilizing the following:  
- Node.js w/Express.js  
- Yarn Package Manager
- Angular-CLI  
- Angular  
- Angular Flex-Layout 
- UX Style Packages and Icons*  
- Karma, Jasmine and Protractor  
- Pivotal Cloud Foundry  

*Core-styles, header, side nav, inputs, tabs and tables styles included

This project was generated with [angular-cli](https://github.com/angular/angular-cli)  

----------  
  
Demos  
===================  
  
#### **Development URL**  
https://amf2-dev.apps-np.homedepot.com  
- Please login with valid QA store number and credentials  

----------  

Project Setup  
===================  
  
#### **Installation**  

Ensure `node`, `gulp` and `@angular/cli` are installed globally prior to setup.  
- `npm install -g gulp @angular/cli@latest`
Ensure `yarn` is installed globally prior to setup.
- [Install Yarn] (https://yarnpkg.com/en/docs/install)

In terminal navigate to project root directory and run following commands:  
- Run `yarn run setup` 

#### **Login Functionality**

If your application does not need the Login page and related functionality set the `USE_LOGIN` variable to `false` in the `config/globals.temp` file.

#### **Running Local Server**  

Run `yarn run start:local` for a local dev server.  
Navigate to `http://localhost.homedepot.com:3001/` to access app.  
The app will automatically reload if you change any of the source files.  

#### **Running unit tests**  

Run `yarn run test` to execute the unit tests a single time and then exit, via [Karma](https://karma-runner.github.io).  
Run `yarn run test:watch` to execute the unit tests and watch for changes.
Code coverage reports are published to `/coverage/index.html`

#### **Running end-to-end tests**  

Run `yarn run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).  

#### **Code scaffolding**  

Run `ng generate component relative-path/component-name` to generate a new component. 
You can also use `ng generate directive/pipe/service/class`.  

#### **Building Release**  

In terminal navigate to project root directory and run following command:  

- `yarn run build:local` to build for local environment.  
- `yarn run build:develop` to build for development environment.  
- `yarn run build:production` to build for production environment.  

**NOTE** - `Environments` are based on environments set in `config.json` file  

#### **Cloud Foundry Integration**  

**NOTE** - Windows users please ensure CF CLI has been updated to version 6.16.0 or greater. Visit https://docs.cloudfoundry.org/cf-cli/install-go-cli.html to download update.  

- Ensure you are logged in to the correct Cloud Foundry Org and Space in terminal.  
- Ensure correct environment manifest.yml has been generated from previous step.  
- Execute command in terminal `cf push -f {environment}.manifest.yml`.  

#### **Analytics Integration**  

- Navigate to https://ux.homedepot.com and fill out the **UX Analytics Request** form to request Analytics setup.  
- Replace `${GTMID}` with Google Tag Manager ID in `index.html`  
