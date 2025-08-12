# 安装和配置指南

本指南将帮助你在 Claude Desktop 中配置 shineout-mcp MCP 服务器。

## 前置要求

- Node.js 16.0 或更高版本
- Claude Desktop 应用程序
- npm 或 yarn 包管理器

## 安装步骤

### 1. 安装 shineout-mcp

有两种安装方式：

#### 方式一：全局安装（推荐）

```bash
npm install -g shineout-mcp
```

或使用 yarn：

```bash
yarn global add shineout-mcp
```

#### 方式二：使用 npx（无需安装）

直接使用 npx 命令，每次使用时会自动下载最新版本。

### 2. 配置 Claude Desktop

找到 Claude Desktop 的配置文件：

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 3. 编辑配置文件

如果文件不存在，请创建一个新文件。添加以下配置：

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

如果你选择了全局安装，可以使用：

```json
{
  "mcpServers": {
    "shineout": {
      "command": "shineout-mcp",
      "args": [],
      "env": {}
    }
  }
}
```

### 4. 重启 Claude Desktop

保存配置文件后，完全退出并重新启动 Claude Desktop 应用程序。

### 5. 验证安装

在 Claude Desktop 中，你可以通过以下方式验证安装是否成功：

1. 查看工具列表 - Claude 应该能识别 shineout 相关的工具
2. 尝试询问组件相关问题，例如：
   - "列出所有 Shineout 组件"
   - "获取 Button 组件的文档"
   - "搜索表单相关的组件"

## 故障排除

### 服务器无法启动

1. 检查 Node.js 版本：
   ```bash
   node --version
   ```
   确保版本 >= 16.0

2. 验证包安装：
   ```bash
   npm list -g shineout-mcp
   ```

3. 手动测试服务器：
   ```bash
   npx shineout-mcp
   ```
   应该看到服务器启动日志

### Claude 无法识别工具

1. 确保配置文件路径正确
2. 检查配置文件 JSON 格式是否正确
3. 确保 Claude Desktop 已完全重启

### 其他问题

如遇到其他问题，请：

1. 查看 Claude Desktop 的日志
2. 在 [GitHub Issues](https://github.com/sheinsight/shineout-next/issues) 提交问题
3. 提供错误日志和系统信息

## 更新

更新到最新版本：

```bash
npm update -g shineout-mcp
```

或使用 npx 时会自动使用最新版本。

## 卸载

如需卸载：

```bash
npm uninstall -g shineout-mcp
```

并从 Claude Desktop 配置文件中移除相关配置。