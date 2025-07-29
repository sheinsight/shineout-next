import * as fs from 'fs';
import * as path from 'path';
import { ComponentProp } from '../types/index.js';

export interface DocsApiData {
  title: string;
  properties: Array<{
    name: string;
    tag: {
      cn: string;
      en: string;
      default: string;
      version: string;
    };
    required: boolean;
    type: string;
  }>;
  cn?: string;
  en?: string;
  sort?: string;
}

export class DocsParser {
  private docsPath: string;

  constructor(rootPath: string) {
    this.docsPath = path.join(rootPath, 'docs/api/shineout');
  }

  /**
   * 从文档文件中提取组件 Props
   */
  async extractComponentProps(componentName: string): Promise<ComponentProp[]> {
    try {
      console.log(`📖 从文档提取 ${componentName} 组件的 Props...`);
      
      // 构建文档文件路径（kebab-case）
      const fileName = this.toKebabCase(componentName) + '.ts';
      const filePath = path.join(this.docsPath, fileName);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  文档文件不存在: ${filePath}`);
        return [];
      }
      
      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      // 提取 JSON 数据
      const jsonMatch = fileContent.match(/JSON\.parse\('(.+)'\)/);
      if (!jsonMatch) {
        console.warn(`⚠️  无法从文档文件中提取 JSON 数据: ${filePath}`);
        return [];
      }
      
      // 解析 JSON
      const apiData: DocsApiData[] = JSON.parse(jsonMatch[1]);
      
      // 查找主组件的数据（第一个，或者标题匹配的）
      const mainComponent = apiData.find(item => 
        item.title === componentName || 
        item.title.split('.')[0] === componentName
      ) || apiData[0];
      
      if (!mainComponent) {
        console.warn(`⚠️  文档中未找到 ${componentName} 的数据`);
        return [];
      }
      
      // 转换为 ComponentProp 格式
      const props: ComponentProp[] = mainComponent.properties.map(prop => ({
        name: prop.name,
        type: this.cleanType(prop.type),
        required: prop.required,
        defaultValue: prop.tag.default || undefined,
        description: prop.tag.cn || prop.tag.en || '',
      }));
      
      console.log(`✅ 成功从文档提取 ${componentName} 的 ${props.length} 个属性`);
      return props;
      
    } catch (error) {
      console.error(`❌ 从文档提取 ${componentName} Props 失败:`, error);
      return [];
    }
  }
  
  /**
   * 清理类型字符串
   */
  private cleanType(type: string): string {
    // 移除多余的空格和转义字符
    return type
      .replace(/\\\"/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  /**
   * 转换为 kebab-case
   */
  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
  
  /**
   * 列出所有可用的文档文件
   */
  listAvailableComponents(): string[] {
    try {
      const files = fs.readdirSync(this.docsPath);
      return files
        .filter(f => f.endsWith('.ts'))
        .map(f => f.replace('.ts', ''))
        .map(f => this.toPascalCase(f));
    } catch (error) {
      console.error('❌ 无法读取文档目录:', error);
      return [];
    }
  }
  
  /**
   * 转换为 PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }
}