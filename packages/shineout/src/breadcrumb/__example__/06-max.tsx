/**
 * cn - 显示省略
 *    -- 通过 max 来指定最多渲染的面包屑数量，超出的部分将显示为省略号
 * en - Max
 *    -- Set max to limit the number of breadcrumbs displayed
 */

import React from 'react';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  {
    title: 'Button',
    onClick: () => {
      Message.info('Button');
    },
  },
  {
    title: 'Dropdown',
    onClick: () => {
      Message.info('Dropdown');
    },
  },
  { title: 'Menu', url: window.location.href },
  {
    title: 'Pagination',
    onClick: () => {
      Message.info('Pagination');
    },
  },
  {
    title: '我是超宽的面包屑🍞🍞🍞',
    onClick: () => {
      Message.info('我是超宽的面包屑🍞🍞🍞');
    },
  },
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb max={3} data={data} />;

export default App;
