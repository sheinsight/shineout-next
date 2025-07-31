import React from 'react';
import classNames from 'classnames';
import { EmptyProps } from './empty.type';
import Icons from '../icons';
import { getLocale, useConfig } from '../config';

const Empty = (props: EmptyProps) => {
  const { jssStyle, style, className, imgSrc, icon, description, ...rest } = props;
  const { locale, empty } = useConfig();

  const styles = jssStyle?.empty?.();
  const rootClass = classNames(styles?.rootClass, styles?.empty, className);
  const wrapperClass = classNames(styles?.wrapper);
  const alt = typeof description === 'string' ? description : 'empty';

  const getRootProps = () => {
    return {
      style,
      ...rest,
    };
  };

  const renderImage = () => {
    if(icon === null) return null;
    if (imgSrc) {
      return (
        <div className={styles?.image}>
          <img src={imgSrc} alt={alt} />
        </div>
      );
    }

    return <div className={styles?.image}>{icon || empty?.icon || Icons.empty.NoData}</div>;
  };

  const renderDescription = () => {
    // 确定最终使用的description值，优先级：props.description > 全局配置description > 默认locale文本
    const finalDescription = description !== undefined ? description : (empty?.description !== undefined ? empty?.description : getLocale(locale, 'noData'));
    
    // 如果最终确定的description值为false，则不显示描述
    if (finalDescription === false) {
      return null;
    }
    
    return <div className={styles?.description}>{finalDescription}</div>;
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
