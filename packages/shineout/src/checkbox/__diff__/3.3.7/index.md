# Checkbox 组件 3.3.7 版本 Diff 报告

## 问题描述

修复 `Checkbox.Group` 的 children 中的 `Checkbox` 的 onChange 不触发的缺陷。当 Checkbox 组件作为 Checkbox.Group 的直接子组件使用时，Checkbox 自身的 onChange 事件处理函数不会被触发。

## 代码变更文件

1. `packages/base/src/checkbox/checkbox-group.tsx`
2. `packages/shineout/src/checkbox/__example__/test-001-group-onchange.tsx` (新增测试用例)

## 变更代码行

### 1. 导入名称修正
```diff
// checkbox-group.tsx
-import groupContext from './group-context';
+import GroupContext from './group-context';
```

### 2. 在 handleItemChange 中新增 onChange 触发逻辑
```diff
const handleItemChange = usePersistFn(
  (_: DataItem | undefined, checked: boolean, raw: DataItem, children?: any) => {
    if (checked) {
      datum.add(raw);
    } else {
      datum.remove(raw);
    }
+
+   // 手动触发子 Checkbox 组件的 onChange 事件
+   if (children && React.isValidElement(children)) {
+     children.props.onChange?.(_, checked, children.props.htmlValue);
+   }
  },
);
```

### 3. Provider 组件名称修正
```diff
-<groupContext.Provider value={providerValue}>{children}</groupContext.Provider>
+<GroupContext.Provider value={providerValue}>
+  {children}
+</GroupContext.Provider>
```

## 变更前后逻辑差异

### 变更前
1. Checkbox.Group 内部通过 Context 管理子 Checkbox 的状态
2. 当子 Checkbox 状态变化时，只更新内部 datum 数据
3. 子 Checkbox 自身的 onChange 事件被 Group 拦截，不会触发

### 变更后
1. 在 handleItemChange 中更新 datum 数据后
2. 额外检查是否存在子 Checkbox 组件
3. 如果存在且有 onChange 属性，手动调用其 onChange 方法
4. 传递参数为: (_, checked, htmlValue)

## 逻辑影响范围
- 仅影响 Checkbox.Group 下直接使用 Checkbox 组件的场景
- 不影响通过 data 属性渲染的 Checkbox
- 不影响单独使用的 Checkbox 组件
- 确保开发者自定义的 onChange 回调能够正常执行

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个缺陷修复，恢复了预期的行为

### 行为变化说明

1. **onChange 事件恢复触发**：
   - 升级前：Checkbox.Group 中的 Checkbox 的 onChange 不会触发
   - 升级后：onChange 事件正常触发
   - 受影响场景：
     ```tsx
     <Checkbox.Group>
       <Checkbox 
         value="option1"
         onChange={(value, checked) => {
           console.log('onChange:', value, checked);
           // 升级前：不会打印
           // 升级后：正常打印
         }}
       >
         选项 1
       </Checkbox>
     </Checkbox.Group>
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **onChange 参数说明**：
   - 第一个参数：`_` (占位符，保持与 Group onChange 一致)
   - 第二个参数：`checked` (当前选中状态)
   - 第三个参数：`htmlValue` (Checkbox 的 value 值)
   - 示例：
     ```tsx
     onChange={(_, checked, value) => {
       console.log('选中状态:', checked);
       console.log('Checkbox 值:', value);
     }}
     ```

3. **不影响其他使用方式**：
   - 通过 data 属性渲染的 Checkbox 不受影响
   - Checkbox.Group 的 onChange 事件不受影响
   - 单独使用的 Checkbox 组件不受影响