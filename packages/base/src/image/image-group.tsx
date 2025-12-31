import React, { Children, cloneElement } from 'react';
import { useImageGroup } from '@sheinx/hooks';
import { ImageClasses } from './image.type';
import { ImageGroupProps } from './image-group.type';
import { Image, ImageProps } from './image.type';
import showGallery from './image-event';
import clsx from 'clsx';
import Icons from '../icons';

const ImageGroup = (props: ImageGroupProps) => {
  const {
    jssStyle,
    children,
    target = '_modal',
    pile,
    showCount = false,
    className,
    style,
    ...rest
  } = props;
  const { getGroupItemProps, getPileProps } = useImageGroup(props);
  const imageClasses = jssStyle?.image?.() || ({} as ImageClasses);

  const targetSet = pile ? '_modal' : target;
  const shouldPreview = targetSet === '_modal';

  const groupClass = clsx(imageClasses?.group, className, {
    [imageClasses?.groupPile]: pile,
  });

  // 图片组成员点击事件
  const handleItemClick = (images: Image[], current: number) => {
    if (shouldPreview) {
      showGallery(jssStyle, images, current, imageClasses.gallery);
    }
  };

  // 渲染图片组成员
  const renderGroupItem = (Child: React.ReactElement<ImageProps>, index: number) => {
    const groupItemProps = getGroupItemProps(Child, index, { ...rest, onClick: handleItemClick });
    return cloneElement(Child, groupItemProps);
  };

  // 渲染图片总数角标
  const renderGroupCount = () => {
    return (
      <div className={clsx(imageClasses?.groupCount)}>
        {Icons.image.Pics}
        <span>{Children.count(children)}</span>
      </div>
    );
  };

  // 渲染堆叠图片
  const renderPile = (Child: React.ReactElement<ImageProps>, index: number) => {
    // 仅渲染第一张，第二张和第三张为占位图
    if (index === 0) return renderGroupItem(Child, index);

    if (index > 2) return null;

    const pileProps = getPileProps(Child, index, {
      className: clsx(imageClasses?.groupPileItem),
    });
    return <div key={index} {...pileProps}></div>;
  };

  return (
    <div className={groupClass} style={style}>
      {Children.toArray(children).map((child, index) => {
        const Child = child as React.ReactElement<ImageProps>;
        if (pile) {
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
