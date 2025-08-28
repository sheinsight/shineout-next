#!/usr/bin/env node

/**
 * 从 shineout 源码收集组件的 className 信息和测试快照渲染结构
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 解析测试快照文件，提取渲染结构
 */
function parseSnapshotFile(content) {
  const structures = [];
  
  // 匹配每个导出的快照
  const exportRegex = /exports\[`([^`]+)`\] = `([\s\S]*?)`;/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    const [, scenario, htmlContent] = match;
    
    // 提取使用的 className
    const classNameRegex = /class="([^"]+)"/g;
    const usedClassNames = new Set();
    let classMatch;
    
    while ((classMatch = classNameRegex.exec(htmlContent)) !== null) {
      const classes = classMatch[1].split(/\s+/);
      classes.forEach(cls => {
        if (cls.startsWith('soui-')) {
          usedClassNames.add(cls);
        }
      });
    }

    // 清理和格式化 HTML 结构，只保留关键信息
    const cleanHtml = formatHtmlStructure(htmlContent);
    
    structures.push({
      htmlStructure: cleanHtml,
      usedClassNames: Array.from(usedClassNames).sort()
    });
  }
  
  return structures;
}

/**
 * 格式化 HTML 结构，提取关键的 DOM 结构信息
 */
function formatHtmlStructure(html) {
  // 移除多余的空白和换行
  let formatted = html.replace(/\n\s*/g, '\n').trim();
  
  // 只保留带有 soui- className 的元素结构
  const lines = formatted.split('\n');
  const relevantLines = [];
  let depth = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // 计算缩进深度
    if (trimmed.includes('<') && !trimmed.includes('</')) {
      if (trimmed.includes('class="') && trimmed.includes('soui-')) {
        // 添加缩进
        relevantLines.push('  '.repeat(depth) + extractElementStructure(trimmed));
        depth++;
      } else if (trimmed.startsWith('<div') || trimmed.startsWith('<span') || trimmed.startsWith('<button')) {
        depth++;
      }
    } else if (trimmed.startsWith('</')) {
      depth = Math.max(0, depth - 1);
    }
  }
  
  return relevantLines.join('\n');
}

/**
 * 提取元素的关键结构信息
 */
function extractElementStructure(element) {
  // 提取标签名
  const tagMatch = element.match(/^<(\w+)/);
  const tag = tagMatch ? tagMatch[1] : 'element';
  
  // 提取 className
  const classMatch = element.match(/class="([^"]+)"/);
  const className = classMatch ? classMatch[1] : '';
  
  // 提取其他重要属性
  const typeMatch = element.match(/type="([^"]+)"/);
  const type = typeMatch ? ` type="${typeMatch[1]}"` : '';
  
  const dirMatch = element.match(/dir="([^"]+)"/);
  const dir = dirMatch ? ` dir="${dirMatch[1]}"` : '';
  
  return `<${tag}${className ? ` class="${className}"` : ''}${type}${dir}>`;
}

/**
 * 收集单个组件的 className 信息
 */
async function collectComponentClassNames(componentPath, componentName) {
  const result = {
    component: componentName,
    classNames: [],
    renderStructures: []
  };

  // 1. 读取 className 列表
  const classNamePath = path.join(componentPath, '__mcp__', 'classname.json');
  if (fs.existsSync(classNamePath)) {
    try {
      const content = fs.readFileSync(classNamePath, 'utf-8');
      result.classNames = JSON.parse(content);
    } catch (error) {
      console.warn(`无法读取 ${componentName} 的 className 文件:`, error.message);
    }
  }

  // 2. 解析测试快照
  const testSnapshotsPath = path.join(componentPath, '__test__', '__snapshots__');
  if (fs.existsSync(testSnapshotsPath)) {
    try {
      const snapFiles = fs.readdirSync(testSnapshotsPath).filter(file => file.endsWith('.snap'));
      
      for (const snapFile of snapFiles) {
        const snapPath = path.join(testSnapshotsPath, snapFile);
        const content = fs.readFileSync(snapPath, 'utf-8');
        
        const structures = parseSnapshotFile(content);
        result.renderStructures.push(...structures);
      }
    } catch (error) {
      console.warn(`无法读取 ${componentName} 的测试快照:`, error.message);
    }
  }

  return result;
}

/**
 * 收集所有组件的 className 信息
 */
async function collectAllClassNames() {
  console.log('🎨 开始收集组件 className 信息...');
  
  const rootPath = path.join(__dirname, '..', '..', '..');
  const shineoutSrcPath = path.join(rootPath, 'packages', 'shineout', 'src');
  
  if (!fs.existsSync(shineoutSrcPath)) {
    console.error(`❌ 找不到 shineout 源码路径: ${shineoutSrcPath}`);
    return;
  }

  const components = fs.readdirSync(shineoutSrcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`📋 发现 ${components.length} 个组件目录`);

  const classNameData = {
    lastUpdated: new Date().toISOString(),
    totalComponents: 0,
    componentsWithClassNames: 0,
    componentsWithSnapshots: 0,
    components: {}
  };

  for (const componentName of components) {
    const componentPath = path.join(shineoutSrcPath, componentName);
    
    // 检查是否有 className 文件
    const classNamePath = path.join(componentPath, '__mcp__', 'classname.json');
    if (!fs.existsSync(classNamePath)) {
      continue; // 跳过没有 className 文件的组件
    }

    console.log(`🔍 收集组件: ${componentName}`);
    
    try {
      const componentClassNames = await collectComponentClassNames(componentPath, componentName);
      
      if (componentClassNames.classNames.length > 0 || componentClassNames.renderStructures.length > 0) {
        classNameData.components[componentName] = componentClassNames;
        classNameData.totalComponents++;
        
        if (componentClassNames.classNames.length > 0) {
          classNameData.componentsWithClassNames++;
        }
        
        if (componentClassNames.renderStructures.length > 0) {
          classNameData.componentsWithSnapshots++;
        }
      }
    } catch (error) {
      console.error(`❌ 收集组件 ${componentName} 失败:`, error.message);
    }
  }

  // 保存数据
  const dataDir = path.join(__dirname, '..', 'src', 'data', 'generated');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'classnames.json');
  fs.writeFileSync(outputPath, JSON.stringify(classNameData, null, 2));

  console.log('\\n✅ className 数据收集完成！');
  console.log(`- 总共处理 ${classNameData.totalComponents} 个组件`);
  console.log(`- 有 className 的组件: ${classNameData.componentsWithClassNames}`);
  console.log(`- 有测试快照的组件: ${classNameData.componentsWithSnapshots}`);
  console.log(`- 数据保存至: ${outputPath}`);

  return classNameData;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  collectAllClassNames().catch(console.error);
}

export { collectAllClassNames };