---
title: Input
group: Form
---

# Head

-cn 输入框 Input
-en Input

~cn 用户可以在文本框内输入或编辑文字。
~en Users can input or edit text in the text box.

## Base

-cn 基本用法
-en Basic usage

<code src="./__example__/s-001-base.tsx"></code>

## size

-cn 尺寸大小
-en Size

~cn 设置 size 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default（默认）、large。
~en Set the size property to change the size of the input box component. There are three built-in sizes available: small, default (default), and large.

<code src="./__example__/s-002-size.tsx"></code>

## number

-cn 数字数据
-en Numerical data

~cn 设置 type 属性为 number 后，将支持数字数据的处理。通过设置 numType、integerLimit、autoFix、digits 属性来定制不同的数值处理结果。
~en After setting the type attribute to "number", it enables the handling of numerical data. You can customize different numerical processing results by using the numType, integerLimit, autoFix, and digits attributes.

<code src="./__example__/s-003-number.tsx"></code>

## Input.Group

-cn 内置分组组件
-en Built-in group component

~cn 利用内置的 group 组件可以实现多个 输入组件 或 选择型组件 联合展示。
~en By utilizing the built-in group component, you can combine multiple input components or selection components for joint display.

<code src="./__example__/s-004-group.tsx"></code>

## tip

-cn 提示
-en tip

~cn 通过 tip 属性，可以自定义配置组件的提示信息。可以通过传入自定义 ReactDOM 来渲染你想要的内容。
~en You can customize the prompt message of the component by using the 'tip' attribute. You can also render the desired content by passing a custom ReactDOM.

<code src="./__example__/s-005-tip.tsx"></code>

## validate

-cn 校验
-en validate

~cn 组件支持传入 rules 属性来配置校验规则。
~en The component supports passing the 'rules' attribute to configure validation rules.

<code src="./__example__/s-006-validate.tsx"></code>

## disabled

-cn 禁用
-en disabled

~cn 开启 disabled 属性后，组件将禁止输入。
~en When the disabled attribute is enabled, the component will prevent input.

<code src="./__example__/s-007-disabled.tsx"></code>

## Input.Password

-cn 内置密码组件
-en Built-in password component

~cn 使用内置 password 组件专门处理密码业务场景。
~en We use the built-in password component specifically for handling password-related scenarios.

<code src="./__example__/s-008-password.tsx"></code>

## clearable

-cn 允许删除
-en Allow clearing

~cn 允许清除 input 框内输入的内容。
~en Allow clearing the content entered in the input box.

<code src="./__example__/s-009-clearable.tsx"></code>

## underline

-cn 下边框
-en Bottom border

~cn 开启 underline 属性后，组件将支持下边框样式，仅展示下部的边框。
~en After enabling the underline attribute, the component will support the bottom border style and display only the border at the bottom.

<code src="./__example__/s-0010-underline.tsx"></code>

## autoSelect

-cn 自动选中
-en Automatically select Input

~cn 开启 autoSelect 属性后，当 Input 组件聚焦时，将自动全选当前 Input 组件的内容。
~en After enabling the autoSelect attribute, when the Input component is focused, the content of the current Input component will be automatically selected.

<code src="./__example__/s-0011-autoselect.tsx"></code>

## trim

-cn 清除空格
-en Trim whitespace

~cn 开启 trim 属性，Input 组件会在键入内容后去除内容两端的空格字符。
~en After enabling the trim attribute, the Input component will remove the whitespace characters at both ends of the content after typing.

<code src="./__example__/s-0012-trim.tsx"></code>

## Keyboard Events

-cn 键盘事件
-en Keyboard events

~cn Input 组件支持 onKeyUp（键盘弹起）、onKeyDown（键盘按下）、onEnterPress（回车） 事件。
~en The Input component supports the onKeyUp (key up), onKeyDown (key down), and onEnterPress (enter key) events.

<code src="./__example__/s-0013-enter.tsx"></code>

## limit

-cn 输入限制
-en Input restriction

~cn 通过设置 min（最小值）、 max（最大值）、 maxLength（最大长度）来限制 Input 组件的输入内容。
~en Set min (minimum value), max (maximum value), and maxLength (maximum length) to restrict the input content of the Input component.

<code src="./__example__/s-0014-limit.tsx"></code>

## border

-cn 无边框模式
-en Borderless mode

~cn 开启 border 属性后，Input 组件将不再显示边框。
~en After enabling the border attribute, the Input component will no longer display a border.

<code src="./__example__/st-0015-no-border.tsx"></code>
