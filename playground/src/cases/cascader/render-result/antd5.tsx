import { Cascader } from 'antd-v5';
import { antdFieldNames, cities } from '../_shared/data';

// antd 的 displayRender 参数是整条路径的 label 数组，Shineout 的 renderResult 只对最后一级调用，
// 这里取路径最后一项转大写，显示结果一致
export default function Demo() {
  return (
    <Cascader
      style={{ width: 300 }}
      allowClear
      placeholder='Please select city'
      options={cities}
      fieldNames={antdFieldNames}
      defaultValue={['jiangsu', 'nanjing', 'jiangning']}
      displayRender={(labels) => String(labels[labels.length - 1]).toLocaleUpperCase()}
    />
  );
}
