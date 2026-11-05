# Form

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/shineout/src/form、packages/base/src/form、packages/hooks/src/components/use-form、packages/shineout-style/src/form
- 状态：待优化

## 概要

Form 组件是表单容器和字段管理的核心。整体架构设计完整，但存在受控/非受控切换管理问题、FormFlow 性能问题、useEffect 依赖数组缺陷和动画样式错误等真实 bug。特别是标签文本合并时的 undefined 处理、CSS 动画关键帧属性值非法、依赖数组不完整等问题需要优先修复。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| FORM-1 | P0 | bug | packages/base/src/form/form-item.tsx:89-93 | 标签文本合并时未处理 undefined，导致 aria-label 出现 "undefined" 字符串 | 使用 `labelRef.current?.textContent \|\| ''` 确保字符串值 |
| FORM-2 | P0 | style | packages/shineout-style/src/form/form-item.ts:8, 12 | 动画关键帧中 transform 属性值非法（数字 1 而非 CSS 函数），导致动画完全不工作 | 将 `transform: 1` 改为有效的 CSS 值如 `opacity: 1` 或 `transform: 'scale(1)'` |
| FORM-3 | P1 | perf | packages/base/src/form/form-flow.tsx:15 | FormFlow 中 `valueOfNames?.toString()` 每次创建新字符串，useMemo 无法有效复用 | 使用 useMemo 缓存 valueOfNames，然后依赖该缓存值 |
| FORM-4 | P1 | bug | packages/hooks/src/components/use-form/use-form-flow/use-form-flow.ts:23 | useEffect 依赖数组缺少 formBind 和 update，cleanup 函数引用可能不匹配 | 补充依赖：`[names, update, formBind]` |
| FORM-5 | P1 | bug | packages/base/src/form/form.tsx:25-26, 40 | 受控/非受控模式在 render 时动态判断，切换时状态可能混乱 | 文档明确说明应保持模式一致，或添加切换检测警告 |
| FORM-6 | P2 | bug | packages/base/src/form/form.tsx:67-79 | formRef 通过 useLatestObj 稳定但内容会更新，函数式 ref 可能捕获过期闭包 | 在文档中说明 formRef 应在事件回调而非 useEffect 中使用 |
| FORM-7 | P2 | maintainability | packages/base/src/form/form.tsx:81-108 | 属性名拼写错误 `bindindModalFormContextSuccess` 且 useEffect 缺少 `props.onSubmit` 依赖 | 修正拼写为 `bindingModalFormContextSuccess`，补充 `props.onSubmit` 到依赖数组 |
| FORM-8 | P3 | maintainability | packages/base/src/form/form.tsx:128-139 | addEventListener/removeEventListener 的函数引用稳定性依赖不够清晰 | 用 usePersistFn 明确包装 handleSubmitEvent 提高代码意图清晰度 |

## 详细说明

### P0 - 标签文本处理未定义值（FORM-1）

**触发场景**：Form.Item 没有显示 label 文本，只有 tip 时

**原因分析**：
```typescript
let labelText = labelRef.current?.textContent;  // 可能为 undefined
if(labelTipRef.current?.textContent) {
  labelText += ` (tip: ${labelTipRef.current?.textContent})`;  // undefined + string = "undefined (tip: ...)"
}
```

当 labelRef 为空而 labelTipRef 有内容时，字符串拼接导致值变为 `"undefined (tip: ...)"` 而不是 `"(tip: ...)"` 或 null。这个错误值被传入 FormItemContextProvider，污染无障碍标记。

**修复思路**：
```typescript
let labelText = labelRef.current?.textContent || '';
if(labelTipRef.current?.textContent) {
  labelText += ` (tip: ${labelTipRef.current?.textContent})`;
}
```

---

### P0 - CSS 动画关键帧属性非法（FORM-2）

**触发场景**：表单项显示验证错误时动画不出现

**原因分析**：
```typescript
const animations = {
  '@keyframes appear': {
    '0%': { transform: 1 },      // ❌ 非法：应为 CSS 函数如 "scale(1)"
    '25%': { opacity: 0.5 },
    '100%': { transform: 1 },    // ❌ 同上
  },
};
```

CSS `transform` 属性值必须是 CSS 函数（`scale()`, `translateX()` 等），不能是数字。浏览器会忽略该属性，导致动画完全不工作。

**修复思路**：
```typescript
const animations = {
  '@keyframes appear': {
    '0%': { opacity: 1 },
    '25%': { opacity: 0.5 },
    '50%': { opacity: 1 },
    '75%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  }
};
```

---

### P1 - FormFlow 性能问题（FORM-3）

**触发场景**：Form.Flow 在 strict 模式下不必要重渲染

**原因分析**：
```typescript
const valueOfNames = props.names?.map((name) => datum?.get(name));
const memoizedResult = useMemo(() => {
  // ...
}, [valueOfNames?.toString()]);  // ❌ 每次创建新字符串，引用不等
```

`valueOfNames?.toString()` 每次都生成新字符串，useMemo 无法识别值未变，因此每次都重新计算。当 valueOfNames 包含对象时，toString() 产生通用字符串如 `"[object Object],[object Object]"`，失去精准度。

**修复思路**：使用 useMemo 缓存 valueOfNames，然后以该缓存值作为 useMemo 的依赖。

---

### P1 - useEffect 依赖数组不完整（FORM-4）

**触发场景**：在嵌套多个 Form 或 update 函数变化后，FormFlow 数据同步错误

**原因分析**：
```typescript
useEffect(() => {
  if (formBind && formBind.func) {
    formBind.func.watch(names, update);  // 依赖 update
  }
  return () => {
    if (formBind && formBind.func) {
      formBind.func.unWatch(names, update);  // 依赖 update
    }
  };
}, [names]);  // ❌ 缺少 formBind, update
```

依赖数组仅包含 `[names]`，但 cleanup 调用 `unWatch(names, update)` 时传入的 update 可能与初始注册时不同。formBind 变化时也不会重新注册 watcher。

**修复思路**：补充完整依赖：`[names, update, formBind]`

---

### P1 - 受控/非受控切换状态混乱（FORM-5）

**触发场景**：运行时从非受控切换到受控或反之，表单字段值丢失或重复更新

**原因分析**：
```typescript
const isControl = 'value' in props;  // 在每次 render 判断
const { value, onChange } = useInputAble(inputAbleParams);
const { Provider, ProviderProps, getFormProps, formFunc } = useForm({ 
  ...rest, 
  value, 
  onChange, 
  isControl 
});
```

isControl 每次 render 重新计算。如果外部运行时切换模式，useInputAble 和 useForm 中的状态管理逻辑会产生边界情况。

**修复思路**：
1. 文档明确说明 Form 应保持受控/非受控一致，不支持动态切换
2. 或在 useForm 中检测模式变化并发出警告

---

## 测试覆盖

- ✅ `packages/shineout/src/form/__test__/form-deep-clone.spec.tsx` 提供充分的受控/非受控和 deepClone 模式测试
- ✅ FormFlow 重渲染次数测试覆盖良好
- ⚠️ 缺失：FormField 的 `validateTrigger='change-blur'` 模式测试
- ⚠️ 缺失：FormFieldSet 中 Proxy 代理对象的边界情况测试
- ⚠️ 缺失：Modal context 绑定的集成测试
- ⚠️ 缺失：label 与 input htmlFor/id 关联测试
- ⚠️ 缺失：错误信息的 aria-live 属性测试

## A11y 相关

- ✅ FormItem 中使用 `role='form-control'` 标记
- ⚠️ 待确认：label 与 input 的 htmlFor/id 关联（未在代码中直接看到）
- ⚠️ 待确认：错误信息的 aria-live 和 aria-label 设置

## 优化建议优先级

1. **立即修复**（影响功能）：FORM-1、FORM-2、FORM-3、FORM-4、FORM-5
2. **尽快修复**（边界情况）：FORM-6、FORM-7
3. **改进**（代码质量）：FORM-8

## TODO

- [ ] `packages/shineout-style/src/form/form-item.ts:8,12` keyframes 的 `transform: 1` 非法属实，但 opacity 动画仍生效，应从 P0 降为 P2
- [ ] hooks 层（use-form / use-validate 约 4500 行）初审只列了 8 条，需深审：字段注册/卸载清理、FieldSet 数组字段、异步校验竞态、重复提交、大表单重渲染范围
- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
