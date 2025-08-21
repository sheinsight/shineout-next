#!/usr/bin/env node

import { BestPracticesService } from './dist/tools/best-practices/best-practices-service.js';
import { BestPracticesFormatter } from './dist/tools/best-practices/best-practices-formatter.js';

async function test() {
  const service = new BestPracticesService();
  const formatter = new BestPracticesFormatter();
  
  console.log('🧪 测试精简版本的最佳实践输出...\n');
  
  // 测试1: 默认返回精简版
  console.log('=== 测试1: 默认精简版 ===\n');
  const compactData = await service.getBestPractices('Form');
  const compactOutput = formatter.formatBestPractices(compactData);
  console.log('输出长度:', compactOutput.length, '字符');
  console.log('输出预览:\n', compactOutput.substring(0, 1000), '\n...\n');
  
  // 测试2: 获取完整版
  console.log('\n=== 测试2: 完整版 (category="all") ===\n');
  const fullData = await service.getBestPractices('Form', 'all');
  const fullOutput = formatter.formatBestPractices(fullData);
  console.log('输出长度:', fullOutput.length, '字符');
  console.log('长度对比: 精简版', compactOutput.length, 'vs 完整版', fullOutput.length);
  console.log('压缩比例:', Math.round((1 - compactOutput.length / fullOutput.length) * 100) + '%');
  
  // 测试3: 只获取推荐实践
  console.log('\n=== 测试3: 只获取推荐实践 ===\n');
  const recommendedData = await service.getBestPractices('Form', 'recommended');
  const recommendedOutput = formatter.formatBestPractices(recommendedData);
  console.log('输出长度:', recommendedOutput.length, '字符');
}

test().catch(console.error);