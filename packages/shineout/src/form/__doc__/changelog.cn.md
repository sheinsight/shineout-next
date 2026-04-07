## 3.9.13-beta.5
2026-04-03
### 💅 Style
- 修复 `Form` error 类型提示信息未正确应用上边距 token 的问题 ([#1685](https://github.com/sheinsight/shineout-next/pull/1685))

## 3.9.12-beta.7
2026-03-24
### 🐞 BugFix
- 修复 `Form.Item` 嵌套使用时，中层设置 `required={false}` 会导致内层 `required` 的必填星号样式丢失的问题 ([#1665](https://github.com/sheinsight/shineout-next/pull/1665))


## 3.9.11-beta.1
2026-03-06
### 🐞 BugFix
- 修复 `Form` 表单项的 `bind` 属性不支持传入字符串类型的问题 (Regression: since v3.9.3) ([#1644](https://github.com/sheinsight/shineout-next/pull/1644))


## 3.9.9-beta.16
2026-02-24
### 🆕 Feature
- `Form` 新增 `keepErrorAbove` 属性，错误信息独占一行，不再覆盖提示信息 ([#1624](https://github.com/sheinsight/shineout-next/pull/1624))


## 3.9.8-beta.1
2026-01-09
### 🆕 Feature
- `Form` 新增 `validateTrigger` 属性，支持配置校验触发时机（change | change-blur）  ([#1571](https://github.com/sheinsight/shineout-next/pull/1571))


## 3.9.4-beta.3
2025-12-15
### 🐞 BugFix
- 修复 `Form` 的 `FieldSet` 嵌套使用时，某一项改变时触发了整个数组的校验的问题 (Regression: since v3.5.1) ([#1532](https://github.com/sheinsight/shineout-next/pull/1532))


## 3.9.3-beta.13
2025-12-11
### 🐞 BugFix
- 修复 `Form` 的 `FieldSet` 嵌套使用时，自定义校验规则在输入过程中可能不触发的问题 ([#1518](https://github.com/sheinsight/shineout-next/pull/1518))


## 3.9.2-beta.1
2025-12-01
### 🐞 BugFix
- 修复 `Form` 的 `FieldSet` 上自定义 rules 校验错误信息在 children 值变化时未正常显示的问题  ([#1492](https://github.com/sheinsight/shineout-next/pull/1492))


## 3.8.10-beta.10
2025-11-20

### 🚀 Performance

- 优化 `Form` 在 React 18 以上的并发渲染模式下且处于高负载渲染场景下的渲染 ([#1476](https://github.com/sheinsight/shineout-next/pull/1476))


## 3.8.7-beta.3
2025-10-16

### 🐞 BugFix

- 修复 `Form` 的 rules 正则校验的值是数字类型时不通过的错误 ([#1417](https://github.com/sheinsight/shineout-next/pull/1417))


## 3.8.2-beta.2
2025-09-08

### 🐞 BugFix

- 修复 `Form.FieldSet` 的 children 函数用法的 value 参数是基本类型时渲染不正确的问题 (Regression: since v3.8.0) ([#1352](https://github.com/sheinsight/shineout-next/pull/1352))


## 3.8.1-beta.7
2025-09-05

### 🐞 BugFix

- 修复 `Form` 设置了 `name` 属性用法下的TreeSelect组件的keygen函数报错问题 (Regression: since v3.8.0) ([#1347](https://github.com/sheinsight/shineout-next/pull/1347))


## 3.8.0-beta.27
2025-08-12

### 🐞 BugFix

- 修复 `Form.Field` 的 `name` 为数组时，错误信息重复渲染的问题 ([#1299](https://github.com/sheinsight/shineout-next/pull/1299))


## 3.8.0-beta.25
2025-08-11

### 🐞 BugFix

- 修复 `Form.FieldSet` 的 children 函数用法的 value 参数在某些场景下获取不到最新值的问题 ([#1295](https://github.com/sheinsight/shineout-next/pull/1295))


## 3.8.0-beta.21
2025-07-31

### 🆕 Feature

- `Form` 的 `FormRef` 新增 `getFormSchema` 方法，用于获取表单结构的标准 JSON Schema ([#1281](https://github.com/sheinsight/shineout-next/pull/1281))


## 3.8.0-beta.13
2025-07-11

### 🆕 Feature

- `Form.Field` 新增 `clearToUndefined` 属性，当字段有defaultValue时，清空时可设置为undefined ([#1238](https://github.com/sheinsight/shineout-next/pull/1238))


## 3.7.11-beta.3
2025-08-28



### 🐞 BugFix

- 修复 `Form` 的校验错误信息在列表数据更新后丢失的问题 ([#1327](https://github.com/sheinsight/shineout-next/pull/1327))


## 3.7.8-beta.11
2025-07-29



### 🐞 BugFix

- 修复 `Form` 对 `onChange` 的返回值直接修改数据后再设置新 value 不生效的问题 ([#1272](https://github.com/sheinsight/shineout-next/pull/1272))([#1257](https://github.com/sheinsight/shineout-next/pull/1257))


## 3.7.7-beta.8
2025-07-17



### 🐞 BugFix

- 修复 `Form.FieldSet` 的 `onAppend` 和 `onInsert` 在非末尾的位置插入插入undefined时，children的表单组件不渲染的问题 ([#1252](https://github.com/sheinsight/shineout-next/pull/1252))


## 3.7.5-beta.4
2025-07-02



### 🐞 BugFix
- 修复 `Form` 卸载携带校验错误字段后，重新挂载该字段时会携带历史校验错误信息的问题 ([#1219](https://github.com/sheinsight/shineout-next/pull/1219))


## 3.7.4-beta.8
2025-06-26



### 🐞 BugFix
- 修复 `Form.Item` 嵌套使用时，子级的 `required` 属性设置为 `false` 不生效的问题 ([#1210](https://github.com/sheinsight/shineout-next/pull/1210))


## 3.7.4-beta.7
2025-06-26



### 🐞 BugFix
- 修复 `Form` 的 `useForm` 用非受控用法下，表单实例获取不正确的问题 ([#1208](https://github.com/sheinsight/shineout-next/pull/1208))


## 3.7.3-beta.3
2025-06-17

### 🐞 BugFix
- 修复 `Form` 的 `scrollToError` 偶现的无法滚动到错误字段位置的问题 ([#1181](https://github.com/sheinsight/shineout-next/pull/1181))


## 3.7.1-beta.6
2025-06-10

### 🐞 BugFix
- 修复 `Form` 设置某字段值的同时设置了其他字段的值，此时其他字段上的错误状态未自动清除的问题 ([#1160](https://github.com/sheinsight/shineout-next/pull/1160))


## 3.7.0-beta.41
2025-06-04

### 🐞 BugFix
- 修复 `Form` 在同字段表单组件发生挂载卸载时 `defaultValue` 可能覆盖原值的问题(Regression: since v3.6.4-beta.5) ([#1144](https://github.com/sheinsight/shineout-next/pull/1144))


## 3.7.0-beta.33
2025-05-28

### 🆕 Feature
- `Form.Item` 新增 `keepErrorBelow` 属性，错误信息独占一行，不再覆盖提示信息 ([#1130](https://github.com/sheinsight/shineout-next/pull/1130))


## 3.6.7-beta.7
2025-05-27

### 🐞 BugFix
- 修复 `Form` 在相同 `name` 的组件切换渲染过程中，执行 `datum.set` 等改值行为失效的问题  ([#1127](https://github.com/sheinsight/shineout-next/pull/1127))


## 3.6.7-beta.5
2025-05-23

### 🐞 BugFix
- 修复 `Form` 在设置动态 `name` 且为数组 name 的情况下导致字段可能被删除的问题 ([#1123](https://github.com/sheinsight/shineout-next/pull/1123))


## 3.6.7-beta.2
2025-05-15

### 🐞 BugFix
- 修复 `Form` 在列表数据中使用时，列表数据更新导致校验状态丢失的问题 ([#1115](https://github.com/sheinsight/shineout-next/pull/1115))


## 3.6.6-beta.5
2025-05-09

### 🐞 BugFix
- 修复 `Form` 的formRef `set` 设置某对象字段下的部分子字段值，未设值子字段的表单组件值未清空的问题 ([#1106](https://github.com/sheinsight/shineout-next/pull/1106))


## 3.6.5-beta.3
2025-04-17

### 🐞 BugFix
- 修复 `Form.Flow` 内容更新不同步的问题 ([#1081](https://github.com/sheinsight/shineout-next/pull/1081))


## 3.6.4-beta.5
2025-04-17

### 🐞 BugFix
- 修复 `Form` 在表单组件的 key 变更后 `defaultValue` 无法设置成功的问题 ([#1068](https://github.com/sheinsight/shineout-next/pull/1068))


## 3.6.4-beta.4
2025-04-16

### 🐞 BugFix
- 修复 `Form` 在ReactDOM.render模式下并发设置value后导致某些字段值丢失的问题 ([#1067](https://github.com/sheinsight/shineout-next/pull/1067))


## 3.6.3-beta.2
2025-04-10

### 🐞 BugFix
- 修复 `Form` 在设置 `defaultValue` 时，默认值设置时机晚于外部 value 状态的问题 ([#1049](https://github.com/sheinsight/shineout-next/pull/1049))


## 3.6.2-beta.5
2025-04-01

### 🐞 BugFix
- 修复 `Form.Field` 在 `name` 为数组情况下组件卸载时错误信息无法清空的问题 ([#1033](https://github.com/sheinsight/shineout-next/pull/1033))


## 3.6.1-beta.4
2025-03-25

### 🐞 BugFix
- 修复 `Form` 同时设置 value 和 names为数组的DatePicker并发渲染时，value未按照预期设置进去的问题  ([#1013](https://github.com/sheinsight/shineout-next/pull/1013))


## 3.6.0
2025-03-20

### 🆕 Feature
- `Form` 新增 `colon` 属性，用于控制 label 是否显示冒号 ([#875](https://github.com/sheinsight/shineout-next/pull/875))
- `Form.Flow` 新增 `strict` 属性，在此严格模式下，只有在配置的names字段值发生变化时才触发Flow的children渲染 ([#1003](https://github.com/sheinsight/shineout-next/pull/1003))


### 💎 Enhancement
- `Form` 的 `scrollToField` 方法支持 `Form.Field` 和 `Form.FieldSet` 下的未设置name属性的表单组件 ([#875](https://github.com/sheinsight/shineout-next/pull/875))


### 🐞 BugFix
- 修复 `Form` 的 `scrollToError` 无法生效的问题(Regression: since v3.5.4) ([#985](https://github.com/sheinsight/shineout-next/pull/985))
- 修复 `Form` 下的组件设置name为json path格式的数组时，组件上的 `defaultValue` 无法生效的问题 ([#980](https://github.com/sheinsight/shineout-next/pull/980))
- 修复 `Form` 中的带校验字段卸载后，执行手动校验方法 `validateFieldsWithValue` 依然能返回该字段校验不通过信息的问题 ([#975](https://github.com/sheinsight/shineout-next/pull/975))
- 修复 `Form` 的 `scrollToField` 在复杂布局中不生效的问题 ([#973](https://github.com/sheinsight/shineout-next/pull/973))


## 3.5.8
2025-02-13

### 🐞 BugFix
- 修复 `Form` 在异步设置 value 后，带有 defaultValue 的表单项视图更新异常的问题  ([#950](https://github.com/sheinsight/shineout-next/pull/950))
- 修复 `Form` 的 `FieldSet`嵌套使用后，子级的insert value触发了父级的校验的问题 ([#934](https://github.com/sheinsight/shineout-next/pull/934))
- 修复 `Form` 的 `FormRef.validateFields("friends[1]")` 这种用法不生效和 `FormRef.clearValidate(["friends[1]"])` 报错的问题 ([#928](https://github.com/sheinsight/shineout-next/pull/928))


## 3.5.7
2025-01-14

### 🐞 BugFix

- 修复 `Form` 在 `Modal` 组件中嵌套使用时，子Form卸载后父Form无法提交的问题 ([#914](https://github.com/sheinsight/shineout-next/pull/914))
- 修复 `Form` 的FormRef.validateFields方法校验数组类型字段不生效的问题 ([#909](https://github.com/sheinsight/shineout-next/pull/909))


### 💎 Enhancement
- `Form.FieldSet` children 的 `onChange` 方法增加第二个参数 `options`，设置options.validate为false时，不立即校验该字段 ([#912](https://github.com/sheinsight/shineout-next/pull/912))


## 3.5.6
2025-01-06

### 🐞 BugFix
- 修复 `Form.Field` 下的Input使用onChange设置对象格式的值时，光标跳到末尾的问题(Regression: since v3.4.4) ([#901](https://github.com/sheinsight/shineout-next/pull/901))
- 修复 `Form.FieldSet` 在非结尾位置插入数据时，数组的渲染显示异常的问题(Regression: since v3.5.4) ([#889](https://github.com/sheinsight/shineout-next/pull/889))


## 3.5.5
2024-12-24

### 🐞 BugFix
- 修复 `Form` 在按回车提交表单时表单中 `Input` 的 `trim` 功能失效的问题 ([#871](https://github.com/sheinsight/shineout-next/pull/871))


## 3.5.4
2024-12-12

### 🐞 BugFix
- 修复 `Form.FieldSet` 使用set方法设置后，输入文本后光标失焦的问题(Regression: since v3.5.3) ([#851](https://github.com/sheinsight/shineout-next/pull/851))
- 修复 `Form` 嵌套 `Form` 的提交和重置行为 ([#849](https://github.com/sheinsight/shineout-next/pull/849))


## 3.5.3
2024-12-04

### 🐞 BugFix
- 修复 `Form` 的 `onChange` 执行多次且数组嵌套字段模式下死循环的问题(Regression: since v3.4.4,v3.5.2) ([#842](https://github.com/sheinsight/shineout-next/pull/842))
- 修复 `Form` 的 `reserveAble` 属性在处理嵌套字段时，无法保留值的问题 ([#834](https://github.com/sheinsight/shineout-next/pull/834))
- 修复 `Form` 的 `formRef` 上的set方法，为某个字段手动设置相同长度的数组值时，无法更新值的问题 ([#835](https://github.com/sheinsight/shineout-next/pull/835))
- 修复 `Form` 校验字段为嵌套字段时，自定义校验方法第二参数结构错误的问题 ([#829](https://github.com/sheinsight/shineout-next/pull/829))


### 💎 Enhancement
- 增强 `Form` 的 `formRef`，增加 `validateFieldsWithValue` 方法，返回校验值 ([#812](https://github.com/sheinsight/shineout-next/pull/812))
- 增强 `Form` 的 `formRef`，增加 `scrollToField` 方法，支持根据 name 滚动至指定表单项 ([#812](https://github.com/sheinsight/shineout-next/pull/812))


## 3.5.2
2024-11-28

### 🐞 BugFix

- 修复初始化表单后 value 异步更新导致 defaultValue 无法再次同步的问题 ([#817](https://github.com/sheinsight/shineout-next/pull/817))
- 修复 `Form.FieldSet` 初始化默认值后更新内部值异常的问题 ([#816](https://github.com/sheinsight/shineout-next/pull/816))
- 修复 `Form.FieldSet` 设置默认值覆盖前者初始化值的问题 ([#808](https://github.com/sheinsight/shineout-next/pull/808))


## 3.5.1
2024-11-14



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

