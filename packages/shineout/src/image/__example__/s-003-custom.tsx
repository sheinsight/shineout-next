/**
 * cn -
 *    -- 支持自定义渲染不同状态下的内容：
 *    -- 1、通过设置 `error` 属性自定义渲染加载失败时的内容
 *    -- 2、通过设置 `placeholder` 属性用于自定义渲染加载中时的占位符内容
 * en -
 *    -- Custom rendering of content in different states:
 *    -- 1. `error` is used to customize the content when loading fails
 *    -- 2. `placeholder` is used to customize the placeholder content when loading
 */

import React from 'react';
import { Image, Button } from 'shineout';

export default () => {
  const [key, setKey] = React.useState(0);
  const renderIcon = () => {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.67122 2C7.4076 2 8.00456 2.59695 8.00456 3.33333C8.00456 3.50839 7.97008 3.68173 7.90311 3.84347L7.42418 5L8.6665 6.91387L7.18965 9.80933L8.04044 12.2235C8.2852 12.918 7.92059 13.6794 7.22608 13.9242C7.08371 13.9744 6.93386 14 6.78291 14H1.99984C1.26346 14 0.666504 13.403 0.666504 12.6667V3.33333C0.666504 2.59695 1.26346 2 1.99984 2H6.67122ZM13.9998 2C14.7362 2 15.3332 2.59695 15.3332 3.33333V12.6667C15.3332 13.403 14.7362 14 13.9998 14H10.7806C10.2061 14 9.69625 13.6321 9.51521 13.0869L8.42684 9.80933L9.81843 6.66667L8.6665 5L9.10115 3.04409C9.23672 2.43404 9.7778 2 10.4027 2H13.9998ZM4.13693 9.53628L1.99984 11.664V12C1.99984 12.3682 2.29831 12.6667 2.6665 12.6667H5.84111C6.2093 12.6667 6.50778 12.3682 6.50778 12C6.50778 11.9245 6.49497 11.8496 6.46988 11.7784L5.86317 10.058L5.1383 9.48081C4.83888 9.24225 4.40817 9.26611 4.13693 9.53628ZM10.2945 8.88333L9.95912 9.64247C9.89202 9.79403 9.88378 9.96515 9.93601 10.1225L10.6292 12.2101C10.7197 12.4827 10.9747 12.6667 11.2619 12.6667H13.3332C13.7014 12.6667 13.9998 12.3682 13.9998 12V11.7053L10.2945 8.88333ZM13.3332 3.33333H10.9377C10.6251 3.33333 10.3545 3.55045 10.2868 3.85556L10.1579 4.43666C10.1177 4.61775 10.1548 4.8074 10.2602 4.96002L11.1278 6.21597C11.2597 6.40688 11.2829 6.65263 11.1889 6.86479L10.8145 7.70933L13.9998 10.1347V4C13.9998 3.63181 13.7014 3.33333 13.3332 3.33333ZM5.69471 3.33333H2.6665C2.29831 3.33333 1.99984 3.63181 1.99984 4V10.0933L4.13693 7.96532C4.40817 7.69516 4.83888 7.6713 5.1383 7.90986L6.03493 8.62424C6.0979 8.67442 6.16629 8.71346 6.23767 8.7416L6.95367 7.33688C7.06186 7.1247 7.04864 6.87093 6.919 6.67114L6.11482 5.43183C5.99536 5.24774 5.97415 5.01664 6.05812 4.81387L6.29761 4.23555C6.43549 3.90258 6.27735 3.52087 5.94438 3.38298C5.86522 3.3502 5.78038 3.33333 5.69471 3.33333ZM3.99984 4C4.73621 4 5.33317 4.59696 5.33317 5.33333C5.33317 6.0697 4.73621 6.66667 3.99984 6.66667C3.26347 6.66667 2.6665 6.0697 2.6665 5.33333C2.6665 4.59696 3.26347 4 3.99984 4ZM3.99984 5.14286C3.89463 5.14286 3.80936 5.22813 3.80936 5.33333C3.80936 5.43854 3.89463 5.52381 3.99984 5.52381C4.10504 5.52381 4.19031 5.43854 4.19031 5.33333C4.19031 5.22813 4.10504 5.14286 3.99984 5.14286Z'
          fill='#B3B7C1'
        />
      </svg>
    );
  };
  const renderError = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: 12,
          color: '#666C7C',
        }}
      >
        <div>{renderIcon()}</div>
        <div>Error</div>
      </div>
    );
  };

  const renderPlaceholder = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: '#666C7C',
        }}
      >
        <div>疯狂加载中...</div>
      </div>
    );
  };

  return (
    <>
      <Button
        onClick={() => {
          setKey(key + 1);
        }}
        style={{ marginBottom: 12 }}
      >
        reload
      </Button>

      <div
        key={key}
        style={{
          gap: 8,
          display: 'flex',
        }}
      >
        <Image
          fit='fill'
          width={128}
          height={128}
          target='_modal'
          placeholder={renderPlaceholder()}
          src={`https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png?v=${key}`}
        />
        <Image fit='fill' width={128} height={128} src='error' error={renderError()} />
      </div>
    </>
  );
};
