import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentTips {
  componentName: string;
  tips: string[];
  submitFlow?: {
    description: string;
    steps: string[];
    keyPoints: string[];
  };
  validateFlow?: {
    description: string;
    steps: string[];
    keyPoints: string[];
  };
  dataFlow?: {
    description: string;
    hooks: string[];
    contextStructure?: any;
    updateMechanism?: string[];
  };
}

export class TipsService {
  private tipsCache: Map<string, ComponentTips> = new Map();
  
  /**
   * 获取组件的 tips 信息
   */
  async getComponentTips(componentName: string): Promise<ComponentTips | null> {
    // 检查缓存
    if (this.tipsCache.has(componentName)) {
      return this.tipsCache.get(componentName)!;
    }
    
    // 构建组件 tips 文件路径
    const componentsPath = path.join(__dirname, '../../../../shineout/src');
    const componentPath = path.join(componentsPath, componentName.toLowerCase());
    const tipsPath = path.join(componentPath, '__mcp__/tips.json');
    
    // 检查文件是否存在
    if (!fs.existsSync(tipsPath)) {
      return null;
    }
    
    try {
      const content = fs.readFileSync(tipsPath, 'utf-8');
      const tips = JSON.parse(content);
      
      // 缓存结果
      this.tipsCache.set(componentName, tips);
      
      return tips;
    } catch (error) {
      console.error(`Failed to load tips for ${componentName}:`, error);
      return null;
    }
  }
  
  /**
   * 获取所有有 tips 的组件列表
   */
  async listComponentsWithTips(): Promise<string[]> {
    const componentsPath = path.join(__dirname, '../../../../shineout/src');
    const components: string[] = [];
    
    try {
      const dirs = fs.readdirSync(componentsPath, { withFileTypes: true });
      
      for (const dir of dirs) {
        if (dir.isDirectory()) {
          const tipsPath = path.join(componentsPath, dir.name, '__mcp__/tips.json');
          if (fs.existsSync(tipsPath)) {
            // 读取文件获取正确的组件名
            try {
              const content = fs.readFileSync(tipsPath, 'utf-8');
              const tips = JSON.parse(content);
              if (tips.componentName) {
                components.push(tips.componentName);
              }
            } catch {
              // 如果解析失败，使用目录名
              components.push(dir.name);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to list components with tips:', error);
    }
    
    return components.sort();
  }
  
  /**
   * 获取所有组件的 tips 摘要
   */
  async getAllTipsSummary(): Promise<any> {
    const components = await this.listComponentsWithTips();
    const summary: any = {
      totalComponents: components.length,
      components: components,
      details: {}
    };
    
    for (const component of components) {
      const tips = await this.getComponentTips(component);
      if (tips) {
        summary.details[component] = {
          tipsCount: tips.tips?.length || 0,
          hasSubmitFlow: !!tips.submitFlow,
          hasValidateFlow: !!tips.validateFlow,
          hasDataFlow: !!tips.dataFlow
        };
      }
    }
    
    return summary;
  }
}