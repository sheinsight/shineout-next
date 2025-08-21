#!/usr/bin/env node

/**
 * 验证所有组件的 Props 提取准确性
 * 检查是否正确排除了内部属性，只保留用户可见的属性
 */

import { PropsExtractor } from './dist/generators/props-extractor.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 已知的内部属性列表（应该被排除的属性）
const KNOWN_INTERNAL_PROPS = [
  'jssStyle',
  'renderButton', 
  'buttonRef',
  'renderProp',
  'renderItem',
  'renderResult',
  'renderOptionList',
  'renderUnmatchedInput',
  'getComponentRef'
];

async function verifyAllComponents() {
  console.log('🔍 开始验证所有组件的 Props 提取准确性...\n');
  
  try {
    const rootPath = path.join(__dirname, '..', '..');
    const extractor = new PropsExtractor(rootPath);
    
    // 读取组件列表
    const allComponentsPath = path.join(__dirname, 'src/data/generated/all-components.json');
    const allComponentsData = JSON.parse(fs.readFileSync(allComponentsPath, 'utf-8'));
    const allComponents = Object.values(allComponentsData);
    
    console.log(`📊 需要验证 ${allComponents.length} 个组件\n`);
    
    const results = {
      total: allComponents.length,
      successful: 0,
      failed: 0,
      withInternalProps: 0,
      issues: []
    };
    
    // 验证每个组件
    for (let i = 0; i < allComponents.length; i++) {
      const component = allComponents[i];
      const componentName = component.name;
      
      console.log(`\n[${i + 1}/${allComponents.length}] 验证 ${componentName}...`);
      
      try {
        // 重新提取 props
        const props = await extractor.extractComponentProps(componentName);
        
        if (props.length === 0) {
          console.log(`  ⚠️  ${componentName}: 未提取到任何属性`);
          results.failed++;
          results.issues.push({
            component: componentName,
            issue: 'no_props',
            details: '未提取到任何属性'
          });
          continue;
        }
        
        // 检查是否包含内部属性
        const foundInternalProps = [];
        const propNames = props.map(p => p.name);
        
        for (const internalProp of KNOWN_INTERNAL_PROPS) {
          if (propNames.includes(internalProp)) {
            foundInternalProps.push(internalProp);
          }
        }
        
        if (foundInternalProps.length > 0) {
          console.log(`  ❌ ${componentName}: 包含内部属性 [${foundInternalProps.join(', ')}]`);
          results.withInternalProps++;
          results.issues.push({
            component: componentName,
            issue: 'internal_props',
            details: `包含内部属性: ${foundInternalProps.join(', ')}`
          });
        } else {
          console.log(`  ✅ ${componentName}: 属性干净 (${props.length} 个属性)`);
        }
        
        // 检查生成的数据文件
        const componentDataPath = path.join(__dirname, `src/data/generated/${componentName.toLowerCase()}.json`);
        if (fs.existsSync(componentDataPath)) {
          const componentData = JSON.parse(fs.readFileSync(componentDataPath, 'utf-8'));
          const fileProps = componentData.props || [];
          
          if (fileProps.length !== props.length) {
            console.log(`  ⚠️  ${componentName}: 文件中属性数量 (${fileProps.length}) 与提取结果 (${props.length}) 不匹配`);
            results.issues.push({
              component: componentName,
              issue: 'prop_count_mismatch',
              details: `文件中属性数量 (${fileProps.length}) 与提取结果 (${props.length}) 不匹配`
            });
          }
        }
        
        results.successful++;
        
      } catch (error) {
        console.log(`  ❌ ${componentName}: 提取失败 - ${error.message}`);
        results.failed++;
        results.issues.push({
          component: componentName,
          issue: 'extraction_error',
          details: error.message
        });
      }
    }
    
    // 输出验证结果
    console.log('\n' + '='.repeat(60));
    console.log('📊 验证结果汇总');
    console.log('='.repeat(60));
    
    console.log(`总组件数: ${results.total}`);
    console.log(`成功验证: ${results.successful} (${((results.successful / results.total) * 100).toFixed(1)}%)`);
    console.log(`验证失败: ${results.failed}`);
    console.log(`包含内部属性: ${results.withInternalProps}`);
    console.log(`清洁组件: ${results.successful - results.withInternalProps}`);
    
    if (results.issues.length > 0) {
      console.log('\n🔍 详细问题列表:');
      console.log('-'.repeat(40));
      
      const groupedIssues = {};
      results.issues.forEach(issue => {
        if (!groupedIssues[issue.issue]) {
          groupedIssues[issue.issue] = [];
        }
        groupedIssues[issue.issue].push(issue);
      });
      
      Object.entries(groupedIssues).forEach(([issueType, issues]) => {
        console.log(`\n${getIssueTypeLabel(issueType)} (${issues.length} 个组件):`);
        issues.forEach(issue => {
          console.log(`  - ${issue.component}: ${issue.details}`);
        });
      });
    }
    
    // 输出成功的组件列表
    const cleanComponents = [];
    for (const component of allComponents) {
      const hasIssue = results.issues.some(issue => 
        issue.component === component.name && 
        (issue.issue === 'internal_props' || issue.issue === 'extraction_error')
      );
      if (!hasIssue) {
        cleanComponents.push(component.name);
      }
    }
    
    if (cleanComponents.length > 0) {
      console.log(`\n✅ 属性干净的组件 (${cleanComponents.length} 个):`);
      cleanComponents.forEach(name => {
        console.log(`  - ${name}`);
      });
    }
    
    // 生成验证报告文件
    const reportPath = path.join(__dirname, 'verification-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      summary: results,
      cleanComponents,
      issues: results.issues
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 详细报告已保存至: ${reportPath}`);
    
    if (results.withInternalProps === 0 && results.failed === 0) {
      console.log('\n🎉 所有组件验证通过！属性提取完全准确！');
    } else if (results.withInternalProps > 0) {
      console.log(`\n⚠️  发现 ${results.withInternalProps} 个组件包含内部属性，需要修复。`);
    }
    
  } catch (error) {
    console.error('❌ 验证过程失败:', error);
    console.error('详细错误:', error.stack);
  }
}

function getIssueTypeLabel(issueType) {
  const labels = {
    'no_props': '❌ 未提取到属性',
    'internal_props': '🚫 包含内部属性', 
    'prop_count_mismatch': '⚠️  属性数量不匹配',
    'extraction_error': '💥 提取失败'
  };
  return labels[issueType] || issueType;
}

verifyAllComponents();