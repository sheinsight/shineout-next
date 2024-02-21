export type PasswordValue = string | undefined;
export interface InputPasswordProps {
  value: PasswordValue;
  onChange: (value: PasswordValue) => void;
  /**
   * @cn 密码符号
   * @en Password symbol
   * @default '•'
   */
  point?: string;
  /**
   * @cn 是否显示切换密码可见状态的按钮
   * @en Whether to display the button to toggle the visibility of the password
   */
  visibilityToggle?: boolean;
  /**
   * @cn 是否显示密码
   * @en Whether to display the password
   */
  visibility?: boolean;
  /**
   * @cn 初始状态是否显示密码
   * @en Whether to display the password initially
   */
  defaultVisibility?: boolean;
  /**
   * @cn 切换密码可见状态的按钮的图标
   * @en The icon of the button to toggle the visibility of the password
   */
  onVisibilityChange?: (visibility: boolean) => void;
}
