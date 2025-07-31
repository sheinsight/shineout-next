import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const TOOL_DEFINITIONS: Tool[] = [
  {
    name: 'get_component',
    description: '🔍 获取 Shineout 组件的完整文档\n\n此工具将为您提供：\n• 组件的详细 API 文档（Props、Methods、Events）\n• 实际使用示例和最佳实践\n• FormRef 方法（Form 组件专属）\n• 列配置选项（Table 组件专属）\n\n💡 使用提示：查询到的 API 信息将帮助您正确使用组件，请严格按照文档中的属性和方法进行开发。',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '组件名称，如 Button, Input, Form 等',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_component_api',
    description: '📊 获取组件的纯 API 参考文档\n\n此工具将为您提供：\n• 组件的所有属性表格（类型、默认值、必填项）\n• 可用方法的签名和说明\n• 事件和子组件信息\n• 相关使用示例（自动匹配）\n\n💡 适用场景：当您需要快速查看组件的 API 参考时使用。',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称',
        },
        category: {
          type: 'string',
          description: '只获取特定类别的 API',
          enum: ['props', 'methods', 'events', 'subComponents'],
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'search_api',
    description: '🔎 在所有组件中搜索特定的 API\n\n此工具将帮助您：\n• 找到包含特定属性或方法的组件\n• 了解哪些组件支持某个特定功能\n• 查看相关示例代码\n\n💡 使用场景：当您知道属性名但不确定哪个组件支持时。',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: '搜索关键词',
        },
        searchIn: {
          type: 'string',
          description: '搜索范围',
          enum: ['props', 'methods', 'all'],
          default: 'all',
        },
      },
      required: ['keyword'],
    },
  },
  {
    name: 'compare_components_api',
    description: '🔀 对比多个组件的 API 差异\n\n此工具将为您：\n• 展示组件之间的共同属性\n• 高亮每个组件的独特功能\n• 帮助选择最合适的组件\n\n💡 适用场景：当您在多个相似组件之间做选择时。',
    inputSchema: {
      type: 'object',
      properties: {
        components: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '要对比的组件名称列表',
          minItems: 2,
          maxItems: 5,
        },
      },
      required: ['components'],
    },
  },
  {
    name: 'search_components',
    description: '🔍 智能搜索 Shineout 组件\n\n此工具将：\n• 根据关键词搜索匹配的组件\n• 自动返回完整的 API 信息\n• 提供使用示例和最佳实践\n• 支持按分类筛选（表单、展示、布局等）\n\n💡 使用场景：当您不确定组件名称或想查找特定功能的组件时。',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: '搜索关键词（组件名、功能描述等）',
        },
        category: {
          type: 'string',
          description: '组件分类：form, display, layout, feedback, navigation',
          enum: ['form', 'display', 'layout', 'feedback', 'navigation'],
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_components',
    description: '📋 浏览所有可用组件\n\n此工具将展示：\n• 按分类整理的组件列表\n• 每个组件的简要说明\n• 支持按类型筛选（表单、展示、布局等）\n\n💡 适用场景：当您想了解 Shineout 提供了哪些组件时。',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: '按分类筛选',
          enum: ['form', 'display', 'layout', 'feedback', 'navigation', 'all'],
        },
      },
    },
  },
  {
    name: 'get_examples',
    description: '📖 获取组件的代码示例\n\n此工具将提供：\n• 实际可运行的代码示例\n• 不同使用场景的案例\n• 最佳实践和常见用法\n• 支持按场景筛选（基础、高级、表单、验证等）\n\n💡 使用场景：当您需要参考实际代码来学习组件用法时。',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: '组件名称',
        },
        scenario: {
          type: 'string',
          description: '使用场景：basic, advanced, form, validation',
        },
      },
      required: ['component'],
    },
  },
];