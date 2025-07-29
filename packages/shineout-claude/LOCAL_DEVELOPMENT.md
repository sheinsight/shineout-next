# 本地开发使用指南

本指南将帮助你在本地开发环境中使用 shineout-claude MCP 服务器，无需发布到 npm。

## 步骤

### 1. 构建项目

在 shineout-claude 目录下执行：

```bash
# 生成组件数据
npm run generate

# 构建项目
npm run build
```

### 2. 找到 Claude Desktop 配置文件

配置文件位置：
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 3. 配置 Claude Desktop 使用本地路径

编辑配置文件，添加以下内容（**注意替换为你的实际路径**）：

```json
{
  "mcpServers": {
    "shineout-local": {
      "command": "node",
      "args": ["/你的实际路径/shineout-next/packages/shineout-claude/bin/shineout-claude.js"],
      "env": {}
    }
  }
}
```

例如，如果你的项目在 `/Users/username/projects/shineout-next`，配置应该是：

```json
{
  "mcpServers": {
    "shineout-local": {
      "command": "node",
      "args": ["/Users/username/projects/shineout-next/packages/shineout-claude/bin/shineout-claude.js"],
      "env": {}
    }
  }
}
```

### 4. 重启 Claude Desktop

完全退出 Claude Desktop 并重新启动。

### 5. 验证配置

在 Claude Desktop 中测试：
- "列出所有 Shineout 组件"
- "获取 Form 组件的文档"
- "搜索表单相关的组件"

## 在其他项目中使用

现在你可以在任何项目中打开 Claude Desktop，它都能访问 Shineout 组件文档。例如：

1. 在你的 React 项目中打开 Claude Desktop
2. 询问："如何使用 Shineout 的 Form 组件实现登录表单？"
3. Claude 将使用 MCP 服务器提供准确的 Shineout 文档和示例

## 故障排除

### 1. 服务器无法启动

手动测试服务器：
```bash
node /你的路径/shineout-claude/bin/shineout-claude.js
```

应该看到：
```
Shineout Claude MCP server running on stdio
Loaded 46 components
```

### 2. 路径问题

确保：
- 使用绝对路径，不要使用相对路径
- 路径中的斜杠方向正确（Windows 使用反斜杠 `\`）
- 文件路径正确且文件存在

### 3. 权限问题

确保 bin/shineout-claude.js 有执行权限：
```bash
chmod +x /你的路径/shineout-claude/bin/shineout-claude.js
```

## 开发模式

如果你正在开发 shineout-claude，可以使用监听模式：

1. 在一个终端运行：
   ```bash
   npm run dev
   ```

2. 每次修改代码后，重启 Claude Desktop 以加载最新代码

## 更新数据

如果 Shineout 组件有更新：

```bash
# 重新生成组件数据
npm run generate

# 重新构建
npm run build
```

然后重启 Claude Desktop。