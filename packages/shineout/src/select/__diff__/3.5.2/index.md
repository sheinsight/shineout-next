# Select 组件 3.5.2 版本 Diff 报告

## 问题描述

修复 `Select` 组件的四个缺陷。修复开启 `filterSameChange` 后单选模式下选择重复项无法关闭面板的问题，修复默认事件引起的点击异常问题，修复开启创建选项后无法选中创建内容的问题，以及修复在开启 `absolute` 属性后多选模式下选择内容换行后面板位置不更新的问题。

## 代码变更文件

1. `packages/base/src/select/select.tsx`
2. `packages/hooks/src/common/use-input-able/use-Input-able.ts`
3. `packages/hooks/src/common/use-input-able/use-Input-able.type.ts`
4. `packages/hooks/src/components/use-select/use-select.ts`
5. `packages/hooks/src/components/use-select/use-select.type.ts`

## 变更代码行

### packages/base/src/select/select.tsx - 添加 preventDefault 处理（PR #807）

```diff
+ const preventDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
+   if (!createdData) return;
+   if (focused && e.target !== inputRef.current) {
+     e.preventDefault();
+   }
+ };

  return (
    <div
      className={wrapperClass}
+     onMouseDown={preventDefault}
      onFocus={handleFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
```

### packages/base/src/select/select.tsx - 修复 preventDefault 条件判断（PR #810）

```diff
  const preventDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
-   if (!createdData) return;
    if (focused && e.target !== inputRef.current) {
      e.preventDefault();
    }
  };
```

### packages/base/src/select/select.tsx - 修复 absolute 位置更新（PR #804）

```diff
  const handleSelectChange = usePersistFn((value: Value, dataItem: any, checked?: boolean) => {
    // ... 其他逻辑
    onChange?.(value, dataItem, checked);

    if (props.absolute === undefined) return;
    
    setAbsoluteListUpdateKey(value as string);
  });
```

### packages/base/src/select/select.tsx - 处理相同值选择（PR #819）

```diff
+ const handleSameChange = () => {
+   const shouldFocus = showInput && props.reFocus;
+   if (!multiple && !shouldFocus) {
+     closePop();
+   }
+ };

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    // ... 其他属性
    onChange: handleSelectChange,
+   onSameChange: handleSameChange,
    filterSameChange,
  });
```

### packages/hooks/src/common/use-input-able/use-Input-able.ts - 触发 onSameChange（PR #819）

```diff
  const handleChange = useLatestObj((v: Value, ...args: any[]) => {
    if (!isUnMatchedValue && !Object.is(filterSameChange, false)) {
      if (util.isSameVal(v, lastValue.current, { childrenName: '' })) {
+       props.onSameChange?.();
        return;
      }
    }
    // ... 原有逻辑
  });
```

### packages/hooks/src/common/use-input-able/use-Input-able.type.ts - 添加类型定义（PR #819）

```diff
  export interface BaseInputAbleProps<Value, Item> {
    // ... 其他属性
+   onSameChange?: () => void;
  }
```

## 变更前后逻辑差异

### 变更前
- 开启 `filterSameChange` 后单选模式选择相同项面板不会关闭
- 创建选项功能下点击创建的内容时选择会失效
- `absolute` 模式下多选内容换行不会触发面板位置更新
- 某些点击场景下会触发异常的默认事件

### 变更后
- 单选模式下选择相同项时面板正常关闭
- 创建选项功能可以正常选中创建的内容
- `absolute` 模式下多选内容换行会自动更新面板位置
- 通过 `preventDefault` 避免异常的默认事件触发

## 逻辑影响范围

- 影响开启 `filterSameChange` 属性的单选 `Select`
- 影响开启 `onCreate` 创建选项功能的场景
- 影响开启 `absolute` 定位的多选 `Select`
- 优化了所有 `Select` 的点击事件处理

## 风险场景分析

### DOM 结构变更风险

**风险场景**：依赖根元素 `onMouseDown` 事件的自定义逻辑

**风险示例**：
```tsx
// 可能受影响的代码
<div onMouseDown={(e) => {
  // 期望捕获 Select 内部的 mouseDown 事件
  const selectWrapper = e.currentTarget.querySelector('.soui-select-wrapper');
}}>
  <Select />
</div>
```

**规避方案**：使用事件捕获阶段或调整事件监听策略

### 行为逻辑变更风险

**风险场景**：依赖单选模式下重复选择不关闭面板的行为

**风险示例**：
```tsx
// 之前：选择相同项面板保持打开
<Select
  filterSameChange
  onChange={(value) => {
    // 期望面板保持打开以继续操作
    console.log('选择了相同的值');
  }}
/>
```

**规避方案**：使用 `open` 属性控制面板开关状态

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

**1. 单选重复选择关闭面板**
- **影响场景**：开启 `filterSameChange` 的单选 `Select`
- **具体表现**：选择相同项时面板会关闭
- **受影响代码示例**：
  ```tsx
  // 之前：选择相同项面板保持打开
  // 现在：选择相同项面板会关闭
  <Select filterSameChange data={data} />
  ```
- **是否需要调整**：如需保持面板打开，使用 `open` 属性控制

**2. 创建选项正常选择**
- **影响场景**：使用 `onCreate` 属性
- **具体表现**：创建的选项可以正常点击选中
- **受影响代码示例**：
  ```tsx
  // 之前：点击创建的选项可能无法选中
  // 现在：正常选中
  <Select onCreate={(text) => ({ label: text, value: text })} />
  ```
- **是否需要调整**：不需要

**3. 多选换行位置更新**
- **影响场景**：开启 `absolute` 的多选 `Select`
- **具体表现**：选择内容换行时面板位置自动调整
- **受影响代码示例**：
  ```tsx
  // 之前：内容换行面板位置不变
  // 现在：自动调整位置
  <Select multiple absolute data={data} />
  ```
- **是否需要调整**：不需要