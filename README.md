# General description

This is a test task application created with React + Typescript, Redux Toolkit + Redux Toolkit Query.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

[JSON server](https://github.com/typicode/json-server) is used with mocked data in `db.json` file.

Node.js version: `14.17.0`

Application consists of two pages - Home and Contacts.

On Home page user can login (enetering email and password), and if login is successfull, link to Contacts page is available.
Implementation of authorization is primitive, without using tokens, only checking user login/password and setting isAuthorized flag.
To authorize successfully enter login and password for one of the users from db.json file (e.g. email: `user1@user.ru`, password: `1`)

On Contacts page user can see his/her contacts list, can create, edit or delete contacts, search contacts.

# To start this app:

- clone this repo
- In the project directory run:
  - run `npm i` to install project dependencies
  - run `json-server --watch db.json --port 3004` to start JSON server
  - run `npm start` to start application in development mode

## Available Scripts

In the project directory, you can run:

 `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

 `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

 `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
