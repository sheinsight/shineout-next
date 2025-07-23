# Popover.Confirm 组件 Promise 错误处理修复 diff 报告

## 问题描述

修复 Popover.Confirm 组件在 `onOk` 和 `onCancel` 返回 Promise 并 reject 时，按钮一直保持 loading 状态的问题。之前的代码只处理了 Promise resolve 的情况，没有处理 reject 的情况，导致按钮状态无法恢复。

## 代码变更文件

- `packages/base/src/popover/confirm.tsx`

## 变更代码行

### packages/base/src/popover/confirm.tsx

1. **onOk 处理函数添加 catch**（第22-24行）
   ```diff
         (callback as Promise<any>).then(() => {
           close();
           setOk(false);
   +      }).catch(() => {
   +        setOk(false);
         });
   ```

2. **onCancel 处理函数添加 catch**（第39-41行）
   ```diff
         (callback as Promise<any>).then(() => {
           close();
           setCancel(false);
   +      }).catch(() => {
   +        setCancel(false);
         });
   ```

## 变更前后逻辑差异

### 变更前
1. 当 `onOk` 或 `onCancel` 返回 Promise 时，只在 `then` 中处理成功情况
2. 如果 Promise 被 reject，loading 状态永远不会被清除
3. 用户无法再次点击按钮，界面处于假死状态

### 变更后
1. 添加了 `catch` 处理 Promise reject 的情况
2. 无论 Promise 成功还是失败，都会清除 loading 状态
3. 失败时不会关闭弹窗，用户可以重试或取消

### 对组件运作逻辑的影响

1. **状态管理完整性**：
   - 确保了 loading 状态的生命周期完整
   - 避免了状态卡死的问题

2. **错误处理机制**：
   - 支持异步操作失败后的重试
   - 提供了更好的用户体验

3. **行为差异**：
   - 成功时：清除 loading 并关闭弹窗
   - 失败时：仅清除 loading，保持弹窗打开

## 逻辑影响范围

- 完善了 Promise 错误处理机制，确保 loading 状态的生命周期完整
- 失败时仅清除 loading 状态，保持弹窗打开，支持用户重试
- 提升了异步操作场景下的用户体验

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯 bug 修复，完全向后兼容

### 行为变化说明

1. **Promise reject 处理**：
   - 影响场景：`onOk` 或 `onCancel` 返回 Promise 并 reject 的情况
   - 具体表现：按钮 loading 状态正确清除，弹窗保持打开
   - 受影响代码示例：
   ```tsx
   // 之前：Promise reject 后按钮卡在 loading 状态
   // 现在：loading 清除，用户可以重试
   <Popover.Confirm
     onOk={() => {
       return api.deleteItem()
         .catch(error => {
           message.error('删除失败：' + error.message);
           return Promise.reject(error); // 保持弹窗打开
         });
     }}
     text="确定要删除吗？"
   >
     <Button>删除</Button>
   </Popover.Confirm>
   ```
   - 是否需要调整：不需要，体验优化

2. **错误场景体验提升**：
   - 影响场景：网络请求失败、服务端验证失败等
   - 具体表现：用户可以在失败后选择重试或取消
   - 受影响代码示例：
   ```tsx
   // 典型的异步验证场景
   onOk: async () => {
     try {
       await api.validateAndSubmit(data);
       message.success('提交成功');
     } catch (error) {
       message.error('验证失败，请重试');
       throw error; // 保持弹窗打开，允许重试
     }
   }
   ```
   - 是否需要调整：不需要，提升了错误处理能力