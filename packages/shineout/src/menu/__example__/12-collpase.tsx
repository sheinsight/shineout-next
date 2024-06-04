/**
 * cn - 折叠菜单
 *    -- 通过设置 `collapse` 来控制菜单折叠。通过 `renderCollapse` 渲染折叠后的菜单内容
 * en - Collapse
 *    -- Set `collapse` to control the menu collapse. Use `renderCollapse` to render the content of the collapsed menu
 */

import React, { useState } from 'react';
import { Menu, Button, TYPE, Switch } from 'shineout';

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

const homeIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.0218 2.00024L12.0602 2.00181C12.0752 2.00272 12.0902 2.00396 12.1052 2.00555C12.1245 2.00759 12.1439 2.01021 12.1632 2.0134C12.1834 2.01674 12.2037 2.02076 12.224 2.02541C12.2448 2.0302 12.2653 2.03563 12.2858 2.04174C12.3283 2.05443 12.3704 2.07012 12.4115 2.08874L12.5207 2.14669L12.6238 2.21913L22.6089 10.2191C23.617 11.0268 22.4745 12.5198 21.4564 11.8501L21.3614 11.7809L20.8121 11.3406C20.7259 11.2715 20.6001 11.2854 20.531 11.3716C20.5025 11.4071 20.487 11.4512 20.487 11.4967L20.4874 20C20.4874 21.4529 19.5572 22.0052 18.6068 21.9933L18.4903 22H5.50965C4.47075 22 3.51262 21 3.51262 20L3.51228 11.4968C3.51228 11.3864 3.42273 11.2968 3.31227 11.2968C3.26677 11.2968 3.22262 11.3124 3.18713 11.3408L2.63862 11.7809C1.63051 12.5886 0.426888 11.1445 1.3028 10.2968L1.39108 10.2191L11.3762 2.21913L11.4793 2.14669C11.4818 2.14511 11.4844 2.14354 11.487 2.14199L11.3762 2.21913C11.4218 2.18266 11.4697 2.15074 11.5194 2.12338C11.5462 2.10862 11.5735 2.09517 11.6013 2.08305C11.6177 2.0759 11.6343 2.06919 11.651 2.06295C11.6756 2.05379 11.7003 2.04564 11.7253 2.03849C11.7402 2.03424 11.7551 2.03033 11.7702 2.02678C11.7978 2.02024 11.8258 2.01488 11.8539 2.01072C11.8674 2.00874 11.8807 2.00705 11.894 2.00563C11.9258 2.00224 11.9579 2.00037 11.99 2C12.0004 2 12.0111 2 12.0218 2.00024ZM11.6874 4.53046L5.69668 9.32987C5.57823 9.42477 5.5093 9.56833 5.5093 9.72011L5.50964 19.5C5.50966 19.7761 5.73352 20 6.00965 20H8.00484C8.28097 20 8.50482 19.7761 8.50487 19.5L8.5052 14C8.5052 13.4872 8.89066 13.0645 9.38726 13.0067L9.4893 13.0008C9.49891 13.0003 9.50852 13 9.51814 13H14.4963C15.0478 13 15.4948 13.4477 15.4948 14L15.4945 19.5C15.4944 19.7761 15.7183 20 15.9944 20C15.9944 20.0001 15.9944 20 15.9944 20L17.9903 20C18.2665 20 18.4903 19.7761 18.4903 19.5V9.72009C18.4903 9.56833 18.4214 9.42478 18.303 9.32988L12.3126 4.53047C12.1299 4.38408 11.8701 4.38408 11.6874 4.53046ZM12.4978 15H11.5022C10.9499 15 10.5022 15.4477 10.5022 16V19.5C10.5022 19.7761 10.7261 20 11.0022 20H12.9978C13.2739 20 13.4978 19.7761 13.4978 19.5V16C13.4978 15.4477 13.0501 15 12.4978 15Z'
      fill='currentColor'
    />
  </svg>
);

const tagIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M13.9994 2.00219L19.7686 2.24C20.7799 2.28169 21.6007 3.07247 21.68 4.08162L22.1572 10.1534C22.203 10.7366 21.9912 11.3106 21.5775 11.7243L11.6922 21.6097C10.9111 22.3907 9.64478 22.3907 8.86373 21.6097L2.58579 15.3317C1.80474 14.5507 1.80474 13.2844 2.58579 12.5033L12.5028 2.58628C12.8981 2.19097 13.4408 1.97916 13.9994 2.00219ZM13.917 4.00049L4.70711 13.2104C4.31658 13.6009 4.31658 14.2341 4.70711 14.6246L9.57084 19.4884C9.96136 19.8789 10.5945 19.8789 10.9851 19.4884L20.1633 10.3101L19.7209 4.68044C19.7011 4.42816 19.4959 4.23046 19.2431 4.22004L13.917 4.00049ZM15.3854 5.83727C16.7661 5.83727 17.8854 6.95655 17.8854 8.33727C17.8854 9.71798 16.7661 10.8373 15.3854 10.8373C14.0047 10.8373 12.8854 9.71798 12.8854 8.33727C12.8854 6.95655 14.0047 5.83727 15.3854 5.83727ZM15.3854 7.83727C15.1093 7.83727 14.8854 8.06112 14.8854 8.33727C14.8854 8.61341 15.1093 8.83727 15.3854 8.83727C15.6615 8.83727 15.8854 8.61341 15.8854 8.33727C15.8854 8.06112 15.6615 7.83727 15.3854 7.83727Z'
      fill='currentColor'
    />
  </svg>
);

const githubIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.0011 2.00049C6.47548 1.9982 2 6.5931 2 12.2644C2 16.7492 4.79969 20.5614 8.69869 21.9615C9.22377 22.0969 9.14334 21.7136 9.14334 21.452V19.6732C6.11127 20.0381 5.98838 17.9771 5.78505 17.6328C5.37392 16.9121 4.40197 16.7285 4.69244 16.3842C5.38286 16.0193 6.08669 16.4761 6.90225 17.7131C7.49212 18.6106 8.64283 18.4591 9.22601 18.3099C9.35337 17.7705 9.62596 17.2885 10.0013 16.9144C6.85979 16.3361 5.55044 14.3668 5.55044 12.0257C5.55044 10.8896 5.91465 9.84534 6.62965 9.00302C6.17384 7.61445 6.6721 6.42555 6.73914 6.24883C8.03731 6.12948 9.38688 7.20361 9.4919 7.28853C10.2292 7.08426 11.0716 6.97639 12.0145 6.97639C12.9619 6.97639 13.8065 7.08885 14.5506 7.29542C14.803 7.09803 16.0543 6.17538 17.2609 6.28784C17.3257 6.46457 17.8128 7.62592 17.3838 8.99613C18.1077 9.84075 18.4764 10.8942 18.4764 12.0326C18.4764 14.3783 17.1581 16.3498 14.0076 16.919C14.5327 17.4515 14.8589 18.1905 14.8589 19.0076V21.5897C14.8768 21.7962 14.8589 22.0005 15.1941 22.0005C19.1512 20.6303 22 16.7905 22 12.2667C22 6.5931 17.5223 2.00049 12.0011 2.00049Z'
      fill='currentColor'
    />
  </svg>
);

const flagIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M20.8307 1.01559C21.0306 0.979794 21.224 1.00728 21.3942 1.08123C21.4003 1.08519 21.4073 1.08828 21.4143 1.09145C21.5175 1.13795 21.611 1.20233 21.6919 1.2799C21.697 1.28477 21.7021 1.28976 21.7072 1.29482L21.7221 1.31005C21.7996 1.39091 21.864 1.48449 21.9114 1.58697C21.9137 1.59469 21.9168 1.60169 21.9198 1.60872C22.0144 1.8233 22.0335 2.07618 21.9439 2.33228L21.9631 2.27191C21.9593 2.2857 21.9551 2.29942 21.9507 2.31306L21.9439 2.33228L15.2939 21.3323C14.9947 22.1871 13.8041 22.2357 13.4362 21.4081L9.79203 13.2089L1.59389 9.56574C0.805676 9.21542 0.812201 8.11879 1.55305 7.75669L1.66968 7.70807L20.6697 1.05807C20.6764 1.05573 20.683 1.05347 20.6897 1.05128C20.7026 1.04688 20.7163 1.04273 20.7301 1.03888C20.7588 1.03075 20.7868 1.02405 20.8147 1.01859C20.8176 1.01863 20.8206 1.01807 20.8236 1.01753L20.8307 1.01559ZM18.608 5.808L11.742 12.674L14.239 18.2909L18.608 5.808ZM17.195 4.391L4.71003 8.76193L10.327 11.259L17.195 4.391Z'
      fill='currentColor'
    />
  </svg>
);
const App: React.FC = () => {
  const [active, setActive] = useState('10');
  const [collapse, setCollapse] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [dis, setDis] = useState(false);

  const handleClick = (d: MenuItem) => setActive(d.id);

  const renderItem: MenuRenderItem = (d: MenuItem) => {
    return d.title;
  };

  interface IconList {
    [x: number]: React.ReactNode;
  }
  const Icons: IconList = {
    6: tagIcon,
    1: homeIcon,
    3: flagIcon,
    2: githubIcon,
    11: tagIcon,
  };

  const renderIcon: MenuProps['renderIcon'] = (da) => {
    if (da.title.startsWith('Navigation')) {
      return Icons[Number(da.id)];
    }
    return null;
  };

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;
  const theme = isDark ? 'dark' : 'light';

  return (
    <div>
      <Switch
        value={isDark}
        onChange={setIsDark}
        content={['Dark', 'Light']}
        style={{ marginInlineEnd: '8px' }}
      />
      <Switch value={dis} onChange={setDis} content={['disabled', 'effect']} />
      <div>
        <Button
          type='primary'
          style={{ marginBottom: 12, marginTop: 12 }}
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? (
            <svg
              viewBox='64 64 896 896'
              focusable='false'
              data-icon='menu-unfold'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z'></path>
            </svg>
          ) : (
            <svg
              viewBox='64 64 896 896'
              focusable='false'
              data-icon='menu-fold'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z'></path>
            </svg>
          )}
        </Button>
      </div>

      <Menu
        key={theme}
        header={
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  background: '#197afa',
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: '#fff',
                  lineHeight: '28px',
                  fontWeight: '500',
                  fontSize: '14',
                  fontFamily: 'PingFang SC',
                  flexShrink: 0,
                }}
              >
                S
              </div>
              {collapse ? null : (
                <div style={{ marginInlineStart: '12px', fontSize: '16px', fontWeight: 500 }}>System Name</div>
              )}
            </div>
            <Menu.Search
              onSearchClick={() => {
                if (collapse) setCollapse(false);
              }}
              disabled={dis}
              collpase={collapse}
              theme={theme}
              placeholder='请输入关键字'
              clearable
            />
          </>
        }
        theme={theme}
        style={{ borderRight: '1px solid #ebebeb', width: 200, zIndex: '2000' }}
        keygen='id'
        collapse={collapse}
        data={data}
        disabled={(d) => d.id === '1'}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        renderItem={renderItem}
        renderIcon={renderIcon}
      />
    </div>
  );
};

export default App;
