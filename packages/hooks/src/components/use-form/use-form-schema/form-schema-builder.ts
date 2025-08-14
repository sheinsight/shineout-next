interface SchemaMeta {
  type?: string;
  required?: boolean;
  title?: string;
  format?: string;
  items?: any;
  enum?: any[] | { anyOf: any[] };
  description?: string;
  [key: string]: any;
}

export interface SchemaProperty {
  type?: string;
  properties?: Record<string, SchemaProperty>;
  items?: SchemaProperty;
  required?: string[];
  title?: string;
  description?: string;
  format?: string;
  enum?: any;
  [key: string]: any;
}

export class SchemaBuilder {
  private schema: SchemaProperty;
  constructor(formName: string) {
    this.schema = {
      type: 'object',
      title: formName,
      properties: {}
    };
  }

  updateSchema({ path, meta }: { path: string; meta: SchemaMeta }): void {
    const pathSegments = this.parsePath(path);
    if (!pathSegments) return
    this.mergeSchema(this.schema, pathSegments, meta);
  }

  /**
   * 根据组件信息构建 schema meta
   */
  buildSchemaFromComponent(params: {
    componentElement: any;
    rules?: any[];
    label?: string;
    finalFieldId?: string;
    separator?: string;
  }): SchemaMeta {
    const { componentElement, rules, label, finalFieldId, separator } = params;

    let fieldSchemaInfo: SchemaMeta = {
      title: label,
    };

    const data = componentElement.props.data;
    const isRequired = rules?.some((rule: any) => rule.required);
    fieldSchemaInfo.required = isRequired;

    fieldSchemaInfo.description = ''

    if(rules?.length) {
      const messageRules = rules.filter((rule: any) => typeof rule.message === 'string');
      if(messageRules.length) {
        fieldSchemaInfo.description += `rules: ${messageRules.map((rule: any) => rule.message).join(', ')};`
      }
    }

    let itemType;
    if (typeof componentElement.type === 'function') {
      const componentName = componentElement.type.displayName || componentElement.type.name;
      switch (componentName) {
        case 'ShineoutInput':
        case 'Input':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutInputNumber':
        case 'InputNumber':
          fieldSchemaInfo.type = 'number';
          break;
        case 'ShineoutInputPassword':
        case 'InputPassword':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutTextarea':
        case 'Textarea':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutSelect':
        case 'Select':
        case 'ShineoutTreeSelect':
        case 'TreeSelect': {
          const format = componentElement.props.format || componentElement.props.keygen;
          if (typeof componentElement.props.keygen !== 'boolean') {
            if (typeof format === 'string') {
              itemType = typeof data?.[0] === 'object' ? typeof data?.[0]?.[format] : typeof data?.[0];
            } else if (typeof format === 'function') {
              itemType = typeof format(data?.[0]);
            } else {
              itemType = typeof data?.[0];
            }
          } else {
            itemType = typeof data?.[0];
          }
          if (componentElement.props.multiple) {
            fieldSchemaInfo.type = 'array';
            fieldSchemaInfo.items = {
              type: itemType,
            };
          } else {
            fieldSchemaInfo.type = itemType;
          }
          // props.data格式： [
          //   { "value": 1, "title": "年假" },
          //   { "value": 2, "title": "调休" },
          //   { "value": 3, "title": "事假" },
          //   { "value": 4, "title": "病假" },
          //   { "value": 5, "title": "其他" }
          // ]
          // 转换为jsonschema中的enum格式：
          // "enum": {
          //   "anyOf": [
          //     { "const": 1, "title": "年假" },
          //     { "const": 2, "title": "调休" },
          //     { "const": 3, "title": "事假" },
          //     { "const": 4, "title": "病假" },
          //     { "const": 5, "title": "其他" }
          //   ]
          // }
          fieldSchemaInfo.enum = {
            anyOf: componentElement.props.data.map((item: any) => ({
              const: item?.[format] || item,
              title: item?.title || item,
            })),
          };
          break;
        }
        case 'ShineoutDatePicker':
        case 'DatePicker':
          if (componentElement.props.range) {
            if (finalFieldId?.includes(separator || '')) {
              fieldSchemaInfo.type = 'string';
              fieldSchemaInfo.format = 'date';
            } else {
              fieldSchemaInfo.type = 'array';
              fieldSchemaInfo.items = {
                type: 'string',
                format: 'date',
              };
            }
          } else {
            fieldSchemaInfo.type = 'string';
            fieldSchemaInfo.format = 'date';
          }

          fieldSchemaInfo.description += `默认时间：${componentElement.props.defaultTime?.toString() || ''}; 格式：${componentElement.props.format || ''} `
          break;
        case 'ShineoutCheckbox':
        case 'Checkbox':
        case 'ShineoutCheckboxGroup':
        case 'CheckboxGroup':
          fieldSchemaInfo.type = 'array';
          fieldSchemaInfo.items = {
            type: 'string',
          };
          break;
        case 'ShineoutRadio':
        case 'Radio':
        case 'ShineoutRadioGroup':
        case 'RadioGroup':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutSwitch':
        case 'Switch':
          fieldSchemaInfo.type = 'boolean';
          break;
        case 'ShineoutRate':
        case 'Rate':
          fieldSchemaInfo.type = 'number';
          break;

        default:
          if (Array.isArray(componentElement.props.value) && componentElement.props.value.length === 0) {
            fieldSchemaInfo.type = 'array';
            fieldSchemaInfo.items = {
              type: 'string',
            };
          } else {
            fieldSchemaInfo.type = typeof componentElement.props.value;
          }
          break;
      }
    }

    return fieldSchemaInfo;
  }

  // 解析路径字符串，如 'a[0].b1' -> ['a', '[0]', 'b1']
  parsePath(path?: string): string[] | null {
    if (!path) return null;
    const segments = [];
    let current = '';
    let inBracket = false;

    for (let i = 0; i < path.length; i++) {
      const char = path[i];

      if (char === '[') {
        if (current) {
          segments.push(current);
          current = '';
        }
        current = '[';
        inBracket = true;
      } else if (char === ']') {
        current += ']';
        segments.push(current);
        current = '';
        inBracket = false;
      } else if (char === '.' && !inBracket) {
        if (current) {
          segments.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      segments.push(current);
    }

    return segments;
  }

  // 递归合并 schema
  mergeSchema(currentSchema: SchemaProperty, pathSegments: string[], meta: SchemaMeta): void {
    if (pathSegments.length === 0) {
      // 到达叶子节点，应用元数据
      Object.assign(currentSchema, meta);
      return;
    }

    const [currentSegment, ...remainingSegments] = pathSegments;

    if (currentSegment.startsWith('[') && currentSegment.endsWith(']')) {
      // 处理数组索引，如 [0]
      this.handleArraySegment(currentSchema, remainingSegments, meta);
    } else {
      // 处理对象属性
      this.handleObjectProperty(currentSchema, currentSegment, remainingSegments, meta);
    }
  }

  handleArraySegment(currentSchema: SchemaProperty, remainingSegments: string[], meta: SchemaMeta): void {
    // 当前节点应该是数组类型
    if (!currentSchema.items) {
      currentSchema.type = 'array';
      currentSchema.items = {
        type: 'object',
        properties: {}
      };
    }

    this.mergeSchema(currentSchema.items, remainingSegments, meta);
  }

  handleObjectProperty(currentSchema: SchemaProperty, propertyName: string, remainingSegments: string[], meta: SchemaMeta): void {
    // 确保当前节点有 properties
    if (!currentSchema.properties) {
      currentSchema.properties = {};
    }

    // 如果属性不存在，创建它
    if (!currentSchema.properties[propertyName]) {
      currentSchema.properties[propertyName] = remainingSegments.length > 0
        ? { type: 'object' }
        : {};
    }

    if (remainingSegments.length === 0) {
      // 叶子节点，应用元数据并处理 required
      const { required, ...restMeta } = meta;
      Object.assign(currentSchema.properties[propertyName], restMeta);
      if (typeof required === 'boolean') {
        this.handleRequired(currentSchema, propertyName, required);
      }
    } else {
      // 继续递归
      this.mergeSchema(currentSchema.properties[propertyName], remainingSegments, meta);
    }
  }

  handleRequired(parentSchema: SchemaProperty, propertyName: string, isRequired: boolean): void {
    // 如果required是布尔值，转换为数组形式
    if (typeof parentSchema.required === 'boolean') {
      return;
    }

    if (!parentSchema.required) {
      parentSchema.required = [];
    }

    const requiredIndex = parentSchema.required.indexOf(propertyName);

    if (isRequired && requiredIndex === -1) {
      parentSchema.required.push(propertyName);
    } else if (!isRequired && requiredIndex !== -1) {
      parentSchema.required.splice(requiredIndex, 1);
    }

    // 如果 required 数组为空，删除它
    if (parentSchema.required.length === 0) {
      delete parentSchema.required;
    }
  }

  getFormSchema(): SchemaProperty {
    return this.schema;
  }
}
