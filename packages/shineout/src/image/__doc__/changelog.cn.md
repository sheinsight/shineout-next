# 3.0.0

- [bug]修复 Image shape 属性默认值 roundeed 不生效的问题。
- [bug]修复 Image 在 Image.Group 中 onClick 事件不生效的问题。
- [break]调整 Image.Group target 属性优先级策略。若 Image 设置 target 则以子组件为准。当开启 pile 功能时，自动设置为 \_modal，不可被子组件覆盖。
- [feture]新增 XXX 属性，用于 XXX
- [optimize]优化可预览模式下鼠标移入时的交互行为，增加预览蒙层。
