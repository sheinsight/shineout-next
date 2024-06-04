import React from 'react';
import { MenuSearchProps } from './search.type';
import { Input } from '../input';
import classNames from 'classnames';
import Icons from '../icons';

const Search = (props: MenuSearchProps) => {
  const {
    // Omit the following props
    // @ts-ignore
    tip: _tip, status: _status, innerTitle: _innerTitle, placeTitle: _placeTitle,
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
      onClick={onSearchClick}
    >
      {collpase ? (
        Search
      ) : (
        <Input prefix={Search} className={classes?.input} {...rest} jssStyle={jssStyle}></Input>
      )}
    </div>
  );
};

export default Search;
