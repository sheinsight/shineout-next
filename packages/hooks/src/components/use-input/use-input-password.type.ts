export type PasswordValue = string | undefined;
export interface InputPasswordProps {
  value: PasswordValue;
  onChange: (value: PasswordValue) => void;
  /**
   * @en Character used to mask password input
   * @cn 用于遮盖密码输入的字符
   * @default '•'
   * @when To use a different masking character like '*' or '●'
   */
  point?: string;
  /**
   * @en Shows eye icon button to toggle password visibility
   * @cn 显示眼睛图标按钮来切换密码可见性
   * @when For better UX in password fields
   */
  visibilityToggle?: boolean;
  /**
   * @en Controls password visibility state for controlled component
   * @cn 控制密码可见状态，用于受控组件
   * @when For programmatic control of password visibility
   */
  visibility?: boolean;
  /**
   * @en Initial visibility state for uncontrolled component
   * @cn 非受控组件的初始可见状态
   * @when For uncontrolled password visibility
   */
  defaultVisibility?: boolean;
  /**
   * @en Callback fired when visibility state changes (either by user clicking toggle button or programmatic change). The parameter is the new visibility state: true means password is visible, false means hidden
   * @cn 可见状态变化时触发的回调（用户点击切换按钮或程序化改变时都会触发）。参数为新的可见状态：true 表示密码可见，false 表示隐藏
   * @when For tracking visibility changes or syncing with external state
   */
  onVisibilityChange?: (visibility: boolean) => void;
}
