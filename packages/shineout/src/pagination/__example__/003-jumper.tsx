/**
 * cn - 跳转
 *    -- 通过配置`layout`属性的`jumper`值展示跳转输入框，借助`text`属性自定义文案
 * en - Jumper
 *    -- Show jumper by setting `jumper` value of `layout` property.
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 100;
  const layout = ['links', 'jumper'];
  const text = {
    jumper: 'Go to {input} Page',
  };
  return (
    <Pagination total={total} text={text} layout={layout} defaultCurrent={1} span={3}></Pagination>
  );
};
