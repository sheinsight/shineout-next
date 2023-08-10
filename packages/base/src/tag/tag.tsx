import classNames from 'classnames';
import { TagProps, TagClasses } from './tag.type';

const Tag = (props: TagProps) => {
  const { jssStyle, className, type, size, disabled, children } = props;

  const tagStyle = jssStyle?.tag || ({} as TagClasses);

  const tagClass = classNames(className, tagStyle.tag, {
    [tagStyle.small]: size === 'small',
    [tagStyle.large]: size === 'large',
    [tagStyle.info]: type === 'info',
    [tagStyle.success]: type === 'success',
    [tagStyle.warning]: type === 'warning',
    [tagStyle.danger]: type === 'danger',
    [tagStyle.default]: type === 'default',
    [tagStyle.disabled]: !!disabled,
  });

  return (
    <div className={tagClass}>
      <span>{children}</span>
    </div>
  );
};

export default Tag;
