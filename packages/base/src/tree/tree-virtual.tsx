import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { KeygenResult, useTree, util, ObjectKey } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeProps } from './tree.type';

const TreeVirtual = <DataItem, Value extends KeygenResult[]>(props: TreeProps<DataItem, Value>) => {
  const { virtual } = props;

  return <div>123123</div>;
};

export default TreeVirtual;
