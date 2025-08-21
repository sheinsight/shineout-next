#!/usr/bin/env node

/**
 * 测试 Button 组件的 Props 显示
 */

import { ComponentService } from './dist/tools/component-service.js';
import { loadComponentData, getComponentData } from './dist/data/loader.js';

async function testButtonProps() {
  console.log('🧪 测试 Button Props 显示...\n');
  
  try {
    await loadComponentData();
    
    // 直接获取 Button 数据
    const buttonData = await getComponentData('Button');
    console.log('📊 Button 数据统计:');
    console.log(`- Props 数量: ${buttonData?.props?.length || 0}`);
    
    if (buttonData?.props && buttonData.props.length > 0) {
      console.log('\n📋 前几个 Props:');
      buttonData.props.slice(0, 3).forEach(prop => {
        console.log(`  - ${prop.name}: ${prop.type} (${prop.required ? '必填' : '可选'})`);
        if (prop.description) {
          console.log(`    描述: ${prop.description}`);
        }
        if (prop.defaultValue) {
          console.log(`    默认值: ${prop.defaultValue}`);
        }
        console.log('');
      });
    }
    
    // 测试服务格式化
    console.log('\n📄 测试文档格式化:');
    const service = new ComponentService();
    const result = await service.getComponent('Button');
    console.log('格式化结果长度:', result.content[0].text.length);
    
    // 查找 Props 表格
    const content = result.content[0].text;
    const propsTableMatch = content.match(/## Props[\s\S]*?\n\n/);
    if (propsTableMatch) {
      console.log('\n📋 Props 部分:');
      console.log(propsTableMatch[0]);
    } else {
      console.log('\n⚠️  没有找到 Props 表格');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testButtonProps();