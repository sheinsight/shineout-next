import type {
  ChangeEvent,
  CSSProperties,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

interface BasicProps {
  /**
   * 受控值
   */
  value?: string;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
  /**
   * 输入框内容变化时的回调
   */
  onChange?: (newValue: string, event: ChangeEvent) => void;
  /**
   * 按下回车的回调
   */
  onPressEnter?: KeyboardEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onFocus?: FocusEventHandler;
  onClear?: () => void;
  onBlur?: FocusEventHandler;

  /**
   * 输入框大小
   */
  size?: 'small' | 'normal' | 'large';
  /**
   * 类名
   */
  className?: string;
  /**
   * 输入框id
   */
  id?: string;

  type?: 'text' | 'password';

  /**
   * 左侧内容
   */
  left?: ReactNode;

  /**
   * 右侧内容
   */
  right?: ReactNode;

  clearable?: boolean;

  customStyle?: () => Record<string, string>;
}

export type InputProps = Omit<HTMLAttributes<HTMLInputElement>, keyof BasicProps> & BasicProps;
