#!/usr/bin/env node

/**
 * Shineout 发布流程自动化脚本
 * 
 * 使用方法：
 * node scripts/release.js --component=checkbox --type=fix --description="修复双重触发问题"
 * 
 * 或者用 Claude Code 执行：
 * pnpm release --component=checkbox --type=fix --description="修复双重触发问题"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      options[key] = value;
    }
  });
  
  return options;
}

// 获取下一个版本号
function getNextVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const currentVersion = packageJson.version;
  const match = currentVersion.match(/3\.8\.0-beta\.(\d+)/);
  
  if (match) {
    const nextBeta = parseInt(match[1]) + 1;
    return `3.8.0-beta.${nextBeta}`;
  }
  
  throw new Error('无法解析当前版本号');
}

// 生成分支名称
function generateBranchName(type, component, description) {
  const sanitized = description
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${type}-${component}-${sanitized}`;
}

// 更新版本号
function updateVersion(version) {
  console.log(`📦 更新版本号到 ${version}`);
  
  // 更新 package.json
  const packagePath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  
  // 更新 shineout-style version
  const stylePath = 'packages/shineout-style/src/version.ts';
  fs.writeFileSync(stylePath, `export default '${version}';\n`);
  
  // 更新 shineout index
  const indexPath = 'packages/shineout/src/index.ts';
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const updatedContent = indexContent.replace(
    /export default { version: '[^']+' };/,
    `export default { version: '${version}' };`
  );
  fs.writeFileSync(indexPath, updatedContent);
}

// 更新 changelog
function updateChangelog(component, version, type, description, prIndex) {
  console.log(`📝 更新 ${component} 组件的 changelog`);
  
  const changelogPath = `packages/shineout/src/${component}/__doc__/changelog.cn.md`;
  
  if (!fs.existsSync(changelogPath)) {
    console.warn(`⚠️  警告: changelog 文件不存在 ${changelogPath}`);
    return;
  }
  
  const content = fs.readFileSync(changelogPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  const typeMap = {
    fix: '🐞 BugFix',
    feat: '🚀 Feature',
    docs: '📚 Documentation',
    chore: '🔧 Chore'
  };
  
  const newEntry = `## ${version}
${today}
### ${typeMap[type] || '🔧 Chore'}

- ${description} ([#${prIndex}](https://github.com/sheinsight/shineout-next/pull/${prIndex}))

`;
  
  const updatedContent = newEntry + content;
  fs.writeFileSync(changelogPath, updatedContent);
}

// 执行 git 命令
function execGit(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    console.error(`❌ Git 命令失败: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// 主流程
function main() {
  const options = parseArgs();
  
  if (!options.component || !options.type || !options.description) {
    console.error('❌ 缺少必要参数');
    console.log('使用方法: node scripts/release.js --component=checkbox --type=fix --description="修复问题"');
    process.exit(1);
  }
  
  const { component, type, description } = options;
  const version = getNextVersion();
  const branchName = generateBranchName(type, component, description);
  
  console.log(`🚀 开始发布流程...`);
  console.log(`📋 参数信息:`);
  console.log(`   - 组件: ${component}`);
  console.log(`   - 类型: ${type}`);
  console.log(`   - 描述: ${description}`);
  console.log(`   - 版本: ${version}`);
  console.log(`   - 分支: ${branchName}`);
  
  try {
    // 1. 创建新分支
    console.log(`\n🌿 创建新分支 ${branchName}`);
    execGit(`git checkout -b ${branchName}`);
    
    // 2. 更新版本号
    updateVersion(version);
    
    // 3. 更新 changelog (需要先推送才能知道 PR index)
    console.log(`📝 预留 changelog 更新...`);
    
    // 4. 提交代码
    console.log(`\n💾 提交代码`);
    execGit('git add .');
    
    const commitMessage = `${type}: ${description}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;
    
    execGit(`git commit -m "${commitMessage}"`);
    
    // 5. 推送分支
    console.log(`\n⬆️  推送分支到远程`);
    execGit(`git push -u origin ${branchName}`);
    
    // 6. 创建 PR (需要 gh cli)
    console.log(`\n🔄 创建 Pull Request`);
    const prTitle = `${type}: ${description}`;
    const prBody = `## Summary
${description}

## 改动内容
- 版本号: ${version}
- 组件: ${component}

🤖 Generated with [Claude Code](https://claude.ai/code)`;
    
    try {
      const prResult = execGit(`gh pr create --title "${prTitle}" --body "${prBody}" --base dev-3.8.0`);
      const prUrl = prResult.trim();
      const prIndex = prUrl.match(/\/(\d+)$/)?.[1];
      
      console.log(`✅ PR 创建成功: ${prUrl}`);
      
      if (prIndex) {
        // 更新 changelog 并重新提交
        updateChangelog(component, version, type, description, prIndex);
        execGit('git add .');
        execGit(`git commit --amend --no-edit`);
        execGit('git push --force');
        console.log(`📝 Changelog 已更新并重新推送`);
      }
      
    } catch (error) {
      console.warn(`⚠️  创建 PR 失败，请手动创建`);
      console.log(`分支已推送到: origin/${branchName}`);
    }
    
    console.log(`\n🎉 发布流程完成！`);
    
  } catch (error) {
    console.error(`❌ 发布失败:`, error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, parseArgs, getNextVersion };