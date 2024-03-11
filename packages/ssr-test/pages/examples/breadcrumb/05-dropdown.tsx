/**
 * cn - 带有下拉
 *    -- dataItem 为数组时，会渲染为下拉
 * en - Dropdown
 *    -- When dataItem is an array, it will be rendered as a dropdown
 */

import React from 'react';
// import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  // { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  [
    {
      title: 'Dropdown',
      onClick: () => {
        Message.info('Dropdown');
      },
    },
    { title: 'Menu', url: ''},
    { title: 'Pagination' },
    { title: 'Table' },
  ],
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb data={data} />;

export default App;
