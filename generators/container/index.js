module.exports = {
  description: 'Container',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'newContainer',
    },
  ],
  actions: [
    {
      type: 'add',
      path: '../src/container/{{kebabCase name}}/index.jsx',
      templateFile: './container/index.jsx.hbs',
    },
    {
      type: 'add',
      path: '../src/container/{{kebabCase name}}/{{kebabCase name}}.module.scss',
      templateFile: './container/scss.hbs',
    },
  ],
};
