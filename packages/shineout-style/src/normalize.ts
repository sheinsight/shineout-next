// 全局基础样式（normalize）与 jss 插入点。
// 引入本模块会产生副作用：在浏览器环境下向 document.head 最前面依次插入 normalize 样式和 jss 插入点，
// 并通过 setToken 向 html 注入主题 token。
import { CommonToken, setToken } from '@sheinx/theme';
import { jss } from './jss-style';
import version from './version';

const token = {
  fontFamily:
    'var(--common-body-font-family, PingFang SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Hiragino KaKu Gothic Pro, Microsoft YaHei, Arial, sans-serif )',
  color: 'var(--common-body-color, #141737)',
  fontSize: 'var(--font-size-base, 14px)',
  // 变量名与 shineout 1.x / 2.x 保持一致
  lineHeight: 'var(--common-line-height, 1.42857143)',
  linkColor: CommonToken['Brand-6'],
  linkHoverDecoration: 'none',
  linkDisabledColor: CommonToken['Brand-3'],
  headingsColor: 'inherit',
  headingsFontFamily: 'inherit',
  headingsFontWeight: 'bold',
  headingsLineHeight: '1.1',
  headingsSmallColor: '#adb5bd',
};

const marginLarge = '20px';
const marginSmall = '10px';
export const normalizeStyle = `*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  line-height: 1.15;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}

body {
  margin: 0;
  color: ${token.color};
  font-family: ${token.fontFamily};
  font-size: ${token.fontSize};
  line-height: ${token.lineHeight};
}

h1 {
  margin: 0.67em 0;
  font-size: 2em;
}

figure {
  margin: 1em 40px;
}

hr {
  overflow: visible;
  height: 0;
  box-sizing: content-box;
}

pre {
  font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 1em;
}

a {
  background-color: transparent;
  color: ${token.linkColor};
  cursor: pointer;
  outline: none;
  text-decoration: ${token.linkHoverDecoration};
  -webkit-text-decoration-skip: objects;
  transition: color 0.3s;
}

a:active,
a:hover {
  color: ${token.linkColor};
  outline: 0;
  text-decoration: ${token.linkHoverDecoration};
}
a[disabled] {
  color: ${token.linkDisabledColor};
  cursor: not-allowed;
  pointer-events: none;
}

abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

dfn {
  font-style: italic;
}

mark {
  background-color: #ff0;
  color: #000;
}

small {
  font-size: 80%;
}

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

audio,
video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
html [type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  display: table;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;
  color: inherit;
  white-space: normal;
}

progress {
  display: inline-block;
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type='search']::-webkit-search-cancel-button,
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

details,
menu {
  display: block;
}

summary {
  display: list-item;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  color: ${token.headingsColor};
  font-family: ${token.headingsFontFamily};
  font-weight: ${token.headingsFontWeight};
  line-height: ${token.headingsLineHeight};
}
h1 small, h1 .small, .h1 small, .h1 .small,
h2 small, h2 .small, .h2 small, .h2 .small,
h3 small, h3 .small, .h3 small, .h3 .small,
h4 small, h4 .small, .h4 small, .h4 .small,
h5 small, h5 .small, .h5 small, .h5 .small,
h6 small, h6 .small, .h6 small, .h6 .small {
  color: ${token.headingsSmallColor};
  font-weight: normal;
  line-height: 1;
}

h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: ${marginLarge};
  margin-bottom: ${marginSmall};
}

h1 small, h1 .small, .h1 small, .h1 .small,
h2 small, h2 .small, .h2 small, .h2 .small,
h3 small, h3 .small, .h3 small, .h3 .small {
  font-size: 65%;
}

h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: ${marginSmall};
  margin-bottom: ${marginSmall};
}

h4 small, h4 .small, .h4 small, .h4 .small,
h5 small, h5 .small, .h5 small, .h5 .small,
h6 small, h6 .small, .h6 small, .h6 .small {
  font-size: 75%;
}

p {
  margin: 0 0 ${marginSmall};
}`;

export const normalizeStyleId = 'shineout-next-normalize__' + version;
export const jssInsertionPointId = 'shineout-next-jss-insertion-point__' + version;

// 创建带标识的 style 节点，并插入到 head 最前面
function insertStyleElement(id: string, cssText?: string) {
  const style = document.createElement('style');
  style.setAttribute('name', id);
  style.setAttribute('data-alita-ignore', 'true');
  if (cssText !== undefined) style.textContent = cssText;
  document.head.insertBefore(style, document.head.firstChild);
  return style;
}

// 当前模块实例自己创建的 normalize 节点。
// 同一页面里多份 bundle（如嵌入插件与业务项目）版本相同时节点同名，不能按名字查找，否则可能误改对方的节点
let normalizeStyleElement: HTMLStyleElement | null = null;

function appendNormalizeStyle(styleString: string, id: string) {
  normalizeStyleElement = insertStyleElement(id, styleString);
}

function appendJssInsertionPoint() {
  const insertionPoint = insertStyleElement(jssInsertionPointId);
  jss.setup({ insertionPoint });
}

if (typeof window !== 'undefined') {
  appendJssInsertionPoint();
  appendNormalizeStyle(normalizeStyle, normalizeStyleId);
}

// html / body 作为根选择器时替换为 prefix，其余选择器统一加前缀
const scopeSelector = (selector: string, prefix: string) => {
  const trimmed = selector.trim();
  const root = /^(html|body)(?![\w-])/.exec(trimmed);
  return root ? prefix + trimmed.slice(root[0].length) : `${prefix} ${trimmed}`;
};

export const scopeNormalizeStyle = (csScopePrefix = '#app') => {
  if (typeof document === 'undefined') return;

  const styleElement = normalizeStyleElement;
  if (!styleElement || !styleElement.isConnected) return;

  // 始终基于原始 normalizeStyle 重新生成，而不是在已加过前缀的样式上再加一次，保证重复调用结果一致
  const sourceElement = document.createElement('style');
  sourceElement.textContent = normalizeStyle;
  document.head.appendChild(sourceElement);

  const cssRules = sourceElement.sheet?.cssRules;
  if (cssRules) {
    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];
      if (rule instanceof CSSStyleRule) {
        // 逐个选择器处理，同一条规则里混有 html / body 与其他选择器时也都能正确加前缀
        rule.selectorText = rule.selectorText
          .split(',')
          .map((selector) => scopeSelector(selector, csScopePrefix))
          .join(',');
      }
    }
  }

  const scopedStyleString = cssRules ? Array.from(cssRules).map((rule) => rule.cssText).join('') : '';

  document.head.removeChild(sourceElement);
  // 移除旧的 styleElement，用加了前缀的样式替换
  styleElement.parentNode?.removeChild(styleElement);

  appendNormalizeStyle(scopedStyleString, normalizeStyleId);
};

setToken({ selector: 'html' });
