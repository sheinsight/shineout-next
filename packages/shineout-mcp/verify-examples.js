#!/usr/bin/env node

/**
 * 验证示例数量的增加
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyExamples() {
  console.log('📊 验证组件示例数量...\n');
  
  const dataPath = path.join(__dirname, 'src/data/generated');
  const allComponentsPath = path.join(dataPath, 'all-components.json');
  
  // 读取所有组件数据
  const allComponents = JSON.parse(fs.readFileSync(allComponentsPath, 'utf-8'));
  
  let totalComponents = 0;
  let totalExamples = 0;
  const stats = [];
  
  // 统计每个组件的示例数量
  Object.entries(allComponents).forEach(([name, component]) => {
    const examples = component.examples || [];
    totalComponents++;
    totalExamples += examples.length;
    
    stats.push({
      name,
      exampleCount: examples.length,
      category: component.category
    });
  });
  
  // 按示例数量排序
  stats.sort((a, b) => b.exampleCount - a.exampleCount);
  
  console.log('🏆 示例数量最多的组件 TOP 10:');
  console.log('-'.repeat(50));
  stats.slice(0, 10).forEach((stat, index) => {
    console.log(`${index + 1}. ${stat.name}: ${stat.exampleCount} 个示例 (${stat.category})`);
  });
  
  console.log('\n📈 各分类的示例统计:');
  console.log('-'.repeat(50));
  
  const categoryStats = {};
  stats.forEach(stat => {
    if (!categoryStats[stat.category]) {
      categoryStats[stat.category] = {
        components: 0,
        examples: 0
      };
    }
    categoryStats[stat.category].components++;
    categoryStats[stat.category].examples += stat.exampleCount;
  });
  
  Object.entries(categoryStats).forEach(([category, stat]) => {
    console.log(`${category}: ${stat.components} 个组件, ${stat.examples} 个示例`);
  });
  
  console.log('\n📊 总体统计:');
  console.log('='.repeat(50));
  console.log(`总组件数: ${totalComponents}`);
  console.log(`总示例数: ${totalExamples}`);
  console.log(`平均每个组件: ${(totalExamples / totalComponents).toFixed(1)} 个示例`);
  
  // 检查是否有组件没有示例
  const noExamples = stats.filter(s => s.exampleCount === 0);
  if (noExamples.length > 0) {
    console.log(`\n⚠️  ${noExamples.length} 个组件没有示例:`);
    noExamples.forEach(s => console.log(`  - ${s.name}`));
  }
  
  console.log('\n✅ 示例提取完成！');
}

verifyExamples();