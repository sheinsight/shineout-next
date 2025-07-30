import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { ComponentService } from '../tools/component-service.js';
import { loadComponentData } from '../data/loader.js';

class ShineoutClaudeServer {
  private server: Server;
  private componentService: ComponentService;

  constructor() {
    this.server = new Server(
      {
        name: 'shineout-claude',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.componentService = new ComponentService();
    this.setupHandlers();
  }

  private setupHandlers() {
    // 列出可用的工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_component',
            description: '获取指定组件的详细文档和API信息',
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
            name: 'search_components',
            description: '搜索组件并自动返回完整的 API 信息。包括主要 Props、子组件、相关方法等',
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
            description: '列出所有可用的组件',
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
            description: '获取组件的使用示例',
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
        ],
      };
    });

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_component':
            return await this.componentService.getComponent(args?.name as string);
          
          case 'search_components':
            return await this.componentService.searchComponents(args?.query as string, args?.category as string);
          
          case 'list_components':
            return await this.componentService.listComponents((args?.category as string) || 'all');
          
          case 'get_examples':
            return await this.componentService.getExamples(args?.component as string, args?.scenario as string);
          
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });

    // 列出资源
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'shineout://components/list',
            mimeType: 'application/json',
            name: 'All Components',
            description: '所有 Shineout 组件列表',
          },
        ],
      };
    });

    // 读取资源
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      if (uri === 'shineout://components/list') {
        const components = await this.componentService.listComponents('all');
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(components, null, 2),
            },
          ],
        };
      }
      
      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  async run() {
    // 初始化组件数据
    await loadComponentData();
    
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('Shineout Claude MCP server running on stdio');
  }
}

// 启动服务器
const server = new ShineoutClaudeServer();
server.run().catch((error) => {
  console.error('Failed to run server:', error);
  process.exit(1);
});