import clsx from 'clsx';
import { ButtonClasses, ButtonItemProps } from './button.type';

const GroupItem = (props: ButtonItemProps) => {
  const { mode, type, disabled, className, text, outline, jssStyle } = props;
  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);

  const buttonStyle = jssStyle?.button?.() || ({} as ButtonClasses);

  const buttonItemClass = clsx(
    className,
    buttonStyle.groupItem,
    !!disabled && buttonStyle.disabled,
    buttonStyle[type || 'default'],
    modeSetted === 'text' && buttonStyle.text,
    modeSetted === 'dashed' && buttonStyle.dashed,
    modeSetted === 'outline' && buttonStyle.outline,
  );
  return buttonItemClass;
};

export default GroupItem;
