# shineout-mcp

Shineout 组件文档提供器，通过 MCP (Model Context Protocol) 协议为 Claude AI 提供准确的 Shineout 组件使用信息。

让 Claude AI 成为你的 Shineout 开发助手！

## 功能特性

- 📚 完整的 Shineout 组件 API 文档
- 🔍 智能组件搜索和过滤
- 💡 丰富的使用示例和最佳实践
- 🎯 针对 AI 优化的文档格式
- 🔄 与 Claude Desktop 无缝集成

## 安装

```bash
npm install -g shineout-mcp
```

## 快速开始

### 1. 安装包

```bash
npm install -g shineout-mcp
```

### 2. 配置 Claude Desktop

在 Claude Desktop 的配置文件中添加 MCP 服务器配置：

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shineout": {
      "command": "npx",
      "args": ["shineout-mcp"],
      "env": {}
    }
  }
}
```

### 3. 重启 Claude Desktop

配置完成后重启 Claude Desktop，你就可以在对话中使用 Shineout 文档功能了！

### 4. 开始使用

在 Claude Desktop 中，你可以这样提问：

- `获取 Button 组件的文档`
- `搜索表单相关的组件`
- `列出所有表单组件`
- `Button 组件有哪些属性？`
- `如何使用 Input 组件？`
- `给我一个 Form 的使用示例`

## 可用工具

### get_component
获取指定组件的详细文档和 API 信息。

```
获取 Button 组件的文档
```

### search_components
搜索组件或功能。

```
搜索表单相关的组件
```

### list_components
列出所有可用的组件，可按分类筛选。

```
列出所有表单组件
```

### get_examples
获取组件的使用示例。

```
获取 Form 组件的高级用法示例
```

## 开发

### 本地开发

```bash
# 克隆仓库
git clone <repository-url>
cd packages/shineout-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 生成组件数据
npm run generate
```

### 目录结构

```
packages/shineout-mcp/
├── bin/                    # 可执行文件
│   └── shineout-mcp.js  # MCP 服务器入口
├── src/
│   ├── server/             # MCP 服务器实现
│   ├── tools/              # 工具服务
│   ├── data/               # 组件数据和加载器
│   └── types/              # TypeScript 类型定义
├── scripts/                # 构建和生成脚本
└── dist/                   # 编译输出
```

## 数据生成

项目包含脚本来从 Shineout 源码自动提取组件信息：

```bash
npm run generate
```

这将：
- 解析 TypeScript 类型定义
- 提取组件 Props 和事件
- 生成使用示例
- 创建搜索索引

## 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

MIT License

## 支持

如有问题或建议，请在 [GitHub Issues](https://github.com/sheinsight/shineout-next/issues) 中提出。