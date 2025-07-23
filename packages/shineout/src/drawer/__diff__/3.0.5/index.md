# Drawer 组件 3.0.5 版本 Diff 报告

## 问题描述

Drawer 组件在之前的版本中没有默认支持内部滚动，当内容超出 Drawer 高度时，无法正常滚动查看全部内容。

相关 Issue: [#393](https://github.com/sheinsight/shineout-next/pull/393)

## 修改内容

### 1. 样式文件修改

**文件**: `packages/shineout-style/src/modal/modal.ts`

在 `wrapperDrawer` 样式类中，为 Drawer 的 body 部分添加了滚动支持：

```diff
  wrapperDrawer: {
    // ... 其他样式
    
    '& $body': {
      padding: `${token.modalDrawerBodyPaddingY} ${token.modalDrawerBodyPaddingX}`,
+     overflow: 'auto',  // 添加内滚支持
    },
    
    // ... 其他样式
  }
```

### 2. 技术实现细节

#### 滚动层级结构
1. **Wrapper 容器**: 保持 `overflow: 'auto'` 作为整体滚动容器
2. **Body 内容区**: 新增 `overflow: 'auto'`，使内容区域支持独立滚动
3. **高度约束**: 通过 `flex: '1 1 auto'` 确保 body 自动填充可用空间

#### 关键样式配置
```css
/* Drawer body 样式 */
.drawer-body {
  flex: 1 1 auto;      /* 弹性布局，自动填充 */
  min-height: 1px;     /* 最小高度，确保容器存在 */
  overflow: auto;      /* 内容溢出时显示滚动条 */
}
```

## 影响范围

### 直接影响
1. **滚动行为变化**: Drawer 内容区域现在默认支持滚动
2. **用户体验提升**: 长内容可以在 Drawer 内部滚动查看，无需调整 Drawer 高度

### 兼容性考虑
1. **向后兼容**: 该修改不会影响现有功能，只是增强了默认行为
2. **自定义覆盖**: 用户仍可通过 `bodyStyle` 属性自定义滚动行为：
   ```tsx
   <Drawer bodyStyle={{ overflow: 'hidden' }}>
     {/* 禁用默认滚动 */}
   </Drawer>
   ```

### 使用场景
1. **表单场景**: 长表单可以在 Drawer 内滚动，无需担心内容被截断
2. **详情展示**: 详情内容过长时，可以在固定高度的 Drawer 内滚动查看
3. **列表展示**: 列表数据可以在 Drawer 内滚动，保持界面整洁

## 测试建议

1. **基础滚动测试**: 验证内容超出时是否出现滚动条
2. **嵌套滚动测试**: 测试 Drawer 内部有其他滚动容器时的表现
3. **性能测试**: 大量内容滚动时的性能表现
4. **样式覆盖测试**: 验证 `bodyStyle` 能否正确覆盖默认滚动设置

## 注意事项

1. 如果需要禁用默认滚动，请使用 `bodyStyle={{ overflow: 'hidden' }}`
2. 对于特殊的滚动需求，建议在内容中自定义滚动容器
3. 确保内容高度不会导致滚动条频繁出现/消失，影响用户体验