#!/usr/bin/env node

/**
 * 快速验证几个关键组件的修复效果
 */

import { PropsExtractor } from './dist/generators/props-extractor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INTERNAL_PROPS = ['jssStyle', 'renderButton', 'buttonRef', 'renderItem'];

async function quickVerify() {
  console.log('🔍 快速验证关键组件修复效果...\n');
  
  const componentsToTest = ['Button', 'Form', 'Input', 'Breadcrumb', 'Select'];
  const rootPath = path.join(__dirname, '..', '..');
  const extractor = new PropsExtractor(rootPath);
  
  for (const componentName of componentsToTest) {
    try {
      console.log(`\n[${componentName}] 验证中...`);
      const props = await extractor.extractComponentProps(componentName);
      
      const foundInternalProps = [];
      const propNames = props.map(p => p.name);
      
      for (const internalProp of INTERNAL_PROPS) {
        if (propNames.includes(internalProp)) {
          foundInternalProps.push(internalProp);
        }
      }
      
      if (foundInternalProps.length === 0) {
        console.log(`  ✅ ${componentName}: 属性干净 (${props.length} 个属性)`);
      } else {
        console.log(`  ❌ ${componentName}: 包含内部属性 [${foundInternalProps.join(', ')}] (${props.length} 个属性)`);
      }
      
    } catch (error) {
      console.log(`  💥 ${componentName}: 提取失败 - ${error.message}`);
    }
  }
  
  console.log('\n🎯 修复效果总结:');
  console.log('- Button: 应该排除 jssStyle, renderButton, buttonRef');
  console.log('- Form: 应该排除 jssStyle (已修复)');
  console.log('- Input: 应该排除 jssStyle');
  console.log('- Breadcrumb: 应该排除 jssStyle, renderItem');
  console.log('- Select: 应该排除 jssStyle, renderItem, renderResult, renderOptionList');
}

quickVerify();