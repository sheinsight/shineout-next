import React, { cloneElement, isValidElement } from 'react';
import { util } from '@sheinx/hooks';
import { DropdownNode, ItemProps } from './dropdown.type';

const DefaultProps = {
  data: {},
  renderItem: 'content',
};

interface ItemLinkProps {
  href?: string;
  target?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

class Item extends React.PureComponent<ItemProps> {
  static defaultProps = DefaultProps;

  constructor(props: ItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.onClick) return;
    this.props.onClick(this.props.data);
  }

  render() {
    const { itemClassName, renderItem, width, columns } = this.props;
    const data = (this.props.data || {}) as DropdownNode;

    const aWidth = width && columns ? (width - 2) / columns : undefined;
    const props: ItemLinkProps = {
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
      style: (aWidth ? { display: 'inline-block', width: aWidth } : null) as React.CSSProperties,
    };
    if (data.url) props.href = data.url;

    let content;
    if (isValidElement(data)) {
      content = data;
    } else {
      content = util.render(renderItem, data);
    }

    if (isValidElement(content)) {
      return cloneElement(content, Object.assign(props, content.props));
    }
    return <a {...props}>{content}</a>;
  }
}

export default Item;
