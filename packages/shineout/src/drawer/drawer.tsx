import React from 'react';
import Modal from '../modal';

import { DrawerProps } from './drawer.type';

export default (props: DrawerProps) => {
  const { position = 'right' } = props;
  return <Modal {...props} position={position} />;
};
