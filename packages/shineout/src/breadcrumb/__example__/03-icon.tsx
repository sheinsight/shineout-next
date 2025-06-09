/**
 * cn - 自定义图标
 *    -- 带图标的面包屑
 * en - icon
 *    -- Breadcrumbs with icons
 */

import React from 'react';
import { Breadcrumb, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const home = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_423_8269715856220)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.9474 21.9669H5.69595C5.14367 21.9669 4.69595 21.5192 4.69595 20.9669L3.70144 11.0946C2.64017 11.5005 1.82062 10.1075 2.70137 9.38964L11.4079 2.29327C11.7893 1.94652 12.3719 1.94652 12.7533 2.29327L21.9668 9.45261C22.8386 10.13 22.131 11.5127 21.0716 11.2018L20.7063 11.0946L19.9474 20.9669C19.9474 21.5192 19.4997 21.9669 18.9474 21.9669ZM18.0221 19.0479C17.9799 19.5671 17.5462 19.9669 17.0253 19.9669H13.0806V14.6818C13.0806 14.1295 12.6328 13.6818 12.0806 13.6818C11.5283 13.6818 11.0806 14.1295 11.0806 14.6818V19.9669H7.59441C7.08341 19.9669 6.65462 19.5817 6.60012 19.0736L5.67412 10.441C5.63896 10.1132 5.76763 9.78907 6.01809 9.57466L11.456 4.91934C11.8189 4.60865 12.3509 4.59806 12.7259 4.89405L18.3633 9.34372C18.626 9.55108 18.7675 9.8761 18.7404 10.2097L18.0221 19.0479Z'
      ></path>
    </g>
    <defs>
      <clipPath>
        <rect width='24' height='24' transform='translate(0.00195312)'></rect>
      </clipPath>
    </defs>
  </svg>
);

const tag = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill='currentColor'
      d='M13.9193 1.90465H19.7103C20.7498 1.90465 21.8711 2.77051 21.843 3.90296L22.0771 10.0559C22.1229 10.6391 21.9111 11.2131 21.4975 11.6268L11.6121 21.5121C10.831 22.2932 9.5647 22.2932 8.78365 21.5121L2.50571 15.2342C1.72466 14.4532 1.72466 13.1868 2.50571 12.4058L12.4227 2.48874C12.8181 2.09344 13.3608 1.88163 13.9193 1.90465ZM13.837 3.90296L4.62703 13.1129C4.2365 13.5034 4.2365 14.1366 4.62703 14.5271L9.49076 19.3908C9.88128 19.7814 10.5144 19.7814 10.905 19.3908L20.0833 10.2125L19.9054 4.60225C19.9054 4.17159 19.4508 3.80356 18.9364 3.80356L13.837 3.90296ZM15.3053 5.73973C16.686 5.73973 17.8053 6.85902 17.8053 8.23973C17.8053 9.62044 16.686 10.7397 15.3053 10.7397C13.9246 10.7397 12.8053 9.62044 12.8053 8.23973C12.8053 6.85902 13.9246 5.73973 15.3053 5.73973ZM15.3053 7.73973C15.0292 7.73973 14.8053 7.96359 14.8053 8.23973C14.8053 8.51587 15.0292 8.73973 15.3053 8.73973C15.5815 8.73973 15.8053 8.51587 15.8053 8.23973C15.8053 7.96359 15.5815 7.73973 15.3053 7.73973Z'
    ></path>
  </svg>
);

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { icon: home, url: '#home' },
  { icon: tag, title: 'Custom', url: 'https://www.google.com' },
  { icon: tag, title: 'Demo' },
];

const style = { display: 'flex', alignItems: 'center' };
const data2: BreadcrumbProps<BreadcrumbData>['data'] = [
  {
    title: (
      <a style={style} href='#home'>
        Home&nbsp;{home}{' '}
      </a>
    ),
  },
  {
    title: (
      <a style={style} href='https://www.google.com'>
        Custom&nbsp;{tag}
      </a>
    ),
  },
  { title: <span style={style}>Custom&nbsp;{tag}</span> },
];

const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} style={{ marginBottom: 24 }} />
    <Breadcrumb data={data2} />
  </div>
);

export default App;
