import { MessageFuncArg as FuncArg, MessageOptions as UnStyledMessageProps } from '@sheinx/base';

/**
 * @title Message
 *
 * @cn Message 提供了一组方法供全局调用
 * Message.show(content, [duration], [options]) // 不带有icon，纯 Message 展示
 * Message.info(content, [duration], [options]) // 带有基础样式和icon
 * Message.success(content, [duration], [options])
 * Message.warn(content, [duration], [options])
 * Message.error(content, [duration], [options])
 * Message.close() // 关闭所有消息
 * Message.setOptions() // 设置默认选项，优先级低于实际调用时的选项
 *
 * @en Message provides a set of methods for global calls
 * Message.show(content, [duration], [options]) // No icon, pure message display
 * Message.info(content, [duration], [options]) // With basic style and icon
 * Message.success(content, [duration], [options])
 * Message.warn(content, [duration], [options])
 * Message.error(content, [duration], [options])
 * Message.close() // Close all messages
 * Message.setOptions() // set global options, priority is lower than the actual call option
 */
export type MessageFuncArg = FuncArg;
/**
 * @title MessageOptions
 */
export type MessageOptions = Omit<UnStyledMessageProps, 'jssStyle'>;
