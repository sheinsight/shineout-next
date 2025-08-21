export class TipsFormatter {
  /**
   * 格式化组件的 tips 信息
   */
  formatComponentTips(tips: any): string {
    if (!tips) {
      return '未找到该组件的使用提示。';
    }
    
    let output = `# ${tips.componentName} 组件使用提示\n\n`;
    
    // 格式化基础 tips
    if (tips.tips && tips.tips.length > 0) {
      output += `## 核心要点\n\n`;
      tips.tips.forEach((tip: string) => {
        // 根据前缀添加不同的图标
        if (tip.startsWith('❌')) {
          output += `${tip}\n`;
        } else if (tip.startsWith('🚫')) {
          output += `${tip}\n`;
        } else {
          output += `• ${tip}\n`;
        }
      });
      output += '\n';
    }
    
    // 格式化提交流程
    if (tips.submitFlow) {
      output += `## ${tips.submitFlow.description}\n\n`;
      if (tips.submitFlow.steps) {
        output += `### 执行步骤\n`;
        tips.submitFlow.steps.forEach((step: string) => {
          output += `${step}\n`;
        });
        output += '\n';
      }
      if (tips.submitFlow.keyPoints) {
        output += `### 关键点\n`;
        tips.submitFlow.keyPoints.forEach((point: string) => {
          output += `• ${point}\n`;
        });
        output += '\n';
      }
    }
    
    // 格式化校验流程
    if (tips.validateFlow) {
      output += `## ${tips.validateFlow.description}\n\n`;
      if (tips.validateFlow.steps) {
        output += `### 执行步骤\n`;
        tips.validateFlow.steps.forEach((step: string) => {
          output += `${step}\n`;
        });
        output += '\n';
      }
      if (tips.validateFlow.keyPoints) {
        output += `### 关键点\n`;
        tips.validateFlow.keyPoints.forEach((point: string) => {
          output += `• ${point}\n`;
        });
        output += '\n';
      }
    }
    
    // 格式化数据流
    if (tips.dataFlow) {
      output += `## ${tips.dataFlow.description}\n\n`;
      if (tips.dataFlow.hooks) {
        output += `### 核心 Hooks\n`;
        tips.dataFlow.hooks.forEach((hook: string) => {
          output += `• ${hook}\n`;
        });
        output += '\n';
      }
      if (tips.dataFlow.updateMechanism) {
        output += `### 更新机制\n`;
        tips.dataFlow.updateMechanism.forEach((mechanism: string) => {
          output += `• ${mechanism}\n`;
        });
        output += '\n';
      }
    }
    
    return output.trim();
  }
  
  /**
   * 格式化所有组件的 tips 摘要
   */
  formatTipsSummary(summary: any): string {
    let output = `# 组件使用提示总览\n\n`;
    output += `共有 **${summary.totalComponents}** 个组件包含使用提示。\n\n`;
    
    if (summary.components.length > 0) {
      output += `## 组件列表\n\n`;
      
      for (const component of summary.components) {
        const detail = summary.details[component];
        if (detail) {
          output += `### ${component}\n`;
          output += `• 提示数量：${detail.tipsCount}\n`;
          if (detail.hasSubmitFlow) {
            output += `• 包含提交流程说明\n`;
          }
          if (detail.hasValidateFlow) {
            output += `• 包含校验流程说明\n`;
          }
          if (detail.hasDataFlow) {
            output += `• 包含数据流说明\n`;
          }
          output += '\n';
        }
      }
    }
    
    output += `\n> 使用 \`get_tips\` 工具并指定组件名来查看详细的使用提示。`;
    
    return output.trim();
  }
}