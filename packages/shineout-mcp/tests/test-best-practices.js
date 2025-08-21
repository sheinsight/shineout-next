#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 测试 Shineout MCP 最佳实践功能...\n');

// 启动 MCP 服务器
const serverPath = path.join(__dirname, 'dist', 'server', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// 捕获服务器输出
let output = '';
server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  console.error('Server stderr:', data.toString());
});

// 等待服务器启动
setTimeout(() => {
  console.log('发送测试请求...\n');
  
  // 测试请求1：获取 Form 组件的最佳实践
  const testRequest1 = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'get_best_practices',
      arguments: {
        component: 'Form'
      }
    }
  };
  
  // 测试请求2：获取所有组件的最佳实践摘要
  const testRequest2 = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'get_best_practices',
      arguments: {
        component: 'all'
      }
    }
  };
  
  // 测试请求3：只获取推荐实践
  const testRequest3 = {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'get_best_practices',
      arguments: {
        component: 'Form',
        category: 'recommended'
      }
    }
  };
  
  // 发送测试请求
  server.stdin.write(JSON.stringify(testRequest1) + '\n');
  
  setTimeout(() => {
    server.stdin.write(JSON.stringify(testRequest2) + '\n');
  }, 500);
  
  setTimeout(() => {
    server.stdin.write(JSON.stringify(testRequest3) + '\n');
  }, 1000);
  
  // 等待响应并关闭
  setTimeout(() => {
    console.log('测试响应:\n');
    console.log(output);
    
    server.kill();
    console.log('\n✅ 测试完成！');
  }, 2000);
}, 1000);

server.on('error', (err) => {
  console.error('服务器启动失败:', err);
  process.exit(1);
});