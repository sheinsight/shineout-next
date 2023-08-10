import classNames from 'classnames';
import { TagProps, TagClasses } from './tag.type';

const Tag = (props: TagProps) => {
  const { jssStyle, className, type, color, size, disabled, mode, onClick, children } = props;

  const tagStyle = jssStyle?.tag || ({} as TagClasses);
  const colorSet = type || color || 'default';
  const modeSet = mode || 'bright';

  const tagClass = classNames(className, tagStyle.tag, {
    [tagStyle.small]: size === 'small',
    [tagStyle.large]: size === 'large',
    [tagStyle[colorSet]]: true,
    [tagStyle[modeSet]]: true,
    [tagStyle.disabled]: !!disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    onClick?.(e);
  };

  return (
    <div className={tagClass} onClick={handleClick}>
      <span>{children}</span>
    </div>
  );
};

export default Tag;
