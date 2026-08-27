import React from 'react';
import classNames from 'classnames';
import { EmptyProps, EmptySemanticKey } from './empty.type';
import Icons from '../icons';
import { getLocale, useConfig } from '../config';
import { useSemantic } from '../common';

const Empty = (props: EmptyProps) => {
  const { jssStyle, style, className, imgSrc, icon, description, classNames: classNamesProp, styles: stylesProp, ...rest } = props;
  const config = useConfig();
  const { locale, empty } = config;

  const emptyStyles = jssStyle?.empty?.();

  // Semantic DOM
  const [semClass, semStyle] = useSemantic<EmptySemanticKey>(
    classNamesProp,
    stylesProp,
    { classNames: empty?.classNames, styles: empty?.styles },
  );

  const rootClass = classNames(emptyStyles?.rootClass, emptyStyles?.empty, className, semClass('root'));
  const wrapperClass = classNames(emptyStyles?.wrapper);
  const alt = typeof description === 'string' ? description : 'empty';

  const getRootProps = () => {
    return {
      style: { ...style, ...semStyle('root') },
      ...rest,
    };
  };

  const renderImage = () => {
    if(icon === null) return null;
    if (imgSrc) {
      return (
        <div className={classNames(emptyStyles?.image, semClass('icon'))} style={semStyle('icon')}>
          <img src={imgSrc} alt={alt} />
        </div>
      );
    }

    return <div className={classNames(emptyStyles?.image, semClass('icon'))} style={semStyle('icon')}>{icon || empty?.icon?.() || Icons.empty.NoData}</div>;
  };

  const renderDescription = () => {
    // 确定最终使用的description值，优先级：props.description > 全局配置description > 默认locale文本
    const finalDescription = description !== undefined ? description : (empty?.description !== undefined ? empty?.description : getLocale(locale, 'noData'));

    // 如果最终确定的description值为false，则不显示描述
    if (finalDescription === false) {
      return null;
    }

    return <div className={classNames(emptyStyles?.description, semClass('description'))} style={semStyle('description')}>{finalDescription}</div>;
  };

  return (
    <div className={rootClass} {...getRootProps()}>
      <div className={wrapperClass}>
        {renderImage()}
        {renderDescription()}
      </div>
    </div>
  );
};

export default Empty;
