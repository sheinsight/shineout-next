## 3.5.1-beta.2
2024-11-12
### 🐞 BugFix

- 修复 `Form.FieldSet` 校验返参为 Error 数组时校验异常的问题 ([#796](https://github.com/sheinsight/shineout-next/pull/796))

## 3.5.0
2024-11-11
### 💎 Enhancement

- `Form.Item` 的 `label` 属性新增对象配置模式，支持在标签文本旁添加 tooltip 提示说明 ([#788](https://github.com/sheinsight/shineout-next/pull/788))

### 🆕 Feature

- `Form` 新增 `useForm` 用法，获取的form实例方法与formRef相同，但是可以在任何地方使用，不受组件渲染影响 ([#711](https://github.com/sheinsight/shineout-next/pull/711))
- `Form` 新增 `reserveAble` 属性，用于控制表单项是否保留值 ([#772](https://github.com/sheinsight/shineout-next/pull/772))



## 3.4.4
2024-10-28
### 🐞 BugFix

- 修复 `Form.Field` 设置了 `defaultValue` 后在部分场景下失效的问题 ([#742](https://github.com/sheinsight/shineout-next/pull/742))
- 修复 `Form` 的onSubmit时间可能比onChange早的问题（例如扫码枪触发的表单提交） ([#731](https://github.com/sheinsight/shineout-next/pull/731))
- 修复 `Form.Field` 在设置默认值情况下 `value` 改变后可能失效的问题 ([#730](https://github.com/sheinsight/shineout-next/pull/730))

### 💎 Enhancement
- `Form` 的formRef的set方法支持嵌套对象值 ([#711](https://github.com/sheinsight/shineout-next/pull/711))


## 3.4.2
2024-09-29
### 🐞 BugFix

- 修复 `Form` 校验 name 为数组字段时依赖前后 draft 情况下校验可能不准确的问题 ([#684](https://github.com/sheinsight/shineout-next/pull/684))
- 修复表单组件 `name` 为数组类型且拥有 `defaultValue` 情况下重置多次触发 onChange 的问题 ([#684](https://github.com/sheinsight/shineout-next/pull/684))

## 3.3.7
2024-09-04
### 🐞 BugFix

- 修复 `Form` 绑定的name重复时，表单的受控行为不准确的问题

## 3.2.4
2024-06-26
### 🐞 BugFix

- 修复 `Form` 受控状态 `value` 传入  `null` 会导致数据无法更新的问题 ([#548](https://github.com/sheinsight/shineout-next/pull/548))


## 3.2.2
2024-06-21

### 🐞 BugFix

- 修复 `Form.FieldSet` 修改值在某些场景下无法更新的问题 ([#528](https://github.com/sheinsight/shineout-next/pull/528))

## 3.2.0
2024-06-14

### 💅 Style

- 修改 `Form.Item` 标签在顶部时的内边距 ([#436](https://github.com/sheinsight/shineout-next/pull/436))

## 3.1.28
2024-06-07

### 🐞 BugFix

- 修复 `Form.Item` 标签在顶部时标签宽度没有撑开的问题   ([#515](https://github.com/sheinsight/shineout-next/pull/515))

## 3.1.27
2024-06-06

### 🐞 BugFix

- 修复 `Form` 在某些场景下 value 更新存在延迟的问题   ([#506](https://github.com/sheinsight/shineout-next/pull/506))

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

