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
  return (
    <div>
      <div>
        <Switch jssStyle={{ switch: useSwitchStyle }} content={['开', '关']} />
        <Switch jssStyle={{ switch: useSwitchStyle }} />
      </div>
      <div>
        禁用
        <Switch disabled checked jssStyle={{ switch: useSwitchStyle }} content={['开', '关']} />
        <Switch disabled jssStyle={{ switch: useSwitchStyle }} content={['开', '关']} />
      </div>
      <div>
        loading
        <Switch loading checked jssStyle={{ switch: useSwitchStyle }} content={['开', '关']} />
        <Switch loading jssStyle={{ switch: useSwitchStyle }} content={['开', '关']} />
      </div>
      <div>
        大小
        <Switch jssStyle={{ switch: useSwitchStyle }} size={'large'} />
        <Switch jssStyle={{ switch: useSwitchStyle }} />
        <Switch jssStyle={{ switch: useSwitchStyle }} size={'small'} />
      </div>
    </div>
  );
};
