import { ComponentExample } from '../../types/index.js';
import { ComponentQuery } from '../queries/index.js';

export class ExampleService {
  private query: ComponentQuery;

  constructor() {
    this.query = new ComponentQuery();
  }

  /**
   * 获取所有示例代码
   */
  async getAllExamples() {
    const components = await this.query.listComponents('all');
    const examples: { component: string; example: ComponentExample }[] = [];

    for (const component of components) {
      if (component.examples) {
        for (const example of component.examples) {
          examples.push({ component: component.name, example });
        }
      }
    }

    return examples;
  }

  /**
   * 获取最佳实践示例（取每个组件的前几个示例）
   */
  async getBestPractices() {
    const components = await this.query.listComponents('all');
    const examples: { component: string; example: ComponentExample }[] = [];

    for (const component of components) {
      if (component.examples && component.examples.length > 0) {
        // 取前2个示例作为最佳实践
        const bestExamples = component.examples.slice(0, 2);
        for (const example of bestExamples) {
          examples.push({ component: component.name, example });
        }
      }
    }

    return examples;
  }

  /**
   * 搜索示例代码
   */
  async searchExamples(keyword: string) {
    const components = await this.query.listComponents('all');
    const matchedExamples: { component: string; example: ComponentExample }[] = [];

    for (const component of components) {
      if (component.examples) {
        for (const example of component.examples) {
          if (
            example.title.toLowerCase().includes(keyword.toLowerCase()) ||
            example.description?.toLowerCase().includes(keyword.toLowerCase()) ||
            example.code.toLowerCase().includes(keyword.toLowerCase())
          ) {
            matchedExamples.push({ component: component.name, example });
          }
        }
      }
    }

    return matchedExamples;
  }
}