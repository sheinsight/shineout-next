/**
 * cn - 折叠菜单
 *    -- 通过设置 `collapse` 来控制菜单折叠。通过 `renderCollapse` 渲染折叠后的菜单内容
 * en - Base
 *    -- Menu generates menu items through data
 */

import React, { useState } from 'react';
import { Menu, Button, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
  {
    id: '11',
    title: 'Navigation Five',
  },
];

const icon = (
  <svg
    style={{ width: 14 }}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M8.07113 21.1129V15.8955C8.07113 15.342 8.291 14.8112 8.68238 14.4198C9.07376 14.0284 9.60458 13.8085 10.1581 13.8085H14.332C14.8855 13.8085 15.4163 14.0284 15.8077 14.4198C16.1991 14.8112 16.4189 15.342 16.4189 15.8955V21.1129H19.5494V14.852C19.5494 14.5752 19.6593 14.3098 19.855 14.1141C20.0507 13.9185 20.3161 13.8085 20.5929 13.8085C20.8696 13.8085 21.135 13.9185 21.3307 14.1141C21.5264 14.3098 21.6363 14.5752 21.6363 14.852V21.2433C21.6363 22.3285 20.7494 23.1998 19.6652 23.1998H4.82591C4.56793 23.2009 4.31226 23.1512 4.07351 23.0534C3.83476 22.9557 3.61761 22.8119 3.43446 22.6302C3.25131 22.4485 3.10576 22.2325 3.00612 21.9945C2.90647 21.7565 2.85469 21.5013 2.85374 21.2433V14.852C2.85374 14.5752 2.96368 14.3098 3.15937 14.1141C3.35506 13.9185 3.62047 13.8085 3.89722 13.8085C4.17396 13.8085 4.43938 13.9185 4.63507 14.1141C4.83076 14.3098 4.94069 14.5752 4.94069 14.852V21.1129H8.07113ZM10.1581 21.1129H14.332V15.8955H10.1581V21.1129ZM11.6388 0.437397C11.7281 0.312268 11.8439 0.20841 11.978 0.133248C12.1121 0.0580866 12.2611 0.0134776 12.4144 0.00261085C12.5678 -0.00825595 12.7216 0.0148878 12.8649 0.0703873C13.0083 0.125887 13.1376 0.212371 13.2436 0.323658L22.9584 10.5247C23.053 10.6239 23.1271 10.7408 23.1764 10.8686C23.2258 10.9964 23.2496 11.1328 23.2463 11.2698C23.243 11.4068 23.2127 11.5418 23.1572 11.6671C23.1018 11.7925 23.0222 11.9056 22.9229 12.0002C22.8237 12.0947 22.7069 12.1688 22.579 12.2182C22.4512 12.2676 22.3149 12.2913 22.1779 12.288C22.0408 12.2847 21.9058 12.2545 21.7805 12.199C21.6552 12.1435 21.542 12.0639 21.4475 11.9647L12.4579 2.52539L2.764 11.7581C2.5635 11.949 2.29535 12.0525 2.01854 12.0458C1.74174 12.039 1.47896 11.9226 1.288 11.7221C1.09704 11.5216 0.993559 11.2534 1.00031 10.9766C1.00706 10.6998 1.1235 10.437 1.324 10.2461L11.525 0.53131C11.5616 0.496875 11.5991 0.465571 11.6388 0.437397Z' />
  </svg>
);

const App: React.FC = () => {
  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);

  const handleClick = (d: MenuItem) => setActive(d.id);

  const renderItem: MenuRenderItem = (d: MenuItem) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', height: 22, alignItems: 'center', marginRight: 12 }}>
          {icon}
        </span>
        <span>{d.title}</span>
      </div>
    );
  };

  const renderCollapse = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </div>
  );

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  return (
    <div>
      <Button style={{ marginBottom: 12 }} onClick={() => setCollapse(!collapse)}>
        {collapse ? 'open' : 'close'}
      </Button>
      <div style={{ display: 'flex', gap: 24 }}>
        <Menu
          style={{ borderRight: '1px solid #ebebeb', width: 200, zIndex: '2000' }}
          keygen='id'
          collapse={collapse}
          data={data}
          disabled={(d) => d.id === '1'}
          inlineIndent={24}
          active={checkActive}
          onClick={handleClick}
          renderItem={renderItem}
          renderCollapse={renderCollapse}
        />
        <Menu
          style={{ borderRight: '1px solid #ebebeb', width: 200 }}
          keygen='id'
          theme='dark'
          collapse={collapse}
          data={data}
          disabled={(d) => d.id === '1'}
          inlineIndent={24}
          active={checkActive}
          onClick={handleClick}
          renderItem={renderItem}
          renderCollapse={renderCollapse}
        />
      </div>
    </div>
  );
};

export default App;
