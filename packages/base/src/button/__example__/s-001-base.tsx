/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle } from '@sheinx/shineout-style';
// import Icon from '../../icons';

export default () => {
  const jssStyle = useButtonStyle();
  const jssGroupStyle = useButtonGroupStyle();

  // const randerDropdown = (type: any) => {
  //   return (
  //     <div style={{ display: 'inline-block' }} className='so-dropdown'>
  //       <Button jssStyle={jssStyle} type={type} disabled>
  //         <span style={{ width: 10, height: 10, display: 'inline-block' }}>{Icon.Close}</span>
  //       </Button>
  //     </div>
  //   );
  // };
  return (
    <div>
      <Button.Group jssStyle={jssGroupStyle} outline mode='outline' type='secondary'>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
      </Button.Group>
    </div>
  );
};
