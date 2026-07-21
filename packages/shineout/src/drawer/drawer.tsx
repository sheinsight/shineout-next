import React from 'react';
import Modal from '../modal';
import { useConfig } from '@sheinx/base';

import { DrawerProps } from './drawer.type';

export default (props: DrawerProps) => {
  const { position = 'right' } = props;
  const config = useConfig();

  // Drawer 有独立的全局 Semantic DOM 配置（config.drawer）
  // 合并到 classNames/styles 中，优先级：props > config.drawer
  const mergedClassNames = config.drawer?.classNames
    ? { ...config.drawer.classNames, ...props.classNames }
    : props.classNames;
  const mergedStyles = config.drawer?.styles
    ? { ...config.drawer.styles, ...props.styles }
    : props.styles;

  return <Modal {...props} position={position} classNames={mergedClassNames} styles={mergedStyles} />;
};
