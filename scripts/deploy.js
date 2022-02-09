const shell = require('shelljs');
const fs = require('fs');
const chalk = require('chalk');

/**
 * Deploys requires git to be installed
 */
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

/**
 * 因为Windows下不支持rm -rf，所以由rimraf代替
 * 用于删除 docs目录
 */
if (!shell.which('rimraf')) {
  shell.echo('Sorry, this script requires rimraf');
  shell.exit(1);
}

if (fs.existsSync('docs')) {
  shell.exec('rimraf docs');
}

console.log(chalk.blue('开始打包...'));
shell.exec('npm run docs:build');
console.log(chalk.blue('打包完成'));
shell.exec('git add .');
shell.exec('git commit -m "docs: update"');
shell.exec('git push origin master');

console.log(chalk.green('deploy success!'));
