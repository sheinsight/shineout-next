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
  systemMaintenanceMultic,
  serverWrongMultic,
  noDataColorful,
  noResultColorful,
  noAuthColorful,
  noInternetColorful,
  web404Colorful,
  errorColorful,
  systemMaintenanceColorful,
  serverWrongColorful
} from './static/icon';

export default () => {
  const handleCopy = (id: string) => {
    const icon = document.getElementById(id)!.innerHTML;
    navigator?.clipboard?.writeText(icon);
    Message.success('svg copied successfully', 1, {
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
          flexWrap: 'wrap',
        }}
      >
        {renderIcon(noData, 'noData', 'No data')}
        {renderIcon(noResult, 'noResult', 'Search results are empty')}
        {renderIcon(noAuth, 'noAuth', 'No permission yet')}
        {renderIcon(noInternet, 'noInternet', 'No network')}
        {renderIcon(web404, 'web404', '404')}
        {renderIcon(error, 'error', 'Failed to load')}
        {renderIcon(systemMaintenanceMultic, 'systemMaintenanceMultic', 'System maintenance')}
        {renderIcon(serverWrongMultic, 'serverWrongMultic', 'Server error')}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {renderIcon(noDataColorful, 'noDataColorful', 'No data')}
        {renderIcon(noResultColorful, 'noResultColorful', 'Search results are empty')}
        {renderIcon(noAuthColorful, 'noAuthColorful', 'No permission yet')}
        {renderIcon(noInternetColorful, 'noInternetColorful', 'No network')}
        {renderIcon(web404Colorful, 'web404Colorful', '404')}
        {renderIcon(errorColorful, 'errorColorful', 'Failed to load')}
        {renderIcon(systemMaintenanceColorful, 'systemMaintenanceColorful', 'System maintenance')}
        {renderIcon(serverWrongColorful, 'serverWrongColorful', 'Server error')}
      </div>
    </div>
  );
};
