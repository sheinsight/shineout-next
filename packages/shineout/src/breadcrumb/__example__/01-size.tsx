/**
 * cn - 尺寸
 *    -- 通过设置 fontSize 设置尺寸
 * en - Size
 *    -- set fontSize to change size
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  { title: 'Handler', onClick: () => Message.info('clicked') },
  { title: 'Self' },
];
const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} style={{ fontSize: 12 }} />
    <Breadcrumb data={data} style={{ fontSize: 14, marginTop: 24 }} />
    <Breadcrumb data={data} style={{ fontSize: 16, marginTop: 24 }} />
  </div>
);

export default App;
