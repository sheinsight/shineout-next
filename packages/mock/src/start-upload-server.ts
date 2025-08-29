#!/usr/bin/env ts-node

/**
 * Mock 上传服务启动脚本
 * 用于本地测试 Upload 组件
 */

// 直接导入避免通过 index.ts
const { startServer } = require('../server/upload-server');

console.log('🚀 启动 Mock 上传服务...');
startServer();