# ShineOut Next 3.6.0 到 3.6.1 问题复现示例

本目录包含了从 3.6.0 到 3.6.1 版本之间所有已修复问题的复现示例，帮助开发者了解这些问题的具体表现，以便在升级后验证修复效果或检查自己的代码是否存在类似问题。

## 目录结构

```
3.6.0-to-3.6.1/
├── input-group/
│   └── 01-flex-style-issue.tsx           # Input.Group flex:1 样式丢失问题
├── transfer/
│   └── 01-render-filter-height-issue.tsx # Transfer renderFilter 面板高度不一致问题
├── pagination/
│   └── 01-simple-mode-current-page-issue.tsx # Pagination simple 模式当前页显示问题
├── table/
│   └── 01-dynamic-columns-filter-reset-issue.tsx # Table 动态列过滤功能重置问题
├── form-datepicker/
│   └── 01-concurrent-render-value-issue.tsx # Form 中 DatePicker 并发渲染 value 设置问题
├── datepicker/
│   └── 01-popup-zindex-issue.tsx        # DatePicker 弹出层层级问题
├── input-number/
│   └── 01-decimal-point-loss-issue.tsx  # Input.Number 小数点丢失问题
├── tooltip/
│   └── 01-persistent-priority-issue.tsx # Tooltip persistent 配置优先级问题
├── card/
│   └── 01-header-footer-text-selection-issue.tsx # Card 文本选择问题
├── tree/
│   └── (未创建 - 字体颜色问题较难复现)
├── cardgroup/
│   └── (未创建 - 功能增强项，非问题修复)
└── README.md                            # 本说明文件
```

## 问题分类

### 🐛 关键问题修复 (Critical Bug Fixes)

#### 3.6.1-beta.1
- **Input.Group**: flex:1 样式丢失导致布局异常
- **Transfer**: renderFilter 导致左右面板高度不一致
- **ResizeObserver**: 浏览器兼容性问题

#### 3.6.1-beta.2  
- **Pagination**: simple 模式输入框不显示当前页（回归问题）

#### 3.6.1-beta.3
- **Table**: 动态列时过滤功能意外重置

#### 3.6.1-beta.4
- **Form + DatePicker**: 并发渲染时 value 设置失败

#### 3.6.1-beta.5
- **DatePicker**: 弹出层 z-index 层级问题

#### 3.6.1-beta.7
- **Input.Number**: 小数点和尾随零丢失问题

#### 3.6.1 正式版
- **Tooltip**: persistent 配置优先级问题
- **Card**: Header/Footer 文本选择问题
- **Tree**: active 字体颜色问题

### ✨ 功能增强 (Enhancements)

#### 3.6.1-beta.6
- **CardGroup**: 懒加载功能增强，支持非滚动容器

#### 3.6.1 正式版
- **Tooltip**: 动态内容箭头位置优化
- **Popover**: 位置实时跟随功能
- **弹出层**: 自动隐藏机制

## 使用方法

### 1. 查看具体问题

每个示例文件都包含：
- 问题的详细描述（中英文）
- 复现步骤说明
- 代码示例
- 预期行为 vs 实际行为对比
- 修复版本信息

### 2. 运行示例

```bash
# 在项目根目录
npm run dev

# 访问对应的示例页面
# 例如：http://localhost:3000/example/input-group/01-flex-style-issue
```

### 3. 问题检查清单

如果你在使用 3.6.0 版本，可以按照以下清单检查是否受影响：

#### Input.Group 相关
- [ ] 检查 Input.Group 中的输入框布局是否正常
- [ ] 验证 flex:1 样式是否生效

#### Transfer 相关  
- [ ] 检查使用了 renderFilter 的 Transfer 组件
- [ ] 验证左右面板高度是否一致

#### Pagination 相关
- [ ] 检查 simple 模式的 Pagination
- [ ] 验证输入框是否显示当前页码

#### Table 相关
- [ ] 检查动态 columns 的 Table
- [ ] 验证过滤状态是否在列更新后保持

#### Form + DatePicker 相关
- [ ] 检查使用数组 names 的 DatePicker
- [ ] 验证初始值是否正确设置

#### DatePicker 相关
- [ ] 检查复杂布局中的 DatePicker
- [ ] 验证弹出层是否被遮挡

#### Input.Number 相关
- [ ] 检查需要精确显示小数的场景
- [ ] 验证小数点和尾随零是否丢失

#### Tooltip 相关
- [ ] 检查设置了 persistent 的 Tooltip
- [ ] 验证配置优先级是否正确

#### Card 相关
- [ ] 检查不可移动的 Card
- [ ] 验证 Header/Footer 文本是否可选择

### 4. 升级验证

升级到 3.6.1 后，可以使用这些示例验证修复效果：

1. 在 3.6.0 环境中运行示例，观察问题现象
2. 升级到 3.6.1 版本
3. 再次运行示例，确认问题已解决
4. 在自己的项目中验证相关功能

## 代码示例格式说明

所有示例都遵循以下格式：

```typescript
/**
 * cn - 中文问题描述
 *    -- 详细说明和复现方法
 *    -- 修复版本信息
 * en - English problem description  
 *    -- Detailed explanation and reproduction steps
 *    -- Fixed version information
 */
import React from 'react';
import { Component } from 'shineout';

const App: React.FC = () => {
  // 示例代码
  return (
    <div>
      {/* 问题复现组件 */}
      {/* 说明文档 */}
    </div>
  );
};

export default App;
```

## 相关文档

- [3.6.0 到 3.6.1 详细 Changelog](../changelog/3.6.0-to-3.6.1.md)
- [ShineOut Next 官方文档](https://shineout.sheinsight.com/)
- [GitHub Issues](https://github.com/sheinsight/shineout-next/issues)

## 注意事项

1. **版本兼容性**: 这些示例基于 3.6.0 版本的问题创建，在更高版本中问题已修复
2. **浏览器支持**: 某些问题可能只在特定浏览器或环境中出现
3. **场景相关**: 有些问题只在特定使用场景下才会触发
4. **性能影响**: 部分问题可能在大数据量或复杂交互时更容易出现

如果在使用过程中发现新的问题或这些示例无法正确复现问题，请及时反馈给开发团队。