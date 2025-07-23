# Checkbox 组件 3.3.7 版本 Diff 报告

## 问题描述
修复 `Checkbox.Group` 的 children 中的 `Checkbox` 的 onChange 不触发的问题

## 代码变更文件
`packages/base/src/checkbox/checkbox-group.tsx`

## 变更代码行
```diff
// 1. 导入名称修正
-import groupContext from './group-context';
+import GroupContext from './group-context';

// 2. 在 handleCheckboxChange 中新增逻辑
const handleCheckboxChange = usePersistFn(
  (checked: boolean, _: any, raw: DataItem | Value[number], children?: any) => {
    if (checked) {
      datum.add(raw);
    } else {
      datum.remove(raw);
    }
+
+   if (children && React.isValidElement(children)) {
+     children.props.onChange?.(checked ? children.props.htmlValue : undefined, checked, children.props.htmlValue);
+   }
  },
);

// 3. Provider 组件名称修正
-<groupContext.Provider value={providerValue}>{children}</groupContext.Provider>
+<GroupContext.Provider value={providerValue}>
+  {children}
+</GroupContext.Provider>
```

## 变更前后逻辑差异
- **变更前**：Checkbox.Group 中的 Checkbox 子组件的 onChange 事件不会被触发
- **变更后**：在 handleCheckboxChange 中手动调用子组件的 onChange 方法，确保事件正确触发

## 逻辑影响范围
- 修复了 Checkbox.Group 下直接使用 Checkbox 组件时 onChange 不触发的问题
- 不影响通过 data 属性渲染的 Checkbox
- 确保开发者自定义的 onChange 回调能够正常执行

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- Checkbox.Group 中的 Checkbox 组件的 onChange 事件恢复正常触发