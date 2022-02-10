const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const COMMANDER = `git log \
  --pretty=format:'{"commit": "%h","author": "%aN <%aE>","date": "%ad","message": "%s"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`;

const handleStdOut = (list) => {
  const OUT_PUT_FILE = path.resolve(__dirname, '../src/assets/commit.json');
  if (fs.existsSync(OUT_PUT_FILE)) {
    shell.exec(`rimraf(${OUT_PUT_FILE})`);
  }

  fs.writeFileSync(OUT_PUT_FILE, JSON.stringify(list));
};

module.exports = (message) =>
  new Promise((resolve) => {
    shell.exec(COMMANDER, (code, stdout, stderr) => {
      if (code) {
        console.log('[stderr]', stderr);
      } else {
        handleStdOut([message, ...JSON.parse(stdout)]);
        resolve();
      }
    });
  });
