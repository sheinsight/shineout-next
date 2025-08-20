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
// 如果是正式版本（没有预发布标签），不设置 tag，让 npm 默认使用 latest
let tag = '';
if (version.includes('-')) {
  // 预发布版本
  tag = version.split('-')[1].split('.')[0];
  if (tag === 'rc') {
    tag = 'next';
  }
}

console.log('MCP 包发布信息:');
console.log('版本号:', version);
console.log('NPM Tag:', tag || 'latest');

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
  // 更新版本号
  mcpPackage.version = version;
  
  // 保留 repository 和 license
  mcpPackage.repository = mainPackage.repository;
  mcpPackage.license = mainPackage.license;
  
  // 写回 package.json
  fs.writeFileSync(mcpPackagePath, JSON.stringify(mcpPackage, null, 2));
  
  console.log('✓ package.json 准备完成');
};

// 复制 LICENSE 文件
const copyFiles = () => {
  const mcpPath = path.resolve(__dirname, '../packages/shineout-mcp');
  const rootPath = path.resolve(__dirname, '..');
  
  // 复制 LICENSE
  if (fs.existsSync(`${rootPath}/LICENSE`)) {
    fs.copyFileSync(`${rootPath}/LICENSE`, `${mcpPath}/LICENSE`);
  }
  
  console.log('✓ LICENSE 文件复制完成');
};

// 发布到 NPM
const publish = () => {
  const mcpPath = path.resolve(__dirname, '../packages/shineout-mcp');
  // 只有在有特定 tag 时才添加 --tag 参数，否则使用 npm 默认的 latest
  const command = `npm publish ${mcpPath} --access public${tag ? ` --tag ${tag}` : ''}`;
  
  console.log('执行发布命令:', command);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('发布失败:', error);
      if (stderr) console.error(stderr);
      process.exit(1);
    }
    
    console.log(stdout);
    console.log(`\n✅ @sheinx/shineout-mcp@${version} 发布成功！`);
    console.log(`   NPM Tag: ${tag || 'latest'}`);
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