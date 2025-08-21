# Shineout MCP 测试文件

本目录包含 Shineout MCP 服务的各种测试和验证脚本。

## 测试文件说明

### 核心功能测试
- `test-mcp.js` - MCP 服务主测试
- `test-mcp-server.js` - MCP 服务器测试
- `test-local.sh` - 本地测试脚本

### 组件相关测试
- `test-button-*.js` - Button 组件测试
- `test-form-enhanced.js` - Form 组件增强测试
- `test-props.js` - 组件属性测试
- `test-search.js` - 搜索功能测试
- `test-suggestion.js` - 建议功能测试

### 最佳实践测试
- `test-best-practices.js` - 最佳实践功能测试
- `test-compact.js` - 精简版本测试

### 验证脚本
- `verify-all-components.js` - 验证所有组件
- `verify-docs-props.js` - 验证文档属性
- `verify-examples.js` - 验证示例代码
- `quick-verify.js` - 快速验证脚本

### 调试工具
- `debug-button-type.js` - Button 类型调试
- `show-button-doc.js` - 显示 Button 文档
- `test-no-result.js` - 无结果场景测试

### 报告文件
- `verification-report.json` - 验证报告

## 运行测试

```bash
# 运行本地测试
cd tests
./test-local.sh

# 运行特定测试
node test-mcp.js
node test-best-practices.js

# 运行验证
node verify-all-components.js
```