/**
 * Shineout v2 主题迁移至 v3 主题的脚本（白名单严格模式）
 *
 * Usage:
 *   node migrate-v2-theme.js <input-v2-theme.js> <output-v3-theme.ts>
 *
 * 核心保证:
 *   - 所有映射目标 token 必须出现在 v3-tokens.json 白名单中
 *   - 白名单外的 token 一律拒绝输出，进 skipped 列表
 *   - 字典里写错 token 名会在脚本运行时报错（开发期就拦截）
 *
 * 流程:
 *   1. 加载 v3-tokens.json 白名单
 *   2. 解析 v2 IIFE 主题文件，提取 setStyle 的 config
 *   3. 颜色字段（primary/danger/warning/success）用 antd-colors 算法推 10 阶
 *   4. 其他字段按 FIELD_MAP 字典对照，目标必须在白名单中
 *   5. 输出 ES module，附带 skipped 报告
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ============================================================
// 0. 加载白名单
// ============================================================

const WHITELIST_PATH = path.resolve(__dirname, 'v3-tokens.json');
if (!fs.existsSync(WHITELIST_PATH)) {
  console.error(`❌ 找不到 v3 token 白名单 ${WHITELIST_PATH}`);
  console.error('   请先运行: node scan-v3-tokens.js');
  process.exit(1);
}
const WHITELIST_DATA = JSON.parse(fs.readFileSync(WHITELIST_PATH, 'utf8'));
const ALL_TOKENS = new Set();
for (const [k, v] of Object.entries(WHITELIST_DATA)) {
  if (k.startsWith('_')) continue;
  v.forEach((t) => ALL_TOKENS.add(t));
}
(WHITELIST_DATA._atomic || []).forEach((t) => ALL_TOKENS.add(t));

function isRealToken(name) {
  return ALL_TOKENS.has(name);
}

// ============================================================
// 输出黑名单：即使白名单里有、字典里映射到了，产物里也禁止输出
// 用于规避"覆盖了反而出问题"的 token（比如会破坏 v3 内部依赖）
// 命中后会进 skipped 列表，让用户知道为什么没生效
// ============================================================
const OUTPUT_BLACKLIST = {
  tagPaddingY: '覆盖 tagPaddingY 会导致 v3 部分内置组件的标签样式异常（如 Select 多选 tag、Form 错误提示等），强制丢弃；如需调整 Tag 间距请走业务侧 CSS 局部覆盖',
};

// ============================================================
// 1. antd-colors 风格色板算法
// ============================================================

const hueStep = 2;
const saturationStep = 0.16;
const saturationStep2 = 0.05;
const brightnessStep1 = 0.05;
const brightnessStep2 = 0.15;
const lightColorCount = 5;
const darkColorCount = 4;

function toHsv({ r, g, b }) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max / 255;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, v };
}

function toRgb({ h, s, v }) {
  const i = Math.floor((h / 60) % 6);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function parseColor(input) {
  if (typeof input !== 'string') return null;
  const s = input.trim();
  let m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
  m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  return null;
}

function toHex({ r, g, b }) {
  const h = (v) => v.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function getHue(hsv, i, light) {
  let hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) hue += 360;
  if (hue >= 360) hue -= 360;
  return hue;
}

function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) return hsv.s;
  let saturation;
  if (light) saturation = hsv.s - saturationStep * i;
  else if (i === darkColorCount) saturation = hsv.s + saturationStep;
  else saturation = hsv.s + saturationStep2 * i;
  if (saturation > 1) saturation = 1;
  if (light && i === lightColorCount && saturation > 0.1) saturation = 0.1;
  if (saturation < 0.06) saturation = 0.06;
  return Number(saturation.toFixed(2));
}

function getValue(hsv, i, light) {
  let value;
  if (light) value = hsv.v + brightnessStep1 * i;
  else value = hsv.v - brightnessStep2 * i;
  if (value > 1) value = 1;
  return Number(value.toFixed(2));
}

function generatePalette(seedHex) {
  const rgb = parseColor(seedHex);
  if (!rgb) return null;
  const hsv = toHsv(rgb);
  const patterns = [];
  for (let i = lightColorCount; i > 0; i -= 1) {
    patterns.push(toHex(toRgb({
      h: getHue(hsv, i, true), s: getSaturation(hsv, i, true), v: getValue(hsv, i, true),
    })));
  }
  patterns.push(toHex(rgb));
  for (let i = 1; i <= darkColorCount; i += 1) {
    patterns.push(toHex(toRgb({
      h: getHue(hsv, i, false), s: getSaturation(hsv, i, false), v: getValue(hsv, i, false),
    })));
  }
  return patterns;
}

// ============================================================
// 2. v2 → v3 字段映射字典（每条都已对照 v3-tokens.json 白名单）
// 注意：FIELD_MAP 里 token 名不存在于白名单的，运行时会立即抛错
// ============================================================

const NO_PX_KEYS = /(weight|lineheight|ratio|opacity|scrollratio|shadow|color|background|family|familyname|align)$/i;

function px(v, tokenName) {
  if (v === null || v === undefined) return undefined;
  if (typeof v !== 'number' && !(typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v.trim()))) return v;
  if (tokenName && NO_PX_KEYS.test(tokenName)) return String(v);
  return `${v}px`;
}

/**
 * 按 CSS shorthand 规则把 "10px 16px" / "24px" / "24px 24px 16px" / "1px 2px 3px 4px"
 * 拆为 { top, right, bottom, left }，缺省遵循 CSS 标准：
 *   - 1 值: 全部
 *   - 2 值: <Y> <X>           ← top/bottom = 第1, left/right = 第2
 *   - 3 值: <top> <X> <bottom>
 *   - 4 值: <top> <right> <bottom> <left>
 *
 * 返回 null 表示无法拆（含 calc()、var()、奇怪格式等）
 */
function parseShorthand(raw) {
  if (typeof raw === 'number') {
    const s = `${raw}px`;
    return { top: s, right: s, bottom: s, left: s, x: s, y: s };
  }
  if (typeof raw !== 'string') return null;
  const s = raw.trim();
  // 含 calc / var 等不拆
  if (/calc\(|var\(/i.test(s)) return null;
  // 按空白分词（注意：不能简单 split，rgba(...) 内会有空格；但 padding/shorthand 场景里不会含 rgba）
  const parts = s.split(/\s+/);
  if (parts.length < 1 || parts.length > 4) return null;
  // 每段必须是 数字+单位 或 0
  if (!parts.every((p) => /^-?\d+(\.\d+)?(px|em|rem|%)?$/.test(p) || p === '0')) return null;
  // 给纯数字补 px
  const norm = parts.map((p) => (/^-?\d+(\.\d+)?$/.test(p) ? `${p}px` : p));
  let top, right, bottom, left;
  if (norm.length === 1) [top, right, bottom, left] = [norm[0], norm[0], norm[0], norm[0]];
  else if (norm.length === 2) [top, right, bottom, left] = [norm[0], norm[1], norm[0], norm[1]];
  else if (norm.length === 3) [top, right, bottom, left] = [norm[0], norm[1], norm[2], norm[1]];
  else [top, right, bottom, left] = norm;
  // X = right (== left), Y = top (== bottom)
  return { top, right, bottom, left, x: right, y: top };
}

/**
 * 映射策略说明：
 *   - 'tokenName'         : 直接映射到该 v3 token（必须在白名单中）
 *   - { token, note }     : 同上，但带说明注释
 *   - { tokens: [...]}    : 一个 v2 字段写入多个 v3 token（用于 size 派生等）
 *   - null                : 显式跳过 - v3 无对应 token，业务侧请用 CSS 自行处理
 *   - 不在字典           : 进 skipped 列表，提示需人工补充字典
 *
 * 字典编写规则：
 *   ❗ token 名必须真实存在于 packages/theme/src 下，运行时会校验。
 *   ❗ 找不到对应 token 时**只能写 null**，不允许编造 custom key（v3 收到不认的 key 会静默丢弃，反而误导用户）。
 */
const FIELD_MAP = {
  // ---------------- button ----------------
  // v2 fontSizeBase/Large/Small 是按钮基础字号；v3 同时有 buttonFontSize 和 buttonSmall/LargeFontSize
  'button.fontSizeBase': 'buttonFontSize',
  'button.fontSizeLarge': 'buttonLargeFontSize',
  'button.fontSizeSmall': 'buttonSmallFontSize',
  'button.borderRadius': 'buttonBorderRadius',
  'button.smallBorderRadius': 'buttonSmallBorderRadius',
  'button.largeBorderRadius': 'buttonLargeBorderRadius',
  'button.paddingBaseHorizontal': 'buttonPaddingX',
  'button.paddingBaseVertical': 'buttonPaddingY',
  'button.paddingLargeHorizontal': 'buttonLargePaddingX',
  'button.paddingLargeVertical': 'buttonLargePaddingY',
  'button.paddingSmallHorizontal': 'buttonSmallPaddingX',
  'button.paddingSmallVertical': 'buttonSmallPaddingY',
  'button.marginLeft': 'buttonNearlyMargin',
  'button.spinMargin': 'buttonSpinMargin',
  // v2 全局 disabled 三件套 → v3 按 type 拆分。Secondary 是最贴近 v2 default 的形态
  'button.disabledBg': { token: 'buttonSecondaryDisabledBackgroundColor', note: 'v2 全局 disabledBg → v3 仅作用于 secondary；primary/danger 等由 Brand-3/Danger-3 推导' },
  'button.disabledColor': { token: 'buttonSecondaryDisabledFontColor', note: '同上' },
  'button.disabledBorderColor': { token: 'buttonSecondaryDisabledBorderColor', note: '同上' },
  'button.disabledDelimiter': null, // v3 已无
  'button.buttonDefaultTextColor': { token: 'buttonSecondaryFontColor', note: 'v2 default 文字色对应 v3 secondary 文字色' },
  'button.defaultSizeWidth': null,
  'button.largeSizeWidth': null,
  'button.smallSizeWidth': null,

  // ---------------- table ----------------
  'table.scrollRatio': null, // v3 无对应 token
  'table.headBg': 'tableTheadBackgroundColor',
  'table.headColor': 'tableTheadFontColor',
  'table.bodyBg': 'tableTbodyBackgroundColor',
  'table.rowSpacing': null, // v3 无 rowSpacing token
  'table.rowBorderRadius': null, // v3 无
  'table.headFontWeight': 'tableTheadFontWeight',
  'table.borderColor': 'tableCellBorderColor',
  'table.hoverBg': 'tableTbodyHoverBackgroundColor',
  'table.selectedBg': 'tableTbodyActiveBackgroundColor',
  'table.textColor': 'tableTbodyFontColor',
  'table.borderRadiusTop': null, // v3 无
  // CSS shorthand："10px 16px" → Y=10px, X=16px。v3 没有 base size 的 cell padding token，跳过
  'table.headerCellPadding': null,
  'table.smallCellPadding': { shorthand: { x: 'tableSmallCellPaddingX', y: 'tableSmallCellPaddingY' } },
  'table.cellPaddingHorizontal': 'tableCellPaddingX',
  'table.cellPaddingVertical': 'tableCellPaddingY',
  'table.treeExpandIconMarginRight': null, // v3 无
  'table.fixedStart': null, // v3 无 start/end，统一 tableFixedShadow
  'table.fixedEnd': null,
  'table.fixedShadow': 'tableFixedShadow',
  'table.tableEvenBgc': 'tableTbodyStripedBackgroundColor',
  'table.tableOddBgc': null, // v3 只有 Striped 一个，对应偶数行；奇数行不可控
  'table.marginBottom': null, // v3 无（只有 tablePaginationMarginY）
  'table.headerTopDivider': null, // v3 无

  // ---------------- tag ----------------
  // v2 各 type 的 bg/color 都用 v3 的 *FillBackgroundColor / *FillFontColor 系列
  // 因为 v2 那种填色 tag 在 v3 里叫 Fill 模式
  'tag.bg': 'tagDefaultFillBackgroundColor',
  'tag.successBg': 'tagSuccessFillBackgroundColor',
  'tag.infoBg': 'tagInfoFillBackgroundColor',
  'tag.warningBg': 'tagWarningFillBackgroundColor',
  'tag.dangerBg': 'tagDangerFillBackgroundColor',
  'tag.color': 'tagDefaultFillFontColor',
  'tag.successColor': 'tagSuccessFillFontColor',
  'tag.infoColor': 'tagInfoFillFontColor',
  'tag.warningColor': 'tagWarningFillFontColor',
  'tag.dangerColor': 'tagDangerFillFontColor',
  'tag.borderColor': 'tagDefaultBorderColor',
  'tag.closeColor': null, // v3 用 Icon 系列，命名差异较大；强行映射风险高
  'tag.closeHoverColor': null,
  'tag.borderRadius': 'tagBorderRadius',
  'tag.paddingHorizontal': 'tagPaddingX',
  'tag.paddingVertical': 'tagPaddingY',
  'tag.fontWeight': 'tagFontWeight',

  // ---------------- pagination ----------------
  // v3 pagination 只有 8 个 token，远不如 v2 细分；borderRadius/borderWidth/hoverColor 都没暴露
  'pagination.borderRadius': null,
  'pagination.borderWidth': null,
  'pagination.hoverBorderColor': null,
  'pagination.hoverColor': null,
  'pagination.hoverBg': null,
  'pagination.fontSize': 'paginationFontSize',
  'pagination.defaultSize': null, // v3 通过 ConfigProvider size 控制
  'pagination.smallSize': null,
  'pagination.largeSize': null,

  // ---------------- input ----------------
  'input.color': 'inputFontColor',
  'input.borderRadius': 'inputBorderRadius',
  'input.underlineHeight': null, // v3 无下划线模式 token
  'input.dropdownBorderRadius': null, // 走 select/datepicker 自己的 borderRadius
  'input.focusWidth': null, // v3 用 inputFocusShadow，不是宽度
  'input.disabledBg': 'inputDisabledBackgroundColor',
  'input.disabledColor': 'inputDisabledFontColor',
  'input.borderColor': 'inputBorderColor',
  'input.borderHoverColor': 'inputHoverBorderColor',
  'input.placeholderColor': 'inputPlaceholderColor',
  'input.placeholderSize': null, // v3 placeholder 字号跟随 inputFontSize
  'input.clearBg': 'inputClearColor',
  'input.clearHoverBg': 'inputHoverClearColor',

  // ---------------- select ----------------
  'select.resultPaddingHorizontal': 'selectPaddingX',
  'select.resultPaddingVertical': 'selectPaddingY',
  'select.itemColor': 'selectOptionFontColor',
  'select.itemBgColor': 'selectOptionBackgroundColor',
  'select.disabledBg': 'selectDisabledBackgroundColor',
  'select.disabledColor': 'selectDisabledFontColor',
  'select.itemActiveBg': 'selectOptionActiveBackgroundColor',
  'select.itemActiveColor': 'selectOptionActiveColor',
  'select.itemHoverBg': 'selectOptionHoverBackgroundColor',
  'select.itemHoverColor': 'selectOptionHoverFontColor',
  'select.compressedMoreHoverBg': null, // v3 selectMorePaddingX/Y 是 padding 不是 hoverBg
  'select.clearIconBg': 'selectClearColor',
  'select.resultBg': 'selectBackgroundColor',

  // ---------------- datepicker ----------------
  'datepicker.rectBorderRadius': 'datePickerBorderRadius',
  'datepicker.dayHoverBgc': 'datePickerCellHoverBackgroundColor',

  // ---------------- slider ----------------
  // 注：v3 slider 实际 token 待确认；这里先标 null 防止臆造
  // TODO: 跑通后回头确认 v3 slider token，再补回
  'slider.indicatorBg': null,
  'slider.indicatorSize': null,
  'slider.indicatorBoxShadow': null,
  'slider.barBg': null,
  'slider.disabledBarBg': null,
  'slider.disabledIndicatorBorder': null,
  'slider.disabledIndicatorBg': null,
  'slider.height': null,
  'slider.borderRadius': null,
  'slider.valueBottom': null,

  // ---------------- menu ----------------
  // v3 menu 实际 token 较少，许多 v2 字段没有对应（菜单交互模式差异大）
  // 仅映射几个明确存在的：fontSize 在 v3 白名单中有 menuFontSize
  'menu.height': null,
  'menu.fontSize': 'menuFontSize',
  'menu.color': null,
  'menu.darkColor': null,
  'menu.darkBg': null,
  'menu.darkRootNodeBg': null,
  'menu.darkChildrenSegmentation': null,
  'menu.darkActiveBg': null,
  'menu.activeBg': null,
  'menu.activeColor': null,
  'menu.activePaddingHorizontal': null,
  'menu.activePaddingVertical': null,
  'menu.activeBorderRadius': null,
  'menu.itemHoverColor': null,
  'menu.itemHoverDarkColor': null,
  'menu.itemHoverBgc': null,
  'menu.itemHoverDarkBgc': null,
  'menu.activeBar': null,
  'menu.activeBarColor': null,
  'menu.darkActiveBarColor': null,
  'menu.verticalDarkRootActiveBgc': null,
  'menu.hasChildrenActiveBgc': null,
  'menu.hasChildrenActiveColor': null,
  'menu.verticalInpathBarWidth': null,

  // ---------------- form ----------------
  'form.itemMarginBottom': 'formItemMarginYEnd',
  'form.itemMarginRight': 'formItemMarginXEnd',
  'form.tipColor': 'formItemTipFontColor',
  'form.labelHorizontalAlign': null, // v3 通过 prop 控制
  'form.formTipFontSize': 'formItemTipFontSize',
  'form.formErrorLineHeight': null, // 待确认
  'form.formErrorMarginTop': null,
  'form.formErrorMarginBottom': null,

  // ---------------- checkbox ----------------
  'checkbox.marginRight': null,
  'checkbox.borderWidth': 'checkboxIconBorderWidth',
  'checkbox.color': null,
  'checkbox.borderColor': 'checkboxIconBorderColor',
  'checkbox.textPaddingX': null,
  'checkbox.indicatorBorderRadius': 'checkboxIconBorderRadius',

  // ---------------- radio ----------------
  'radio.size': null,
  'radio.borderWidth': 'radioIconBorderWidth',
  'radio.innerWidth': 'radioIconInnerSize',
  'radio.uncheckBorderWidth': null,
  'radio.color': null,

  // ---------------- alert ----------------
  // v3 alert 实际 token 未确认，保守起见全部 null
  'alert.fontSize': null,
  'alert.closeIconColor': null,
  'alert.closeIconHoverColor': null,
  'alert.borderRadius': null,
  'alert.successBoxShadow': null,
  'alert.infoBoxShadow': null,
  'alert.warningBoxShadow': null,
  'alert.dangerBoxShadow': null,
  'alert.defaultBoxShadow': null,
  'alert.borderWidth': null,
  'alert.successTextColor': null,
  'alert.successBg': null,
  'alert.successBorderColor': null,
  'alert.infoTextColor': null,
  'alert.infoBg': null,
  'alert.infoBorderColor': null,
  'alert.warningTextColor': null,
  'alert.warningBg': null,
  'alert.warningBorderColor': null,
  'alert.dangerTextColor': null,
  'alert.dangerBg': null,
  'alert.dangerBorderColor': null,

  // ---------------- message ----------------
  'message.boxShadow': 'messageShadow',
  'message.closeColor': null,
  'message.color': 'messageFontColor',
  'message.fontWeight': null,
  'message.borderColor': 'messageBorderColor',

  // ---------------- card ----------------
  'card.fontSize': 'cardFontSize',
  'card.paddingHeaderHorizontal': 'cardHeaderPaddingX',
  'card.paddingHeaderVertical': 'cardHeaderPaddingY',
  'card.paddingBodyHorizontal': 'cardBodyPaddingX',
  'card.paddingBodyVertical': 'cardBodyPaddingY',
  'card.paddingFooterHorizontal': 'cardFooterPaddingX',
  'card.paddingFooterVertical': 'cardFooterPaddingY',
  'card.borderRadius': 'cardBorderRadius',
  'card.borderWidth': 'cardBorderWidth',
  'card.dividerHeight': null,
  'card.dividerWidth': null,
  'card.borderColor': 'cardBorderColor',
  'card.dividerColor': null,
  'card.color': 'cardFontColor',
  'card.boxShadow': 'cardShadow',
  'card.headerBg': null,
  'card.footerBg': null,
  'card.headerColor': null,
  'card.footerColor': null,

  // ---------------- modal ----------------
  // v3 modal 用 modalPanelPaddingX/Y，没有 v2 那种 header/body/footer 各自 padding 拆分
  'modal.titleFontFamily': null,
  'modal.fontSize': null,
  'modal.iconSize': null,
  'modal.iconTop': null,
  'modal.iconLeft': null,
  'modal.closeIconColor': null,
  'modal.closeIconHoverColor': null,
  'modal.closeIconTopMargin': null,
  'modal.closeIconRightMargin': null,
  'modal.titleFontSize': null,
  'modal.padding': null,
  'modal.headerPaddingTop': null,
  'modal.headerPaddingRight': null,
  'modal.headerPaddingBottom': null,
  'modal.headerPaddingLeft': null,
  'modal.bodyPaddingTop': null,
  'modal.bodyPaddingRight': null,
  'modal.bodyPaddingBottom': null,
  'modal.bodyPaddingLeft': null,
  'modal.iconHeaderPaddingRight': null,
  'modal.iconBodyPaddingTop': null,
  'modal.iconBodyPaddingRight': null,
  'modal.iconBodyPaddingBottom': null,
  'modal.iconBodyPaddingLeft': null,
  'modal.footerPadding': null,
  'modal.borderRadius': null,
  'modal.borderWidth': null,
  'modal.dividerHeight': null,
  'modal.dividerWidth': null,
  'modal.borderColor': null,
  'modal.dividerColor': null,
  'modal.color': null,
  'modal.titleColor': null,
  'modal.footerColor': null,
  'modal.headerBg': null,
  'modal.footerBg': null,
  'modal.boxShadow': null,
  'modal.headerPadding': null,
  'modal.bodyPadding': null,
  'modal.iconBodyPadding': null,

  // ---------------- popover ----------------
  'popover.borderColor': 'popoverBorderColor',
  'popover.borderWidth': 'popoverBorderWidth',
  'popover.boxShadow': 'popoverShadow',
  'popover.borderRadius': null, // 待确认 v3 popover 是否有 borderRadius token
  'popover.textMaxWidth': null,
  'popover.fontSize': 'popoverFontSize',

  // ---------------- tree ----------------
  'tree.treeIndicatorColor': null,
  'tree.levelIndent': null,
  'tree.nodeMarginBottom': null,

  // ---------------- dropdown ----------------
  'dropdown.borderWidth': null, // v3 是 dropdownListBorderWidth，命名稍有差异
  'dropdown.columnsPadding': null,
  'dropdown.optionsHoverBgc': 'dropdownOptionHoverBackgroundColor',
  'dropdown.optionsHoverColor': 'dropdownOptionHoverFontColor',

  // ---------------- common ----------------
  // 全部 custom 或 null。v3 没有这些"全局基准" token
  'common.fontSize': null, // v3 无等价 token；请在业务 CSS 设置 body { font-size: <值>px }
  'common.fontFamily': null, // v3 无 fontFamily token；请在业务 CSS 设置 body { font-family: ... }
  'common.lineHeight': null,
  'common.contentBlockPadding': null,
  'common.contentTextPadding': null,
  'common.spinDefaultName': null,
  'common.caret': null,
  'common.inputDelay': null,
  'common.inputTrim': null,

  // ---------------- switch ----------------
  'switch.uncheckBg': null, // v3 是 switchBackgroundColor，但语义不一致（v3 是整体背景）
  'switch.type': null,

  // ---------------- tabs ----------------
  'tabs.tabSpacing': null, // v3 是 tabsNearlyMargin（待确认），命名不一致先 null

  // ---------------- cascader ----------------
  'cascader.activeBgc': 'cascaderOptionActiveBackgroundColor',
  'cascader.activeColor': 'cascaderOptionActiveColor',

  // ---------------- list ----------------
  'list.itemBottomBorderWidth': null,
  'list.itemHoverBgc': null,

  // ---------------- progress ----------------
  'progress.progressBgc': null, // v3 是 progressBackground，但语义不一致先 null 留 review

  // ---------------- tooltip ----------------
  'tooltip.bg': 'tooltipBackgroundColor',
  'tooltip.paddingHorizontal': 'tooltipPaddingX',
  'tooltip.paddingVertical': 'tooltipPaddingY',
};

/**
 * color 模块映射：单个种子色 → 10 阶原子 token
 */
const COLOR_ATOMIC_MAP = {
  primary: 'Brand',
  danger: 'Danger',
  warning: 'Warning',
  success: 'Success',
  infoColor: null, // v3 无 Info 色板
  secondary: null,
  gray100: 'Neutral-fill-2',
  gray200: 'Neutral-fill-3',
  gray300: 'Neutral-fill-4',
  gray400: 'Neutral-fill-5',
  gray500: 'Neutral-fill-6',
  gray600: 'Neutral-fill-7',
  gray700: 'Neutral-fill-8',
  gray800: 'Neutral-fill-9',
  gray900: 'Neutral-fill-9', // 与 gray800 同 token，已知重复，输出会合并
};

// ============================================================
// 3. 启动时自检字典 —— 所有非 null/custom 的目标必须在白名单中
// ============================================================

function validateDictionary() {
  const errors = [];
  for (const [v2Key, mapping] of Object.entries(FIELD_MAP)) {
    if (mapping === null) continue;
    const targets = [];
    if (typeof mapping === 'string') targets.push(mapping);
    else if (typeof mapping === 'object') {
      if (mapping.token) targets.push(mapping.token);
      if (mapping.tokens) targets.push(...mapping.tokens);
      if (mapping.shorthand) targets.push(...Object.values(mapping.shorthand).filter(Boolean));
    }
    for (const t of targets) {
      if (!isRealToken(t)) {
        errors.push(`  ❌ FIELD_MAP['${v2Key}'] → '${t}' 不在 v3 白名单中`);
      }
    }
  }
  // 色板映射也校验
  for (const [field, target] of Object.entries(COLOR_ATOMIC_MAP)) {
    if (!target) continue;
    if (target.startsWith('Neutral-') || target.startsWith('Brand') || target.startsWith('Danger') || target.startsWith('Warning') || target.startsWith('Success')) {
      // 色阶组：检查 -6 / -1 / 中性整名是否存在
      const probe = /^(Brand|Danger|Warning|Success)$/.test(target) ? `${target}-6` : target;
      if (!isRealToken(probe)) {
        errors.push(`  ❌ COLOR_ATOMIC_MAP['${field}'] → '${probe}' 不在 v3 白名单中`);
      }
    }
  }
  if (errors.length) {
    console.error('字典自检失败：以下 token 未通过白名单校验：');
    errors.forEach((e) => console.error(e));
    console.error('\n请把这些 token 名修正为真实存在的 v3 token，或改为 null 跳过。');
    process.exit(1);
  }
}

// ============================================================
// 4. 解析输入 v2 主题
// ============================================================

function captureBalancedObject(source, startIdx) {
  let depth = 0, inStr = false, strCh = '', escape = false;
  for (let i = startIdx; i < source.length; i++) {
    const c = source[i];
    if (inStr) {
      if (escape) escape = false;
      else if (c === '\\') escape = true;
      else if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return source.slice(startIdx, i + 1); }
  }
  return null;
}

/**
 * 加载输入：URL 直接 fetch；其他作为本地路径读
 * 用法上完全等价：node migrate.js https://cdn.../index.js out.ts
 *               node migrate.js ./local.js out.ts
 */
async function loadSource(input) {
  if (/^https?:\/\//i.test(input)) {
    if (typeof fetch !== 'function') {
      throw new Error('需要 Node 18+（内置 fetch）');
    }
    const res = await fetch(input);
    if (!res.ok) throw new Error(`下载失败 ${res.status} ${res.statusText}: ${input}`);
    return await res.text();
  }
  return fs.readFileSync(path.resolve(input), 'utf8');
}

function extractV2Config(source) {
  const markers = [/window\.shineout_theme_setter_config\s*=\s*\{/, /setStyle\s*\(\s*\{/];
  for (const re of markers) {
    const m = re.exec(source);
    if (!m) continue;
    const braceIdx = source.indexOf('{', m.index);
    if (braceIdx < 0) continue;
    const objSrc = captureBalancedObject(source, braceIdx);
    if (objSrc) return JSON.parse(objSrc);
  }
  throw new Error('无法从输入文件中提取主题配置');
}

// ============================================================
// 5. 构建 v3 主题
// ============================================================

function buildV3Theme(v2Config) {
  const atomicEntries = [];
  const componentEntries = [];
  const skipped = [];

  // color 模块
  const colorCfg = v2Config.color || {};
  for (const [field, value] of Object.entries(colorCfg)) {
    if (!(field in COLOR_ATOMIC_MAP)) {
      skipped.push({ v2Key: `color.${field}`, reason: 'v2 自定义色字段，未声明映射' });
      continue;
    }
    const mapping = COLOR_ATOMIC_MAP[field];
    if (mapping === null) {
      skipped.push({ v2Key: `color.${field}`, reason: 'v3 无对应原子 token（如 infoColor / secondary）' });
      continue;
    }
    if (mapping.startsWith('Neutral-')) {
      if (!isRealToken(mapping)) {
        skipped.push({ v2Key: `color.${field}`, reason: `目标 ${mapping} 不在白名单` });
        continue;
      }
      atomicEntries.push({
        key: `'${mapping}'`,
        value: JSON.stringify(value),
        comment: `REVIEW: v2.color.${field} → ${mapping}（中性色对齐，色值可能与 v3 设计稿有偏差）`,
      });
    } else {
      // 推 10 阶
      const palette = generatePalette(value);
      if (!palette) {
        skipped.push({ v2Key: `color.${field}`, reason: `颜色值 "${value}" 无法解析` });
        continue;
      }
      palette.forEach((hex, i) => {
        const tokenName = `${mapping}-${i + 1}`;
        if (!isRealToken(tokenName)) {
          // 如 Brand-10 在白名单中应该存在；若不存在跳过
          skipped.push({ v2Key: `color.${field} (i=${i + 1})`, reason: `${tokenName} 不在白名单` });
          return;
        }
        atomicEntries.push({
          key: `'${tokenName}'`,
          value: JSON.stringify(hex),
          comment: i === 5 ? `v2.color.${field} 原色` : `REVIEW: 由 v2.color.${field} 算法推导（i=${i + 1}/10）`,
        });
      });
    }
  }

  // 其他组件模块
  for (const [moduleName, moduleCfg] of Object.entries(v2Config)) {
    if (moduleName === 'color') continue;
    if (typeof moduleCfg !== 'object' || moduleCfg === null) continue;
    for (const [field, value] of Object.entries(moduleCfg)) {
      const mapKey = `${moduleName}.${field}`;
      const mapping = FIELD_MAP[mapKey];
      if (mapping === null) {
        skipped.push({ v2Key: mapKey, reason: 'v3 无对应 token 或通过其他途径配置' });
        continue;
      }
      if (mapping === undefined) {
        skipped.push({ v2Key: mapKey, reason: '映射字典中未声明，需人工补充' });
        continue;
      }

      const emit = (tokenName, note) => {
        if (!isRealToken(tokenName)) {
          skipped.push({ v2Key: mapKey, reason: `目标 ${tokenName} 不在 v3 白名单（字典 bug）` });
          return;
        }
        if (OUTPUT_BLACKLIST[tokenName]) {
          skipped.push({ v2Key: mapKey, reason: `[BLOCKED] ${tokenName}: ${OUTPUT_BLACKLIST[tokenName]}` });
          return;
        }
        const cssValue = px(value, tokenName);
        componentEntries.push({
          key: `'${tokenName}'`,
          value: JSON.stringify(cssValue),
          comment: note ? `REVIEW: ${note}（来源 v2.${mapKey}）` : `from v2.${mapKey}`,
        });
      };

      if (typeof mapping === 'string') {
        emit(mapping);
      } else if (mapping.shorthand) {
        const parsed = parseShorthand(value);
        if (!parsed) {
          skipped.push({ v2Key: mapKey, reason: `复合值 "${value}" 无法解析为 CSS shorthand` });
          continue;
        }
        for (const [axis, tokenName] of Object.entries(mapping.shorthand)) {
          if (!tokenName) continue;
          const v = parsed[axis]; // axis ∈ x/y/top/right/bottom/left
          if (v === undefined) continue;
          if (!isRealToken(tokenName)) {
            skipped.push({ v2Key: mapKey, reason: `目标 ${tokenName} 不在白名单（字典 bug）` });
            continue;
          }
          if (OUTPUT_BLACKLIST[tokenName]) {
            skipped.push({ v2Key: mapKey, reason: `[BLOCKED] ${tokenName}: ${OUTPUT_BLACKLIST[tokenName]}` });
            continue;
          }
          componentEntries.push({
            key: `'${tokenName}'`,
            value: JSON.stringify(v),
            comment: `from v2.${mapKey} (shorthand ${axis} of "${value}")`,
          });
        }
      } else if (mapping.tokens) {
        mapping.tokens.forEach((t) => emit(t, mapping.note));
      } else if (mapping.token) {
        emit(mapping.token, mapping.note);
      }
    }
  }

  return dedupeEntries({ atomicEntries, componentEntries, skipped });
}

function dedupeEntries({ atomicEntries, componentEntries, skipped }) {
  const merge = (entries) => {
    const byKey = new Map();
    entries.forEach((e) => {
      const prev = byKey.get(e.key);
      if (prev) {
        prev.value = e.value;
        prev.comment = `${prev.comment}; OVERRIDE by ${e.comment}`;
      } else {
        byKey.set(e.key, { ...e });
      }
    });
    return Array.from(byKey.values());
  };
  return {
    atomicEntries: merge(atomicEntries),
    componentEntries: merge(componentEntries),
    skipped,
  };
}

// ============================================================
// 6. 渲染为 TypeScript
// ============================================================

function renderTheme({ atomicEntries, componentEntries, skipped }, meta) {
  const lines = [];
  lines.push(`/**`);
  lines.push(` * shineout v3 主题 token（由 v2 主题自动迁移生成 - 白名单严格模式）`);
  lines.push(` *`);
  lines.push(` * 源文件: ${meta.input}`);
  lines.push(` * 生成时间: ${meta.timestamp}`);
  lines.push(` * v3 白名单版本: ${meta.whitelistVersion}`);
  lines.push(` *`);
  lines.push(` * 应用方式:`);
  lines.push(` *   import { setToken } from 'shineout';`);
  lines.push(` *   import { theme } from './shineout_v3_theme';`);
  lines.push(` *   setToken({ token: theme });`);
  lines.push(` *`);
  lines.push(` * 保证:`);
  lines.push(` *   ✅ 所有输出的 token 名都在 v3 实际存在（已通过白名单校验）`);
  lines.push(` *   ⚠️  REVIEW 标记的条目需人工 review（色阶推导、命名差异等）`);
  lines.push(` *   ❌ 文件底部 skipped 列表是 v3 无对应 token 的 v2 字段，请业务侧用 CSS 处理`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`export const theme = {`);

  const groupRender = (title, entries) => {
    if (!entries.length) return;
    lines.push(``);
    lines.push(`  // ============ ${title} ============`);
    entries.forEach((e) => {
      lines.push(`  ${e.key}: ${e.value}, // ${e.comment || ''}`);
    });
  };

  groupRender(`全局原子 Token（${atomicEntries.length} 项 — 由 v2 color 模块推导）`, atomicEntries);
  groupRender(`组件 Token（${componentEntries.length} 项 — 1:1 映射）`, componentEntries);

  lines.push(`};`);
  lines.push(``);
  lines.push(`export default theme;`);
  lines.push(``);

  if (skipped.length) {
    lines.push(`/*`);
    lines.push(` * ============ v2 字段未迁移列表（共 ${skipped.length} 项）============`);
    lines.push(` * 这些字段在 v3 中无等价 token，已显式跳过。`);
    lines.push(` * 若上线后视觉不符合预期，可手动通过 CSS 变量覆盖对应组件样式。`);
    lines.push(` *`);
    skipped.forEach((s) => {
      lines.push(` *   - ${s.v2Key}: ${s.reason}`);
    });
    lines.push(` */`);
  }

  return lines.join('\n');
}

// ============================================================
// 7. CLI
// ============================================================

/**
 * 把 entries 列表转成一个纯净的 { tokenName: cssValue } 对象
 * （用于 JSON 产物 - 只保留 setToken 真正需要的数据）
 */
function entriesToObject(entries) {
  const obj = {};
  for (const e of entries) {
    // key 形如 "'tokenName'"，去掉两端引号
    const cleanKey = e.key.replace(/^['"]|['"]$/g, '');
    obj[cleanKey] = JSON.parse(e.value);
  }
  return obj;
}

/**
 * 从输入推断输出文件名：
 *   - URL 形态：从路径里抽 `<pkg>@<hash>` 的 hash，生成 output/<pkgBase>-<hash>_v3_theme.ts
 *     例: .../@shein-components/shineout-theme@0.0.0-b3qq6B/index.js
 *         → output/shineout-theme-0.0.0-b3qq6B_v3_theme.ts
 *   - 本地路径形态：output/<basename>_v3_theme.ts
 * 若用户显式给了 outputArg，原样使用
 */
function deriveOutputPath(input, outputArg) {
  if (outputArg) return path.resolve(outputArg);

  const OUTPUT_DIR = path.resolve(__dirname, 'output');
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  if (/^https?:\/\//i.test(input)) {
    // 匹配 unpkg / npm CDN 常见格式：<pkg>@<version-or-hash>
    // 兼容 @scope/name@x.x.x-xxx 或 name@x.x.x-xxx
    const m = input.match(/([a-z0-9_.-]+)@([a-z0-9._-]+)(?:\/|$)/i);
    const stem = m ? `${m[1]}-${m[2]}` : 'theme-' + input.split('/').slice(-2, -1)[0];
    return path.join(OUTPUT_DIR, `${stem}_v3_theme.ts`);
  }

  const base = path.basename(input).replace(/\.(jsx?|tsx?|json)$/i, '');
  return path.join(OUTPUT_DIR, `${base}_v3_theme.ts`);
}

async function main() {
  const [, , inputArg, outputArg] = process.argv;
  if (!inputArg) {
    console.error('Usage: node migrate-v2-theme.js <input> [output-v3-theme.ts]');
    console.error('  <input>  本地路径或 https:// URL');
    console.error('  [output] 可选，省略时按 input 自动派生到 output/ 目录');
    process.exit(1);
  }

  validateDictionary();

  const isUrl = /^https?:\/\//i.test(inputArg);
  const outputPath = deriveOutputPath(inputArg, outputArg);
  const source = await loadSource(inputArg);
  const v2Config = extractV2Config(source);
  const result = buildV3Theme(v2Config);
  const ts = process.env.MIGRATE_TIMESTAMP || '(unstamped)';

  // 1) ts 产物
  const tsOutput = renderTheme(result, {
    input: isUrl ? inputArg : path.basename(path.resolve(inputArg)),
    timestamp: ts,
    whitelistVersion: `${WHITELIST_DATA._meta.totalCount} tokens (${WHITELIST_DATA._meta.componentCount} components)`,
  });
  fs.writeFileSync(outputPath, tsOutput, 'utf8');

  // 2) JSON 产物（同目录、同 basename、扩展名 .json）
  // 纯净的 { tokenName: value } 对象，可直接 JSON.parse 后传给 setToken({ token })
  const jsonPath = outputPath.replace(/\.tsx?$|\.jsx?$|$/i, '') + '.json';
  const finalJsonPath = jsonPath.endsWith('.json') ? jsonPath : `${outputPath}.json`;
  // 上面正则替换比较绕，直接稳妥版：去掉已知扩展再加 .json
  const baseNoExt = outputPath.replace(/\.(tsx?|jsx?)$/i, '');
  const jsonOutputPath = `${baseNoExt}.json`;
  const themeObject = {
    ...entriesToObject(result.atomicEntries),
    ...entriesToObject(result.componentEntries),
  };
  fs.writeFileSync(jsonOutputPath, JSON.stringify(themeObject, null, 2) + '\n', 'utf8');

  console.log(`✅ Generated:`);
  console.log(`   ${outputPath}`);
  console.log(`   ${jsonOutputPath}`);
  console.log(`   - 原子 token: ${result.atomicEntries.length}`);
  console.log(`   - 组件 token: ${result.componentEntries.length}`);
  console.log(`   - 未迁移项: ${result.skipped.length}`);
}

if (require.main === module) {
  main().catch((e) => { console.error(e.message || e); process.exit(1); });
}

module.exports = { generatePalette, buildV3Theme, renderTheme, extractV2Config, loadSource, FIELD_MAP, validateDictionary };
