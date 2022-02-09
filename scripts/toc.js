const fs = require('fs');

const SYS_MENU = ['.umi', '.umi-production', 'index.md', 'index.ts'];

const dirs = fs.readdirSync('./src') || [];

dirs.forEach((item) => {
  if (SYS_MENU.indexOf(item) < 0) {
    const child_dirs = fs.readdirSync(`./src/${item}`) || [];

    if (child_dirs.length > 1) {
      console.log('----------');
      console.log(child_dirs);
    }
  }
});

/**
 *
 * @param {*} title
 * @param {*} order
 * @param {*} list
 * @field {String} title
 * @field {String} path
 * @returns String
 */
const tpl = (title, order, list = []) => {
  return `
    ---
    nav:
      title: ${title}
      order: ${order}
    toc: menu
    ---
  `;
};
