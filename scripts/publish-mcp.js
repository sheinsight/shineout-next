const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const mainPackage = require(path.resolve(__dirname, '../package.json'));
const mcpPackagePath = path.resolve(__dirname, '../packages/shineout-mcp/package.json');
const mcpPackage = require(mcpPackagePath);

// 从 tag 名称中提取版本号
// 例如: version-mcp-1.0.0 -> 1.0.0
const tagName = process.env.GITHUB_REF_NAME || '';
let version = '';

if (tagName.startsWith('version-mcp-')) {
  version = tagName.replace('version-mcp-', '');
} else {
  // 如果不是从 GitHub Action 运行，使用主包版本
  version = mainPackage.version;
  console.log('未检测到 tag，使用主包版本:', version);
}

// 获取发布 tag (beta, alpha, rc, latest)
let tag = (version.split('-')[1] || '').split('.')[0] || 'latest';
if (tag === 'rc') {
  tag = 'next';
}

console.log('MCP 包发布信息:');
console.log('版本号:', version);
console.log('NPM Tag:', tag);

// 验证构建文件
const validateBuild = () => {
  const distPath = path.resolve(__dirname, '../packages/shineout-mcp/dist');
  if (!fs.existsSync(distPath)) {
    console.error('错误: dist 目录不存在，请先运行构建');
    process.exit(1);
  }
  
  const serverIndexPath = path.resolve(__dirname, '../packages/shineout-mcp/dist/server/index.js');
  if (!fs.existsSync(serverIndexPath)) {
    console.error('错误: dist/server/index.js 不存在');
    process.exit(1);
  }
  
  console.log('✓ 构建文件验证通过');
};

// 准备发布的 package.json
const preparePackageJson = () => {
  const pkg = { ...mcpPackage };
  
  // 更新版本号
  pkg.version = version;
  
  // 保留必要的字段
  pkg.repository = mainPackage.repository;
  pkg.license = mainPackage.license;
  
  // 删除开发相关的字段
  delete pkg.scripts;
  delete pkg.devDependencies;
  
  // 修正路径（从 dist 目录发布）
  if (pkg.main) {
    pkg.main = pkg.main.replace(/^dist\//, './');
  }
  if (pkg.bin && pkg.bin['sheinx-mcp']) {
    // bin 路径需要相对于发布目录
    pkg.bin['sheinx-mcp'] = './bin/shineout-mcp.js';
  }
  
  // 更新 files 字段，包含所有需要发布的内容
  pkg.files = [
    'bin',
    'server',
    'tools',
    'types',
    'data',
    'README.md',
    'INSTALLATION.md',
    'claude-config-example.json',
    'LICENSE'
  ];
  
  // 写入到 dist 目录
  const distPackageJsonPath = path.resolve(__dirname, '../packages/shineout-mcp/dist/package.json');
  fs.writeFileSync(distPackageJsonPath, JSON.stringify(pkg, null, 2));
  
  console.log('✓ package.json 准备完成');
};

// 复制必要的文件到 dist 目录
const copyFiles = () => {
  const mcpPath = path.resolve(__dirname, '../packages/shineout-mcp');
  const distPath = path.resolve(__dirname, '../packages/shineout-mcp/dist');
  const rootPath = path.resolve(__dirname, '..');
  
  // 复制 LICENSE
  if (fs.existsSync(`${rootPath}/LICENSE`)) {
    fs.copyFileSync(`${rootPath}/LICENSE`, `${distPath}/LICENSE`);
  }
  
  // 复制 README
  if (fs.existsSync(`${mcpPath}/README.md`)) {
    fs.copyFileSync(`${mcpPath}/README.md`, `${distPath}/README.md`);
  }
  
  // 复制 INSTALLATION.md
  if (fs.existsSync(`${mcpPath}/INSTALLATION.md`)) {
    fs.copyFileSync(`${mcpPath}/INSTALLATION.md`, `${distPath}/INSTALLATION.md`);
  }
  
  // 复制示例配置文件
  if (fs.existsSync(`${mcpPath}/claude-config-example.json`)) {
    fs.copyFileSync(`${mcpPath}/claude-config-example.json`, `${distPath}/claude-config-example.json`);
  }
  
  // 复制 bin 目录
  const binSourcePath = `${mcpPath}/bin`;
  const binTargetPath = `${distPath}/bin`;
  if (fs.existsSync(binSourcePath)) {
    if (!fs.existsSync(binTargetPath)) {
      fs.mkdirSync(binTargetPath, { recursive: true });
    }
    const binFiles = fs.readdirSync(binSourcePath);
    binFiles.forEach(file => {
      fs.copyFileSync(`${binSourcePath}/${file}`, `${binTargetPath}/${file}`);
    });
  }
  
  console.log('✓ 文件复制完成');
};

// 发布到 NPM
const publish = () => {
  const distPath = path.resolve(__dirname, '../packages/shineout-mcp/dist');
  const command = `npm publish ${distPath} --access public${tag ? ` --tag ${tag}` : ''}`;
  
  console.log('执行发布命令:', command);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('发布失败:', error);
      if (stderr) console.error(stderr);
      process.exit(1);
    }
    
    console.log(stdout);
    console.log(`\n✅ @sheinx/shineout-mcp@${version} 发布成功！`);
    console.log(`   NPM Tag: ${tag}`);
    console.log(`   查看: https://www.npmjs.com/package/@sheinx/shineout-mcp`);
  });
};

// 主流程
try {
  console.log('开始发布 @sheinx/shineout-mcp...\n');
  
  validateBuild();
  preparePackageJson();
  copyFiles();
  publish();
  
} catch (error) {
  console.error('发布过程出错:', error);
  process.exit(1);
}