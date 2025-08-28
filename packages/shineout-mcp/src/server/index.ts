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

import { ComponentService, TOOL_DEFINITIONS } from '../tools/index.js';
import { loadComponentData } from '../data/loader.js';
import { ToolFeedbackManager } from '../tools/feedback/index.js';
import { VERSION } from '../version.js';

class ShineoutMcpServer {
  private server: Server;
  private componentService: ComponentService;

  constructor() {
    this.server = new Server(
      {
        name: 'shineout-mcp',
        version: VERSION,
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
      console.error('[MCP] 📦 正在加载 Shineout 组件工具...');
      return {
        tools: TOOL_DEFINITIONS,
      };
    });

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const startTime = Date.now();

      // 发送开始执行的反馈
      const startingMessage = ToolFeedbackManager.createStartingFeedback(name, args || {});
      console.error(`[MCP] ${startingMessage}`);

      try {
        let result;
        
        // 发送处理中的反馈
        const processingMessage = ToolFeedbackManager.createProcessingFeedback(name, args || {});
        console.error(`[MCP] ${processingMessage}`);
        
        switch (name) {
          case 'get_component':
            result = await this.componentService.getComponent(args?.name as string);
            break;
          
          case 'search_components':
            result = await this.componentService.searchComponents(args?.query as string, args?.category as string);
            break;
          
          case 'list_components':
            result = await this.componentService.listComponents((args?.category as string) || 'all');
            break;
          
          case 'get_examples':
            result = await this.componentService.getExamples(args?.component as string);
            break;
          
          case 'get_component_api':
            result = await this.componentService.getComponentAPI(args?.component as string, args?.category as string);
            break;
          
          case 'search_api':
            result = await this.componentService.searchAPI(args?.keyword as string, args?.searchIn as 'props' | 'methods' | 'all');
            break;
          
          case 'compare_components_api':
            result = await this.componentService.compareComponentsAPI(args?.components as string[]);
            (result as any)._componentCount = (args?.components as string[] | undefined)?.length; // 保存组件数量以便反馈
            break;
          
          case 'get_tips':
            result = await this.componentService.getTips(
              args?.component as string
            );
            break;
          
          case 'get_component_classnames':
            result = await this.componentService.getComponentClassNames(
              args?.component as string
            );
            break;
          
          case 'list_all_classnames':
            result = await this.componentService.listAllClassNames();
            break;
          
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
        
        // 发送成功反馈
        const successMessage = ToolFeedbackManager.createSuccessFeedback(name, result);
        const summary = ToolFeedbackManager.createExecutionSummary(name, startTime);
        console.error(`[MCP] ${successMessage}${summary}`);
        
        // 在结果中添加反馈信息
        if (result && result.content && result.content[0]) {
          const feedbackHeader = `🚀 **Shineout MCP 工具正在为您服务**\n\n${successMessage}\n\n---\n\n`;
          result.content[0].text = feedbackHeader + result.content[0].text;
        }
        
        return result;
      } catch (error) {
        // 发送错误反馈
        const errorMessage = ToolFeedbackManager.createErrorFeedback(name, error as Error);
        console.error(`[MCP] ${errorMessage}`);
        
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
          {
            uri: 'shineout://classnames/all',
            mimeType: 'application/json',
            name: 'All Component ClassNames',
            description: '所有组件的 className 信息和渲染结构',
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
      
      if (uri === 'shineout://classnames/all') {
        const result = await this.componentService.listAllClassNames();
        return {
          contents: [
            {
              uri,
              mimeType: 'text/plain',
              text: result.content[0].text,
            },
          ],
        };
      }
      
      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  async run() {
    console.error('[MCP] 🚀 正在启动 Shineout MCP 服务...');
    
    // 初始化组件数据
    console.error('[MCP] 📊 正在加载组件数据...');
    await loadComponentData();
    console.error('[MCP] ✅ 组件数据加载完成');
    
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('[MCP] 🎉 Shineout MCP 服务已成功启动！');
    console.error('[MCP] 💡 可用工具：get_component, search_components, get_component_api 等');
  }
}

// 启动服务器
const server = new ShineoutMcpServer();
server.run().catch((error) => {
  console.error('Failed to run server:', error);
  process.exit(1);
});