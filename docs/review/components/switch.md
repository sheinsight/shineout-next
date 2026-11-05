# Switch

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - `packages/shineout/src/switch/switch.tsx`
  - `packages/shineout/src/switch/switch.type.ts`
  - `packages/base/src/switch/switch.tsx`
  - `packages/hooks/src/components/use-check/use-check.ts`
  - `packages/shineout-style/src/switch/switch.ts`
- 状态：待优化

## 概要

Switch 组件基于 useCheck hook 实现，结构简单清晰。但存在 checked 与 value 的语义混淆、以及 aria 属性缺失的问题。loading 时的 disabled 优先级处理正确。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| SWITCH-1 | P1 | types | packages/base/src/switch/switch.tsx:26-39 | checked 与 value 混用：props 中既有 checked、defaultChecked，又有 value、defaultValue（通过 useInputAble），导致受控方式不一致 | 统一为 value/onChange 模式，deprecate checked/defaultChecked |
| SWITCH-2 | P1 | a11y | packages/base/src/switch/switch.tsx:69 | switch role 正确，但缺少 aria-checked 属性，且当 loading 时缺少 aria-busy 提示 | 添加 aria-checked={checked}，loading 时添加 aria-busy='true' |

## 详细说明

### SWITCH-1：checked 与 value 混用导致 API 混淆 (P1)
**触发场景**：外部使用 useInputAble(value) 控制，内部 useCheck(checked)，两套逻辑并存。

**原因分析**（packages/base/src/switch/switch.tsx:26-39）：
```typescript
const { value, onChange } = useInputAble({
  value: props.value,
  onChange: props.onChange,
  defaultValue: props.defaultValue,
  control: 'value' in props,
  beforeChange: props.beforeChange,
});

const getChecked = () => {
  if (props.checked !== undefined) {
    return props.checked;
  }
  return !!value;  // 从 value 转换为 checked
};

const { getInputProps, getRootProps, checked } = useCheck({
  checked: getChecked(),
  onChange: onChange,  // ...
});
```
这样做虽然兼容了两种模式，但导致：
1. 用户不知道该用 checked 还是 value
2. onChange 的参数类型不一致
3. 代码维护复杂

**修复思路**：
1. 统一使用 value/onChange 模式
2. 在文档中 deprecate checked/defaultChecked
3. 更新 Switch.type.ts 移除 checked 相关属性

### SWITCH-2：缺少 aria 属性 (P1)
**触发场景**：屏幕阅读器无法识别 Switch 的当前状态和加载状态。

**修复思路**：
```typescript
<button role="switch" aria-checked={checked} aria-busy={loading} ...>
  {/* ... */}
</button>
```

---

## 测试覆盖

**现有覆盖**：
- 基础渲染、checked/defaultChecked
- content 显示
- size 变体
- loading 状态
- 点击事件

**缺失**：
- loading 与 disabled 的组合测试
- content 为单个元素或空数组时的处理
- value/checked 双控制模式的测试
- 受控模式下 value 变化的同步

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
