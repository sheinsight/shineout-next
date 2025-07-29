import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { ComponentData, ComponentProp, ComponentExample } from '../types/index.js';

export class ComponentExtractor {
  private shineoutPath: string;
  private basePath: string;
  private hooksPath: string;

  constructor(rootPath: string) {
    this.shineoutPath = path.join(rootPath, 'packages/shineout/src');
    this.basePath = path.join(rootPath, 'packages/base/src');
    this.hooksPath = path.join(rootPath, 'packages/hooks/src');
  }

  /**
   * 提取指定组件的完整信息
   */
  async extractComponent(componentName: string): Promise<ComponentData | null> {
    const componentDir = path.join(this.shineoutPath, componentName.toLowerCase());
    
    if (!fs.existsSync(componentDir)) {
      console.warn(`Component directory not found: ${componentDir}`);
      return null;
    }

    try {
      // 1. 提取基础信息和分类
      const basicInfo = await this.extractBasicInfo(componentDir);
      
      // 2. 提取属性定义
      const props = await this.extractProps(componentName);
      
      // 3. 提取子组件信息
      const subComponents = await this.extractSubComponents(componentDir);
      
      // 4. 提取示例代码
      const examples = await this.extractExamples(componentDir);

      return {
        name: componentName,
        description: basicInfo.description,
        category: this.mapCategory(basicInfo.group),
        importPath: `import { ${componentName} } from 'shineout'`,
        props,
        examples,
        subComponents,
        version: '3.7.7', // TODO: 从 package.json 中提取
      };
    } catch (error) {
      console.error(`Error extracting component ${componentName}:`, error);
      return null;
    }
  }

  /**
   * 从 __doc__/index.md 提取基础信息
   */
  private async extractBasicInfo(componentDir: string): Promise<{
    name: string;
    group: string;
    description: string;
  }> {
    const docPath = path.join(componentDir, '__doc__/index.md');
    
    if (!fs.existsSync(docPath)) {
      throw new Error(`Doc file not found: ${docPath}`);
    }

    const content = fs.readFileSync(docPath, 'utf-8');
    
    // 解析 YAML front matter
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) {
      throw new Error('No front matter found in doc file');
    }

    const frontMatter = frontMatterMatch[1];
    const nameMatch = frontMatter.match(/name:\s*(.+)/);
    const groupMatch = frontMatter.match(/group:\s*(.+)/);
    
    // 提取描述 (# Describe 后的第一行中文描述)
    const describeMatch = content.match(/# Describe\n\n([^\n]+)/);
    
    return {
      name: nameMatch?.[1]?.trim() || '',
      group: groupMatch?.[1]?.trim() || '',
      description: describeMatch?.[1]?.trim() || '',
    };
  }

  /**
   * 提取组件属性定义
   */
  private async extractProps(componentName: string): Promise<ComponentProp[]> {
    try {
      // 使用文档解析器
      const { DocsParser } = await import('./docs-parser.js');
      const docsParser = new DocsParser(path.join(this.shineoutPath, '../../..'));
      
      const props = await docsParser.extractComponentProps(componentName);
      return props;
    } catch (error) {
      console.error(`提取 ${componentName} Props 失败:`, error);
      return [];
    }
  }

  /**
   * 提取子组件信息
   */
  private async extractSubComponents(componentDir: string): Promise<string[]> {
    const indexPath = path.join(componentDir, 'index.ts');
    
    if (!fs.existsSync(indexPath)) {
      return [];
    }

    const content = fs.readFileSync(indexPath, 'utf-8');
    
    // 解析导出的子组件，如 Button.Group, Input.Password 等
    const subComponents: string[] = [];
    
    // 查找接口定义中的子组件
    const interfaceMatch = content.match(/export interface \w+Component[\s\S]*?\{([\s\S]*?)\}/);
    if (interfaceMatch) {
      const interfaceBody = interfaceMatch[1];
      const subComponentMatches = interfaceBody.matchAll(/(\w+):\s*typeof/g);
      
      for (const match of subComponentMatches) {
        const subComponentName = match[1];
        if (!['displayName'].includes(subComponentName)) {
          subComponents.push(subComponentName);
        }
      }
    }
    
    return subComponents;
  }

  /**
   * 提取示例代码
   */
  private async extractExamples(componentDir: string): Promise<ComponentExample[]> {
    const exampleDir = path.join(componentDir, '__example__');
    
    if (!fs.existsSync(exampleDir)) {
      return [];
    }

    const examples: ComponentExample[] = [];
    const files = fs.readdirSync(exampleDir)
      .filter(f => f.endsWith('.tsx'))
      .filter(f => !f.startsWith('test-')) // 排除测试文件
      .sort(); // 排序以保证顺序一致
    
    console.log(`  📝 发现 ${files.length} 个示例文件`);
    
    for (const file of files) {
      const filePath = path.join(exampleDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 提取注释中的标题和描述
      const commentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
      let title = file.replace('.tsx', '');
      let description = '';
      let scenario: ComponentExample['scenario'] = 'basic';
      
      if (commentMatch) {
        const comment = commentMatch[1];
        const titleMatch = comment.match(/cn\s*-\s*([^\n]+)/);
        const descMatch = comment.match(/--\s*([^\n]+)/);
        
        if (titleMatch) title = titleMatch[1].trim();
        if (descMatch) description = descMatch[1].trim();
      }
      
      // 根据文件名判断场景
      if (file.includes('validate') || file.includes('rules')) scenario = 'validation';
      else if (file.includes('advanced') || file.includes('complex')) scenario = 'advanced';
      else if (file.includes('form')) scenario = 'form';
      else if (file.match(/^s?\d+-/)) {
        // 处理编号文件，如 01-base.tsx, s-01-base.tsx
        const orderMatch = file.match(/^s?(\d+)-/);
        if (orderMatch) {
          const order = parseInt(orderMatch[1]);
          if (order <= 3) scenario = 'basic';
          else if (order <= 6) scenario = 'advanced';
          else scenario = 'advanced';
        }
      }
      
      examples.push({
        title,
        description,
        scenario,
        code: content,
      });
    }
    
    console.log(`  ✅ 成功提取 ${examples.length} 个示例`);
    return examples;
  }

  /**
   * 映射分类名称
   */
  private mapCategory(group: string): ComponentData['category'] {
    const mapping: Record<string, ComponentData['category']> = {
      'Form': 'form',
      'Data': 'display', 
      'Layout': 'layout',
      'Feedback': 'feedback',
      'Navigation': 'navigation',
      'General': 'other',
      'Other': 'other',
    };
    
    return mapping[group] || 'other';
  }

  /**
   * 获取所有组件列表
   */
  async getAllComponents(): Promise<string[]> {
    const indexPath = path.join(this.shineoutPath, 'index.ts');
    const content = fs.readFileSync(indexPath, 'utf-8');
    
    const components: string[] = [];
    const exportMatches = content.matchAll(/export \{ default as (\w+) \}/g);
    
    for (const match of exportMatches) {
      components.push(match[1]);
    }
    
    return components;
  }
}