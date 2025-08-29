const fs = require('fs');
const path = require('path');

const shineoutPath = path.resolve(__dirname, '../../shineout/src');

const copyDir = (src, dest) => {
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
};
/**
 *  读取目录下的文件 生成index.jsx
 *   import 所有文件
 *
 */
const makeIndex = (dir) => {
  const comps = [];
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.tsx') && file !== 'index.tsx');
  const before = files
    .map((file, index) => {
      const name = `Example${index}`;
      comps.push(`<${name}/>`);
      return `import ${name} from './${file.replace('.tsx', '')}';`;
    })
    .join('\n');

  const str = `
  ${before}
  const App = () => {
    return (
      <div>
        ${comps.join('\n')}
      </div>
    )

  }
  export default App;
  `;

  fs.writeFileSync(path.join(dir, 'index.tsx'), str);
};

const makeIndex2 = (dir) => {
  const comps = [];
  const files = fs.readdirSync(dir).filter((file) => file !== 'index.tsx');
  const before = files
    .map((file, index) => {
      const name = `Example${index}`;
      comps.push(`<${name}/>`);
      return `import ${name} from './${file}';`;
    })
    .join('\n');

  const str = `
  ${before}
  const App = () => {
    return (
      <div>
        ${comps.join('\n')}
      </div>
    )

  }
  export default App;
  `;

  fs.writeFileSync(path.join(dir, 'index.tsx'), str);
};

// 读取 /packages/shineout/src 下的文件夹
const dirs = fs.readdirSync(shineoutPath);
// 遍历dirs 读取目录下的__example__文件夹
dirs.forEach((dir) => {
  const examplePath = path.join(shineoutPath, dir, '__example__');
  if (fs.existsSync(examplePath)) {
    console.log(examplePath);
    const targetPath = path.resolve(__dirname, '../pages/examples', dir);
    // 把__example__文件夹下的文件拷贝到 targetPath 下
    fs.mkdirSync(targetPath, { recursive: true });
    copyDir(examplePath, targetPath);
    makeIndex(targetPath);
  }
});

const examplePath = path.resolve(__dirname, '../pages/examples');
makeIndex2(examplePath);
