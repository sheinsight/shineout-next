#!/usr/bin/env node

/**
 * 调试 Button 类型解析
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function debugButtonType() {
  console.log('🔍 调试 Button 类型解析...\n');
  
  const rootPath = path.join(__dirname, '..', '..');
  const buttonTypePath = path.join(rootPath, 'packages/shineout/src/button/button.type.ts');
  
  console.log('📄 读取文件:', buttonTypePath);
  const sourceCode = fs.readFileSync(buttonTypePath, 'utf-8');
  console.log('📄 文件内容:');
  console.log(sourceCode);
  
  console.log('\n🔍 解析类型定义...');
  
  // 创建简单的 TypeScript 程序
  const compilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
  };
  
  const program = ts.createProgram([buttonTypePath], compilerOptions);
  const sourceFile = program.getSourceFile(buttonTypePath);
  
  if (sourceFile) {
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isTypeAliasDeclaration(node)) {
        console.log(`📋 找到类型别名: ${node.name.text}`);
        console.log(`📄 类型定义: ${node.type.getText()}`);
        
        if (node.name.text === 'ButtonProps') {
          console.log('\n🎯 这是 ButtonProps 定义!');
          console.log('类型种类:', ts.SyntaxKind[node.type.kind]);
          
          // 分析 Omit 类型
          if (ts.isTypeReferenceNode(node.type)) {
            console.log('这是一个类型引用');
            console.log('类型名称:', node.type.typeName.getText());
            
            if (node.type.typeArguments) {
              console.log('类型参数:');
              node.type.typeArguments.forEach((arg, i) => {
                console.log(`  参数 ${i}: ${arg.getText()}`);
              });
            }
          }
        }
      }
    });
  }
}

debugButtonType();