#!/usr/bin/env node

/**
 * Props 提取功能测试脚本
 */

import { PropsExtractor } from './dist/generators/props-extractor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testPropsExtraction() {
  console.log('🧪 开始测试 Props 提取功能...\n');
  
  try {
    const rootPath = path.join(__dirname, '..', '..');
    const extractor = new PropsExtractor(rootPath);
    
    // 测试 Button 组件
    console.log('📋 测试 Button 组件 Props 提取');
    const buttonProps = await extractor.extractComponentProps('Button');
    
    console.log(`✅ Button 组件提取到 ${buttonProps.length} 个属性:`);
    
    if (buttonProps.length > 0) {
      console.log('📄 属性详情:');
      buttonProps.slice(0, 5).forEach(prop => {
        console.log(`  - ${prop.name}: ${prop.type}${prop.required ? ' (必填)' : ' (可选)'}`);
        if (prop.description) {
          console.log(`    描述: ${prop.description}`);
        }
        if (prop.defaultValue) {
          console.log(`    默认值: ${prop.defaultValue}`);
        }
        console.log('');
      });
      
      if (buttonProps.length > 5) {
        console.log(`    ... 还有 ${buttonProps.length - 5} 个属性\n`);
      }
    } else {
      console.log('⚠️  没有提取到任何属性\n');
    }
    
    // 测试 Input 组件
    console.log('📋 测试 Input 组件 Props 提取');
    const inputProps = await extractor.extractComponentProps('Input');
    
    console.log(`✅ Input 组件提取到 ${inputProps.length} 个属性`);
    
    if (inputProps.length > 0) {
      console.log('📄 前几个属性:');
      inputProps.slice(0, 3).forEach(prop => {
        console.log(`  - ${prop.name}: ${prop.type}`);
        if (prop.description) {
          console.log(`    ${prop.description}`);
        }
      });
    }
    
    console.log('\n🎉 Props 提取测试完成！');
    
  } catch (error) {
    console.error('❌ Props 提取测试失败:', error);
    console.error('详细错误:', error.stack);
    process.exit(1);
  }
}

testPropsExtraction();