const path = require('path');
const { execSync } = require('child_process');

const componentGenerator = require('./component');
const containerGenerator = require('./container');
const pageGenerator = require('./page');

module.exports = function (plop) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('page', pageGenerator);

  // Resolve map import generator
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '../src',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.tsx',
    )}`;
    try {
      execSync(`yarn prettify "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
};
