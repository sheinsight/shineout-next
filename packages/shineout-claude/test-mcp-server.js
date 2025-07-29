#!/usr/bin/env node

/**
 * 测试 MCP 服务器功能
 * 
 * 这个脚本模拟 Claude Desktop 与 MCP 服务器的交互
 */

import { spawn } from 'child_process';
import readline from 'readline';

console.log('🧪 测试 Shineout Claude MCP 服务器...\n');

// 启动 MCP 服务器
const server = spawn('node', ['./bin/shineout-claude.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// 创建读取接口
const rl = readline.createInterface({
  input: server.stdout,
  output: process.stdout,
  terminal: false
});

// 监听服务器输出
rl.on('line', (line) => {
  try {
    const message = JSON.parse(line);
    console.log('📥 收到响应:', JSON.stringify(message, null, 2));
  } catch (error) {
    console.log('📥 收到非 JSON 输出:', line);
  }
});

// 监听错误输出
server.stderr.on('data', (data) => {
  console.error('⚠️  服务器日志:', data.toString());
});

// 监听服务器错误
server.on('error', (error) => {
  console.error('❌ 服务器错误:', error);
});

// 发送测试请求
async function sendTestRequests() {
  console.log('📤 发送测试请求...\n');
  
  // 测试 1: 列出工具
  const listToolsRequest = {
    jsonrpc: '2.0',
    method: 'tools/list',
    params: {},
    id: 1
  };
  
  console.log('📤 请求 1: 列出所有工具');
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  
  // 等待一下再发送下一个请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 测试 2: 获取 Button 组件信息
  const getComponentRequest = {
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'get_component',
      arguments: {
        name: 'Button'
      }
    },
    id: 2
  };
  
  console.log('\n📤 请求 2: 获取 Button 组件信息');
  server.stdin.write(JSON.stringify(getComponentRequest) + '\n');
  
  // 等待一下再发送下一个请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 测试 3: 搜索表单组件
  const searchRequest = {
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'search_components',
      arguments: {
        query: '表单'
      }
    },
    id: 3
  };
  
  console.log('\n📤 请求 3: 搜索表单相关组件');
  server.stdin.write(JSON.stringify(searchRequest) + '\n');
  
  // 等待一下再发送下一个请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 测试 4: 列出所有组件
  const listComponentsRequest = {
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'list_components',
      arguments: {
        category: 'form'
      }
    },
    id: 4
  };
  
  console.log('\n📤 请求 4: 列出所有表单组件');
  server.stdin.write(JSON.stringify(listComponentsRequest) + '\n');
  
  // 等待响应
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 关闭服务器
  console.log('\n✅ 测试完成，关闭服务器...');
  server.kill();
}

// 等待服务器启动后发送测试请求
setTimeout(() => {
  sendTestRequests();
}, 1000);

// 设置超时
setTimeout(() => {
  console.log('\n⏱️  测试超时，强制退出...');
  process.exit(1);
}, 10000);