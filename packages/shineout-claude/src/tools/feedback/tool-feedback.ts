export interface ToolFeedback {
  starting: string;
  processing: string;
  success: string;
  error: string;
}

export const TOOL_FEEDBACK: Record<string, ToolFeedback> = {
  get_component: {
    starting: '🔍 正在查询 {name} 组件的完整文档...',
    processing: '📚 正在整理 {name} 组件的 API 信息和示例代码...',
    success: '✅ 已获取 {name} 组件的完整文档',
    error: '❌ 获取 {name} 组件文档时出错'
  },
  
  get_component_api: {
    starting: '🔍 正在查询 {component} 组件的 API 文档...',
    processing: '📊 正在整理 API 信息并匹配相关示例...',
    success: '✅ 已获取 {component} 组件的 API 文档和示例',
    error: '❌ 获取 {component} 组件 API 时出错'
  },
  
  search_components: {
    starting: '🔎 正在搜索包含 "{query}" 的组件...',
    processing: '🔄 正在分析匹配的组件并获取 API 信息...',
    success: '✅ 找到 {count} 个相关组件',
    error: '❌ 搜索组件时出错'
  },
  
  search_api: {
    starting: '🔎 正在搜索包含 "{keyword}" 的 API...',
    processing: '🔄 正在分析所有组件的属性和方法...',
    success: '✅ 找到 {count} 个匹配的 API',
    error: '❌ 搜索 API 时出错'
  },
  
  list_components: {
    starting: '📋 正在获取组件列表...',
    processing: '🔄 正在整理 {category} 分类的组件...',
    success: '✅ 已获取 {count} 个组件',
    error: '❌ 获取组件列表时出错'
  },
  
  get_examples: {
    starting: '📝 正在获取 {component} 组件的示例代码...',
    processing: '🔄 正在整理 {scenario} 场景的示例...',
    success: '✅ 已获取 {count} 个示例',
    error: '❌ 获取示例时出错'
  },
  
  compare_components_api: {
    starting: '🔀 正在对比组件 API...',
    processing: '📊 正在分析 {count} 个组件的差异...',
    success: '✅ 已完成 API 对比分析',
    error: '❌ 对比组件 API 时出错'
  }
};

export class ToolFeedbackManager {
  /**
   * 格式化反馈消息
   */
  static formatMessage(template: string, params: Record<string, any>): string {
    let message = template;
    for (const [key, value] of Object.entries(params)) {
      message = message.replace(`{${key}}`, String(value));
    }
    return message;
  }

  /**
   * 创建工具开始执行的反馈
   */
  static createStartingFeedback(toolName: string, args: Record<string, any>): string {
    const feedback = TOOL_FEEDBACK[toolName];
    if (!feedback) return `🚀 正在执行 ${toolName}...`;
    
    return this.formatMessage(feedback.starting, args);
  }

  /**
   * 创建工具处理中的反馈
   */
  static createProcessingFeedback(toolName: string, args: Record<string, any>): string {
    const feedback = TOOL_FEEDBACK[toolName];
    if (!feedback) return `⏳ 正在处理...`;
    
    return this.formatMessage(feedback.processing, args);
  }

  /**
   * 创建工具成功的反馈
   */
  static createSuccessFeedback(toolName: string, result: any): string {
    const feedback = TOOL_FEEDBACK[toolName];
    if (!feedback) return `✅ 操作完成`;
    
    // 根据结果提取相关信息
    const params: Record<string, any> = {};
    
    switch (toolName) {
      case 'search_components':
      case 'search_api':
        // 从结果中提取数量信息
        const content = result.content?.[0]?.text || '';
        const match = content.match(/找到 (\d+) 个/);
        params.count = match ? match[1] : '0';
        break;
        
      case 'list_components':
        // 统计组件数量
        const listContent = result.content?.[0]?.text || '';
        const componentCount = (listContent.match(/- \*\*/g) || []).length;
        params.count = componentCount;
        break;
        
      case 'get_examples':
        // 统计示例数量
        const exampleContent = result.content?.[0]?.text || '';
        const exampleCount = (exampleContent.match(/## /g) || []).length - 1; // 减去标题
        params.count = Math.max(0, exampleCount);
        break;
        
      case 'compare_components_api':
        // 从参数中获取组件数量
        params.count = result._componentCount || '多个';
        break;
    }
    
    return this.formatMessage(feedback.success, params);
  }

  /**
   * 创建工具错误的反馈
   */
  static createErrorFeedback(toolName: string, error: Error): string {
    const feedback = TOOL_FEEDBACK[toolName];
    if (!feedback) return `❌ 操作失败: ${error.message}`;
    
    return `${feedback.error}: ${error.message}`;
  }

  /**
   * 创建工具执行摘要
   */
  static createExecutionSummary(toolName: string, startTime: number): string {
    const duration = Date.now() - startTime;
    const seconds = (duration / 1000).toFixed(2);
    
    const toolDescriptions: Record<string, string> = {
      get_component: '组件文档查询',
      get_component_api: 'API 文档查询',
      search_components: '组件搜索',
      search_api: 'API 搜索',
      list_components: '组件列表',
      get_examples: '示例查询',
      compare_components_api: 'API 对比'
    };
    
    const description = toolDescriptions[toolName] || toolName;
    return `\n⏱️ ${description}耗时: ${seconds}秒`;
  }
}