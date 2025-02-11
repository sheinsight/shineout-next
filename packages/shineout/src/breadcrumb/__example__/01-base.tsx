/**
 * cn - 基本用法
 *    -- 组件调用通过 json 数据配置
 * en - Base
 *    -- The basic usage
 */

import React from 'react';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: 'Button', url: '/#/cn/component/shineout/Button?tab=examples' },
  { title: 'Handler', onClick: () => Message.info('clicked') },
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb data={data} />;

export default App;
