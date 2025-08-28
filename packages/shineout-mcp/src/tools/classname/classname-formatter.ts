import { ComponentClassNameInfo, ComponentRenderStructure } from './classname-service.js';

export class ClassNameFormatter {
  
  /**
   * 格式化单个组件的 className 信息
   */
  formatComponentClassNameInfo(info: ComponentClassNameInfo): string {
    const { component, classNames, renderStructures } = info;
    
    if (classNames.length === 0 && renderStructures.length === 0) {
      return `## ${component} 组件样式信息\n\n❌ 未找到该组件的样式信息。`;
    }

    let formatted = `# ${component} 组件样式信息\n\n`;

    // 1. className 列表
    if (classNames.length > 0) {
      formatted += `## 🎨 可用 className 列表\n\n`;
      formatted += `该组件共有 **${classNames.length}** 个样式类：\n\n`;
      
      // 按功能分类展示
      const categorized = this.categorizeClassNames(classNames);
      
      Object.entries(categorized).forEach(([category, classes]) => {
        if (classes.length > 0) {
          formatted += `### ${this.getCategoryIcon(category)} ${this.getCategoryName(category)}\n\n`;
          classes.forEach(className => {
            formatted += `- \`${className}\`\n`;
          });
          formatted += '\n';
        }
      });
    }

    // 2. 渲染结构信息
    if (renderStructures.length > 0) {
      formatted += `## 🏗️ DOM 渲染结构\n\n`;
      formatted += `基于测试快照分析，该组件在不同场景下的渲染结构：\n\n`;
      
      renderStructures.forEach((structure, index) => {
        formatted += `### 渲染场景 ${index + 1}\n\n`;
        
        if (structure.usedClassNames.length > 0) {
          formatted += `**使用的样式类：**\n`;
          structure.usedClassNames.forEach(className => {
            formatted += `- \`${className}\`\n`;
          });
          formatted += '\n';
        }
        
        if (structure.htmlStructure.trim()) {
          formatted += `**DOM 结构：**\n\`\`\`html\n${structure.htmlStructure}\n\`\`\`\n\n`;
        }
      });
    }

    // 3. 样式使用统计
    if (renderStructures.length > 0) {
      const usageStats = this.analyzeClassNameUsage(classNames, renderStructures);
      formatted += `## 📊 样式使用统计\n\n`;
      formatted += usageStats;
    }

    return formatted;
  }

  /**
   * 格式化所有组件的 className 概览
   */
  formatAllComponentsOverview(components: ComponentClassNameInfo[]): string {
    let formatted = `# Shineout 组件样式系统概览\n\n`;
    formatted += `共分析了 **${components.length}** 个组件的样式信息。\n\n`;

    // 统计信息
    const totalClassNames = components.reduce((sum, comp) => sum + comp.classNames.length, 0);
    const totalStructures = components.reduce((sum, comp) => sum + comp.renderStructures.length, 0);
    
    formatted += `## 📈 总体统计\n\n`;
    formatted += `- 总 className 数量: **${totalClassNames}** 个\n`;
    formatted += `- 总渲染场景数: **${totalStructures}** 个\n`;
    formatted += `- 平均每个组件有 **${Math.round(totalClassNames / components.length)}** 个样式类\n\n`;

    // 组件列表
    formatted += `## 📋 组件列表\n\n`;
    formatted += `| 组件 | className 数量 | 渲染场景数 | 主要样式前缀 |\n`;
    formatted += `|------|----------------|------------|-------------|\n`;
    
    components.forEach(comp => {
      const prefix = this.getMainStylePrefix(comp.classNames);
      formatted += `| ${comp.component} | ${comp.classNames.length} | ${comp.renderStructures.length} | \`${prefix}\` |\n`;
    });

    formatted += `\n💡 **提示**: 使用 \`get_component_classnames\` 工具查看特定组件的详细样式信息。\n`;

    return formatted;
  }

  /**
   * 将 className 按功能分类
   */
  private categorizeClassNames(classNames: string[]): Record<string, string[]> {
    const categories = {
      base: [] as string[],
      size: [] as string[],
      type: [] as string[],
      state: [] as string[],
      layout: [] as string[],
      other: [] as string[]
    };

    classNames.forEach(className => {
      if (className.includes('-small') || className.includes('-large') || className.includes('-medium')) {
        categories.size.push(className);
      } else if (className.includes('-primary') || className.includes('-secondary') || className.includes('-danger') || 
                 className.includes('-warning') || className.includes('-success') || className.includes('-default') ||
                 className.includes('-link') || className.includes('-text') || className.includes('-outline') || 
                 className.includes('-dashed')) {
        categories.type.push(className);
      } else if (className.includes('-disabled') || className.includes('-loading') || className.includes('-active') || 
                 className.includes('-focus') || className.includes('-hover')) {
        categories.state.push(className);
      } else if (className.includes('-round') || className.includes('-circle') || className.includes('-square') ||
                 className.includes('-group') || className.includes('-item')) {
        categories.layout.push(className);
      } else if (className.match(/^soui-\w+$/)) {
        categories.base.push(className);
      } else {
        categories.other.push(className);
      }
    });

    return categories;
  }

  /**
   * 获取分类图标
   */
  private getCategoryIcon(category: string): string {
    const icons = {
      base: '🏠',
      size: '📏',
      type: '🎯',
      state: '⚡',
      layout: '📐',
      other: '📦'
    };
    return icons[category as keyof typeof icons] || '📦';
  }

  /**
   * 获取分类名称
   */
  private getCategoryName(category: string): string {
    const names = {
      base: '基础样式',
      size: '尺寸相关',
      type: '类型/主题',
      state: '状态相关',
      layout: '布局相关',
      other: '其他样式'
    };
    return names[category as keyof typeof names] || '其他样式';
  }

  /**
   * 分析 className 使用情况
   */
  private analyzeClassNameUsage(classNames: string[], structures: ComponentRenderStructure[]): string {
    const usageCount = new Map<string, number>();
    const totalScenarios = structures.length;

    // 统计每个 className 的使用次数
    structures.forEach(structure => {
      structure.usedClassNames.forEach(className => {
        usageCount.set(className, (usageCount.get(className) || 0) + 1);
      });
    });

    let stats = `| className | 使用频率 | 使用率 |\n`;
    stats += `|-----------|----------|--------|\n`;

    // 按使用频率排序
    const sortedUsage = Array.from(usageCount.entries())
      .sort((a, b) => b[1] - a[1]);

    sortedUsage.forEach(([className, count]) => {
      const percentage = Math.round((count / totalScenarios) * 100);
      stats += `| \`${className}\` | ${count}/${totalScenarios} | ${percentage}% |\n`;
    });

    // 未使用的 className
    const unusedClasses = classNames.filter(className => !usageCount.has(className));
    if (unusedClasses.length > 0) {
      stats += `\n**未在测试场景中使用的样式类:**\n`;
      unusedClasses.forEach(className => {
        stats += `- \`${className}\` (可能用于特定条件或动态场景)\n`;
      });
    }

    return stats;
  }

  /**
   * 获取组件的主要样式前缀
   */
  private getMainStylePrefix(classNames: string[]): string {
    if (classNames.length === 0) return '';
    
    const baseClass = classNames.find(name => name.match(/^soui-\w+$/));
    return baseClass || classNames[0];
  }
}