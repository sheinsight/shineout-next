import classNames from 'classnames';
import { TagClasses, TagProps } from './tag.type';
import useTag from './use-tag';
import { util } from '@sheinx/hooks';
import TagInput from './tag-input';

const Done = 2;
const Pendding = 1;

const Tag = (props: TagProps) => {
  const {
    jssStyle,
    className,
    type,
    color,
    size,
    disabled,
    mode,
    shape,
    children,
    onClick,
    onClose,
    style,
    backgroundColor,
    inlineStyle,
    onKeyUp,
    onCompleted,
    onEnterPress,
    closable,
    ...rest
  } = props;

  const showClose = closable || onClose;

  const { dismiss, showInput, value, handleClose, handleClick, handleBlur, handleInputChange } =
    useTag({
      jssStyle,
      onClose,
      onClick,
      disabled,
      onCompleted,
      children,
      closable,
    });

  const modeSet = mode || 'bright';
  const colorSet = type || color || 'default';
  const tagStyle = jssStyle?.tag?.() || ({} as TagClasses);

  const tagClass = classNames(className, tagStyle.tag, {
    [tagStyle.small]: size === 'small',
    [tagStyle.large]: size === 'large',
    [tagStyle.rounded]: shape === 'rounded',
    [tagStyle[colorSet]]: true,
    [tagStyle[modeSet]]: true,
    [tagStyle.disabled]: !!disabled,
  });

  const getTagRootProps = () => {
    const propsSet: Omit<TagProps, 'jssStyle'> = rest;
    if (style || backgroundColor) {
      const styleSet = Object.assign({}, style || {}, backgroundColor ? { backgroundColor } : {});
      propsSet.style = styleSet;
    }

    return {
      ...propsSet,
      className: tagClass,
      onClick: handleClick,
    };
  };

  const renderChildren = () => {
    if (onClose) {
      return (
        <div className={classNames(tagStyle.wrapper, inlineStyle && tagStyle.inline)}>
          {util.wrapSpan(children)}
        </div>
      );
    }

    return (
      <div className={classNames(tagStyle.wrapper, inlineStyle && tagStyle.inline)}>
        {util.wrapSpan(children)}
      </div>
    );
  };

  const renderInput = () => {
    return (
      <TagInput
        value={value}
        className={classNames(tagStyle.input)}
        jssStyle={jssStyle}
        onKeyUp={onKeyUp}
        onBlur={handleBlur}
        onEnterPress={onEnterPress}
        onChange={handleInputChange}
      ></TagInput>
    );
  };

  const renderClose = () => {
    if (!showClose) {
      return null;
    }

    if (dismiss === Pendding) {
      // 后面用 Spin 替换
      return <span></span>;
    }

    return (
      <div className={tagStyle.closeIcon} onClick={handleClose}>
        <span className={tagStyle.closeIconWrapper}>
          <svg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1.92204 1.33738L1.96129 1.37204L5 4.41042L8.03871 1.37204C8.20142 1.20932 8.46524 1.20932 8.62796 1.37204C8.77816 1.52224 8.78972 1.75859 8.66262 1.92204L8.62796 1.96129L5.58958 5L8.62796 8.03871C8.79068 8.20142 8.79068 8.46524 8.62796 8.62796C8.47776 8.77816 8.24141 8.78972 8.07796 8.66262L8.03871 8.62796L5 5.58958L1.96129 8.62796C1.79858 8.79068 1.53476 8.79068 1.37204 8.62796C1.22184 8.47776 1.21028 8.24141 1.33738 8.07796L1.37204 8.03871L4.41042 5L1.37204 1.96129C1.20932 1.79858 1.20932 1.53476 1.37204 1.37204C1.52224 1.22184 1.75859 1.21028 1.92204 1.33738Z' />
          </svg>
        </span>
      </div>
    );
  };

  if (dismiss === Done) {
    return null;
  }

  if (showInput) {
    return renderInput();
  }

  return (
    <div {...getTagRootProps()}>
      {renderChildren()}
      {renderClose()}
    </div>
  );
};

Tag.Input = TagInput;

export default Tag;
