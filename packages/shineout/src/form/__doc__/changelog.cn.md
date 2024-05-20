## 3.1.12
2024-05-16

### 🐞 BugFix

- 修复 `Form` 默认值传入 proxy 对象会导致修改表单报错  ([#456](https://github.com/sheinsight/shineout-next/pull/456))

## 3.1.10
2024-05-15

### 🐞 BugFix


- 修复 `FormDatum.set` 不支持 `set(name, value)` 用法 ([#444](https://github.com/sheinsight/shineout-next/pull/444))


## 3.1.8
2024-05-13

### 🐞 BugFix

- 修复 `Form` 属性 `onChange` 返回的 `value` 属性变成只读的问题 ([#434](https://github.com/sheinsight/shineout-next/pull/434))

## 3.1.6
2024-05-11

### 💅 Style
- `Form.Item` 在行内模式下给标签增加 `width: auto` 样式 ([#430](https://github.com/sheinsight/shineout-next/pull/430))

## 3.1.0
2024-05-09

### 💅 Style

- `Form.Item` 增加 `min-width: 0` 样式 ([#419](https://github.com/sheinsight/shineout-next/pull/419))

## 3.0.9
2024-04-26

### 🐞 BugFix

- 修复 `Form` 内部表单项 `name` 变化时没有清除之前错误信息问题 ([#401](https://github.com/sheinsight/shineout-next/pull/401))
- 修复 `Form` 的 `value` 和内部表单项 `name` 同时变化时对应的 value 无法更新的问题 ([#401](https://github.com/sheinsight/shineout-next/pull/401))

