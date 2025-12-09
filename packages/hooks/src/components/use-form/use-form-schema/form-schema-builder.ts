interface SchemaMeta {
  type?: string;
  required?: boolean;
  title?: string;
  format?: string;
  items?: any;
  enum?: any[] | { anyOf?: any[], oneOf?: any[] };
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

  private mapEnumData(data: any[], format: any): any[] {
    return data.map((item: any) => {
      if (typeof format === 'string') {
        return item ? item[format] : item;
      } else if (typeof format === 'function' && item) {
        return format(item);
      } else {
        return item;
      }
    });
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
      const format = componentElement.props.format || componentElement.props.keygen;
      switch (componentName) {
        case 'ShineoutInput':
        case 'ShineoutEditableArea':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutInputNumber':
          fieldSchemaInfo.type = 'number';
          break;
        case 'ShineoutInputPassword':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutTextarea':
          fieldSchemaInfo.type = 'string';
          break;
        case 'ShineoutCascader':
        case 'ShineoutSelect':
        case 'ShineoutTreeSelect': {
          if (typeof componentElement.props.keygen !== 'boolean') {
            if (typeof format === 'string') {
              itemType = typeof data?.[0] === 'object' ? typeof data?.[0]?.[format] : typeof data?.[0];
            } else if (typeof format === 'function' && data?.[0]) {
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
              type: itemType !== 'undefined' ? itemType : 'string',
            };
          } else {
            if (itemType !== 'undefined') {
              fieldSchemaInfo.type = itemType;
            }
          }

          if (itemType === 'object') {
            // 对于对象类型，使用 oneOf 而不是 enum
            if (componentElement.props.multiple) {
              fieldSchemaInfo.items.oneOf = componentElement.props.data.map((item: any) => ({
                const: item,
                title: item?.title || JSON.stringify(item)
              }));
            } else {
              fieldSchemaInfo.oneOf = componentElement.props.data.map((item: any) => ({
                const: item,
                title: item?.title || JSON.stringify(item)
              }));
            }
          } else {
            const enumData = this.mapEnumData(componentElement.props.data, format);
            if (enumData.length > 0) {
              if (componentElement.props.multiple) {
                fieldSchemaInfo.items.enum = enumData;
              } else {
                fieldSchemaInfo.enum = enumData;
              }
            }
          }
          if(componentElement.props.data.length > 0) {
            fieldSchemaInfo.description += `enumData: ${JSON.stringify(componentElement.props.data)};`
          }
          fieldSchemaInfo.props = {...componentElement.props};
          break;
        }
        case 'ShineoutDatePicker': {
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

          const defaultTime = componentElement.props.defaultTime?.toString() || '';
          if(defaultTime) {
            fieldSchemaInfo.description += `默认时间：${defaultTime} `
          }
          let dateformat = componentElement.props.format || '';
          if(!dateformat) {
            switch(componentElement.props.type) {
              case 'date':
                dateformat = 'YYYY-MM-DD';
                break;
              case 'time':
                dateformat = 'HH:mm:ss';
                break;
              case 'datetime':
                dateformat = 'YYYY-MM-DD HH:mm:ss';
                break;
              case 'week':
                dateformat = 'GGGG WW';
                break;
              case 'month':
                dateformat = 'YYYY-MM';
                break;
              case 'quarter':
                dateformat = 'YYYY-[Q]Q';
                break;
              case 'year':
                dateformat = 'YYYY';
                break;
              default:
                dateformat = 'YYYY-MM-DD';
                break;
            }
          }
          fieldSchemaInfo.description += `格式：${dateformat} `
          if (componentElement.props.max) {
            fieldSchemaInfo.description += `最大时间：${componentElement.props.max} `
          }
          if (componentElement.props.min) {
            fieldSchemaInfo.description += `最小时间：${componentElement.props.min} `
          }
          break;
        }
        case 'ShineoutCheckbox':
        case 'ShineoutCheckboxGroup': {
          if (typeof componentElement.props.keygen !== 'boolean') {
            if (typeof format === 'string') {
              itemType = typeof data?.[0] === 'object' ? typeof data?.[0]?.[format] : typeof data?.[0];
            } else if (typeof format === 'function' && data?.[0]) {
              itemType = typeof format(data?.[0]);
            } else {
              itemType = typeof data?.[0];
            }
          } else {
            itemType = typeof data?.[0];
          }

          fieldSchemaInfo.type = 'array';
          fieldSchemaInfo.items = { type: itemType };

          // ShineoutCheckboxGroup 有 data 时（多选的）
          if (itemType === 'object') {
            fieldSchemaInfo.items.oneOf = componentElement.props.data.map((item: any) => ({
              const: item,
              title: item?.title || JSON.stringify(item)
            }));
          } else {
            fieldSchemaInfo.items.enum = this.mapEnumData(componentElement.props.data, format);
          }
          if(componentElement.props.data.length > 0) {
            fieldSchemaInfo.description += `enumData: ${JSON.stringify(componentElement.props.data)};`
          }
          break;
        }
        case 'ShineoutRadio':
        case 'ShineoutRadioGroup': {

          if (typeof componentElement.props.keygen !== 'boolean') {
            if (typeof format === 'string') {
              itemType = typeof data?.[0] === 'object' ? typeof data?.[0]?.[format] : typeof data?.[0];
            } else if (typeof format === 'function' && data?.[0]) {
              itemType = typeof format(data?.[0]);
            } else {
              itemType = typeof data?.[0];
            }
          } else {
            itemType = typeof data?.[0];
          }

          if (itemType !== 'undefined') {
            fieldSchemaInfo.type = itemType;
          }

          // ShineoutRadioGroup 有 data 时（单选的）
          if (itemType === 'object') {
            fieldSchemaInfo.oneOf = componentElement.props.data.map((item: any) => ({
              const: item,
              title: item?.title || JSON.stringify(item)
            }));
          } else {
            fieldSchemaInfo.enum = this.mapEnumData(componentElement.props.data, format);
          }
          if(componentElement.props.data.length > 0) {
            fieldSchemaInfo.description += `enumData: ${JSON.stringify(componentElement.props.data)};`
          }
          break;
        }
        case 'ShineoutSwitch':
          fieldSchemaInfo.type = 'boolean';
          break;
        case 'ShineoutSlider':
        case 'ShineoutRate':
          fieldSchemaInfo.type = 'number';
          break;

        default:
          if (Array.isArray(componentElement.props.value) && componentElement.props.value.length === 0) {
            fieldSchemaInfo.type = 'array';
            fieldSchemaInfo.items = {
              type: 'string',
            };
          } else {
            if (typeof componentElement.props.value !== 'undefined') {
              fieldSchemaInfo.type = typeof componentElement.props.value;
            }
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

    // 过滤掉 required 属性，items 对象不应该包含 required
    const { required: _required, ...itemsMeta } = meta;
    this.mergeSchema(currentSchema.items, remainingSegments, itemsMeta);
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
