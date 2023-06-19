/**
 * cn - 基本用法
 *    --基础 radio 用法
 * en - Base
 *    --Base radio
 */
import { Radio } from 'shineout';
export default () => {
  const value: string = 'red';
  return (
    <>
      <Radio checked={value === 'red'}>red</Radio>
      <Radio disabled checked={value === 'red'}>
        red
      </Radio>
      <Radio checked={value === 'blue'}>blue</Radio>
      <Radio disabled checked={value === 'green'}>
        green
      </Radio>
    </>
  );
};
