#!/usr/bin/env node

/**
 * 验证从文档提取的 Props 是否正确
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 已知的内部属性（不应该出现在文档中）
const INTERNAL_PROPS = [
  'jssStyle',
  'renderButton', 
  'buttonRef',
  'renderItem',
  'renderResult',
  'renderOptionList',
  'getComponentRef',
  'formConfig',
  'formFunc',
  'formValue'
];

async function verifyDocsProps() {
  console.log('🔍 验证从文档提取的 Props 准确性...\n');
  
  try {
    // 读取组件列表
    const allComponentsPath = path.join(__dirname, 'src/data/generated/all-components.json');
    const allComponentsData = JSON.parse(fs.readFileSync(allComponentsPath, 'utf-8'));
    const allComponents = Object.values(allComponentsData);
    
    console.log(`📊 需要验证 ${allComponents.length} 个组件\n`);
    
    const results = {
      total: allComponents.length,
      clean: 0,
      withInternalProps: 0,
      issues: []
    };
    
    // 验证关键组件
    const keyComponents = ['Form', 'Button', 'Input', 'Select', 'Table'];
    
    console.log('🔍 验证关键组件:');
    console.log('-'.repeat(60));
    
    for (const componentName of keyComponents) {
      const component = allComponents.find(c => c.name === componentName);
      if (!component) {
        console.log(`  ❌ ${componentName}: 未找到组件数据`);
        continue;
      }
      
      const props = component.props || [];
      const propNames = props.map(p => p.name);
      
      // 检查是否包含内部属性
      const foundInternalProps = [];
      for (const internalProp of INTERNAL_PROPS) {
        if (propNames.includes(internalProp)) {
          foundInternalProps.push(internalProp);
        }
      }
      
      if (foundInternalProps.length > 0) {
        console.log(`  ❌ ${componentName}: 包含内部属性 [${foundInternalProps.join(', ')}]`);
        results.withInternalProps++;
        results.issues.push({
          component: componentName,
          internalProps: foundInternalProps
        });
      } else {
        console.log(`  ✅ ${componentName}: 属性干净 (${props.length} 个属性)`);
        results.clean++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 验证结果汇总');
    console.log('='.repeat(60));
    
    if (results.withInternalProps === 0) {
      console.log('\n🎉 太棒了！所有关键组件的属性都是干净的！');
      console.log('✅ 没有任何内部属性泄露到文档中');
    } else {
      console.log(`\n⚠️  发现 ${results.withInternalProps} 个组件包含内部属性`);
      results.issues.forEach(issue => {
        console.log(`  - ${issue.component}: ${issue.internalProps.join(', ')}`);
      });
    }
    
    // 显示一些示例属性
    console.log('\n📋 Form 组件属性示例:');
    const formComponent = allComponents.find(c => c.name === 'Form');
    if (formComponent) {
      const sampleProps = formComponent.props.slice(0, 5);
      sampleProps.forEach(prop => {
        console.log(`  - ${prop.name}: ${prop.type} - ${prop.description}`);
      });
      console.log(`  ... 共 ${formComponent.props.length} 个属性`);
    }
    
  } catch (error) {
    console.error('❌ 验证过程失败:', error);
  }
}

verifyDocsProps();