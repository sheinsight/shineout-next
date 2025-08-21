#!/usr/bin/env node

/**
 * 显示 Button 组件的完整文档
 */

import { ComponentService } from './dist/tools/component-service.js';
import { loadComponentData } from './dist/data/loader.js';

async function showButtonDoc() {
  console.log('📋 显示 Button 组件完整文档:\n');
  
  try {
    await loadComponentData();
    const service = new ComponentService();
    const result = await service.getComponent('Button');
    
    console.log(result.content[0].text);
    
  } catch (error) {
    console.error('❌ 获取文档失败:', error);
  }
}

showButtonDoc();