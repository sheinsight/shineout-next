# Tooltip 组件 3.5.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.3
- 包含 Beta 版本: 3.5.3-beta.1 ~ 3.5.3-beta.9
- 发布日期: 2024-12-04

## 详细变更

### 3.5.3-beta.1
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Tooltip 新增 `persistent` 属性，鼠标悬停提示信息时将不会关闭
- **PR**: [#813](https://github.com/sheinsight/shineout-next/pull/813)
- **影响组件**: Tooltip
- **问题原因**: 扩展组件功能，满足需要复制提示内容等交互需求

#### 新增特性
- 新增 `persistent` 布尔类型属性（初始命名为 `stayOnHover`）
- 支持鼠标悬停在提示框上时保持可见状态
- 便于用户与提示内容进行交互，如复制文本等操作
- 样式架构重构，提升定制化能力

**代码模式**：
```tsx
// 基础用法
<Tooltip tip="可以悬停复制的提示内容" persistent>
  <span>悬停我</span>
</Tooltip>

// 复杂内容交互
<Tooltip 
  tip={
    <div>
      <p>详细说明文档</p>
      <button onClick={() => copy()}>复制链接</button>
    </div>
  }
  persistent
>
  <Button>查看详情</Button>
</Tooltip>
```

### 3.5.3-beta.4
- **变更类型**: 功能增强
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Tooltip 的 `persistent` 属性支持 `setConfig` 全局配置
- **PR**: [#832](https://github.com/sheinsight/shineout-next/pull/832)
- **影响组件**: Tooltip
- **问题原因**: 完善全局配置系统，支持统一管理组件默认行为

#### 功能增强
- `persistent` 属性支持全局配置，可通过 `setConfig` 统一设置
- 属性命名从 `stayOnHover` 正式更改为 `persistent`
- 遵循组件属性优先于全局配置的原则

**代码模式**：
```tsx
// 全局配置
import { setConfig } from 'shineout';
setConfig({
  tooltip: {
    persistent: true // 全局默认启用持久化
  }
});

// 局部覆盖全局配置
<Tooltip tip="不持久化的提示" persistent={false}>
  <span>悬停我</span>
</Tooltip>
```

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能属性，完全向后兼容
- 现有代码无需修改，可选择性使用新功能
- 支持全局配置，便于统一管理组件行为
- 为需要交互的提示场景提供了完整支持