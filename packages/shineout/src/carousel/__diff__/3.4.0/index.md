# Carousel 组件 3.4.0 版本 Diff 报告

## 问题描述
修复 `Carousel` 点击箭头切换后，鼠标悬停时没有禁用切换的现象

## 代码变更文件
`packages/base/src/carousel/carousel.tsx`

## 变更代码行
```diff
// 添加新的事件处理函数
+ const handlePrev = () => {
+   if(config.direction === 'ltr') {
+     func.backward()
+   }else {
+     func.forward()
+   }
+   func.stop()
+ }
+ 
+ const handleNext = () => {
+   if(config.direction === 'ltr') {
+     func.forward()
+   }else {
+     func.backward()
+   }
+   func.stop()
+ }

// 修改箭头点击事件
- onClick={config.direction === 'ltr' ? func.backward : func.forward}
+ onClick={handlePrev}

- onClick={config.direction === 'ltr' ? func.forward : func.backward}
+ onClick={handleNext}
```

## 变更前后逻辑差异
- **变更前**：点击箭头直接调用切换函数，不停止自动播放
- **变更后**：点击箭头后立即调用 `func.stop()` 停止自动播放

## 逻辑影响范围
- 点击箭头切换后会停止自动轮播
- 需要鼠标移出轮播区域再移入才能恢复自动播放
- 支持 RTL（从右到左）方向的正确切换

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- 点击箭头后自动播放停止，与之前持续播放的行为不同
- 用户需要鼠标移出再移入才能恢复自动播放