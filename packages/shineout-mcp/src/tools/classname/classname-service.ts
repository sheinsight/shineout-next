import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ComponentClassNameInfo {
  component: string;
  classNames: string[];
  renderStructures: ComponentRenderStructure[];
}

export interface ComponentRenderStructure {
  htmlStructure: string;
  usedClassNames: string[];
}

interface ClassNameData {
  lastUpdated: string;
  totalComponents: number;
  componentsWithClassNames: number;
  componentsWithSnapshots: number;
  components: Record<string, ComponentClassNameInfo>;
}

export class ClassNameService {
  private classNameData: ClassNameData | null = null;
  private dataPath: string;

  constructor() {
    // 使用生成的数据文件
    this.dataPath = path.join(__dirname, '../../data/generated/classnames.json');
  }

  /**
   * 延迟加载 className 数据
   */
  private loadClassNameData(): ClassNameData {
    if (this.classNameData) {
      return this.classNameData;
    }

    try {
      if (fs.existsSync(this.dataPath)) {
        const content = fs.readFileSync(this.dataPath, 'utf-8');
        this.classNameData = JSON.parse(content);
        return this.classNameData!;
      }
    } catch (error) {
      console.error('Error loading className data:', error);
    }

    // 返回空数据作为后备
    return {
      lastUpdated: new Date().toISOString(),
      totalComponents: 0,
      componentsWithClassNames: 0,
      componentsWithSnapshots: 0,
      components: {}
    };
  }

  /**
   * 获取组件的 className 列表
   */
  async getComponentClassNames(componentName: string): Promise<string[]> {
    const data = this.loadClassNameData();
    const component = data.components[componentName.toLowerCase()];
    return component?.classNames || [];
  }

  /**
   * 获取组件的渲染结构
   */
  async getComponentRenderStructures(componentName: string): Promise<ComponentRenderStructure[]> {
    const data = this.loadClassNameData();
    const component = data.components[componentName.toLowerCase()];
    return component?.renderStructures || [];
  }

  /**
   * 获取完整的组件 className 信息
   */
  async getComponentClassNameInfo(componentName: string): Promise<ComponentClassNameInfo> {
    const data = this.loadClassNameData();
    const component = data.components[componentName.toLowerCase()];
    
    if (component) {
      return component;
    }

    // 如果找不到组件，返回空信息
    return {
      component: componentName,
      classNames: [],
      renderStructures: []
    };
  }

  /**
   * 获取所有组件的 className 信息
   */
  async getAllComponentsClassNameInfo(): Promise<ComponentClassNameInfo[]> {
    const data = this.loadClassNameData();
    return Object.values(data.components);
  }

  /**
   * 获取 className 数据统计信息
   */
  getClassNameStats() {
    const data = this.loadClassNameData();
    return {
      lastUpdated: data.lastUpdated,
      totalComponents: data.totalComponents,
      componentsWithClassNames: data.componentsWithClassNames,
      componentsWithSnapshots: data.componentsWithSnapshots,
      availableComponents: Object.keys(data.components)
    };
  }

  /**
   * 搜索包含特定 className 的组件
   */
  async searchComponentsByClassName(className: string): Promise<ComponentClassNameInfo[]> {
    const data = this.loadClassNameData();
    const results: ComponentClassNameInfo[] = [];

    Object.values(data.components).forEach(component => {
      if (component.classNames.some(name => name.includes(className))) {
        results.push(component);
      }
    });

    return results;
  }

  /**
   * 获取最常用的 className
   */
  async getMostUsedClassNames(limit: number = 20): Promise<Array<{className: string, count: number, components: string[]}>> {
    const data = this.loadClassNameData();
    const classNameUsage = new Map<string, string[]>();

    // 统计每个 className 的使用情况
    Object.values(data.components).forEach(component => {
      component.classNames.forEach(className => {
        if (!classNameUsage.has(className)) {
          classNameUsage.set(className, []);
        }
        classNameUsage.get(className)!.push(component.component);
      });
    });

    // 按使用频率排序
    const sorted = Array.from(classNameUsage.entries())
      .map(([className, components]) => ({
        className,
        count: components.length,
        components: components.sort()
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sorted;
  }
}