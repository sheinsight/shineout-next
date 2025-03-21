import React from 'react';
import classNames from 'classnames';
import { EmptyProps } from './empty.type';
import { renderNoData } from './empty-image';
import { getLocale, useConfig } from '../config';

const Empty = (props: EmptyProps) => {
  const { jssStyle, style, className, imgSrc, icon, description, ...rest } = props;
  const { locale } = useConfig();

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

    return <div className={styles?.image}>{icon || renderNoData()}</div>;
  };

  const renderDescription = () => {
    if (description === false) {
      return null;
    }
    return <div className={styles?.description}>{description || getLocale(locale, 'noData')}</div>;
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
