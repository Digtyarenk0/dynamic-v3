module.exports = {
  description: 'Page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'newPage',
    },
  ],
  actions: [
    {
      type: 'add',
      path: '../src/pages/{{kebabCase name}}/index.jsx',
      templateFile: './page/index.jsx.hbs',
    },
    {
      type: 'add',
      path: '../src/pages/{{kebabCase name}}/{{kebabCase name}}.module.scss',
      templateFile: './page/scss.hbs',
    },
  ],
};
