#!/usr/bin/env node

/**
 * 测试 Button 组件的最终 Props 是否正确（排除内部属性）
 */

import { PropsExtractor } from './dist/generators/props-extractor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testButtonFinalProps() {
  console.log('🧪 测试 Button 最终 Props...\n');
  
  try {
    const rootPath = path.join(__dirname, '..', '..');
    const extractor = new PropsExtractor(rootPath);
    
    console.log('📋 提取 Button 组件的最终属性');
    const buttonProps = await extractor.extractComponentProps('Button');
    
    console.log(`\n✅ Button 组件提取到 ${buttonProps.length} 个属性:\n`);
    
    // 列出所有属性名
    const propNames = buttonProps.map(p => p.name).sort();
    console.log('📋 所有属性名:');
    propNames.forEach(name => {
      const prop = buttonProps.find(p => p.name === name);
      console.log(`  - ${name}: ${prop.type}${prop.required ? ' (必填)' : ' (可选)'}`);
    });
    
    console.log('\n🔍 检查是否包含内部属性:');
    const internalProps = ['jssStyle', 'renderButton', 'buttonRef'];
    internalProps.forEach(internalProp => {
      const found = buttonProps.find(p => p.name === internalProp);
      if (found) {
        console.log(`  ❌ 发现内部属性: ${internalProp}`);
      } else {
        console.log(`  ✅ 正确排除内部属性: ${internalProp}`);
      }
    });
    
    console.log('\n📊 从 shineout type 中提取到的属性统计:');
    // 统计从不同来源提取的属性
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error('详细错误:', error.stack);
  }
}

testButtonFinalProps();