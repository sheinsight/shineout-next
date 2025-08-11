# Form 组件 3.5.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.0
- 包含 Beta 版本: 3.5.0-beta.1 ~ 3.5.0-beta.13
- 发布日期: 2024-11-11

## 变更概要

本版本为 Form 组件新增了三个重要功能：useForm hook、Form.Item label 对象配置、reserveAble 属性。

## 详细变更

### 功能增强

#### 3.5.0-beta.2
- **新增功能**: Form 新增 useForm 用法，获取的 form 实例方法与 formRef 相同
- **PR**: [#711](https://github.com/sheinsight/shineout-next/pull/711)
- **影响组件**: Form
- **功能说明**: 提供了更灵活的表单实例管理方式，可在组件外部使用

#### 3.5.0-beta.9
- **新增功能**: Form 新增 reserveAble 属性，用于控制表单项是否保留值
- **PR**: [#772](https://github.com/sheinsight/shineout-next/pull/772)
- **影响组件**: Form
- **功能说明**: 控制字段卸载时是否保留其值

#### 3.5.0-beta.10
- **新增功能**: Form.Item 的 label 属性新增对象配置模式
- **PR**: [#788](https://github.com/sheinsight/shineout-next/pull/788)
- **影响组件**: Form.Item
- **功能说明**: 支持在标签文本旁添加 tooltip 提示说明

## 代码变更分析

### 关键改动

1. 新增 Form.useForm Hook，支持在组件外部创建和管理表单实例
2. 增强 Form.Item label 属性，支持对象配置方式添加提示信息
3. 新增 reserveAble 属性，解决动态表单字段的值保留问题

## 受影响的使用场景

### 场景 1: 跨组件表单控制（新功能）

**功能特征**：
- 使用 Form.useForm 创建独立的表单实例
- 可在组件外部或父组件中控制表单
- 实例方法与 formRef 完全相同
- 不受组件渲染影响，更加灵活

### 场景 2: 表单标签增强显示（新功能）

**功能特征**：
- Form.Item label 支持对象配置
- 可添加 tooltip 提示信息
- 增强表单字段的说明能力
- 改善用户体验和信息展示

### 场景 3: 动态表单字段值保留（新功能）

**功能特征**：
- Form 新增 reserveAble 属性
- 控制字段卸载时是否保留值
- 解决条件渲染时的数据丢失问题
- 适用于多步骤表单、动态表单等场景

### 场景 4: 全局表单实例管理

**功能特征**：
- useForm 创建的实例可全局共享
- 支持在任意位置操作表单
- 不依赖组件层级关系
- 提供更灵活的架构设计

### 场景 5: 复杂表单提示信息

**功能特征**：
- label 对象配置支持 text 和 tip 属性
- 可为每个字段添加独立的帮助信息
- 支持复杂的提示内容
- 不影响表单布局

## Breaking Changes

无破坏性变更，均为新增功能

## 风险等级

**低风险** - 全部为新增功能，不影响现有功能的使用