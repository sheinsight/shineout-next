const path = require('path');
const packages = ['hooks', 'base', 'shineout-style', 'theme', 'shineout'];
const fs = require('fs');
const { exec } = require('child_process');

//获取命令行参数
const argv = process.argv;
// 获取 --tag xxx 中的 xxx
const tagIndex = argv.findIndex((item) => item.includes('--tag'));
const tag = tagIndex > -1 ? argv[tagIndex + 1] : undefined;

const version = require(path.resolve(__dirname, '../package.json')).version;

// 如果版本中包含字母
const versionHasAlpha = /[a-zA-Z]/.test(version);

console.log('version', version);

if (versionHasAlpha && !tag) {
  console.error('请输入tag');
  process.exit(1);
}

const buildJason = (name) => {
  const packagePath = path.resolve(__dirname, `../packages/${name}/package.json`);
  const pkg = require(packagePath);
  pkg.version = version;
  delete pkg.scripts;
  delete pkg.devDependencies;
  if (pkg.dependencies) {
    Object.keys(pkg.dependencies).forEach((item) => {
      if (pkg.dependencies[item].startsWith('workspace')) {
        pkg.dependencies[item] = version;
      }
    });
  }
  fs.writeFileSync(
    path.resolve(__dirname, `../packages/${name}/dist/package.json`),
    JSON.stringify(pkg, null, 2),
  );
};

const validateFile = (name) => {
  const distPath = path.resolve(__dirname, `../packages/${name}/dist`);
  if (!fs.existsSync(distPath)) {
    console.error(`${distPath} 不存在`);
    process.exit(1);
  }
  const esPath = path.resolve(__dirname, `../packages/${name}/dist/esm`);
  const cjsPath = path.resolve(__dirname, `../packages/${name}/dist/cjs`);
  if (!fs.existsSync(esPath) || !fs.existsSync(cjsPath)) {
    console.error(`${esPath} 或 ${cjsPath} 不存在`);
    process.exit(1);
  }
  const umdPath = path.resolve(__dirname, `../packages/${name}/dist/umd`);
  if (name === 'shineout' && !fs.existsSync(umdPath)) {
    console.error(`${umdPath} 不存在`);
    process.exit(1);
  }
};

const publishPackage = (name) => {
  // 在dist 目录执行 npm publish
  process.chdir(path.resolve(__dirname, `../packages/${name}/dist`));
  exec('npm publish --access public' + (tag ? ` --tag ${tag}` : ''), (error, stdout) => {
    if (error) {
      console.error(error);
      process.exit(1);
      return;
    }
    console.log(stdout);
  });
};

try {
  packages.forEach((name) => {
    validateFile(name);
    buildJason(name);
    publishPackage(name);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
