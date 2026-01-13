// 1. Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
// 2. Change the default font family in all browsers.
// 3. Correct the line height in all browsers.
// 4. Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS.
// 5. Setting @viewport causes scrollbars to overlap content in IE11 and Edge, so
//    we force a non-overlapping, non-auto-hiding scrollbar to counteract.
// 6. Change the default tap highlight to be completely transparent in iOS.
import { CommonToken, setToken } from '@sheinx/theme';
import { jss } from './jss-style';
import  version from './version';

const token = {
  fontFamily:
    'var(--common-body-font-family, PingFang SC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Hiragino KaKu Gothic Pro, Microsoft YaHei, Arial, sans-serif )',
  color: 'var(--common-body-color, #141737)',
  fontSize: 'var(--font-size-base, 14px)',
  lineHeight: 'var(--common-line-heigh, 1.42857143)',
  linkColor: CommonToken['Brand-6'],
  linkHoverDecoration: 'none',
  linkDisabledColor: CommonToken['Brand-3'],
  headingsColor: 'inherit',
  headingsFontFamily: 'inherit',
  headingsFontWeight: 'bold',
  headingsLineHeight: '1.1',
  headingsSmallColor: '#adb5bd',
};

const lineHeightComputed = '20px';
const lineHeightComputed2 = '10px';
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


article,
aside,
footer,
header,
nav,
section {
  display: block;
}

h1 {
  margin: 0.67em 0;
  font-size: 2em;
}

figcaption,
figure,
main {
  display: block;
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
  font-weight: inherit;
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
html [type="button"],
[type="reset"],
[type="submit"] {
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
  margin-top: ${lineHeightComputed};
  margin-bottom: ${lineHeightComputed2};
}

hi small, h1 .small, .h1 small, .h1 .small,
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
  margin-top: ${lineHeightComputed2};
  margin-bottom: ${lineHeightComputed2};
}

h4 small, h4 .small, .h4 small, .h4 .small,
h5 small, h5 .small, .h5 small, .h5 .small,
h6 small, h6 .small, .h6 small, .h6 .small {
  font-size: 75%;
}

p {
  margin: 0 0 ${lineHeightComputed2};
}`;

export const normalizeStyleId = 'shineout-next-normalize__' + version;
export const jssInsertionPointId = 'shineout-next-jss-insertion-point__' + version;

function appendNormalizeStyle(styleString: string, id: string){
  const style = document.createElement('style');
  style.setAttribute('name', id);
  style.setAttribute('data-alita-ignore', 'true');
  style.innerHTML = styleString;
  document.head.insertBefore(style, document.head.firstChild);
}

function appendJssInsertionPoint(){
  const insertionPoint = document.createElement('style');
  insertionPoint.setAttribute('name', jssInsertionPointId);
  insertionPoint.setAttribute('data-alita-ignore', 'true');
  document.head.insertBefore(insertionPoint, document.head.firstChild);

  jss.setup({insertionPoint: insertionPoint})
}

if (typeof window !== 'undefined') {
  appendJssInsertionPoint();
  appendNormalizeStyle(normalizeStyle, normalizeStyleId);
}

export const scopeNormalizeStyle = (csScopePrefix = '#app') => {
  const styleElement = document.querySelector(`style[name="${normalizeStyleId}"]`) as HTMLStyleElement;
  // 移除styleElement

  const styleSheet = styleElement?.sheet;
  const cssRules = styleSheet?.cssRules;
  // 遍历cssRules，给每一个selectorText添加前缀
  if(cssRules){
    for(let i = 0; i < cssRules.length; i++){
      const rule = cssRules[i];
      if (rule instanceof CSSStyleRule) {
        // 如果选择器包含了body或html，则替换，不是加前缀
        if(rule.selectorText.includes('body')){
          rule.selectorText = rule.selectorText.replace('body', csScopePrefix);
        }else if(rule.selectorText.includes('html')){
          rule.selectorText = rule.selectorText.replace('html', csScopePrefix);
        }else{
          const selectors = rule.selectorText.split(',');
          const newSelectors = selectors.map(selector => `${csScopePrefix} ${selector}`);
          rule.selectorText = newSelectors.join(',');
        }
      }
    }
  }

  const scopedStyleString = cssRules ? Array.from(cssRules).map(rule => rule.cssText).join('') : '';

  document.head.removeChild(styleElement);

  appendNormalizeStyle(scopedStyleString, normalizeStyleId);
};

setToken({ selector: 'html' });
