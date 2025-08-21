#!/usr/bin/env node

import { TipsService } from '../dist/tools/tips/tips-service.js';
import { TipsFormatter } from '../dist/tools/tips/tips-formatter.js';

async function test() {
  const service = new TipsService();
  const formatter = new TipsFormatter();
  
  console.log('🧪 测试 Tips 功能...\n');
  
  // 测试1: 获取 Form 组件的 tips
  console.log('=== 测试1: 获取 Form 组件的 tips ===\n');
  const formTips = await service.getComponentTips('Form');
  if (formTips) {
    const formOutput = formatter.formatComponentTips(formTips);
    console.log(formOutput);
    console.log('\n提示数量:', formTips.tips?.length || 0);
  } else {
    console.log('未找到 Form 组件的 tips');
  }
  
  // 测试2: 获取 Input 组件的 tips
  console.log('\n=== 测试2: 获取 Input 组件的 tips ===\n');
  const inputTips = await service.getComponentTips('Input');
  if (inputTips) {
    const inputOutput = formatter.formatComponentTips(inputTips);
    console.log(inputOutput);
    console.log('\n提示数量:', inputTips.tips?.length || 0);
  } else {
    console.log('未找到 Input 组件的 tips');
  }
  
  // 测试3: 获取所有组件的 tips 摘要
  console.log('\n=== 测试3: 获取所有组件的 tips 摘要 ===\n');
  const summary = await service.getAllTipsSummary();
  const summaryOutput = formatter.formatTipsSummary(summary);
  console.log(summaryOutput);
  
  // 测试4: 列出所有有 tips 的组件
  console.log('\n=== 测试4: 所有有 tips 的组件列表 ===\n');
  const components = await service.listComponentsWithTips();
  console.log('组件列表:', components.join(', '));
  console.log('总数:', components.length);
}

test().catch(console.error);