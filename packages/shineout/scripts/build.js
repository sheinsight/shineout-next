const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 读取配置

const fatherBundless = fs.readFileSync(path.resolve(__dirname, './father.config.ts'), 'utf8');
const fatherrcDev = fs.readFileSync(path.resolve(__dirname, './father.umd.dev.ts'), 'utf8');
const fatherrcProd = fs.readFileSync(path.resolve(__dirname, './father.umd.prod.ts'), 'utf8');

// 拷贝文件
function copyFiles(srcDir, destDir) {
  const files = fs.readdirSync(srcDir);
  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
  });
}

// 删除目录
function deleteDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
  });
  fs.rmdirSync(dir);
}

const build = (config, cb) => {
  fs.writeFile(path.resolve(__dirname, '../.fatherrc.ts'), config, (err) => {
    if (err) {
      console.error(err);
    }
    // 运行 father build
    exec('npx father build', (error, stdout) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(stdout);
      if (cb) {
        cb();
      }
    });
  });
};

if (process.env.NODE_ENV !== 'production') {
  build(fatherBundless);
}

if (process.env.NODE_ENV === 'production') {
  console.log('production mode');
  build(fatherrcDev, () => {
    build(fatherrcProd, () => {
      // 将dist/umd1 和 dist/umd2 的内容拷贝到 dist/umd
      // 拷贝文件
      if (!fs.existsSync('dist/dist')) {
        fs.mkdirSync('dist/dist');
      }
      copyFiles('dist/umd1', 'dist/dist');
      copyFiles('dist/umd2', 'dist/dist');

      // 删除目录
      deleteDirectory('dist/umd1');
      deleteDirectory('dist/umd2');
    });
  });
}
