# Upload

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/upload/*.tsx, *.ts
  - packages/base/src/upload/*.tsx
  - packages/hooks/src/components/use-upload/use-upload.ts, xhr.ts
  - packages/shineout-style/src/upload/upload.ts
- 状态：待优化

## 概要

Upload 组件跨多个包实现，涉及表单集成、文件校验、XHR 上传、拖拽和粘贴功能。整体结构清晰，但存在多个事件监听未清理的内存泄漏风险，以及文件名和预览 URL 的 XSS 隐患。样式配置基本使用 token，但部分硬编码值需要标准化。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| UPLOAD-0 | P0 | bug | packages/base/src/upload/upload.tsx:232,255,274 | React key 使用数组 index，导致文件删除/排序时状态错乱 | 改为使用稳定的文件 ID（如 file.id 或 uid） |
| UPLOAD-0b | P0 | perf | packages/hooks/src/components/use-upload/use-upload.ts:207-227 | handleImage 使用 FileReader.readAsDataURL()，将大文件转换为 base64 data URL（内存翻倍），且不清理 | 改用 URL.createObjectURL()，在组件卸载时调用 URL.revokeObjectURL() |
| UPLOAD-1 | P3 | bug | packages/hooks/src/components/use-upload/xhr.ts:55 | XHR progress 事件监听器在 xhr 对象被 GC 时自动清理，不构成 P0 内存泄漏 | 若需要严格清理，可在完成后调用 removeEventListener |
| UPLOAD-2 | P1 | bug | packages/base/src/upload/upload.tsx:146,148 | document 级 paste 事件监听器注册但可能重复注册；依赖数组缺少 func | 完整依赖数组，使用 useCallback 稳定 handlePaste 引用 |
| UPLOAD-3 | P1 | bug | packages/hooks/src/components/use-upload/use-upload.ts:250-256 | handleImage 创建的 Image 对象 onload/onerror 未清理，若图片加载中止会保留监听器 | 需要在组件卸载时清理 pendingImage 的所有监听器 |
| UPLOAD-4 | P1 | security | packages/hooks/src/components/use-upload/use-upload.ts:93,96,161 | 错误消息未清理，xhr.statusText/onHttpError 可能包含 HTML；在 result.tsx:62,108 渲染 | 文档化 message 必须为纯文本，若需 HTML 需用 DOMPurify 清理 |
| UPLOAD-5 | P1 | a11y | packages/base/src/upload/upload.tsx:185-193 | handler 元素使用 role='button' 但无 tabIndex 和 onKeyDown，无法通过键盘操作 | 添加 tabIndex={0}、aria-label 和 Enter/Space 的 onKeyDown 处理 |
| UPLOAD-6 | P1 | bug | packages/base/src/upload/upload.tsx:157-159 | handleReplace 中 setTimeout 无清理 ID，组件卸载前若触发会导致状态更新 | 保存 timer ID，在卸载或下次 replace 时调用 clearTimeout |
| UPLOAD-7 | P2 | bug | packages/hooks/src/components/use-upload/use-upload.ts:353-365 | recoverValue 不检查 index 有效性，可能推送 undefined 到 value | 添加 `if (index >= recycleValues.length) return;` |
| UPLOAD-8 | P2 | bug | packages/hooks/src/components/use-upload/use-upload.ts:234-235 | 并发上传时 resetLength 计算存在竞态条件，可能超过 limit | 使用原子操作或加锁机制保证不超出限制 |
| UPLOAD-9 | P2 | bug | packages/hooks/src/components/use-upload/use-upload.ts:156-163 | onSuccess 返回 Error 对象时，result.message 可能为 undefined | 改为 `result?.message || result.toString()` |
| UPLOAD-10 | P2 | validation | packages/base/src/upload/upload.tsx:130-138 | beforePaste 的返回值未验证是否为 FileList，.length 访问可能失败 | 添加类型卫士检查 `files?.length` |
| UPLOAD-11 | P2 | maintainability | packages/base/src/upload/useInputClick.ts:19-24 | input 点击锁定时间硬编码为 1s，且不处理 click 失败时的解锁 | 移除锁定逻辑或改为 try-finally 保证安全 |
| UPLOAD-12 | P3 | style | packages/shineout-style/src/upload/upload.ts:31,96,156-157,172 | 部分样式值硬编码（padding:16, gap:'8px', width:'2em'）未使用 token | 替换为设计 token（uploadPaddingY, uploadResultGap 等） |
| UPLOAD-13 | P3 | test | packages/shineout/src/upload/__test__ | 缺少测试：并发上传超过 limit、keyboard 导航、大文件内存泄漏、state 切换 | 补充集成测试覆盖上述场景 |

## 详细说明

### UPLOAD-0: React key 使用 index 导致状态错乱（P0 - 严重）

**文件:行号**: packages/base/src/upload/upload.tsx:225-245, 249-285

**问题**: 
```typescript
// 行 232
Object.keys(files).map((id, index) => {
  return <Result ... key={index} ... />  // 错误：使用 index 作 key
})

// 行 255
value.map((v, index) => {
  return <Drop ... key={index} ... />  // 错误：使用 index 作 key
})

// 行 274
<Result ... key={index} ... />
```
使用数组索引作为 React key，当文件列表重新排序或删除元素时，React 会复用错误的 DOM 节点和组件实例，导致状态混乱。

**触发场景**: 
- 删除中间文件：后续文件的上传进度、错误状态会显示在错误的行上
- 拖拽排序：文件顺序改变后状态对应错乱
- 快速上传多文件后删除：列表项内容完全混乱

**修复思路**: 
```typescript
// 正确：使用稳定的 ID
Object.keys(files).map((id) => {
  return <Result key={id} ... />
})
```

**严重性**: P0 - 此 bug 会导致用户看到错误的上传状态、进度条混乱、删除了错误的文件等问题。

---

### UPLOAD-0b: FileReader.readAsDataURL() 导致内存泄漏（P0）

**文件:行号**: packages/hooks/src/components/use-upload/use-upload.ts:207-227

**问题**: 
```typescript
const handleImage = (blob: File): Promise<{ src: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;  // ← data URL 为 base64 编码，大小 ~= 文件大小 × 1.33
      const image = new window.Image();
      image.onerror = () => {
        reject(new Error(text.invalidImage));
      };
      image.onload = () => {
        resolve({
          src: data,  // ← 整个 base64 string 被保存到 fileRecord.src
          width: image.width,
          height: image.height,
        });
      };
      image.src = data;
    };
    reader.readAsDataURL(blob);  // ← 对大文件阻塞并消耗内存
  });
};
```

当用户上传 100 个 5MB 图片时：
- FileReader 创建 500MB base64 data URL
- 每个被保存在 fileRecord.src 中
- 用户卸载组件前，所有 data URL 仍保留在内存
- 浏览器 GC 无法释放（引用仍在 React state 中）

**修复思路**: 使用 `URL.createObjectURL()` 而非 `readAsDataURL()`：
```typescript
const handleImage = (blob: File): Promise<{ src: string; ... }> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);  // ← 高效的 blob: URL，无需 base64 编码
    const image = new window.Image();
    image.onerror = () => {
      URL.revokeObjectURL(url);  // ← 清理
      reject(new Error(text.invalidImage));
    };
    image.onload = () => {
      resolve({
        src: url,
        width: image.width,
        height: image.height,
      });
    };
    image.src = url;
  });
};
```
在组件卸载或文件删除时调用 `URL.revokeObjectURL(fileRecord.src)` 释放内存。

**严重性**: P0 - 大文件上传时会导致严重内存泄漏和浏览器卡顿。

---

### UPLOAD-2: Document paste 监听重复注册和依赖数组不完整（P1）

**文件:行号**: packages/base/src/upload/upload.tsx:146-148

**问题**: 
```typescript
useEffect(() => {
  if (!paste) return;
  const handlePaste = async (e: ClipboardEvent) => {
    ...
    func.addFiles(toAdd);  // ← 使用 func
  };
  document.addEventListener('paste', handlePaste);
  return () => document.removeEventListener('paste', handlePaste);
}, [paste, props.disabled, accept, props.multiple, limit, props.beforePaste]);
// 缺少依赖：func 在此使用但未在依赖数组中
```

虽然 `func` 被 `useLatestObj()` 包装保证总是最新，但依赖数组不完整会导致：
1. props 频繁变化时重复注册监听器
2. 若 func 引用改变而依赖未指定，可能导致闭包 stale

**修复思路**: 
- 确保依赖数组完整：`[paste, props.disabled, accept, props.multiple, limit, props.beforePaste]`
- 或将 handlePaste 提取并用 useCallback 包装避免重复创建

---

### UPLOAD-4: 错误消息未清理可能导致 XSS（P1 - Security）

**文件:行号**: packages/hooks/src/components/use-upload/use-upload.ts:93,96,161 → 渲染于 packages/base/src/upload/result.tsx:62,108

**问题**: 
错误消息来自多个不受信源，未经清理就显示：

```typescript
// use-upload.ts:90-105
const handleError = (id: string, xhr: XhrResult, file: File) => {
  const { onHttpError } = props;

  let message = xhr.statusText;  // ← HTTP 状态文本（来自服务器）
  const onError = (props as any).onError;
  if (onError) message = onError(xhr, file) || message;  // ← 应用回调返回值
  if (onHttpError) message = onHttpError(xhr, file) || message;  // ← 应用回调返回值

  setFiles((files) =>
    produce(files, (draft) => {
      if (!draft[id]) return draft;
      draft[id].status = 3;
      draft[id].message = message;  // ← 保存
    }),
  );
};

// result.tsx:62
{message && <span>({message}) </span>}  // ← 渲染（需要验证 React 转义）
```

**恶意场景**: 若服务器或应用回调返回包含 HTML 的字符串：
```javascript
// 恶意应用代码
onHttpError: (xhr) => {
  const data = JSON.parse(xhr.responseText);
  return data.userComment;  // 服务器可能返回 '<img src=x onerror=alert(1)>'
}
```

**修复思路**: 
- 文档化：message 必须为纯文本
- 或使用 DOMPurify 清理回调返回值
- 在 setFiles 前进行类型检查和转义

---

### UPLOAD-5: Handler 无键盘操作支持（P1 - a11y）

**文件:行号**: packages/base/src/upload/upload.tsx:185-193

**问题**: 
```jsx
<span
  className={classNames(...)}
  style={listType === 'image' ? { ...imageStyle, ...semStyle('handler') } : semStyle('handler')}
  {...wrapperProps}
  role='button'  // ← 有语义，但...
>
  {/* input 在此隐藏 */}
  <input
    accept={accept}
    ...
  />
</span>
```

设置 `role='button'` 但无法通过键盘激活：
- 无 `tabIndex={0}`，无法 Tab 键聚焦
- 无 `onKeyDown`/`onKeyUp` 处理 Enter 或 Space
- 无 `aria-label`，屏幕阅读器不知道用途

**修复思路**: 
```jsx
<span
  role='button'
  tabIndex={0}
  aria-label={`Upload ${listType === 'image' ? 'images' : 'files'}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  }}
  {...wrapperProps}
>
```

---

### UPLOAD-6: handleReplace setTimeout 未清理（P1 - Memory）

**文件:行号**: packages/base/src/upload/upload.tsx:150-160

**问题**: 
```typescript
const handleReplace = (files: File[], index: number) => {
  onChange(
    produce(value, (draft) => {
      draft.splice(index, 1);
    }),
  );
  setTimeout(() => {
    func.addFiles(files);
  });  // ← 无 timer ID，无法清理
};
```

若组件在 setTimeout 触发前卸载或用户再次点击 replace，会导致：
1. 在卸载组件后调用 setState（React warning）
2. 调用已过期的 func.addFiles（state inconsistency）

**修复思路**: 
保存 timer ID 并在适当时清理：
```typescript
const handleReplace = usePersistFn((files: File[], index: number) => {
  onChange(produce(value, (draft) => {
    draft.splice(index, 1);
  }));
  
  const timer = setTimeout(() => {
    func.addFiles(files);
  });
  
  // 若用户再次 replace 或组件卸载，取消 timer
  return () => clearTimeout(timer);
});
```

或改为同步操作（如果业务允许）。

### UPLOAD-3: 图片预加载 Image 对象未清理（P1）

**文件:行号**: packages/hooks/src/components/use-upload/use-upload.ts:207-227

**问题**: 
handleImage 函数中创建的 Image 对象：
```typescript
const image = new window.Image();
image.onerror = () => { reject(...) };
image.onload = () => { resolve(...) };
image.src = data;
```
若 Promise 被取消（如用户快速删除文件），onload/onerror 监听器不会被清理，图片数据仍在内存中。

**触发场景**: 用户上传大量图片后快速删除文件，累积未清理的 Image 对象。

**修复思路**:
- 在 addFiles 清理逻辑中添加 cleanup 函数清理 pendingImage
- 在 removeFile 时也要检查是否有待处理的图片加载，并中止
- 已有 releasePendingImage 函数，但仅在 watermark 中有相似逻辑，upload 缺少对应清理

### UPLOAD-4: 文件名 XSS 隐患（P2）

**文件:行号**: packages/base/src/upload/result.tsx:61-62

**问题**: 
```typescript
<div className={uploadClasses?.resultTextBody}>
  {name}
  {message && <span>({message}) </span>}
</div>
```
虽然 React 文本内容默认转义，但如果 renderResult 被重写为 HTML，名称可能包含脚本：
```javascript
// 恶意场景
const maliciousName = '<img src=x onerror=alert(1)>';
<result name={maliciousName} />
```

**修复思路**: 
- 在 result.tsx 中添加显式的 escapeHtml 或使用 dangerouslySetInnerHTML 时告知用户风险
- 在文件名显示处统一采用 textContent 而非 innerHTML

### UPLOAD-5: handler 无键盘操作支持（P2）

**文件:行号**: packages/base/src/upload/upload.tsx:192

**问题**: 
```typescript
<span ... role='button'>
```
设置了 role='button' 但未提供 tabIndex，用户无法通过键盘 Tab 键聚焦和激活。

**修复思路**: 
- 添加 `tabIndex={0}`
- 添加 onKeyPress 或 onKeyDown 处理 Enter/Space 打开文件选择器
- 参考 WAI-ARIA 按钮实现指南

### UPLOAD-6: 文件列表 key 使用 index（P2）

**文件:行号**: packages/base/src/upload/upload.tsx:232

**问题**: 
```typescript
Object.keys(files).map((id, index) => {
  return <Result ... key={index} ... />
})
```
使用数组索引作为 key，当文件列表重新排序或删除时，React 会复用错误的 DOM 节点。

**触发场景**: 删除中间的文件项时，后续项会复用前项的 DOM，导致状态混乱。

**修复思路**: 
- 改为 `key={id}` 使用稳定的文件 ID

### UPLOAD-7: beforeUpload 错误处理不一致（P2）

**文件:行号**: packages/hooks/src/components/use-upload/use-upload.ts:280-300

**问题**: 
```typescript
beforeUploadResult.catch(() => {
  setFiles(prev => {
    return produce(prev, (draft) => {
      delete draft[id];
    });
  });
});
```
当 beforeUpload 返回 rejected Promise 时，文件直接被删除但未调用 validatorHandle，且没有错误信息显示。

**修复思路**: 
- catch 分支也应该调用 validatorHandle 或设置错误消息
- 或暴露一个新的回调让上层知道 beforeUpload 被拒绝

### UPLOAD-9: onSuccess 返回值类型检查不足（P1）

**文件:行号**: packages/hooks/src/components/use-upload/use-upload.ts:156-163

**问题**: 
```typescript
if (result instanceof Error) {
  setFiles((files) => {
    return produce(files, (draft) => {
      if (!draft[id]) return draft;
      draft[id].status = 3;
      draft[id].name = file.name;
      draft[id].message = result.message;  // result.message 可能 undefined
    });
  });
}
```
result 是 Error 实例，但若 message 属性未定义，会导致显示 "undefined"。

**修复思路**: 
- 改为 `draft[id].message = result?.message || result.toString()`

## 测试覆盖

**现有测试**:
- upload.spec.tsx：基础上传、accept、disabled、removeConfirm 等
- uploadImage.spec.tsx：图片上传和预览
- uploadButton.spec.tsx：button 组件
- attrAccept.spec.tsx：文件类型检查

**缺失测试**:
- React key index 导致的状态错乱（删除中间文件、排序）
- 大文件上传的内存泄漏（FileReader data URL）
- XHR abort 时的事件监听器清理验证
- 键盘操作（Tab、Enter、Space）
- beforeUpload 异常处理
- 快速 paste 事件触发
- drag-and-drop 替换文件时的 timer 清理
- 并发上传超过 limit 的竞态
- 恶意错误消息渲染

---

## 优先级排序

**立即修复（P0）**:
1. UPLOAD-0：React key 使用 index（状态错乱）
2. UPLOAD-0b：FileReader data URL 内存泄漏（影响大文件）
3. UPLOAD-1：XHR 监听器未清理

**尽快修复（P1）**:
4. UPLOAD-5：Keyboard a11y
4. UPLOAD-4：错误消息 XSS 防护
5. UPLOAD-6：setTimeout 未清理
6. UPLOAD-2：paste 依赖数组完整性

**后续优化（P2）**:
7. UPLOAD-7：并发 limit 竞态
8. UPLOAD-9/10/11：其他类型检查和验证
9. UPLOAD-12：样式 token 化

## 核实记录

- UPLOAD-1：已降级至 P3，XHR progress 监听器随 xhr 对象被 GC 时自动释放，XHR 完成后监听器不会再次触发，不构成 P0 内存泄漏。

## TODO

- [ ] UPLOAD-1 定级过高：XHR 完成后 progress 监听器随对象被 GC，最多 P3（核实中断，确认是否已调整）
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
