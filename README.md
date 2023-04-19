# soui

[![NPM version](https://img.shields.io/npm/v/soui.svg?style=flat)](https://npmjs.org/package/soui)
[![NPM downloads](http://img.shields.io/npm/dm/soui.svg?style=flat)](https://npmjs.org/package/soui)

A react library developed with dumi

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

## 目录结构

able 组件逻辑 hooks useInput
hooks 功能性 hooks 如 useInputable
utils 工具函数 如 isFunc
core dom + able + className 定义(无样式)
style/shineout 基于 className 定义 实现样式
style/mobile 基于 className 定义 实现样式
shineout 拼装 core + style/shineout
shineout-mobile 拼装 core + style/mobile

@shined/shineout-able headless ui 逻辑 提供组件状态和事件管理
@shined/shineout-core dom 提供 dom
@shined/shineout-use 一些可复用的逻辑
@shined/shineout-style 提供 shineout 样式
@shined/shineout-utils 提供一些工具函数

MIT
