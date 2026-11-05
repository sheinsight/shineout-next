# Rule

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/shineout/src/rule、packages/base/src/rule、packages/hooks/src/utils/rule、packages/hooks/src/utils/validate
- 状态：待优化

## 概要

Rule 组件是表单验证规则的核心工具库，提供内置的验证器和自定义规则支持。整体架构清晰，类型定义完整，但存在 3 个 P0 严重 bug（正则验证双回调、error 未初始化、缺少 return 导致继续执行）和多个 P1 缺陷（自定义规则属性名错误、nullable 丢失 props、isJson 验证过松）。特别是验证流程的控制流问题和参数传递缺陷会导致验证逻辑异常甚至中断。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| RULE-1 | P0 | bug | packages/hooks/src/utils/validate/get-rule.ts:53-59 | 正则验证中 callback 被调用两次，导致验证状态混乱 | 第59行删除重复的 `callback(true)`，在第54行后添加 return |
| RULE-2 | P0 | bug | packages/hooks/src/utils/validate/type.ts:79-106 | error 变量未初始化，当 message 既非字符串也非函数时传递 undefined | 初始化 error 为默认错误对象 |
| RULE-3 | P0 | bug | packages/hooks/src/utils/validate/type.ts:96-106 | 类型不存在时缺少 return，导致后续代码继续执行并报错 | 第99行后添加 return 语句 |
| RULE-4 | P1 | bug | packages/hooks/src/utils/rule/rule.ts:97 | 自定义规则属性名错误，传入 `args` 而不是 `func`，导致自定义函数永不执行 | 改为 `{ func: args }` 而非 `{ args }` |
| RULE-5 | P1 | bug | packages/hooks/src/utils/validate/nullable.ts:10 | nullable 包装函数传入空对象 `{}` 作为 props，丢失原始配置信息 | 接收并传递正确的 props 参数 |
| RULE-6 | P1 | bug | packages/hooks/src/utils/validate/isJson.ts:1-2 | isJson 验证过于宽松，任何对象都被认为有效 JSON | 检查 Array 和普通对象，排除 Date/RegExp/Function 等 |
| RULE-7 | P1 | bug | packages/hooks/src/utils/validate/get-rule.ts:46-60 | 正则验证中 null/undefined 被转换为字符串 "null"/"undefined" 参与匹配 | 添加 nullable 包装（已在第61行，但逻辑顺序有问题） |
| RULE-8 | P2 | bug | packages/hooks/src/utils/validate/type.ts:29-32 | RGBA 正则无法匹配 0.0 alpha 值，正则模式 `(0.[1-9]*)\|[01]` 不完整 | 改为 `(0(\\.[0-9]*)?)\|1` 支持 0.0 |
| RULE-9 | P2 | perf | packages/hooks/src/utils/rule/rule.ts:31-44 | mergeOptions 使用递归，当规则数量多时可能栈溢出 | 改为迭代实现 |
| RULE-10 | P2 | bug | packages/hooks/src/utils/validate/get-rule.ts:85-106 | 字符串 length 验证对数字类型处理不当，把数字转换为字符串长度 | 添加明确注释说明行为或重构逻辑 |
| RULE-11 | P3 | test | packages/hooks/src/utils/rule/ | 缺少单元测试，无 .spec.ts 文件覆盖各规则类型和边界情况 | 创建完整的 rule.spec.ts 测试文件 |
| RULE-12 | P3 | maintainability | packages/hooks/src/utils/validate/type.ts:98-99 | 错误信息拼写错误 "Validate failured" 且未列出有效的类型选项 | 改为 "Validation failed" 并列出有效类型 |

## 详细说明

### P0 - 正则验证双回调（RULE-1）

**触发场景**：使用 regExp 规则验证值时，正则匹配成功导致验证状态混乱

**原因分析**：
```typescript
cb = (value, _formData, callback) => {
  const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp;
  if (!reg) {
    callback(new FormError(po.message, po));
    return;
  }
  if (reg.global) reg.lastIndex = 0;
  if (reg.test(value as string)) {
    callback(true);  // 第 54 行
  } else {
    callback(new FormError(po.message, po));
    return;
  }
  callback(true);  // 第 59 行 - 重复调用！
};
```

当正则匹配成功时，第 54 行调用 callback，但第 59 行仍会再次调用 callback(true)，导致验证流程回调两次，破坏 Promise 状态管理。

**修复思路**：
```typescript
if (reg.test(value as string)) {
  callback(true);
  return;  // 添加 return
} else {
  callback(new FormError(po.message, po));
}
// 删除第 59 行的重复 callback(true)
```

---

### P0 - 错误对象未初始化（RULE-2）

**触发场景**：使用自定义 message 参数为函数时，验证失败

**原因分析**：
```typescript
let error: Error;  // 未初始化

if (typeof message === 'string') {
  error = new Error(message);
}

if (typeof message === 'function') {
  error = new Error(message());
}

// 如果 message 既非字符串也非函数，error 仍为 undefined
callback(error!);  // 传递 undefined！
```

当 message 为其他类型或不存在时，error 未被赋值，callback 收到 undefined。

**修复思路**：
```typescript
let error: Error = new Error('Validation failed');

if (typeof message === 'string') {
  error = new Error(message);
} else if (typeof message === 'function') {
  error = new Error(message());
}
```

---

### P0 - 缺少 return 导致继续执行（RULE-3）

**触发场景**：使用不存在的类型进行验证，如 `type: 'invalid-type'`

**原因分析**：
```typescript
const reg = regs[type];
if (!reg) {
  devUseWarning.error(`Type '${type}' not existed.`);
  callback(new Error(`Validate failured. Type '${type}' not existed.`));
  // 缺少 return，继续执行下面的代码！
}

if (typeof value === 'string' && reg.test(value)) {  // reg 为 undefined，报错！
  // ...
}
```

虽然已调用 callback，但未返回，导致代码继续执行，在 reg.test() 时报错。

**修复思路**：
```typescript
if (!reg) {
  devUseWarning.error(`Type '${type}' not existed.`);
  callback(new Error(`Validation failed. Type '${type}' not existed.`));
  return;  // 添加 return
}
```

---

### P1 - 自定义规则属性名错误（RULE-4）

**触发场景**：使用 `Rule({ custom: myValidFunc })` 定义自定义规则时不执行

**原因分析**：
```typescript
// 在 rule.ts 的 mergeOptions 中
Object.keys(options).forEach((k) => {
  if (!ruleKeys.includes(k)) {
    if (isObject(options[k])) {
      rules[k] = (args: ValidFunc) => Object.assign({}, options[k], { args });
      //                                                              ^^^^^^ 错误！
    }
  }
});

// 但类型定义要求返回 { func, args, message? }
export interface RuleFuncResult {
  <U>(args?: U): { args: U; func: ValidFunc; message?: MessageType };
}
```

应该传入 `func` 而非 `args`。getRule() 在解构时寻找 `func` 属性，结果 func 为 undefined，自定义函数永不执行。

**修复思路**：
```typescript
rules[k] = (args: ValidFunc) => Object.assign({}, options[k], { func: args });
```

---

### P1 - nullable 丢失 props（RULE-5）

**触发场景**：在使用 nullable 包装的验证函数中，需要访问 props 信息时丢失

**原因分析**：
```typescript
// nullable.ts
export default <Value>(fn: ValidFunc<Value>) => {
  const cb: ValidFunc<Value> = (value, formData, callback) => {
    if (value == null || (value as any[]).length === 0) {
      callback(true);
      return;
    }
    fn(value, formData, callback, {});  // 传入空对象！
  };
  return cb;
};
```

ValidFunc 签名为 `(value, formData, callback, props) => void`，但 nullable 传入空对象 `{}`，丢失原始 props（可能包含 min/max/type 等重要信息）。

**修复思路**：
```typescript
export default <Value>(fn: ValidFunc<Value>) => {
  const cb: ValidFunc<Value> = (value, formData, callback, props) => {
    if (value == null || (value as any[]).length === 0) {
      callback(true);
      return;
    }
    fn(value, formData, callback, props);  // 传递正确的 props
  };
  return cb;
};
```

---

### P1 - isJson 验证过于宽松（RULE-6）

**触发场景**：验证类型为 'json' 的字段，意外接受非 JSON 对象如 Date、RegExp

**原因分析**：
```typescript
// isJson.ts
export default function (value: unknown) {
  if (typeof value === 'object') return true;  // 太宽松！
```

任何对象都被认为是有效 JSON，包括 Date、RegExp、Function、DOM 元素等。但 JSON 应该只包括普通对象、数组和原始值。

**修复思路**：
```typescript
export default function (value: unknown) {
  if (typeof value === 'object') {
    if (value === null) return true;  // null 是有效 JSON
    if (Array.isArray(value)) return true;
    // 检查是否为普通对象
    if (Object.getPrototypeOf(value) === Object.prototype) return true;
    return false;  // Date、RegExp 等不是有效 JSON
  }
  return true;  // 原始值都是有效 JSON
}
```

---

### P2 - RGBA 正则缺陷（RULE-8）

**触发场景**：验证 `rgba(255, 0, 0, 0.0)` 时无法匹配

**原因分析**：
```typescript
get rgba() {
  return new RegExp(
    '^rgba\\(\\s*(0|[1-9]\\d?|...)\\s*,\\s*(...) \\s*,\\s*(...)\\s*,\\s*((0.[1-9]*)|[01])\\s*\\)$',
    //                                                              ^^^^^^^ 问题
  );
}
```

`(0.[1-9]*)|[01]` 无法匹配 `0.0`：
- `0.[1-9]*` 匹配 0.1, 0.12 等，但不匹配 0.0
- 应该是 `(0(\\.[0-9]*)?)|1`

**修复思路**：
```typescript
'^rgba\\(\\s*(0|[1-9]\\d?|...)\\s*,\\s*(...)\\s*,\\s*(...)\\s*,\\s*((0(\\.[0-9]*)?)|1)\\s*\\)$'
```

---

## 测试覆盖

- ❌ 完全缺失：rule 工具函数的单元测试
- ⚠️ 缺失：边界值测试（min=0, max=0, 空字符串等）
- ⚠️ 缺失：类型组合测试
- ⚠️ 缺失：各种正则类型的全面覆盖

## 优化建议优先级

1. **立即修复**（影响功能）：RULE-1、RULE-2、RULE-3、RULE-4、RULE-5
2. **紧急修复**（影响可靠性）：RULE-6、RULE-7、RULE-8
3. **性能优化**：RULE-9
4. **改进**：RULE-10、RULE-11、RULE-12

## TODO

- [ ] `packages/hooks/src/utils/validate/get-rule.ts:53-59` 正则校验通过时 `callback(true)` 调用两次属实，需查调用方判断实际后果再定级
- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
