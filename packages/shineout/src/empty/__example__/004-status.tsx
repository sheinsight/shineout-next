/**
 * cn - 推荐状态
 *    -- 推荐空状态的类型
 * en - Status
 *    -- The recommended status type of Empty
 */
import React from 'react';
import { Message } from 'shineout';
import {
  noData,
  noResult,
  noAuth,
  noInternet,
  web404,
  error,
  noDataColorful,
  noResultColorful,
  noAuthColorful,
  noInternetColorful,
  web404Colorful,
  errorColorful,
} from './static/icon';

export default () => {
  const handleCopy = (id: string) => {
    const icon = document.getElementById(id)!.innerHTML;
    navigator?.clipboard?.writeText(icon);
    Message.success('svg 复制成功', 1, {
      hideClose: true,
    });
  };

  const renderIcon = (icon: React.ReactNode, id: string, name: string) => {
    return (
      <div style={{ width: 100, cursor: 'pointer' }} onClick={() => handleCopy(id)}>
        <div id={id}>{icon}</div>
        <div
          style={{
            fontSize: 14,
            color: '#999DA8',
            lineHeight: '20px',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {name}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        style={{
          marginBottom: 32,
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {renderIcon(noData, 'noData', '暂无数据')}
        {renderIcon(noResult, 'noResult', '搜索结果为空')}
        {renderIcon(noAuth, 'noAuth', '暂无权限')}
        {renderIcon(noInternet, 'noInternet', '无网络')}
        {renderIcon(web404, 'web404', '404')}
        {renderIcon(error, 'error', '加载失败')}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {renderIcon(noDataColorful, 'noDataColorful', '暂无数据')}
        {renderIcon(noResultColorful, 'noResultColorful', '搜索结果为空')}
        {renderIcon(noAuthColorful, 'noAuthColorful', '暂无权限')}
        {renderIcon(noInternetColorful, 'noInternetColorful', '无网络')}
        {renderIcon(web404Colorful, 'web404Colorful', '404')}
        {renderIcon(errorColorful, 'errorColorful', '加载失败')}
      </div>
    </div>
  );
};
