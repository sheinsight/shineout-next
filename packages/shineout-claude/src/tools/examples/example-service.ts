import { ComponentExample } from '../../types/index.js';
import { ComponentQuery } from '../queries/index.js';

export class ExampleService {
  private query: ComponentQuery;

  constructor() {
    this.query = new ComponentQuery();
  }

  /**
   * 获取特定场景的示例代码
   */
  async getScenarioExamples(scenario: string) {
    const components = await this.query.listComponents('all');
    const examples: { component: string; example: ComponentExample }[] = [];

    for (const component of components) {
      if (component.examples) {
        const scenarioExamples = component.examples.filter(ex => ex.scenario === scenario);
        for (const example of scenarioExamples) {
          examples.push({ component: component.name, example });
        }
      }
    }

    return examples;
  }

  /**
   * 获取最佳实践示例
   */
  async getBestPractices() {
    const bestPracticeScenarios = ['best-practice', 'advanced', 'complex'];
    const examples: { component: string; example: ComponentExample }[] = [];

    for (const scenario of bestPracticeScenarios) {
      const scenarioExamples = await this.getScenarioExamples(scenario);
      examples.push(...scenarioExamples);
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