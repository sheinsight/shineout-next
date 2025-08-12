# Checkbox 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.12
- 发布日期: 2025-01-06

## 详细变更

### 3.5.6-beta.12
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Checkbox.Group` 在嵌套情况下影响内部选中状态的问题
- **PR**: [#907](https://github.com/sheinsight/shineout-next/pull/907)
- **影响组件**: Checkbox.Group, Checkbox
- **问题原因**: 当 Checkbox.Group 嵌套使用时，内层的独立 Checkbox（如全选按钮）会错误地继承外层 Group 的上下文，导致其 checked 状态被外层 Group 控制，无法正确响应自身的状态变化

#### Bug 特征
- Checkbox.Group 组件嵌套使用
- 内层有独立的 Checkbox 作为全选控制
- 内层全选 Checkbox 的 checked 状态无法正常更新
- 点击内层全选 Checkbox 无法触发预期的全选/取消全选操作
- 内层 Checkbox 的 onChange 事件被外层 Group 拦截

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Checkbox.Group value={value1} onChange={setValue1}>
  <div>
    {/* 内层的全选 Checkbox 会被外层 Group 影响，无法正常工作 */}
    <Checkbox 
      checked={isAllChecked(options2, value2)}
      onChange={onAllSelect2}
    >
      全选2
    </Checkbox>
    
    {/* 内层的 Checkbox.Group */}
    <Checkbox.Group value={value2} onChange={setValue2}>
      {options2.map(d => (
        <Checkbox key={d.id} htmlValue={d.id}>
          {d.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  </div>
</Checkbox.Group>
```

#### 排查规则
- 搜索 Checkbox.Group 内部包含另一个 Checkbox.Group 的代码
- 搜索 Checkbox.Group 内部有独立 Checkbox 用作全选控制的场景
- 搜索使用 `isAllChecked` 或类似逻辑判断全选状态的代码
- 搜索 Checkbox 同时设置了 checked 属性但在 Group 内部的情况

## Breaking Changes

无

## 风险等级

**中**：
- 修复了嵌套场景下的状态控制问题，影响使用嵌套 Checkbox.Group 的业务场景
- 引入了 `onRawChange` 内部属性来区分不同来源的 onChange 事件
- 可能影响依赖原有错误行为的代码
- 需要注意后续版本（3.5.8、3.6.0）对此修复的进一步完善

## 版本修复历史

1. **3.5.6-beta.12**：通过添加 `onRawChange` 属性，解决嵌套情况下的状态控制问题
2. **相关后续修复**：
   - 3.5.8 版本进一步优化了 onChange 触发机制
   - 3.6.0 版本完全修复了 Form 中使用时的 onChange 重复触发问题