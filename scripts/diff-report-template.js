#!/usr/bin/env node

/**
 * Diff 报告模板生成器
 * 使用方法: node scripts/diff-report-template.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function generateDiffReport() {
  console.log('=== Diff 报告生成助手 ===\n');

  // 收集基本信息
  const component = await question('组件名称 (如 Button, Select): ');
  const version = await question('版本号 (如 3.4.0): ');
  const changeType = await question('变更类型 (1=新功能 2=缺陷修复 3=优化改进): ');
  
  let problemDesc = '';
  switch (changeType) {
    case '1':
      const feature = await question('新增功能名称: ');
      const reason = await question('为什么需要这个功能: ');
      problemDesc = `\`${component}\` 新增 \`${feature}\`。${reason}`;
      break;
    case '2':
      const bug = await question('修复的问题: ');
      const scenario = await question('问题发生场景: ');
      problemDesc = `修复 \`${component}\` ${bug}的问题。${scenario}`;
      break;
    case '3':
      const optimization = await question('优化点: ');
      const effect = await question('优化效果: ');
      problemDesc = `优化 \`${component}\` ${optimization}。${effect}`;
      break;
  }

  const fileCount = await question('变更文件数量: ');
  const files = [];
  for (let i = 0; i < parseInt(fileCount); i++) {
    const file = await question(`文件路径 ${i + 1}: `);
    files.push(file);
  }

  const isBreaking = await question('是否有破坏性变更? (y/n): ');
  const compatibilityNote = isBreaking === 'y' 
    ? '**破坏性变更**：[具体说明需要注意的变更]' 
    : '**无破坏性变更**：[说明为什么没有破坏性]';

  // 生成报告
  const report = `# ${component} 组件 ${version} 版本 Diff 报告

## 问题描述

${problemDesc}

## 代码变更文件

${files.map((file, index) => `${index + 1}. \`${file}\``).join('\n')}

## 变更代码行

### 1. ${files[0]} - [变更说明]
\`\`\`diff
// TODO: 添加具体的代码 diff
- 旧代码
+ 新代码
\`\`\`

## 变更前后逻辑差异

### 变更前
- [描述原有行为或限制]
- [存在的问题]

### 变更后
- [描述新的行为]
- [问题如何解决]

## 逻辑影响范围
- [影响的功能点]
- [不影响的功能点]

## 升级注意事项

### 代码兼容性
- ${compatibilityNote}

### 行为变化说明

1. **[变化点概括]**：
   - 影响场景：[具体使用场景]
   - 具体表现：[变化前后的表现]
   - 受影响代码示例：
   \`\`\`tsx
   // 之前：[旧行为]
   // 现在：[新行为]
   <${component} 
     // 示例代码
   />
   \`\`\`
   - 是否需要调整：[不需要/需要，具体说明]`;

  // 输出文件路径
  const outputDir = path.join(__dirname, '..', 'packages', 'shineout', 'src', 
    component.toLowerCase(), '__diff__', version);
  const outputFile = path.join(outputDir, 'index.md');

  console.log('\n生成的报告内容：\n');
  console.log(report);
  
  const save = await question('\n是否保存到文件? (y/n): ');
  if (save === 'y') {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFile, report);
    console.log(`\n报告已保存到: ${outputFile}`);
    console.log('\n请手动完成以下步骤：');
    console.log('1. 填充 TODO 部分的具体代码 diff');
    console.log('2. 完善变更前后逻辑差异的具体描述');
    console.log('3. 补充具体的代码示例');
    console.log('4. 运行 pnpm run generate:diff-imports 更新导入');
  }

  rl.close();
}

// 显示使用说明
console.log(`
使用说明：
1. 本工具帮助生成标准化的 diff 报告模板
2. 生成后需要手动补充具体的代码 diff 和示例
3. 确保遵循标准格式，不要添加额外章节

标准章节结构：
- 问题描述
- 代码变更文件
- 变更代码行
- 变更前后逻辑差异
- 逻辑影响范围
- 升级注意事项（包含代码兼容性和行为变化说明）
`);

generateDiffReport().catch(console.error);