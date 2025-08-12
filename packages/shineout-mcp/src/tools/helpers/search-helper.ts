/**
 * 搜索辅助功能
 */
export class SearchHelper {
  /**
   * 生成搜索建议
   */
  static generateSearchSuggestions(query: string, availableComponents: string[]): string[] {
    const suggestions: string[] = [];
    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    
    // 1. 如果是多关键词，建议尝试单个关键词
    if (keywords.length > 1) {
      suggestions.push(`尝试单个关键词搜索，如: "${keywords[0]}" 或 "${keywords[keywords.length - 1]}"`);
    }
    
    // 2. 根据关键词推荐相关组件
    const recommendations = this.getComponentRecommendations(keywords);
    if (recommendations.length > 0) {
      suggestions.push(`您可能在找: ${recommendations.join(', ')}`);
    }
    
    // 3. 建议使用分类搜索
    const categories = this.suggestCategories(keywords);
    if (categories.length > 0) {
      suggestions.push(`尝试按分类查看: ${categories.join(', ')}`);
    }
    
    // 4. 拼写相似的组件
    const similarComponents = this.findSimilarComponents(keywords, availableComponents);
    if (similarComponents.length > 0) {
      suggestions.push(`相似的组件: ${similarComponents.join(', ')}`);
    }
    
    return suggestions;
  }
  
  /**
   * 根据关键词推荐相关组件
   */
  private static getComponentRecommendations(keywords: string[]): string[] {
    const recommendations: string[] = [];
    
    const keywordMap: Record<string, string[]> = {
      // 表单相关
      'form': ['Form', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch'],
      '表单': ['Form', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch'],
      'input': ['Input', 'Textarea', 'Select', 'Cascader'],
      '输入': ['Input', 'Textarea', 'Select', 'Cascader'],
      
      // 数据展示
      'table': ['Table', 'List', 'Grid'],
      '表格': ['Table', 'List', 'Grid'],
      'list': ['List', 'Table', 'Tree'],
      '列表': ['List', 'Table', 'Tree'],
      
      // 选择器
      'select': ['Select', 'Cascader', 'TreeSelect', 'Transfer'],
      '选择': ['Select', 'Cascader', 'TreeSelect', 'Transfer'],
      'picker': ['DatePicker', 'Select', 'Cascader'],
      
      // 反馈
      'modal': ['Modal', 'Drawer', 'Message', 'Alert'],
      '弹窗': ['Modal', 'Drawer', 'Popover', 'Tooltip'],
      'message': ['Message', 'Alert', 'Modal'],
      '消息': ['Message', 'Alert', 'Modal'],
      
      // 导航
      'menu': ['Menu', 'Breadcrumb', 'Steps', 'Tabs'],
      '导航': ['Menu', 'Breadcrumb', 'Steps', 'Tabs'],
      'nav': ['Menu', 'Breadcrumb', 'Pagination'],
      
      // 布局
      'layout': ['Grid', 'Divider', 'Gap', 'Sticky'],
      '布局': ['Grid', 'Divider', 'Gap', 'Sticky'],
      'grid': ['Grid', 'Table', 'List'],
      
      // 数据录入
      'upload': ['Upload', 'Input', 'Form'],
      '上传': ['Upload', 'Input', 'Form'],
      'checkbox': ['Checkbox', 'Radio', 'Switch'],
      '选择框': ['Checkbox', 'Radio', 'Switch'],
      
      // 展示
      'card': ['Card', 'Collapse', 'Descriptions'],
      '卡片': ['Card', 'Collapse', 'Descriptions'],
      'image': ['Image', 'Avatar', 'Upload'],
      '图片': ['Image', 'Avatar', 'Upload'],
    };
    
    for (const keyword of keywords) {
      const relatedComponents = keywordMap[keyword];
      if (relatedComponents) {
        recommendations.push(...relatedComponents);
      }
    }
    
    // 去重
    return [...new Set(recommendations)].slice(0, 5);
  }
  
  /**
   * 建议相关分类
   */
  private static suggestCategories(keywords: string[]): string[] {
    const categories: string[] = [];
    
    const categoryKeywords: Record<string, string[]> = {
      'form': ['form', 'input', 'select', '表单', '输入', '选择'],
      'display': ['table', 'list', 'card', '表格', '列表', '卡片', '展示'],
      'feedback': ['modal', 'message', 'alert', '弹窗', '消息', '反馈'],
      'navigation': ['menu', 'nav', 'breadcrumb', '导航', '菜单'],
      'layout': ['layout', 'grid', 'divider', '布局', '网格'],
    };
    
    for (const [category, catKeywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (catKeywords.some(k => k.includes(keyword) || keyword.includes(k))) {
          categories.push(category);
          break;
        }
      }
    }
    
    return [...new Set(categories)];
  }
  
  /**
   * 查找拼写相似的组件
   */
  private static findSimilarComponents(keywords: string[], availableComponents: string[]): string[] {
    const similar: string[] = [];
    
    for (const keyword of keywords) {
      for (const component of availableComponents) {
        const componentLower = component.toLowerCase();
        
        // 简单的相似度检查
        if (
          this.levenshteinDistance(keyword, componentLower) <= 2 ||
          componentLower.includes(keyword) ||
          keyword.includes(componentLower)
        ) {
          similar.push(component);
        }
      }
    }
    
    return [...new Set(similar)].slice(0, 3);
  }
  
  /**
   * 计算编辑距离（简化版）
   */
  private static levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    
    if (Math.abs(len1 - len2) > 3) return 999; // 长度差异太大，直接返回大值
    
    let distance = 0;
    const minLen = Math.min(len1, len2);
    
    for (let i = 0; i < minLen; i++) {
      if (str1[i] !== str2[i]) distance++;
    }
    
    distance += Math.abs(len1 - len2);
    
    return distance;
  }
  
  /**
   * 格式化搜索建议为友好的消息
   */
  static formatSuggestions(suggestions: string[]): string {
    if (suggestions.length === 0) return '';
    
    let message = '\n\n💡 **搜索建议**:\n';
    suggestions.forEach((suggestion, index) => {
      message += `${index + 1}. ${suggestion}\n`;
    });
    
    return message;
  }
}