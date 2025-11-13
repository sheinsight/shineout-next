import { ModalProps as UnStyledModalProps, ModalOptions } from '@sheinx/base';

/**
 * @title Modal
 */
export type ModalProps = Omit<UnStyledModalProps, 'jssStyle'>;

export type ModalFunctionOptions = Omit<ModalOptions, 'jssStyle'>;

/**
 * @title ModalMethods
 * @cn Modal 提供了一组方法供全局调用，这些方法生成的元素，会在关闭后销毁。
 * 该组方法应仅供展示所用, 如果需要数据交互, 请使用 Modal。
 * - `Modal.info(options)` 提示信息
 * - `Modal.success(options)` 成功信息
 * - `Modal.warn(options)` 警告信息
 * - `Modal.error(options)` 错误信息
 * - `Modal.confirm(options)` 确认信息
 * - `Modal.show(options)` 普通信息
 * - `Modal.closeAll` 关闭所有Modal
 * options 支持 Modal除了 destory, visible 的其他任何属性, 此外还有如下的额外属性:
 */
export type ModalFunctionExternalOptions = Omit<ModalFunctionOptions, keyof ModalProps>;
