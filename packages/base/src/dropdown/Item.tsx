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
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
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
    if (data.disabled) {
      e.preventDefault();
      return;
    }
    if (!this.props.onClick) return;
    this.props.onClick(this.props.data);
  }

  render() {
    const { itemClassName, renderItem } = this.props;
    const data = (this.props.data || {}) as DropdownNode;

    const props: ItemLinkProps = {
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
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
