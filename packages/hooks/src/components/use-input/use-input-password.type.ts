export type PasswordValue = string | undefined;
export interface InputPasswordProps {
  value: PasswordValue;
  onChange: (value: PasswordValue) => void;
  point?: string;
  // 是否显示切换密码可见状态的按钮
  visibilityToggle?: boolean;
  // 是否显示密码
  visibility?: boolean;
  // 初始状态是否显示密码
  defaultVisibility?: boolean;
  // 切换密码可见状态的按钮的图标
  onVisibilityChange?: (visibility: boolean) => void;
}
