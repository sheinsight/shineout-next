import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BestPractice {
  title: string;
  description: string;
  code: string;
}

interface ComponentBestPractices {
  componentName: string;
  version: string;
  lastUpdated: string;
  bestPractices: {
    recommended: BestPractice[];
    notRecommended: BestPractice[];
  };
  apiHighlights?: any;
  commonScenarios?: any[];
  tips?: string[];
  references?: string[];
}

export class BestPracticesService {
  private bestPracticesData: Map<string, ComponentBestPractices> = new Map();
  private loaded = false;

  private async loadBestPractices() {
    if (this.loaded) return;

    try {
      const dataPath = path.join(__dirname, '../../data/best-practices');
      
      // 加载索引文件
      const indexPath = path.join(dataPath, 'index.json');
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        const index = JSON.parse(indexContent);
        
        // 加载每个组件的最佳实践
        for (const componentName of index.components || []) {
          const filePath = path.join(dataPath, `${componentName.toLowerCase()}.json`);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const bestPractices = JSON.parse(content);
            this.bestPracticesData.set(componentName, bestPractices);
          }
        }
      }
      
      // 也尝试加载 all-best-practices.json
      const allPath = path.join(dataPath, 'all-best-practices.json');
      if (fs.existsSync(allPath)) {
        const content = fs.readFileSync(allPath, 'utf-8');
        const allBestPractices = JSON.parse(content);
        for (const [name, data] of Object.entries(allBestPractices)) {
          if (!this.bestPracticesData.has(name)) {
            this.bestPracticesData.set(name, data as ComponentBestPractices);
          }
        }
      }
      
      this.loaded = true;
    } catch (error) {
      console.error('Failed to load best practices:', error);
      this.loaded = true; // 防止重复加载
    }
  }

  async getBestPractices(componentName: string, category?: string): Promise<ComponentBestPractices | null> {
    await this.loadBestPractices();
    
    if (componentName.toLowerCase() === 'all') {
      // 返回所有组件的最佳实践摘要
      const summary: any = {
        componentName: 'All Components',
        components: Array.from(this.bestPracticesData.keys()),
        totalComponents: this.bestPracticesData.size,
        summary: {}
      };
      
      for (const [name, data] of this.bestPracticesData.entries()) {
        summary.summary[name] = {
          recommendedCount: data.bestPractices?.recommended?.length || 0,
          notRecommendedCount: data.bestPractices?.notRecommended?.length || 0,
          scenariosCount: data.commonScenarios?.length || 0,
          tipsCount: data.tips?.length || 0,
        };
      }
      
      return summary;
    }
    
    const data = this.bestPracticesData.get(componentName);
    if (!data) return null;
    
    // 如果指定了类别，过滤数据
    if (category && category !== 'all') {
      const filtered: ComponentBestPractices = {
        ...data,
        bestPractices: {
          recommended: category === 'recommended' ? data.bestPractices.recommended : [],
          notRecommended: category === 'not-recommended' ? data.bestPractices.notRecommended : [],
        },
        commonScenarios: category === 'scenarios' ? data.commonScenarios : undefined,
        tips: category === 'tips' ? data.tips : undefined,
      };
      
      // 清理未选择的字段
      if (category !== 'scenarios') delete filtered.commonScenarios;
      if (category !== 'tips') delete filtered.tips;
      if (category === 'scenarios' || category === 'tips') {
        filtered.bestPractices = { recommended: [], notRecommended: [] };
      }
      
      return filtered;
    }
    
    return data;
  }

  async listAvailableComponents(): Promise<string[]> {
    await this.loadBestPractices();
    return Array.from(this.bestPracticesData.keys());
  }
}