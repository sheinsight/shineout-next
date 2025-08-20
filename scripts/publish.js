const path = require('path');
const packages = ['hooks', 'base', 'shineout-style', 'theme', 'shineout'];
const fs = require('fs');
const { exec } = require('child_process');

const mianPackage = require(path.resolve(__dirname, '../package.json'));
const version = mianPackage.version;

// 获取version中的 tag 比如 3.0.0-alpha.1 中的 alpha
let tag = (version.split('-')[1] || '').split('.')[0] || 'latest';
if (tag === 'rc') {
  tag = 'next-3';
}
const mainVersion = version.split('.')[0];
if (mainVersion !== '3') {
  console.error('version 不是 3.x.x');
  process.exit(1);
}

console.log('version', version);
console.log('tag', tag);

const buildJason = (name) => {
  const packagePath = path.resolve(__dirname, `../packages/${name}/package.json`);
  const pkg = require(packagePath);
  pkg.version = version;
  pkg.repository = mianPackage.repository
  pkg.authors = mianPackage.authors;
  pkg.license = mianPackage.license;
  delete pkg.scripts;
  delete pkg.devDependencies;
  ['main', 'module', 'typings'].forEach((item) => {
    if (pkg[item]) {
      pkg[item] = pkg[item].replace(/^\.\/dist\//, './');
    }
  });
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

const copyFile = (name) => {
  const targetPath = path.resolve(__dirname, `../packages/${name}/dist`);
  const sourcePath = path.resolve(__dirname, `../`);
  // 从sourcePath复制到targetPath 复制 LICENSE
  fs.copyFileSync(`${sourcePath}/LICENSE`, `${targetPath}/LICENSE`);
  if (name === 'shineout') {
    // 从sourcePath复制到targetPath 复制 README.md
    fs.copyFileSync(`${sourcePath}/README.md`, `${targetPath}/README.md`);
    fs.copyFileSync(`${sourcePath}/README-zh_CN.md`, `${targetPath}/README-zh_CN.md`);
  }
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
  const umdPath = path.resolve(__dirname, `../packages/${name}/dist/dist`);
  if (name === 'shineout' && !fs.existsSync(umdPath)) {
    console.error(`${umdPath} 不存在`);
    process.exit(1);
  }
};

const publishPackage = (name) => {
  const distPath = path.resolve(__dirname, `../packages/${name}/dist`);
  exec(
    'npm publish ' + distPath + ' --access public' + (tag ? ` --tag ${tag}` : ''),
    (error, stdout) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      console.log(stdout);
    },
  );
};

try {
  packages.forEach((name) => {
    validateFile(name);
    buildJason(name);
    copyFile(name);
    publishPackage(name);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
