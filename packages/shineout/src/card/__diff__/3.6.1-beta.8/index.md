# Card 组件 3.6.1-beta.8 版本 Diff 报告

## 问题描述
修复 `Card.Header` 和 `Card.Footer` 在未开启 `moveable` 属性时不可选中文本的问题

## 代码变更文件
`packages/base/src/card/card.tsx`

## 变更代码行
```diff
const headerProps = {
- onMouseDown: handleDragMouseDown,
+ onMouseDown: props.moveable ? handleDragMouseDown : undefined,
};

const footerProps = {
- onMouseDown: handleDragMouseDown,
+ onMouseDown: props.moveable ? handleDragMouseDown : undefined,
};
```

## 变更前后逻辑差异
- **变更前**：无论 moveable 是否为 true，都绑定 handleDragMouseDown，导致文本无法选中
- **变更后**：只在 moveable 为 true 时绑定拖拽事件，否则保留文本选择功能

## 逻辑影响范围
- moveable=false 时，Header 和 Footer 的文本可正常选中、复制
- moveable=true 时，保持原有拖拽功能，文本不可选中
- 不影响 Card.Body 的文本选择行为

## 风险使用场景
- 如果业务中依赖了 moveable=false 时仍然阻止文本选择的行为，需要调整
- 自定义拖拽实现可能需要重新考虑事件处理