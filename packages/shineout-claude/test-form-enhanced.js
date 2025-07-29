#!/usr/bin/env node

/**
 * 测试增强后的 Form 组件 Props 提取
 */

import { PropsExtractor } from './dist/generators/props-extractor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testFormEnhanced() {
  console.log('🧪 测试增强后的 Form Props 提取...\n');
  
  try {
    const rootPath = path.join(__dirname, '..', '..');
    const extractor = new PropsExtractor(rootPath);
    
    console.log('📋 提取 Form 组件的最终属性');
    const formProps = await extractor.extractComponentProps('Form');
    
    console.log(`\n✅ Form 组件提取到 ${formProps.length} 个属性:\n`);
    
    // 列出所有属性名
    const propNames = formProps.map(p => p.name).sort();
    console.log('📋 所有属性名:');
    propNames.forEach(name => {
      const prop = formProps.find(p => p.name === name);
      console.log(`  - ${name}: ${prop.type}${prop.required ? ' (必填)' : ' (可选)'}`);
    });
    
    console.log('\n🔍 检查是否包含内部属性:');
    const internalProps = ['jssStyle', 'formConfig', 'formFunc', 'formValue'];
    let hasInternalProps = false;
    
    internalProps.forEach(internalProp => {
      const found = formProps.find(p => p.name === internalProp);
      if (found) {
        console.log(`  ❌ 发现内部属性: ${internalProp}`);
        hasInternalProps = true;
      } else {
        console.log(`  ✅ 正确排除内部属性: ${internalProp}`);
      }
    });
    
    if (!hasInternalProps) {
      console.log('\n🎉 Form 组件属性提取完全正确！');
    } else {
      console.log('\n⚠️  Form 组件仍包含内部属性，需要进一步修复。');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error('详细错误:', error.stack);
  }
}

testFormEnhanced();