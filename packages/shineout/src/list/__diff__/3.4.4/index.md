# List 组件 3.4.4 版本 Diff 报告

## 问题描述

修复 `List` 配置分页信息后报错的问题以及数据为空时样式异常的问题。主要解决两个缺陷：
1. 当 List 组件配置了 pagination 属性但数据为空时，组件会抛出错误
2. 数据为空时，空状态的样式显示不正确，没有居中对齐

## 代码变更文件

1. `packages/base/src/list/list.tsx`
2. `packages/base/src/list/list.type.ts`
3. `packages/shineout-style/src/list/list.ts`

## 变更代码行

### 1. packages/base/src/list/list.tsx - 增加空数据判断
```diff
const listClasses = props.jssStyle?.list?.();
+ const isEmpty = !util.isArray(data) || data.length <= 0;

const renderList = () => {
+ if (isEmpty) return null;
  
  if (props.fixed)
    return (
      <>
        {renderLoading()}
        {renderItem()}
      </>
    );
  // ... 其他渲染逻辑
};

const wrapperClass = classNames(
  props.className,
  listClasses?.wrapper,
+ isEmpty && listClasses?.wrapperEmpty,
  props.bordered && listClasses?.wrapperBordered,
  props.size === 'small' && listClasses?.wrapperSmall,
);
```

### 2. packages/base/src/list/list.type.ts - 新增样式类型
```diff
export interface ListClasses extends BaseItemClasses {
  wrapper: string;
+ wrapperEmpty: string;
  wrapperBordered: string;
  wrapperStriped: string;
  wrapperSmall: string;
}
```

### 3. packages/shineout-style/src/list/list.ts - 空状态样式
```diff
const listStyle: JsStyles<ListClassType> = {
  wrapper: {
    border: `${token.listBorderWidth} solid ${token.listBorderColor}`,
    borderRadius: token.listBorderRadius,
  },
+ wrapperEmpty: {
+   justifyContent: 'center',
+ },
  wrapperSmall: {},
  wrapperLarge: {},
};
```

## 变更前后逻辑差异

### 变更前
1. 数据为空时仍尝试渲染列表内容，导致分页组件处理空数据时报错
2. 空状态提示没有正确居中，样式布局异常
3. 没有对数据进行有效性检查

### 变更后
1. 增加 `isEmpty` 判断，当数据为空时不渲染列表内容
2. 空状态时应用 `wrapperEmpty` 样式类，使内容居中显示
3. 避免了分页组件处理无效数据的错误

## 逻辑影响范围
- 修复了配置分页时的运行时错误
- 改善了空状态的视觉表现
- 不影响有数据时的正常渲染

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是缺陷修复，恢复了组件的正常功能

### 行为变化说明

1. **空数据处理更加健壮**：
   - 影响场景：List 组件配置了 pagination 但数据为空
   - 具体表现：不再抛出错误，正常显示空状态
   - 受影响代码示例：
   ```tsx
   // 之前：会抛出错误
   // 现在：正常显示空状态
   <List
     data={[]}
     pagination={{
       current: 1,
       pageSize: 10,
       total: 0
     }}
     empty="暂无数据"
   />
   ```
   - 是否需要调整：不需要，这是缺陷修复

2. **空状态样式改进**：
   - 影响场景：所有数据为空的 List 组件
   - 具体表现：空状态提示文字居中显示
   - 视觉效果更加美观
   - 是否需要调整：不需要，纯样式优化