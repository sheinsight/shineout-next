#!/usr/bin/env node

/**
 * Shineout MCP Server
 * 
 * 这是 shineout-mcp 的可执行入口文件
 * 用户通过 `npx shineout-mcp` 或全局安装后运行此文件
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// 获取当前文件的目录（ESM 中没有 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MCP 服务器入口点
const serverPath = path.join(__dirname, '..', 'dist', 'server', 'index.js');

// 启动 MCP 服务器
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production'
  }
});

server.on('error', (error) => {
  console.error('Failed to start shineout-mcp server:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  process.exit(code || 0);
});

// 处理进程信号
process.on('SIGINT', () => {
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});