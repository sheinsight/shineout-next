import Icons from '../icons';
import type { CommonType } from '../common/type';
import { AlertJssStyle } from './alert.type';
import classNames from 'classnames';
export interface AlertIconProps {
  type: CommonType['iconType'] | undefined;
  jssStyle?: AlertJssStyle;
  className?: string;
  style?: React.CSSProperties;
}

const icons = {
  info: Icons.PcInfoCircleFill,
  success: Icons.PcCheckCircleFill,
  warning: Icons.PcWarningCircleFill,
  danger: Icons.PcWarningCircleFill,
  confirmwarning: Icons.PcWarningCircleFill,
  error: Icons.PcWarningCircleFill,
  confirm: Icons.PcHelpCircleFill,
};

const AlertIcon = (props: AlertIconProps) => {
  const styles = props.jssStyle?.alert?.();
  let { type } = props;
  if (type === 'error') type = 'danger';
  if (!type) return null;
  const Icon = icons[type];
  if (!Icon) return null;
  return (
    <span
      data-role='icon'
      style={props.style}
      className={classNames(
        props.className,
        styles?.icon,
        styles && styles[(type + 'Icon') as keyof AlertJssStyle],
      )}
    >
      {Icon}
    </span>
  );
};
export const AlertIconMap = icons;
export default AlertIcon;
