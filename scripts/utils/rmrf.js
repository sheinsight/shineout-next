const fs = require('fs');

function rmrf(directory) {
  try {
    const files = fs.readdirSync(directory);
    files.forEach(function (file) {
      const curPath = directory + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        rmrf(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directory);
  } catch (e) {
    console.error(`删除目录 ${directory} 失败: ${e.message}`);
  }
}

module.exports = {
  rmrf,
};
