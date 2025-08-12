# MCP Tools 模块化架构

## 目录结构

```
tools/
├── formatters/        # 格式化模块 - 负责输出格式化
│   ├── component-formatter.ts
│   └── index.ts
├── queries/          # 查询模块 - 负责数据查询和获取
│   ├── component-query.ts
│   └── index.ts
├── examples/         # 示例管理模块 - 负责示例代码相关功能
│   ├── example-service.ts
│   └── index.ts
├── definitions/      # 工具定义模块 - MCP tools 元数据
│   ├── tool-definitions.ts
│   └── index.ts
├── component-service.ts  # 主服务类
├── index.ts             # 统一导出
└── README.md           # 本文档
```

## 模块职责

### 1. Formatters（格式化器）
- **ComponentFormatter**: 负责将组件数据格式化为用户友好的文档格式
  - 格式化组件完整文档
  - 格式化搜索结果
  - 格式化组件列表
  - 格式化示例代码

### 2. Queries（查询器）
- **ComponentQuery**: 负责从数据源查询和获取组件信息
  - 获取单个组件数据
  - 搜索组件
  - 获取组件列表
  - 获取组件示例

### 3. Examples（示例管理）
- **ExampleService**: 负责管理和搜索代码示例
  - 按场景获取示例
  - 获取最佳实践
  - 搜索示例代码

### 4. Definitions（定义）
- **TOOL_DEFINITIONS**: MCP tools 的元数据定义
  - 工具名称、描述
  - 输入参数模式
  - 工具配置

### 5. ComponentService（主服务）
- 协调各个模块，提供统一的 API 接口
- 处理 MCP 工具调用
- 返回格式化的响应

## 扩展指南

### 添加新的格式化器
1. 在 `formatters/` 目录创建新文件
2. 实现格式化逻辑
3. 在 `formatters/index.ts` 中导出

### 添加新的查询功能
1. 在 `queries/` 目录创建新文件
2. 实现查询逻辑
3. 在 `queries/index.ts` 中导出

### 添加新的 MCP 工具
1. 在 `definitions/tool-definitions.ts` 中添加新工具定义
2. 在 `ComponentService` 中实现工具处理逻辑
3. 更新 `server/index.ts` 中的 switch case

## 优势

1. **模块化**: 功能按职责清晰分离
2. **可维护性**: 每个模块专注于单一职责
3. **可扩展性**: 易于添加新功能而不影响现有代码
4. **可测试性**: 每个模块可独立测试
5. **代码复用**: 模块可在不同上下文中复用