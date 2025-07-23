# Menu 组件 3.2.2 版本 Diff 报告

## 问题描述

本版本修复两个缺陷：
1. 修复 `Menu` content 缺少了 `flex` 样式，导致菜单项内容可能出现文本溢出或对齐问题
2. 修复 `Menu` 当传入 `linkKey` 属性，如果数据取不到 `link` 控制台会报错的问题

## 代码变更文件

1. `packages/shineout-style/src/menu/menu.ts`
2. `packages/base/src/menu/item.tsx`
3. `packages/hooks/src/utils/render.ts`

## 变更代码行

### 1. packages/shineout-style/src/menu/menu.ts - 添加 flex 样式
```diff
titleContent: {
+ display: 'flex',
+ minWidth: 0,
+ alignItems: 'center',
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
},
```

### 2. packages/base/src/menu/item.tsx - 忽略 linkKey 错误
```diff
// 获取链接值时忽略错误
- const link = props.linkKey ? util.getKey(props.dataItem, props.linkKey) : undefined;
+ const link = props.linkKey ? util.getKey(props.dataItem, props.linkKey, undefined, true) : undefined;
```

### 3. packages/hooks/src/utils/render.ts - 添加 ignoreError 参数
```diff
export const getKey = <T,>(
  data: T,
  key: string | ((data: T) => any) | undefined,
  defaultValue?: any,
+ ignoreError?: boolean,
): any => {
  if (typeof key === 'function') return key(data);
  if (typeof key === 'string') {
    const keys = key.split('.');
    let value: any = data;
    for (let i = 0; i < keys.length; i++) {
      value = value?.[keys[i]];
      if (value === undefined) {
-       console.error(`[getKey] Cannot read property '${keys[i]}' of undefined`);
+       if (!ignoreError) {
+         console.error(`[getKey] Cannot read property '${keys[i]}' of undefined`);
+       }
        return defaultValue;
      }
    }
    return value;
  }
  return defaultValue;
};
```

## 变更前后逻辑差异

### 变更前
1. 菜单项内容没有 flex 布局，可能导致长文本显示异常
2. 使用 linkKey 但数据中不存在对应字段时，控制台会报错

### 变更后
1. 菜单项内容使用 flex 布局，正确处理文本溢出和对齐
2. linkKey 找不到对应数据时静默处理，不再报错

## 逻辑影响范围
- 改善菜单项的文本显示效果
- 提升组件的容错性
- 不影响功能逻辑

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯缺陷修复

### 行为变化说明

1. **菜单项布局优化**：
   - 影响场景：所有使用 Menu 组件的场景
   - 具体表现：菜单项内容对齐更准确，长文本正确省略
   - 视觉效果示例：
   ```tsx
   // 长文本现在能正确显示省略号
   <Menu
     data={[
       { id: '1', title: '这是一个很长的菜单标题文本内容' },
       { id: '2', title: '正常标题', icon: <Icon /> }
     ]}
   />
   ```
   - 是否需要调整：不需要，纯视觉优化

2. **linkKey 容错性增强**：
   - 影响场景：使用 linkKey 但数据不完整的情况
   - 具体表现：控制台不再显示错误信息
   - 受影响代码示例：
   ```tsx
   // 之前：item2 没有 url 字段会报错
   // 现在：静默处理，不报错
   <Menu
     linkKey="url"
     data={[
       { id: '1', title: 'Link1', url: '/page1' },
       { id: '2', title: 'Link2' } // 缺少 url
     ]}
   />
   ```
   - 是否需要调整：不需要，提升了容错性