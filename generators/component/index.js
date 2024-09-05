module.exports = {
  description: 'Default component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'newComponent',
    },
  ],
  actions: [
    {
      type: 'add',
      path: '../src/components/{{kebabCase name}}/index.jsx',
      templateFile: './component/index.jsx.hbs',
    },
    {
      type: 'add',
      path: '../src/components/{{kebabCase name}}/{{kebabCase name}}.module.scss',
      templateFile: './component/scss.hbs',
    },
  ],
};
