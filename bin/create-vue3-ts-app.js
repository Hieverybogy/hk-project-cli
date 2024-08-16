#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '项目名称:',
    default: 'hk-project'
  },
  {
    type: 'confirm',
    name: 'animate',
    message: 'animate.css?',
    default: true
  },
  {
    type: 'confirm',
    name: 'bomb',
    message: '是否启动自爆模式?',
    default: true
  }
];

// 运行命令行交互
inquirer.prompt(questions).then(answers => {
  const projectName = answers.projectName;
  const targetPath = path.resolve(process.cwd(), projectName);

  // 创建项目目录
  fs.mkdirSync(targetPath);

  // 复制基础模板
  const templatePath = path.resolve(__dirname, '../template');
  fs.cpSync(templatePath, targetPath, { recursive: true });

  // 读取模板中的package.json
  const packageJsonPath = path.join(targetPath, 'package.json'); // 确定package.json文件路径
  let packageJson = fs.readFileSync(packageJsonPath, 'utf-8'); // 读取package.json文件内容

  // 替换占位符 {{ projectName }} 为用户输入的项目名称
  packageJson = packageJson.replace('{{ projectName }}', projectName);

  // 将修改后的package.json写回到目标项目中
  fs.writeFileSync(packageJsonPath, packageJson);

  // 安装依赖
  const dependencies = [];
  if (answers.animate) {
    dependencies.push('animate.css');
  }
  if (answers.bomb) {
    console.log('恭喜你，你爆炸了');
  }

  // 安装用户选择的依赖
  if (dependencies.length > 0) {
    console.log('Installing selected dependencies...');
    execSync(`npm install ${dependencies.join(' ')} && npm install`, { stdio: 'inherit', cwd: targetPath });
  } else {
    execSync(`npm install`, { stdio: 'inherit', cwd: targetPath });
  }

  console.log(`Project ${projectName} created successfully!`);
});
