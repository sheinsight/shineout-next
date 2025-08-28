import { ComponentData } from '../../types/index.js';
import { getComponentData, getAllComponents, searchInComponents } from '../../data/loader.js';

export class ComponentQuery {
  /**
   * 获取单个组件的完整数据
   */
  async getComponent(name: string): Promise<ComponentData | null> {
    return await getComponentData(name);
  }

  /**
   * 搜索组件
   */
  async searchComponents(query: string, category?: string): Promise<ComponentData[]> {
    const results = await searchInComponents(query, category);
    
    // 自动获取匹配组件的完整 API 信息
    const detailedResults = await Promise.all(
      results.map(async (result) => {
        const fullComponent = await getComponentData(result.name);
        return fullComponent;
      })
    );

    // 过滤掉 null 值
    return detailedResults.filter((comp): comp is ComponentData => comp !== null);
  }

  /**
   * 获取所有组件列表
   */
  async listComponents(category: string = 'all'): Promise<ComponentData[]> {
    return await getAllComponents(category);
  }

  /**
   * 获取组件的示例
   */
  async getComponentExamples(componentName: string) {
    const component = await getComponentData(componentName);
    
    if (!component || !component.examples) {
      return null;
    }

    return { componentName, examples: component.examples };
  }
}