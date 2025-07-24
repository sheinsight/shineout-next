# Select 组件 3.7.2 版本 Diff 报告

## 问题描述

优化框类组件小尺寸字号下 `innerTitle` 的样式表现。当 `Select` 组件设置了 `innerTitle` 属性且使用小尺寸时，内部标签的高度和行高显示不协调，需要针对不同尺寸进行样式优化。

## 代码变更文件

1. `packages/shineout-style/src/cascader/cascader.ts`
2. `packages/shineout-style/src/select/select.ts`
3. `packages/shineout-style/src/tree-select/tree-select.ts`

## 变更代码行

### packages/shineout-style/src/select/select.ts - 优化标签高度和行高

```diff
  tag: {
+   height: 'var(--tag-height)',
+   lineHeight: 'var(--tag-line-height)',
    fontSize: token.Font['size-3'],
    // 其他样式保持不变
  },

  wrapperSmall: {
+   '--tag-height': token.Size['size-9'], // 18px
+   '--tag-line-height': token.Size['size-8'], // 16px
    // 其他样式保持不变
  },

  wrapperLarge: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  },

  wrapperInnerTitle: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  }
```

### packages/shineout-style/src/cascader/cascader.ts - 同步样式优化

```diff
  tagWrapper: {
    tag: {
+     height: 'var(--tag-height)',
+     lineHeight: 'var(--tag-line-height)',
      // 其他样式保持不变
    }
  },

  wrapperSmall: {
+   '--tag-height': token.Size['size-9'], // 18px
+   '--tag-line-height': token.Size['size-8'], // 16px
    // 其他样式保持不变
  },

  wrapperLarge: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  },

  wrapperInnerTitle: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  }
```

### packages/shineout-style/src/tree-select/tree-select.ts - 同步样式优化

```diff
  tagWrapper: {
    tag: {
+     height: 'var(--tag-height)',
+     lineHeight: 'var(--tag-line-height)',
      // 其他样式保持不变
    }
  },

  wrapperSmall: {
+   '--tag-height': token.Size['size-9'], // 18px
+   '--tag-line-height': token.Size['size-8'], // 16px
    // 其他样式保持不变
  },

  wrapperLarge: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  },

  wrapperInnerTitle: {
+   '--tag-height': token.Lineheight['line-height-dynamic'],
+   '--tag-line-height': token.Lineheight['line-height-dynamic'],
    // 其他样式保持不变
  }
```

## 变更前后逻辑差异

### 变更前
- 所有尺寸下的标签使用相同的高度和行高
- 小尺寸组件中的标签可能显得过高，与输入框不协调

### 变更后
- 小尺寸（small）使用固定的 18px 高度和 16px 行高
- 大尺寸（large）和带 innerTitle 的组件使用动态行高
- 通过 CSS 变量实现不同尺寸的样式切换

## 逻辑影响范围

- 影响所有使用 `innerTitle` 属性的多选 `Select` 组件
- 影响设置了 `size="small"` 的多选组件
- 同时影响 `Cascader` 和 `TreeSelect` 组件的多选模式
- 不影响单选模式的组件
- 不影响功能逻辑，仅优化视觉表现

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险
无相关风险

### 样式变更风险
- 依赖原有标签高度的自定义样式可能需要调整
- 自定义了 `.soui-select-tag` 样式的项目可能受影响

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

1. **小尺寸标签样式优化**
   - **影响场景**：使用 `size="small"` 的多选 `Select`
   - **具体表现**：标签高度从动态高度变为固定 18px
   - **受影响代码示例**：
   ```tsx
   // 之前：标签高度可能过高
   // 现在：标签高度固定为 18px，更加紧凑
   <Select multiple size="small" innerTitle="选择项" data={data} />
   ```
   - **是否需要调整**：不需要，除非有自定义样式覆盖

2. **CSS 变量控制**
   - **影响场景**：所有多选模式的框类组件
   - **具体表现**：使用 CSS 变量动态控制标签样式
   - **受影响代码示例**：
   ```css
   /* 如果需要自定义标签高度 */
   .custom-select {
     --tag-height: 20px;
     --tag-line-height: 18px;
   }
   ```
   - **是否需要调整**：仅在需要自定义样式时使用