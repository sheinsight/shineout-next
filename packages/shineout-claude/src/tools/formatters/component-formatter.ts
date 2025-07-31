import { ComponentData, ComponentExample } from '../../types/index.js';

export class ComponentFormatter {
  /**
   * 格式化组件文档
   */
  formatComponentDoc(component: ComponentData): string {
    let doc = `# ${component.name}\n\n`;
    doc += `${component.description}\n\n`;
    
    // 重要提示
    doc += `> **重要提示**: 请严格按照以下 API 文档使用此组件。仅使用文档中列出的属性、方法和配置项。不要使用未在此文档中定义的 API。\n\n`;
    
    // 基本信息
    doc += `## 基本信息\n\n`;
    doc += `- **分类**: ${this.getCategoryName(component.category)}\n`;
    doc += `- **版本**: ${component.version || '3.7.7'}\n`;
    doc += `- **导入**: \`${component.importPath}\`\n`;
    if (component.subComponents && component.subComponents.length > 0) {
      doc += `- **子组件**: ${component.subComponents.map(sub => {
        const subName = typeof sub === 'object' && 'name' in sub ? sub.name : sub;
        return `${component.name}.${subName}`;
      }).join(', ')}\n`;
    }
    doc += `\n`;

    // 主要 Props
    doc += this.formatProps(component);

    // FormRef 方法（仅对 Form 组件）
    if (component.name === 'Form' && (component as any).formRefMethods) {
      doc += this.formatFormRefMethods((component as any).formRefMethods);
    }

    // FormDatum 方法（仅对 Form 组件）
    if (component.name === 'Form' && (component as any).formDatumMethods) {
      doc += this.formatFormDatumMethods((component as any).formDatumMethods);
    }

    // 列配置（仅对 Table 组件）
    if (component.name === 'Table' && (component as any).columnsProps) {
      doc += this.formatTableColumns((component as any).columnsProps);
    }

    // 使用示例
    if (component.examples && component.examples.length > 0) {
      doc += this.formatExamplesSection(component);
    }

    // 使用规范提醒
    doc += `## 使用规范\n\n`;
    doc += `在实现功能时，请严格遵循以下规范：\n`;
    doc += `1. **仅使用上述文档中列出的属性和方法**\n`;
    doc += `2. **参考提供的代码示例编写代码**\n`;
    doc += `3. **不要使用任何未在文档中明确定义的 API**\n`;
    doc += `4. **如需使用其他组件，请先查询其 API 文档**\n\n`;

    return doc;
  }

  /**
   * 格式化搜索结果（包含完整 API）
   */
  formatSearchResultsWithAPI(components: ComponentData[]): string {
    let content = `找到 ${components.length} 个相关组件:\n\n`;
    content += `> **重要提示**: 请严格按照以下查询到的 API 文档使用组件。后续代码实现必须仅使用文档中列出的属性、方法和配置项。\n\n`;
    
    for (const component of components) {
      content += `## ${component.name}\n`;
      content += `${component.description}\n\n`;
      
      // 基本信息
      content += `### 基本信息\n`;
      content += `- **分类**: ${this.getCategoryName(component.category)}\n`;
      content += `- **导入**: \`${component.importPath}\`\n`;
      if (component.subComponents && component.subComponents.length > 0) {
        content += `- **子组件**: ${component.subComponents.map(sub => {
          const subName = typeof sub === 'object' && 'name' in sub ? sub.name : sub;
          return `${component.name}.${subName}`;
        }).join(', ')}\n`;
      }
      content += `\n`;

      // 主要 Props（优先显示重要属性）
      if (component.props && component.props.length > 0) {
        content += this.formatPropsForSearch(component);
      }

      // 相关方法或配置
      if ((component as any).formRefMethods) {
        content += this.formatMethodsPreview('FormRef 方法', (component as any).formRefMethods);
      }

      if ((component as any).columnsProps) {
        content += this.formatColumnsPreview((component as any).columnsProps);
      }

      // 使用示例
      if (component.examples && component.examples.length > 0) {
        content += this.formatExamplesForSearch(component);
      }

      // 每个组件后添加使用提醒
      content += `> 💡 **使用提醒**: 请严格使用上述 ${component.name} 组件的 API 进行开发\n\n`;
      content += `---\n\n`;
    }
    
    return content;
  }

  /**
   * 格式化组件列表
   */
  formatComponentList(components: ComponentData[]): string {
    const grouped = components.reduce((acc, comp) => {
      const category = comp.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(comp);
      return acc;
    }, {} as Record<string, ComponentData[]>);

    let content = `# Shineout 组件列表\n\n`;
    
    for (const [category, comps] of Object.entries(grouped)) {
      content += `## ${this.getCategoryName(category)}\n\n`;
      
      for (const comp of comps) {
        content += `- **${comp.name}**: ${comp.description}\n`;
      }
      content += `\n`;
    }
    
    return content;
  }

  /**
   * 格式化示例
   */
  formatExamples(componentName: string, examples: ComponentExample[]): string {
    let content = `# ${componentName} 使用示例\n\n`;
    
    for (const example of examples) {
      content += `## ${example.title}\n\n`;
      if (example.description) {
        content += `${example.description}\n\n`;
      }
      content += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
    }
    
    return content;
  }

  // 私有辅助方法
  private formatProps(component: ComponentData): string {
    if (!component.props || component.props.length === 0) return '';

    let doc = `## 主要 Props\n\n`;
    
    const priorityProps = ['value', 'onChange', 'name', 'data', 'columns', 'rules', 'onSubmit', 'disabled', 'placeholder', 'type', 'keygen'];
    
    const sortedProps = [...component.props].sort((a, b) => {
      const aIndex = priorityProps.indexOf(a.name);
      const bIndex = priorityProps.indexOf(b.name);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.required === b.required ? 0 : a.required ? -1 : 1;
    });
    
    const topProps = sortedProps.slice(0, 10);
    for (const prop of topProps) {
      const required = prop.required ? ' *(必填)*' : '';
      const defaultValue = prop.defaultValue ? ` 默认: \`${prop.defaultValue}\`` : '';
      const relatedNote = this.getRelatedNote(prop, component);
      doc += `### ${prop.name}${required}\n`;
      doc += `- **类型**: \`${prop.type}\`\n`;
      doc += `- **描述**: ${prop.description}${relatedNote}\n`;
      if (defaultValue) doc += `- **默认值**: ${defaultValue}\n`;
      doc += `\n`;
    }
    
    if (component.props.length > 10) {
      doc += `> 还有 ${component.props.length - 10} 个其他属性，使用表格查看完整列表\n\n`;
      
      doc += `<details>\n<summary>查看完整属性列表</summary>\n\n`;
      doc += `| 属性名 | 类型 | 默认值 | 必填 | 描述 |\n`;
      doc += `|--------|------|--------|------|------|\n`;
      
      for (const prop of sortedProps.slice(10)) {
        const required = prop.required ? '✅' : '❌';
        const defaultValue = prop.defaultValue || '-';
        const desc = this.truncateDescription(prop.description, 60);
        doc += `| ${prop.name} | \`${prop.type}\` | \`${defaultValue}\` | ${required} | ${desc} |\n`;
      }
      doc += `\n</details>\n\n`;
    }

    return doc;
  }

  private formatPropsForSearch(component: ComponentData): string {
    let content = `### 主要 Props\n`;
    
    const priorityProps = ['value', 'onChange', 'name', 'data', 'columns', 'rules', 'onSubmit', 'disabled', 'placeholder', 'type'];
    
    const sortedProps = [...component.props!].sort((a, b) => {
      const aIndex = priorityProps.indexOf(a.name);
      const bIndex = priorityProps.indexOf(b.name);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.required === b.required ? 0 : a.required ? -1 : 1;
    });
    
    const importantProps = sortedProps.slice(0, 6);
    for (const prop of importantProps) {
      const required = prop.required ? ' *(必填)*' : '';
      const relatedNote = this.getRelatedNote(prop, component);
      content += `- **${prop.name}**${required}: \`${prop.type}\` - ${this.truncateDescription(prop.description, 80)}${relatedNote}\n`;
    }
    
    if (component.props!.length > 6) {
      content += `- ...还有 ${component.props!.length - 6} 个其他属性\n`;
    }
    content += `\n`;

    return content;
  }

  private formatFormRefMethods(methods: any[]): string {
    let doc = `## FormRef 方法\n\n`;
    for (const method of methods) {
      doc += `### ${method.name}\n`;
      doc += `- **描述**: ${method.description}\n`;
      if (method.signature) {
        doc += `- **签名**: \`${method.signature}\`\n`;
      }
      doc += `\n`;
    }
    return doc;
  }

  private formatFormDatumMethods(methods: any[]): string {
    let doc = `## FormDatum 方法\n\n`;
    for (const method of methods) {
      doc += `### ${method.name}\n`;
      doc += `- **描述**: ${method.description}\n`;
      if (method.signature) {
        doc += `- **签名**: \`${method.signature}\`\n`;
      }
      doc += `\n`;
    }
    return doc;
  }

  private formatTableColumns(columnProps: any[]): string {
    let doc = `## 列配置选项 (CommonColumn)\n\n`;
    
    const importantProps = ['title', 'render', 'width', 'sorter', 'filter', 'fixed', 'type'];
    doc += `### 常用列配置\n\n`;
    
    for (const propName of importantProps) {
      const prop = columnProps.find((p: any) => p.name === propName);
      if (prop) {
        const required = prop.required ? ' *(必填)*' : '';
        doc += `#### ${prop.name}${required}\n`;
        doc += `- **类型**: \`${prop.type}\`\n`;
        doc += `- **描述**: ${prop.description}\n`;
        if (prop.defaultValue) {
          doc += `- **默认值**: \`${prop.defaultValue}\`\n`;
        }
        doc += `\n`;
      }
    }
    
    const otherProps = columnProps.filter((p: any) => !importantProps.includes(p.name));
    if (otherProps.length > 0) {
      doc += `### 其他列配置选项\n\n`;
      doc += `| 属性 | 类型 | 描述 |\n`;
      doc += `|------|------|------|\n`;
      for (const prop of otherProps.slice(0, 10)) {
        doc += `| ${prop.name} | \`${prop.type}\` | ${this.truncateDescription(prop.description, 50)} |\n`;
      }
      if (otherProps.length > 10) {
        doc += `\n> 还有 ${otherProps.length - 10} 个其他列配置属性\n`;
      }
      doc += `\n`;
    }

    return doc;
  }

  private formatMethodsPreview(title: string, methods: any[]): string {
    let content = `### ${title}\n`;
    for (let i = 0; i < Math.min(3, methods.length); i++) {
      content += `- **${methods[i].name}**: ${this.truncateDescription(methods[i].description, 80)}\n`;
    }
    if (methods.length > 3) {
      content += `- ...还有 ${methods.length - 3} 个其他方法\n`;
    }
    content += `\n`;
    return content;
  }

  private formatColumnsPreview(columnProps: any[]): string {
    let content = `### 列配置选项\n`;
    content += `支持 ${columnProps.length} 个列配置属性，包括：\n`;
    const mainProps = ['title', 'render', 'width', 'sorter', 'filter'];
    for (const propName of mainProps) {
      const prop = columnProps.find((p: any) => p.name === propName);
      if (prop) {
        content += `- **${prop.name}**: ${this.truncateDescription(prop.description, 60)}\n`;
      }
    }
    content += `\n`;
    return content;
  }

  private formatExamplesSection(component: ComponentData): string {
    let doc = `## 使用示例\n\n`;
    
    const basicExample = component.examples!.find(ex => ex.scenario === 'basic') || component.examples![0];
    
    if (basicExample) {
      doc += `### ${basicExample.title}\n\n`;
      if (basicExample.description) {
        doc += `${basicExample.description}\n\n`;
      }
      
      const cleanCode = this.extractCleanCode(basicExample.code);
      const truncatedCode = this.truncateCode(cleanCode, 600);
      doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
    }
    
    if (component.category === 'form' || component.name === 'Form') {
      const formExample = component.examples!.find(ex => 
        ex.scenario === 'form' || 
        ex.title.toLowerCase().includes('form') ||
        ex.title.includes('表单')
      );
      
      if (formExample && formExample !== basicExample) {
        doc += `### ${formExample.title}\n\n`;
        if (formExample.description) {
          doc += `${formExample.description}\n\n`;
        }
        const cleanCode = this.extractCleanCode(formExample.code);
        const truncatedCode = this.truncateCode(cleanCode, 400);
        doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
      }
    }
    
    const displayedExamples = [basicExample];
    if (component.category === 'form') {
      const formEx = component.examples!.find(ex => ex.scenario === 'form');
      if (formEx) displayedExamples.push(formEx);
    }
    
    const otherExamples = component.examples!.filter(ex => !displayedExamples.includes(ex));
    if (otherExamples.length > 0) {
      doc += `### 其他可用示例\n\n`;
      for (const example of otherExamples.slice(0, 4)) {
        doc += `- **${example.title}**: ${example.description || example.scenario}\n`;
      }
      if (otherExamples.length > 4) {
        doc += `- ...还有 ${otherExamples.length - 4} 个其他示例\n`;
      }
      doc += `\n`;
    }

    return doc;
  }

  private formatExamplesForSearch(component: ComponentData): string {
    let content = `### 使用示例\n\n`;
    
    const basicExample = component.examples!.find(ex => ex.scenario === 'basic') || component.examples![0];
    
    if (basicExample) {
      content += `#### ${basicExample.title}\n`;
      if (basicExample.description) {
        content += `${basicExample.description}\n\n`;
      }
      
      const cleanCode = this.extractCleanCode(basicExample.code);
      const truncatedCode = this.truncateCode(cleanCode, 500);
      
      content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
    }

    if (component.category === 'form' || component.name === 'Form') {
      const formExample = component.examples!.find(ex => 
        ex.scenario === 'form' || 
        ex.title.toLowerCase().includes('form') ||
        ex.title.includes('表单')
      );
      
      if (formExample && formExample !== basicExample) {
        content += `#### ${formExample.title}\n`;
        const cleanCode = this.extractCleanCode(formExample.code);
        const truncatedCode = this.truncateCode(cleanCode, 300);
        content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
      }
    }

    const otherExamples = component.examples!.filter(ex => 
      ex !== basicExample && 
      !(component.category === 'form' && ex.scenario === 'form')
    );
    
    if (otherExamples.length > 0) {
      content += `#### 其他可用示例：\n`;
      otherExamples.slice(0, 3).forEach(ex => {
        content += `- **${ex.title}**: ${ex.description || ex.scenario}\n`;
      });
      content += `\n`;
    }

    return content;
  }

  private extractCleanCode(rawCode: string): string {
    let cleaned = rawCode.replace(/^\/\*\*[\s\S]*?\*\/\s*\n/, '');
    return cleaned.trim();
  }

  private truncateCode(code: string, maxLength: number): string {
    if (code.length <= maxLength) return code;
    
    const lines = code.split('\n');
    let truncated = '';
    let currentLength = 0;
    
    for (const line of lines) {
      if (currentLength + line.length > maxLength) {
        if (truncated.includes('return (') || truncated.includes('return <')) {
          truncated += '\n  // ... 更多代码\n';
          break;
        }
      }
      truncated += line + '\n';
      currentLength += line.length + 1;
    }
    
    return truncated.trim();
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }

  private getRelatedNote(prop: any, component: ComponentData): string {
    if (prop.relatedComponent) {
      return ` (见 ${prop.relatedComponent} 组件)`;
    }
    if (prop.relatedMethods) {
      return ` (见下方${prop.relatedMethods}方法)`;
    }
    if (prop.relatedConfig) {
      return ` (见下方${prop.relatedConfig}配置)`;
    }
    
    if (prop.name === 'formRef' && component.name === 'Form') {
      return ' (见下方FormRef方法)';
    }
    if (prop.name === 'columns' && component.name === 'Table') {
      return ' (见下方列配置选项)';
    }
    if (prop.name === 'rules') {
      return ' (见 Rule 组件)';
    }
    
    return '';
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      form: '表单组件',
      display: '展示组件', 
      layout: '布局组件',
      feedback: '反馈组件',
      navigation: '导航组件',
      other: '其他组件'
    };
    return names[category] || category;
  }
}