import React from 'react';
import { MenuSearchProps } from './search.type';
import { Input } from '../input';
import classNames from 'classnames';
import Icons from '../icons';

const Search = (props: MenuSearchProps) => {
  const {
    // @ts-ignore
    tip: _tip,
    // @ts-ignore
    status: _status,
    // @ts-ignore
    innerTitle: _innerTitle,
    // @ts-ignore
    placeTitle: _placeTitle,
    onSearchClick,
    collpase,
    theme = 'light',
    jssStyle,
    className,
    style,
    ...rest
  } = props;
  const classes = jssStyle?.menuSearch?.();
  const Search = <div className={classes?.search}>{Icons.menu.Search}</div>;

  return (
    <div
      className={classNames(
        classes?.wrapper,
        theme === 'light' && classes?.wrapperLight,
        theme === 'dark' && classes?.wrapperDark,
        !!rest.disabled && classes?.wrapperDisabled,
        collpase && classes?.wrapperCollapsed,
        className,
      )}
      style={style}
      onClick={!props.disabled ? onSearchClick : undefined}
    >
      <Input prefix={Search} className={classes?.input} {...rest} jssStyle={jssStyle}></Input>
    </div>
  );
};

export default Search;
