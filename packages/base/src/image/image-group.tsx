import { cloneElement, Children } from 'react';
import { ImageGroupProps } from './image-group.type';
import { ImageProps, Images } from './image.type';
import showGallery from './image-event';
import classNames from 'classnames';

const ImageGroup = (props: ImageGroupProps) => {
  const { jssStyle, children, lazy, target, shape, pile, width, height, showCount = false } = props;

  const groupClass = classNames(jssStyle?.image.group, {
    [jssStyle?.image.groupPile]: pile,
  });

  const handleClick = (index: number) => {
    const _images: Images[] = [];
    let current = 0;
    Children.toArray(children).forEach((child, i) => {
      const Child = child as React.ReactElement<ImageProps>;
      if (index === i) current = _images.length;
      const { src, href } = Child.props;
      _images.push({ thumb: src, src: href || src, key: i });
    });

    showGallery(jssStyle, _images, current);
  };
  const renderPile = (Child: React.ReactElement<ImageProps>, index: number) => {
    return (
      <div
        key={index}
        className={classNames(jssStyle?.image.groupPileItem)}
        style={{
          width: width || Child.props.width || '100%',
          height: height || Child.props.height || '100%',
          left: (width || Child.props.width) * (0.0625 * index),
        }}
      ></div>
    );
  };

  const renderGroupItem = (Child: React.ReactElement<ImageProps>, index: number) => {
    return cloneElement(Child, {
      ...props,
      jssStyle,
      lazy,
      width: width || Child.props.width || '100%',
      height: height || Child.props.height || '100%',
      shape: shape || Child.props.shape || 'rounded',
      target: target || Child.props.target || '_modal',
      onClick: () => handleClick(index),
    });
  };

  const renderGroupCount = () => {
    return (
      <div className={classNames(jssStyle?.image.groupCount)}>
        <svg
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.5 2.5C9.05229 2.5 9.5 2.94772 9.5 3.5V10C9.5 10.5523 9.05229 11 8.5 11H1.5C0.947715 11 0.5 10.5523 0.5 10V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5H8.5ZM6.29149 7.09273L5.35009 8.18738C5.16631 8.40093 4.84566 8.43095 4.62516 8.25524L4.03023 7.78124C3.83157 7.62296 3.54578 7.63879 3.36581 7.81805L1.5615 9.615L1.56499 9.63114C1.60465 9.77742 1.70903 9.89707 1.84549 9.95746H8.15451C8.31302 9.88732 8.42824 9.73722 8.44902 9.55831L8.45238 9.5V8.0468L6.97355 7.02099C6.76303 6.86065 6.46403 6.8921 6.29149 7.09273ZM7.95238 3.5H2.04762C1.7912 3.5 1.57987 3.69302 1.55098 3.94169L1.54762 4L1.5475 8.153L3.27247 6.43544C3.44547 6.26312 3.71236 6.23483 3.91617 6.35923L3.97008 6.39695L4.5073 6.82516C4.71748 6.99269 5.0225 6.96408 5.19787 6.76039L6.1261 5.68221C6.30699 5.47201 6.62121 5.43914 6.842 5.60731L8.452 6.68692L8.45238 4C8.45238 3.72386 8.22852 3.5 7.95238 3.5ZM11 0.5C11.2761 0.5 11.5 0.723858 11.5 1V7C11.5 7.27614 11.2761 7.5 11 7.5C10.7239 7.5 10.5 7.27614 10.5 7V1.5H2.5C2.22386 1.5 2 1.27614 2 1C2 0.723858 2.22386 0.5 2.5 0.5H11ZM3 4C3.55228 4 4 4.44772 4 5C4 5.55228 3.55228 6 3 6C2.44772 6 2 5.55228 2 5C2 4.44772 2.44772 4 3 4ZM3 4.85714C2.92109 4.85714 2.85714 4.92109 2.85714 5C2.85714 5.07891 2.92109 5.14286 3 5.14286C3.07891 5.14286 3.14286 5.07891 3.14286 5C3.14286 4.92109 3.07891 4.85714 3 4.85714Z'
            fill='white'
          />
        </svg>
        <span>{Children.count(children)}</span>
      </div>
    );
  };

  return (
    <div className={groupClass}>
      {Children.toArray(children).map((child, index) => {
        const Child = child as React.ReactElement<ImageProps>;
        if (pile) {
          if (index === 0) return renderGroupItem(Child, index);

          if (index > 2) return null;

          return renderPile(Child, index);
        } else {
          return renderGroupItem(Child, index);
        }
      })}
      {showCount && pile && renderGroupCount()}
    </div>
  );
};

export default ImageGroup;
