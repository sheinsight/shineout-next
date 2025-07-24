# Select 组件 3.4.4 版本 Diff 报告

## 问题描述

修复 `Select` 动态的从单选切换为多选时，placeholder 内容显示不完整的问题。切换 `multiple` 属性时，组件内部状态未正确更新，导致 placeholder 被截断。

修复 `Select` 选中值之后再次聚焦时的回显值显示不正确的问题。单选模式下选中值后，再次聚焦输入框时，应该显示当前选中的值而不是空白。

修复 `Select` 单选场景下开启搜索后，焦点输入框时没有自动选中文本的问题。用户聚焦时期望能够快速替换当前值，但文本未被选中。

修复 `Select` 组件无法拖拽选中 DOM 内容的问题。之前阻止了默认的鼠标按下事件，导致用户无法通过拖拽来选中和复制文本内容。

## 代码变更文件

1. `packages/base/src/select/result.tsx`
2. `packages/base/src/select/result-input.tsx`
3. `packages/base/src/select/select.tsx`

## 变更代码行

### packages/base/src/select/result.tsx - 修复动态切换和回显问题
```diff
- const showPlaceholder = useMemo(() => {
-   return !multiple && focusInput && renderResultContent ? renderResultContent : undefined;
- }, [multiple, focusInput, renderResultContent]);
+ const showPlaceholder = !multiple && focusInput && renderResultContent ? renderResultContent : undefined;
```

```diff
- const [inputText, setInputText] = useState('');
+ const [inputText, setInputText] = useState(multiple || !renderResultContent ? '' : renderResultContent);

  useEffect(() => {
+   if (!multiple && renderResultContent && focusInput) {
+     setInputText(renderResultContent as string);
+   }
  }, [focusInput, multiple, renderResultContent]);
```

### packages/base/src/select/result-input.tsx - 修复自动选中文本
```diff
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
+   if (!multiple && e.target.value) {
+     e.target.select();
+   }
  };
```

### packages/base/src/select/select.tsx - 修复拖拽选中问题
```diff
  const handleResultMouseDown = (e: React.MouseEvent) => {
    preventEventDefault(e, {
-     prevent: true,
+     // 允许文本选择
+     prevent: e.target === e.currentTarget,
    });
    
    if (props.disabled === true) return;
    
    if (!open) {
      // click arrow icon
      const isArrowClick = (e.target as HTMLElement).closest(`.${jssStyle?.select?.()?.arrowIcon}`);
      e.stopPropagation();
-     if (!isArrowClick) e.preventDefault();
+     // 只在点击非输入框区域时阻止默认行为
+     if (!isArrowClick && e.target === e.currentTarget) {
+       e.preventDefault();
+     }
    }
  };
```

## 变更前后逻辑差异

### 变更前
- 动态切换 `multiple` 时，placeholder 使用缓存的 useMemo 值，未及时更新
- 单选模式再次聚焦时，输入框显示空白而非当前选中值
- 聚焦输入框时文本未被自动选中
- 阻止了所有鼠标按下的默认行为，无法拖拽选中文本

### 变更后
- placeholder 实时计算，正确响应 `multiple` 属性变化
- 单选模式聚焦时正确显示当前选中的值
- 聚焦时自动选中全部文本，方便快速替换
- 只在必要时阻止默认行为，允许文本拖拽选择

## 逻辑影响范围

1. **动态属性切换**：影响运行时改变 `multiple` 属性的场景
2. **单选搜索体验**：影响开启 `onFilter` 的单选 Select
3. **文本交互**：影响需要复制粘贴选项内容的场景
4. **不受影响**：静态配置的 Select、多选模式的基本功能

## 升级注意事项

### 代码兼容性

**无破坏性变更**

所有修复都是恢复预期行为，不会影响现有功能。

### 行为变化说明

1. **动态切换 multiple 属性**
   - **影响场景**：运行时切换单选/多选模式
   - **具体表现**：之前切换后 placeholder 可能显示不全，现在正确显示
   - **受影响代码示例**：
     ```tsx
     // 之前：切换到多选时 placeholder 被截断
     // 现在：切换后 placeholder 正确显示
     const [multiple, setMultiple] = useState(false);
     <Select 
       multiple={multiple}
       placeholder="请选择选项"
     />
     ```
   - **是否需要调整**：无需调整，行为修正

2. **单选搜索回显**
   - **影响场景**：单选模式下已选中值，再次点击输入框
   - **具体表现**：之前显示空白，现在显示当前选中的文本
   - **受影响代码示例**：
     ```tsx
     // 之前：选中"选项1"后再次聚焦显示空白
     // 现在：选中"选项1"后再次聚焦显示"选项1"
     <Select 
       value="1"
       onFilter={true}
       data={[{value: '1', text: '选项1'}]}
     />
     ```
   - **是否需要调整**：无需调整，体验优化

3. **自动选中文本**
   - **影响场景**：单选搜索模式下聚焦输入框
   - **具体表现**：之前需要手动选中，现在自动全选文本
   - **受影响代码示例**：
     ```tsx
     // 之前：聚焦后需要手动全选才能替换
     // 现在：聚焦后自动全选，可直接输入替换
     <Select 
       onFilter={true}
       data={data}
     />
     ```
   - **是否需要调整**：无需调整，体验优化

4. **文本拖拽选择**
   - **影响场景**：需要选中并复制选项文本内容
   - **具体表现**：之前无法拖拽选中，现在可以正常选择文本
   - **受影响代码示例**：
     ```tsx
     // 之前：无法通过拖拽选中选项文本
     // 现在：可以正常拖拽选中并复制
     <Select 
       renderResult={(d) => <span>{d.longText}</span>}
     />
     ```
   - **是否需要调整**：无需调整，功能恢复