/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */
import { useState } from 'react';
import { Pagination, LayoutType } from '@sheinx/base';
import { usePaginationStyle, useButtonStyle, useInputStyle } from '@sheinx/shineout-style';

export default () => {
  const [current, setCurrent] = useState(10);
  const info = () => {
    return <div>info🐷</div>;
  };

  // const layout: LayoutType = ['links', 'jumper', 'simple'];
  const layout: LayoutType = [info, 'links', 'jumper'];
  // const layout: LayoutType = ['simple'];

  const paginationStyle = usePaginationStyle();
  const buttonStyle = useButtonStyle();
  const inputStyle = useInputStyle();
  const jssStyle = {
    input: inputStyle,
    button: buttonStyle,
    pagination: paginationStyle,
  };

  const text = {
    next: 'Next',
    page: '/ page',
    prev: 'Previous',
    jumper: '跳转至 {input} 页',
  };

  return (
    <Pagination
      jssStyle={jssStyle}
      mode='outline'
      align='right'
      size='small'
      // disabled
      layout={layout}
      total={1000}
      // defaultCurrent={30}
      current={current}
      onChange={setCurrent}
      span={10}
      text={text}
    ></Pagination>
  );
};
