const path = require('path');

// 遍历packages/*/ 下的node_modules， 并删除 .cache文件夹
function cleanCache() {
  const glob = require('glob');
  const rimraf = require('rimraf');
  const paths = glob.sync(path.join(__dirname, '../packages/*/node_modules/.cache'));
  paths.forEach((p) => {
    rimraf.sync(p);
    console.log('clean cache: ', p);
  });
}

cleanCache();
