/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Switch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';

export default () => {
  const switchStyle = useSwitchStyle();
  return (
    <div>
      <div>
        <Switch jssStyle={{ switch: switchStyle }} content={['开', '关']} />
        <Switch jssStyle={{ switch: switchStyle }} />
      </div>
      <div>
        禁用
        <Switch disabled checked jssStyle={{ switch: switchStyle }} content={['开', '关']} />
        <Switch disabled jssStyle={{ switch: switchStyle }} content={['开', '关']} />
      </div>
      <div>
        loading
        <Switch loading checked jssStyle={{ switch: switchStyle }} content={['开', '关']} />
        <Switch loading jssStyle={{ switch: switchStyle }} content={['开', '关']} />
      </div>
      <div>
        大小
        <Switch jssStyle={{ switch: switchStyle }} size={'large'} />
        <Switch jssStyle={{ switch: switchStyle }} />
        <Switch jssStyle={{ switch: switchStyle }} size={'small'} />
      </div>
    </div>
  );
};
