#!/usr/bin/env node

/**
 * 收集各个组件的 tips 文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function collectBestPractices() {
  console.log('开始收集组件 tips...');
  
  const rootPath = path.join(__dirname, '..', '..', '..');
  const componentsDir = path.join(rootPath, 'packages', 'shineout', 'src');
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'tips');
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const allBestPractices = {};
  let foundCount = 0;
  
  // 读取所有组件目录
  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const componentName = entry.name;
      const mcpDir = path.join(componentsDir, componentName, '__mcp__');
      const bestPracticesFile = path.join(mcpDir, 'tips.json');
      
      // 检查是否存在 tips 文件
      if (fs.existsSync(bestPracticesFile)) {
        try {
          const content = fs.readFileSync(bestPracticesFile, 'utf-8');
          const bestPractices = JSON.parse(content);
          
          // 验证文件结构
          if (bestPractices.componentName && bestPractices.tips) {
            const componentKey = bestPractices.componentName;
            allBestPractices[componentKey] = bestPractices;
            
            // 保存单个组件的 tips
            fs.writeFileSync(
              path.join(outputDir, `${componentKey.toLowerCase()}.json`),
              JSON.stringify(bestPractices, null, 2)
            );
            
            foundCount++;
            console.log(`✅ 收集 ${componentKey} 组件的 tips`);
          } else {
            console.warn(`⚠️  ${componentName} 的 tips 文件格式不正确`);
          }
        } catch (error) {
          console.error(`❌ 读取 ${componentName} 的 tips 失败:`, error.message);
        }
      }
    }
  }
  
  // 生成索引文件
  const indexData = {
    lastUpdated: new Date().toISOString(),
    totalComponents: foundCount,
    components: Object.keys(allBestPractices),
    summary: {}
  };
  
  // 生成摘要信息
  Object.entries(allBestPractices).forEach(([name, data]) => {
    indexData.summary[name] = {
      recommendedCount: data.bestPractices?.recommended?.length || 0,
      notRecommendedCount: data.bestPractices?.notRecommended?.length || 0,
      scenariosCount: data.commonScenarios?.length || 0,
      tipsCount: data.tips?.length || 0,
      version: data.version,
      lastUpdated: data.lastUpdated
    };
  });
  
  // 保存索引文件
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify(indexData, null, 2)
  );
  
  // 保存完整的 tips 数据
  fs.writeFileSync(
    path.join(outputDir, 'all-tips.json'),
    JSON.stringify(allBestPractices, null, 2)
  );
  
  console.log('\n✅ Tips 收集完成！');
  console.log(`- 总共发现 ${foundCount} 个组件的 tips`);
  console.log(`- 输出目录: ${outputDir}`);
  
  return allBestPractices;
}

// 如果直接运行脚本
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  collectBestPractices().catch(error => {
    console.error('❌ 收集 tips 失败:', error);
    process.exit(1);
  });
}

export { collectBestPractices };