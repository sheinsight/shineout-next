'use client';

import React, { cloneElement, isValidElement } from 'react';
import { util } from '@sheinx/hooks';
import { DropdownNode, ItemProps } from './dropdown.type';
import classNames from 'classnames';

const DefaultProps = {
  data: {},
  renderItem: 'content',
};

interface ItemLinkProps {
  href?: string;
  target?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  dir?: 'ltr' | 'rtl';
}

interface Props {
  className?: string;
  [key: string]: any;
}

class Item extends React.PureComponent<ItemProps> {
  static defaultProps = DefaultProps;

  constructor(props: ItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent) {
    const data = (this.props.data || {}) as DropdownNode;
    this.props.handleBlur();
    e.stopPropagation();
    if (data.disabled) {
      e.preventDefault();
      return;
    }
    if (!this.props.onClick) return;
    this.props.onClick(this.props.data);
  }

  render() {
    const { itemClassName, renderItem, direction } = this.props;
    const data = (this.props.data || {}) as DropdownNode;

    const props: ItemLinkProps = {
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
      dir: direction,
    };
    if (data.url) props.href = data.url;

    let content;
    if (isValidElement(data)) {
      content = data;
    } else {
      content = util.render(renderItem, data);
    }

    if (isValidElement(content)) {
      const { className: propsClassName = '', ...otherProps } = props as Props;
      const { className: contentPropsClassName = '', ...otherContentProps } =
        content.props as Props;

      const className = classNames(propsClassName, contentPropsClassName);

      return cloneElement(
        content,
        Object.assign(otherProps, otherContentProps, {
          className,
        }),
      );
    }

    return <a {...props}>{content}</a>;
  }
}

export default Item;
