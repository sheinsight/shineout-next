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

## 风险使用场景

### 代码执行风险
1. **无风险**：这是一个纯粹的 bug 修复，不会引入新的风险
2. **向后兼容**：完全兼容现有代码，只是修复了异常情况

### 交互体验差异

1. **修复的问题**：
   - 异步操作失败时按钮不再卡在 loading 状态
   - 用户可以在失败后重试操作
   - 提升了错误场景下的用户体验

2. **行为变化**：
   - Promise reject 时弹窗不会自动关闭（这是合理的，因为操作失败了）
   - 用户需要手动处理失败情况（重试或取消）

### 需要注意的场景

1. **异步验证场景**：
   - 表单提交前的服务端验证
   - 需要网络请求的确认操作
   - 依赖外部服务的操作

2. **错误处理策略**：
   - 开发者可以在 Promise reject 时提供错误提示
   - 可以根据错误类型决定是否允许重试
   - 需要考虑网络超时等异常情况

3. **用户体验优化**：
   - 可以配合错误提示使用
   - 考虑添加重试次数限制
   - 提供明确的错误反馈

4. **典型使用案例**：
   ```javascript
   onOk: () => {
     return api.deleteItem()
       .then(() => {
         message.success('删除成功');
       })
       .catch(error => {
         message.error('删除失败：' + error.message);
         return Promise.reject(error); // 保持弹窗打开
       });
   }
   ```