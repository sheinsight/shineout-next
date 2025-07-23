# Message 组件 3.1.28 版本 Diff 报告

## 问题描述

修复 `Message` 同时关闭多个消息时展示错误的问题。当快速关闭多条消息时，由于 React 的异步状态更新和批处理机制，会导致消息显示混乱或报错。

## 代码变更文件

1. `packages/base/src/message/message.tsx`
2. `packages/base/src/alert/alert.tsx`
3. `packages/base/src/alert/alert.type.ts`
4. `packages/shineout-style/src/alert/alert.ts`

## 变更代码行

### 1. packages/base/src/message/message.tsx - 引入消息缓存机制
```diff
export default class Message extends Component<MessageProps, MessageState> {
+ messages: MessageItem[];
  
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      messages: [],
    };
+   this.messages = [];
  }
  
+ setMessages = (messages: MessageItem[]) => {
+   this.messages = messages;
+   this.setState({ messages });
+ };
  
  addMessage = (msg: MessageItem) => {
-   const messages = this.state.messages.concat();
+   const messages = this.messages.concat();
    messages.push(msg);
-   this.setState({ messages });
+   this.setMessages(messages);
  };
  
  removeMessage = (id: string) => {
-   const messages = this.state.messages.filter((m) => m.id !== id);
-   this.setState({ messages });
+   const messages = this.messages.filter((m) => m.id !== id);
+   this.setMessages(messages);
  };
  
  closeMessageForAnimation = (id: string) => {
-   const messages = this.state.messages.map((m) => {
+   const messages = this.messages.map((m) => {
      if (m.id !== id) return m;
      return { ...m, dismiss: true };
    });
-   this.setState({ messages });
+   this.setMessages(messages);
  };
```

### 2. packages/base/src/alert/alert.tsx - 优化关闭按钮结构
```diff
// 在渲染关闭按钮时增加包装元素
{closable && (
+ <div className={alertClasses?.closeWrapper}>
    <a
      tabIndex={-1}
      className={alertClasses?.close}
      onClick={handleClose}
      onKeyDown={handleEnterClose}
    >
      {closeItem || icons.Close}
    </a>
+ </div>
)}
```

### 3. packages/shineout-style/src/alert/alert.ts - 调整样式
```diff
+ closeWrapper: {
+   display: 'flex',
+   alignItems: 'center',
+ },
  close: {
    cursor: 'pointer',
    // 其他样式调整
  },
```

## 变更前后逻辑差异

### 变更前
1. 直接操作 React state 中的 messages 数组
2. 多个关闭操作可能基于过时的 state 数据
3. 导致消息列表状态不一致

### 变更后
1. 维护内部缓存 `this.messages` 始终保持最新数据
2. 所有操作先更新缓存，再同步到 state
3. 确保并发操作的数据一致性

## 逻辑影响范围
- 解决了并发关闭消息的显示错误
- 提升了组件的稳定性
- 不影响单个消息的正常操作

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：内部实现优化，API 不变

### 行为变化说明

1. **并发关闭恢复正常**：
   - 影响场景：快速关闭多条消息
   - 具体表现：消息正确移除，不再出现显示错误
   - 操作示例：
   ```tsx
   // 同时显示多条消息
   const ids = [];
   ids.push(Message.info('消息1'));
   ids.push(Message.info('消息2'));
   ids.push(Message.info('消息3'));
   
   // 快速关闭所有消息
   // 之前：可能出现显示错误或报错
   // 现在：正确关闭所有消息
   ids.forEach(id => Message.close(id));
   ```
   - 是否需要调整：不需要，修复了缺陷

2. **关闭按钮布局优化**：
   - Alert 组件的关闭按钮增加了包装层
   - 改善了对齐和点击区域
   - 视觉效果更加规范