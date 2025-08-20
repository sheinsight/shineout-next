#!/usr/bin/env node

/**
 * 从 shineout 源码生成组件数据的脚本
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateComponentData() {
  console.log('开始生成组件数据...');
  
  try {
    // 导入 TypeScript 模块（使用 tsx 运行时直接导入源文件）
    const { ComponentExtractor } = await import('../src/generators/component-extractor.ts');
    
    const rootPath = path.join(__dirname, '..', '..', '..');
    const extractor = new ComponentExtractor(rootPath);
    
    // 获取所有组件列表
    const allComponents = await extractor.getAllComponents();
    console.log(`发现 ${allComponents.length} 个组件`);
    
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    const generatedDir = path.join(dataDir, 'generated');
    
    // 确保数据目录存在
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }
    
    const extractedComponents = {};
    let successCount = 0;
    
    // 提取每个组件的信息
    for (const componentName of allComponents) {
      console.log(`提取组件: ${componentName}`);
      
      try {
        const componentData = await extractor.extractComponent(componentName);
        if (componentData) {
          extractedComponents[componentName] = componentData;
          
          // 保存单个组件文件
          fs.writeFileSync(
            path.join(generatedDir, `${componentName.toLowerCase()}.json`),
            JSON.stringify(componentData, null, 2)
          );
          
          successCount++;
        }
      } catch (error) {
        console.error(`提取组件 ${componentName} 失败:`, error.message);
      }
    }
    
    // 生成组件索引文件
    const indexData = {
      lastUpdated: new Date().toISOString(),
      version: '3.7.7',
      totalComponents: allComponents.length,
      extractedComponents: successCount,
      components: Object.keys(extractedComponents),
      categories: {}
    };
    
    // 按分类统计
    Object.values(extractedComponents).forEach(comp => {
      const category = comp.category;
      if (!indexData.categories[category]) {
        indexData.categories[category] = [];
      }
      indexData.categories[category].push(comp.name);
    });
    
    fs.writeFileSync(
      path.join(dataDir, 'index.json'),
      JSON.stringify(indexData, null, 2)
    );
    
    // 生成完整的组件数据文件
    fs.writeFileSync(
      path.join(generatedDir, 'all-components.json'),
      JSON.stringify(extractedComponents, null, 2)
    );
    
    console.log('\\n✅ 组件数据生成完成！');
    console.log(`- 总共发现 ${allComponents.length} 个组件`);
    console.log(`- 成功提取 ${successCount} 个组件`);
    console.log(`- 分类统计:`, indexData.categories);
    
  } catch (error) {
    console.error('❌ 生成组件数据失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateComponentData().catch(console.error);
}

export { generateComponentData };