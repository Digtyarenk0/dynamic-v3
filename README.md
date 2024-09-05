This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

The frontend part of the application is watermarked.

## `yarn start`

For the application to work, you must specify the following .env variables (they can also be viewed in the .env.example file)

```

# build
# Tokens
REACT_APP_DYNAMIC_ID = # Dynamic id


NODE_OPTIONS=--max-old-space-size=4096 # max node old space
GENERATE_SOURCEMAP=false # generate source map (hide source code)
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build

Before building the project, you need to build i18n using
commands.

```
yarn i18n:extract
yarn i18n:compile
```

The collected translations are located in src/locales.

To build the project

```
yarn build
```

### Syntax Commands

Check code by eslint

```
yarn lint
```

Fix eslint

```
yarn lint:fix
```

## Analyze bundle

To view an analysis of project files and their dependencies

```
yarn analyze
```

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
