## 3.0.0
2023-10-12

### feat

- 新增 `mode` 字段代替旧版的 outline text 属性，并兼容旧版写法，未来将移除旧版用法
- 新增 `dashed` 风格按钮

### break

- 隐藏 type = `default` 样式，更改为近似 secondary 的样式，并不推荐使用
- 调整按钮布局方式为 `inline-flex`，原有空格将不生效