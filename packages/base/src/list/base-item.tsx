import { isValidElement, Fragment } from 'react';
import { BaseItemProps, ExtraProps, MetaProps } from './base-item.type';
import { util } from '@sheinx/hooks';
import Image from '../image';
import clsx from 'clsx';
const { isFunc, isString } = util;

const Meta = (props: MetaProps) => {
  const listClasses = props.jssStyle?.list?.();

  const renderAvatar = () => {
    const { avatar } = props;
    if (!avatar) return null;
    if (isValidElement(avatar)) {
      return <div className={listClasses?.baseItemMetaAvatar}>{avatar}</div>;
    }
    if (isFunc(avatar)) {
      return <div className={listClasses?.baseItemMetaAvatar}>{avatar()}</div>;
    }
    if (isString(avatar))
      return (
        <div className={listClasses?.baseItemMetaAvatar}>
          <Image lazy src={avatar} jssStyle={props.jssStyle} />
        </div>
      );

    return null;
  };

  const renderTitle = () => {
    const { title, desc } = props;
    if (!title) return null;
    const flag = !desc;
    return (
      <div
        className={clsx(
          listClasses?.baseItemMetaTitle,
          flag && listClasses?.baseItemMetaCenter,
        )}
      >
        {title}
      </div>
    );
  };

  const renderDesc = () => {
    const { desc, title } = props;
    if (!desc) return null;
    const flag = !title;
    return (
      <div
        className={clsx(
          listClasses?.baseItemMetaDesc,
          flag && listClasses?.baseItemMetaCenter,
        )}
      >
        {desc}
      </div>
    );
  };

  const renderContent = () => {
    const { content } = props;
    if (!content) return null;
    if (isFunc(content)) return <div className={listClasses?.baseItemMetaContent}>{content()}</div>;
    return <div className={listClasses?.baseItemMetaContent}>{content}</div>;
  };

  const { className, content, title, desc } = props;
  if (!content && !title && !desc)
    return <div className={clsx(listClasses?.baseItemMeta, className)}>{renderAvatar()}</div>;
  if (!title && !desc)
    return (
      <div
        className={clsx(
          listClasses?.baseItemMeta,
          listClasses?.baseItemMetaIncludes,
          className,
        )}
      >
        {renderAvatar()}
        {renderContent()}
      </div>
    );
  return (
    <div className={clsx(listClasses?.baseItemMeta, className)}>
      <div className={listClasses?.baseItemMetaContainer}>
        {renderAvatar()}
        <div className={listClasses?.baseItemMetaMeta}>
          {renderTitle()}
          {renderDesc()}
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

const Extra = (props: ExtraProps) => {
  const listClasses = props.jssStyle?.list?.();
  const { extra = [] } = props;
  const render = extra.map((value, index) => (
    <Fragment key={index}>
      {value}
      {index < props.extra.length - 1 ? <div className={listClasses?.baseItemExtraSplit} /> : null}
    </Fragment>
  ));

  return <div className={listClasses?.baseItemExtra}>{render}</div>;
};

const BaseItem = (props: BaseItemProps) => {
  const listClasses = props.jssStyle?.list?.();

  const { className, extra, ...reset } = props;

  if (!extra) return <Meta {...reset} className={className} />;
  return (
    <div className={clsx(listClasses?.baseItem, className)}>
      <Meta {...reset} />
      <Extra extra={extra} jssStyle={props.jssStyle} />
    </div>
  );
};

export default BaseItem;
