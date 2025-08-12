import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentProp } from '../types/index.js';

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
  jsDocTags?: { [key: string]: string };
}

export class PropsExtractor {
  private program: ts.Program;
  private checker: ts.TypeChecker;

  constructor(private rootPath: string) {
    // 创建 TypeScript 程序，包含所有相关的包
    const configPath = path.join(rootPath, 'tsconfig.json');
    
    // 如果没有根目录的 tsconfig，使用默认配置
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true,
      declaration: true,
    };

    // 收集所有需要分析的文件
    const fileNames = this.collectTypeScriptFiles();
    
    this.program = ts.createProgram(fileNames, compilerOptions);
    this.checker = this.program.getTypeChecker();
  }

  /**
   * 提取指定组件的 Props 信息
   */
  async extractComponentProps(componentName: string): Promise<ComponentProp[]> {
    try {
      console.log(`开始提取 ${componentName} 组件的 Props...`);
      
      // 1. 从 shineout interface.ts 获取最终属性
      const finalProps = await this.extractFromShineoutInterface(componentName);
      
      // 2. 从 hooks/base 获取详细注释
      const detailedProps = await this.extractFromHooksBase(componentName);
      
      // 3. 合并信息
      const mergedProps = this.mergePropsInfo(finalProps, detailedProps);
      
      console.log(`✅ 成功提取 ${componentName} 的 ${mergedProps.length} 个属性`);
      return mergedProps;
      
    } catch (error) {
      console.error(`❌ 提取 ${componentName} Props 失败:`, error);
      return [];
    }
  }

  /**
   * 从 shineout/src/[component]/interface.ts 提取最终属性
   */
  private async extractFromShineoutInterface(componentName: string): Promise<PropInfo[]> {
    // 先查找 component.type.ts 文件（实际的类型定义）
    const typeFilePath = path.join(
      this.rootPath, 
      'packages/shineout/src', 
      componentName.toLowerCase(), 
      `${componentName.toLowerCase()}.type.ts`
    );

    if (!fs.existsSync(typeFilePath)) {
      console.warn(`Type file not found: ${typeFilePath}`);
      return [];
    }

    console.log(`📄 分析 shineout 类型文件: ${typeFilePath}`);
    
    // 解析文件内容，查找过滤规则
    const fileContent = fs.readFileSync(typeFilePath, 'utf-8');
    const omitRules = this.parseOmitRules(fileContent, componentName);
    
    console.log(`🔍 发现过滤规则:`, omitRules);
    
    return omitRules;
  }

  /**
   * 解析 Omit 规则 - 支持多种复杂模式
   */
  private parseOmitRules(fileContent: string, componentName: string): PropInfo[] {
    const props: PropInfo[] = [];
    const omittedProps: string[] = [];
    
    // 模式1: export type ComponentProps = Omit<...>
    const typeOmitPattern = new RegExp(
      `export type ${componentName}Props = Omit<[^,]+,\\s*([^>]+)>`,
      'i'
    );
    
    // 模式2: export interface ComponentProps<T> extends Omit<...>
    const interfaceOmitPattern = new RegExp(
      `export interface ${componentName}Props[^{]*extends\\s+Omit<[^,]+,\\s*([^>]+)>`,
      'i'
    );
    
    // 模式3: 查找所有 Omit 出现的地方
    const allOmitPatterns = [
      new RegExp(`${componentName}Props[^=]*=\\s*Omit<[^,]+,\\s*([^>]+)>`, 'gi'),
      new RegExp(`${componentName}Props[^{]*extends\\s+Omit<[^,]+,\\s*([^>]+)>`, 'gi'),
      // 兼容小写组件名
      new RegExp(`${componentName.toLowerCase()}Props[^=]*=\\s*Omit<[^,]+,\\s*([^>]+)>`, 'gi'),
      new RegExp(`${componentName.toLowerCase()}Props[^{]*extends\\s+Omit<[^,]+,\\s*([^>]+)>`, 'gi'),
    ];
    
    // 尝试所有模式
    for (const pattern of allOmitPatterns) {
      let match;
      while ((match = pattern.exec(fileContent)) !== null) {
        const omittedPropsStr = match[1];
        const parsed = this.parseOmittedPropsString(omittedPropsStr);
        omittedProps.push(...parsed);
      }
    }
    
    // 去重
    const uniqueOmittedProps = [...new Set(omittedProps)];
    
    if (uniqueOmittedProps.length > 0) {
      console.log(`📋 ${componentName} 组件排除的属性:`, uniqueOmittedProps);
      
      // 返回排除规则信息，实际属性将在合并时处理
      return [{
        name: '__OMIT_RULES__',
        type: 'internal',
        required: false,
        description: '',
        jsDocTags: { omittedProps: uniqueOmittedProps.join(',') },
      }];
    }
    
    // 如果没有找到 Omit 规则，可能是直接的接口定义
    return [];
  }

  /**
   * 解析 Omit 中排除的属性字符串
   */
  private parseOmittedPropsString(omittedPropsStr: string): string[] {
    const props: string[] = [];
    
    // 处理字符串联合类型，例如: 'jssStyle' | 'renderButton' | 'buttonRef'
    const parts = omittedPropsStr.split('|');
    
    for (const part of parts) {
      const cleaned = part.trim().replace(/^['"]|['"]$/g, '');
      if (cleaned && cleaned !== '') {
        props.push(cleaned);
      }
    }
    
    return props;
  }

  /**
   * 从 hooks/base 包提取详细的 JSDoc 注释
   */
  private async extractFromHooksBase(componentName: string): Promise<PropInfo[]> {
    // 查找 hooks 包中的类型定义
    const hooksPath = path.join(
      this.rootPath,
      'packages/hooks/src/components',
      `use-${componentName.toLowerCase()}`,
      `use-${componentName.toLowerCase()}.type.ts`
    );

    const basePath = path.join(
      this.rootPath,
      'packages/base/src',
      componentName.toLowerCase(),
      `${componentName.toLowerCase()}.type.ts`
    );

    const props: PropInfo[] = [];

    // 尝试从 hooks 包提取
    if (fs.existsSync(hooksPath)) {
      console.log(`📄 分析 hooks 类型文件: ${hooksPath}`);
      const hooksProps = await this.extractPropsFromFile(hooksPath);
      props.push(...hooksProps);
    }

    // 尝试从 base 包提取
    if (fs.existsSync(basePath)) {
      console.log(`📄 分析 base 类型文件: ${basePath}`);
      const baseProps = await this.extractPropsFromFile(basePath);
      props.push(...baseProps);
    }

    return props;
  }

  /**
   * 从指定文件提取 Props
   */
  private async extractPropsFromFile(filePath: string): Promise<PropInfo[]> {
    const sourceFile = this.program.getSourceFile(filePath);
    if (!sourceFile) {
      console.warn(`无法解析源文件: ${filePath}`);
      return [];
    }

    const props: PropInfo[] = [];
    
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
        const name = node.name.text;
        
        // 查找相关的属性接口
        if (name.includes('Props') || name.includes('Base')) {
          console.log(`🔍 分析接口: ${name}`);
          const extractedProps = this.extractPropsFromType(node);
          props.push(...extractedProps);
        }
      }
    });

    return props;
  }

  /**
   * 从最终类型节点提取属性信息（考虑 Omit, Pick 等工具类型）
   */
  private extractFinalPropsFromType(node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): PropInfo[] {
    const props: PropInfo[] = [];

    try {
      // 使用 checker 获取类型的实际结构
      const type = this.checker.getTypeAtLocation(node);
      const symbol = type.getSymbol();
      
      if (!symbol) {
        console.warn(`无法获取类型 ${node.name.text} 的 symbol`);
        return props;
      }

      // 获取类型的所有属性
      const properties = this.checker.getPropertiesOfType(type);
      
      for (const property of properties) {
        const propInfo = this.extractPropInfoFromSymbol(property);
        if (propInfo) {
          props.push(propInfo);
        }
      }
    } catch (error) {
      console.warn(`解析类型 ${node.name.text} 失败:`, error);
      
      // 如果 checker 解析失败，回退到直接解析接口
      if (ts.isInterfaceDeclaration(node)) {
        for (const member of node.members) {
          if (ts.isPropertySignature(member)) {
            const prop = this.extractPropFromPropertySignature(member);
            if (prop) {
              props.push(prop);
            }
          }
        }
      }
    }

    return props;
  }

  /**
   * 从 Symbol 提取属性信息
   */
  private extractPropInfoFromSymbol(symbol: ts.Symbol): PropInfo | null {
    const name = symbol.getName();
    
    // 获取属性的类型
    const type = this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    const typeString = this.checker.typeToString(type);
    
    // 检查是否为可选属性
    const required = !(symbol.flags & ts.SymbolFlags.Optional);
    
    // 尝试获取 JSDoc 注释
    let description = '';
    let defaultValue: string | undefined;
    
    const jsDocTags = symbol.getJsDocTags(this.checker);
    for (const tag of jsDocTags) {
      if (tag.name === 'cn' && tag.text) {
        description = tag.text.map(t => t.text).join('');
      } else if (tag.name === 'default' && tag.text) {
        defaultValue = tag.text.map(t => t.text).join('');
      }
    }
    
    // 如果没有中文描述，尝试获取注释
    if (!description) {
      const comment = symbol.getDocumentationComment(this.checker);
      if (comment.length > 0) {
        description = comment.map(c => c.text).join('');
      }
    }

    return {
      name,
      type: typeString,
      required,
      defaultValue,
      description: description.trim(),
      jsDocTags: {},
    };
  }

  /**
   * 从类型节点提取属性信息（备用方法）
   */
  private extractPropsFromType(node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): PropInfo[] {
    const props: PropInfo[] = [];

    if (ts.isInterfaceDeclaration(node)) {
      // 处理接口声明
      for (const member of node.members) {
        if (ts.isPropertySignature(member)) {
          const prop = this.extractPropFromPropertySignature(member);
          if (prop) {
            props.push(prop);
          }
        }
      }
    }

    return props;
  }

  /**
   * 从属性签名提取属性信息
   */
private extractPropFromPropertySignature(member: ts.PropertySignature): PropInfo | null {
    if (!member.name || !ts.isIdentifier(member.name)) {
      return null;
    }

    const name = member.name.text;
    const required = !member.questionToken;
    
    // 获取类型信息
    let type = 'unknown';
    if (member.type) {
      type = this.getTypeString(member.type);
    }

    // 提取 JSDoc 注释
    const jsDocTags: { [key: string]: string } = {};
    let description = '';
    let defaultValue: string | undefined;

    const jsDoc = ts.getJSDocCommentsAndTags(member);
    for (const doc of jsDoc) {
      if (ts.isJSDoc(doc)) {
        // 提取主要描述
        if (doc.comment) {
          if (typeof doc.comment === 'string') {
            description = doc.comment;
          } else {
            // 处理复合注释
            description = doc.comment.map(part => {
              if (typeof part === 'string') return part;
              return part.text;
            }).join('');
          }
        }

        // 提取标签
        if (doc.tags) {
          for (const tag of doc.tags) {
            const tagName = tag.tagName.text;
            let tagValue = '';
            
            if (tag.comment) {
              if (typeof tag.comment === 'string') {
                tagValue = tag.comment;
              } else {
                tagValue = tag.comment.map(part => {
                  if (typeof part === 'string') return part;
                  return part.text;
                }).join('');
              }
            }

            jsDocTags[tagName] = tagValue;

            // 特殊处理
            if (tagName === 'cn') {
              description = tagValue; // 优先使用中文描述
            } else if (tagName === 'default') {
              defaultValue = tagValue;
            }
          }
        }
      }
    }

    return {
      name,
      type,
      required,
      defaultValue,
      description: description.trim(),
      jsDocTags,
    };
  }

  /**
   * 获取类型的字符串表示
   */
  private getTypeString(typeNode: ts.TypeNode): string {
    if (ts.isLiteralTypeNode(typeNode)) {
      return typeNode.literal.getText();
    }
    
    if (ts.isUnionTypeNode(typeNode)) {
      return typeNode.types.map(t => this.getTypeString(t)).join(' | ');
    }
    
    if (ts.isTypeReferenceNode(typeNode)) {
      let typeName = typeNode.typeName.getText();
      if (typeNode.typeArguments) {
        const args = typeNode.typeArguments.map(arg => this.getTypeString(arg)).join(', ');
        typeName += `<${args}>`;
      }
      return typeName;
    }

    // 默认返回节点的文本表示
    return typeNode.getText();
  }

  /**
   * 合并来自不同源的属性信息
   */
  private mergePropsInfo(finalProps: PropInfo[], detailedProps: PropInfo[]): ComponentProp[] {
    const propMap = new Map<string, ComponentProp>();

    // 查找 Omit 规则
    let omittedProps: string[] = [];
    const omitRule = finalProps.find(p => p.name === '__OMIT_RULES__');
    if (omitRule && omitRule.jsDocTags?.omittedProps) {
      omittedProps = omitRule.jsDocTags.omittedProps.split(',');
      console.log(`🚫 将排除属性: ${omittedProps.join(', ')}`);
    }

    // 从详细属性中构建最终属性列表，排除被 Omit 的属性
    for (const detailedProp of detailedProps) {
      // 跳过被排除的属性
      if (omittedProps.includes(detailedProp.name)) {
        console.log(`🚫 排除内部属性: ${detailedProp.name}`);
        continue;
      }

      propMap.set(detailedProp.name, {
        name: detailedProp.name,
        type: detailedProp.type,
        required: detailedProp.required,
        defaultValue: detailedProp.defaultValue,
        description: detailedProp.description || '',
      });
    }

    // 如果没有 Omit 规则，按原有逻辑处理
    if (omittedProps.length === 0) {
      // 首先添加最终属性（来自 interface.ts）
      for (const prop of finalProps) {
        if (prop.name === '__OMIT_RULES__') continue;
        
        propMap.set(prop.name, {
          name: prop.name,
          type: prop.type,
          required: prop.required,
          defaultValue: prop.defaultValue,
          description: prop.description || '',
        });
      }

      // 然后用详细信息补充（来自 hooks/base）
      for (const detailedProp of detailedProps) {
        const existing = propMap.get(detailedProp.name);
        if (existing) {
          // 合并信息，优先使用更详细的描述
          if (detailedProp.description && detailedProp.description.length > existing.description.length) {
            existing.description = detailedProp.description;
          }
          if (detailedProp.defaultValue && !existing.defaultValue) {
            existing.defaultValue = detailedProp.defaultValue;
          }
        } else {
          // 如果在最终属性中没有找到，也添加进去（可能是继承的属性）
          propMap.set(detailedProp.name, {
            name: detailedProp.name,
            type: detailedProp.type,
            required: detailedProp.required,
            defaultValue: detailedProp.defaultValue,
            description: detailedProp.description || '',
          });
        }
      }
    }

    return Array.from(propMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * 收集所有需要分析的 TypeScript 文件
   */
  private collectTypeScriptFiles(): string[] {
    const files: string[] = [];
    
    // 收集 shineout 包的文件
    const shineoutSrc = path.join(this.rootPath, 'packages/shineout/src');
    if (fs.existsSync(shineoutSrc)) {
      this.collectTsFiles(shineoutSrc, files);
    }

    // 收集 base 包的文件
    const baseSrc = path.join(this.rootPath, 'packages/base/src');
    if (fs.existsSync(baseSrc)) {
      this.collectTsFiles(baseSrc, files);
    }

    // 收集 hooks 包的文件
    const hooksSrc = path.join(this.rootPath, 'packages/hooks/src');
    if (fs.existsSync(hooksSrc)) {
      this.collectTsFiles(hooksSrc, files);
    }

    return files;
  }

  /**
   * 递归收集 TypeScript 文件
   */
  private collectTsFiles(dir: string, files: string[]): void {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        files.push(fullPath);
      } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
        this.collectTsFiles(fullPath, files);
      }
    }
  }
}