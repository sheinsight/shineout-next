import classNames from 'classnames';
import Icons from '../icons';
import { TagClasses, TagProps, TagSemanticKey } from './tag.type';
import useTag from './use-tag';
import { getDataset, util } from '@sheinx/hooks';
import TagInput from './tag-input';
import { useConfig } from '../config';
import { useSemantic } from '../common';

const { devUseWarning } = util;
const Done = 2;
const Pending = 1;

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
    onMouseDown,
    classNames: classNamesProp,
    styles: stylesProp,
    ...rest
  } = props;

  if (props.type) {
    devUseWarning.deprecated('type', 'color', 'Tag');
  }

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

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<TagSemanticKey>(
    classNamesProp,
    stylesProp,
    config.tag,
  );

  const tagClass = classNames(className, tagStyle.rootClass, tagStyle.tag, {
    [tagStyle.small]: size === 'small',
    [tagStyle.large]: size === 'large',
    [tagStyle.rounded]: shape === 'rounded',
    [tagStyle[colorSet]]: true,
    [tagStyle[modeSet]]: true,
    [tagStyle.disabled]: !!disabled,
  }, semClass('root', []));

  const getTagRootProps = () => {
    const propsSet: Omit<TagProps, 'jssStyle'> = rest;
    if (style || backgroundColor || semStyle('root')) {
      const styleSet = Object.assign({}, style || {}, backgroundColor ? { backgroundColor } : {}, semStyle('root'));
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
        <div className={classNames(tagStyle.wrapper, inlineStyle && tagStyle.inline, semClass('wrapper', []))} style={semStyle('wrapper')}>
          {util.wrapSpan(children)}
        </div>
      );
    }

    return (
      <div className={classNames(tagStyle.wrapper, inlineStyle && tagStyle.inline, semClass('wrapper', []))} style={semStyle('wrapper')}>
        {util.wrapSpan(children)}
      </div>
    );
  };

  const renderInput = () => {
    return (
      <TagInput
        size={size}
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
    return (
      <div
        className={classNames(tagStyle.closeIcon, dismiss === Pending && tagStyle.closeIconPending, semClass('closeIcon', []))}
        onClick={handleClose}
        onMouseDown={onMouseDown}
        style={dismiss === Pending ? { opacity: 0.6, pointerEvents: 'none', ...semStyle('closeIcon') } : semStyle('closeIcon')}
      >
        <span className={tagStyle.closeIconWrapper}>{dismiss === Pending ? Icons.tag.Loading : Icons.tag.Close}</span>
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
    <div {...getTagRootProps()} {...getDataset(props)}>
      {renderChildren()}
      {renderClose()}
    </div>
  );
};

Tag.Input = TagInput;

export default Tag;
