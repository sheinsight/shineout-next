import Icons from '../icons';
import type { CommonType } from '../common/type';
import { AlertJssStyle } from './alert.type';
import clsx from 'clsx';
export interface AlertIconProps {
  type: CommonType['iconType'] | undefined;
  jssStyle?: AlertJssStyle;
  className?: string;
  style?: React.CSSProperties;
}

const icons = {
  info: Icons.alert.Info,
  success: Icons.alert.Success,
  warning: Icons.alert.Warning,
  danger: Icons.alert.Danger,
  confirmwarning: Icons.alert.ConfirmWarning,
  error: Icons.alert.Error,
  confirm: Icons.alert.Confirm,
};

const AlertIcon = (props: AlertIconProps) => {
  const AlertClasses = props.jssStyle?.alert?.();
  let { type } = props;
  if (type === 'error') type = 'danger';
  if (!type) return null;
  const Icon = icons[type];
  if (!Icon) return null;
  return (
    <span
      style={props.style}
      className={clsx(
        props.className,
        AlertClasses?.icon,
        AlertClasses && AlertClasses[(type + 'Icon') as keyof AlertJssStyle],
      )}
    >
      {Icon}
    </span>
  );
};
export const AlertIconMap = icons;
export default AlertIcon;
