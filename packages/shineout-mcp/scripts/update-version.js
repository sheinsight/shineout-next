#!/usr/bin/env node

/**
 * 更新 version.ts 文件中的版本号
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

// 生成 version.ts 内容
const versionContent = `// This file is auto-generated during build
// DO NOT EDIT MANUALLY
export const VERSION = '${version}';`;

// 写入 version.ts
const versionPath = path.join(__dirname, '..', 'src', 'version.ts');
fs.writeFileSync(versionPath, versionContent, 'utf-8');

console.log(`✅ Updated version to ${version}`);