#!/usr/bin/env node

/**
 * 简单的 MCP 服务器测试脚本
 */

import { ComponentService } from './dist/tools/component-service.js';
import { loadComponentData } from './dist/data/loader.js';

async function testMCPFunctions() {
  console.log('🧪 开始测试 MCP 功能...\n');
  
  try {
    // 初始化数据
    await loadComponentData();
    const service = new ComponentService();
    
    // 测试 1: 获取组件信息
    console.log('📋 测试 1: 获取 Button 组件信息');
    const buttonResult = await service.getComponent('Button');
    console.log('✅ Button 组件信息长度:', buttonResult.content[0].text.length, '字符');
    console.log('📄 预览:', buttonResult.content[0].text.substring(0, 200) + '...\n');
    
    // 测试 2: 搜索组件
    console.log('🔍 测试 2: 搜索 "表单" 相关组件');
    const searchResult = await service.searchComponents('表单');
    console.log('✅ 搜索结果长度:', searchResult.content[0].text.length, '字符');
    console.log('📄 预览:', searchResult.content[0].text.substring(0, 200) + '...\n');
    
    // 测试 3: 列出所有组件
    console.log('📚 测试 3: 列出表单分类组件');
    const listResult = await service.listComponents('form');
    console.log('✅ 表单组件列表长度:', listResult.content[0].text.length, '字符');
    console.log('📄 预览:', listResult.content[0].text.substring(0, 200) + '...\n');
    
    // 测试 4: 获取示例
    console.log('💡 测试 4: 获取 Input 组件示例');
    const exampleResult = await service.getExamples('Input');
    console.log('✅ Input 示例长度:', exampleResult.content[0].text.length, '字符');
    console.log('📄 预览:', exampleResult.content[0].text.substring(0, 200) + '...\n');
    
    console.log('🎉 所有测试通过！MCP 服务器功能正常。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

testMCPFunctions();