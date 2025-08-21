export class BestPracticesFormatter {
  formatBestPractices(data: any): string {
    if (!data) {
      return '未找到相关的最佳实践。';
    }

    let output = '';

    // 处理所有组件的摘要
    if (data.components && data.totalComponents) {
      output += `# Shineout 组件最佳实践汇总\n\n`;
      output += `共有 ${data.totalComponents} 个组件的最佳实践。\n\n`;
      output += `## 可用组件\n`;
      output += data.components.map((c: string) => `- ${c}`).join('\n');
      output += '\n\n';
      
      if (data.summary) {
        output += `## 最佳实践统计\n\n`;
        output += `| 组件 | 推荐实践 | 不推荐实践 | 场景示例 | 使用技巧 |\n`;
        output += `|------|---------|-----------|---------|----------|\n`;
        for (const [name, stats] of Object.entries(data.summary) as any) {
          output += `| ${name} | ${stats.recommendedCount} | ${stats.notRecommendedCount} | ${stats.scenariosCount} | ${stats.tipsCount} |\n`;
        }
        output += '\n';
      }
      
      output += `\n💡 **提示**: 使用 \`get_best_practices\` 工具并指定组件名称来获取详细的最佳实践。\n`;
      return output;
    }

    // 处理单个组件的最佳实践
    output += `# ${data.componentName} 组件最佳实践\n\n`;
    
    if (data.version || data.lastUpdated) {
      output += `> 版本: ${data.version || 'N/A'} | 更新时间: ${data.lastUpdated || 'N/A'}\n\n`;
    }

    // 推荐实践
    if (data.bestPractices?.recommended && data.bestPractices.recommended.length > 0) {
      output += `## ✅ 推荐实践\n\n`;
      for (const practice of data.bestPractices.recommended) {
        output += `### ${practice.title}\n\n`;
        output += `${practice.description}\n\n`;
        output += `\`\`\`tsx\n${practice.code}\n\`\`\`\n\n`;
      }
    }

    // 不推荐实践
    if (data.bestPractices?.notRecommended && data.bestPractices.notRecommended.length > 0) {
      output += `## ❌ 不推荐实践\n\n`;
      for (const practice of data.bestPractices.notRecommended) {
        output += `### ${practice.title}\n\n`;
        output += `${practice.description}\n\n`;
        output += `\`\`\`tsx\n${practice.code}\n\`\`\`\n\n`;
      }
    }

    // 常见场景
    if (data.commonScenarios && data.commonScenarios.length > 0) {
      output += `## 🎯 常见场景\n\n`;
      for (const scenario of data.commonScenarios) {
        output += `### ${scenario.scenario}\n\n`;
        output += `**解决方案**: ${scenario.solution}\n\n`;
        if (scenario.code) {
          output += `\`\`\`tsx\n${scenario.code}\n\`\`\`\n\n`;
        }
      }
    }

    // API 要点
    if (data.apiHighlights) {
      output += `## 📚 API 要点\n\n`;
      
      if (data.apiHighlights.formRefMethods) {
        output += `### 主要方法\n\n`;
        output += `| 方法 | 签名 | 描述 |\n`;
        output += `|------|------|------|\n`;
        for (const method of data.apiHighlights.formRefMethods) {
          output += `| ${method.name} | \`${method.signature}\` | ${method.description} |\n`;
        }
        output += '\n';
      }
      
      if (data.apiHighlights.importantProps) {
        output += `### 重要属性\n\n`;
        for (const prop of data.apiHighlights.importantProps) {
          output += `- ${prop}\n`;
        }
        output += '\n';
      }
    }

    // 使用技巧
    if (data.tips && data.tips.length > 0) {
      output += `## 💡 使用技巧\n\n`;
      for (const tip of data.tips) {
        output += `- ${tip}\n`;
      }
      output += '\n';
    }

    // 参考资料
    if (data.references && data.references.length > 0) {
      output += `## 📖 参考资料\n\n`;
      for (const ref of data.references) {
        if (ref.startsWith('http')) {
          output += `- [${ref}](${ref})\n`;
        } else {
          output += `- ${ref}\n`;
        }
      }
      output += '\n';
    }

    return output;
  }
}