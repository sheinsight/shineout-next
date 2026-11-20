import { Cascader } from 'antd-v5';
import { antdFieldNames, generateBigTreeData } from '../_shared/data';

const bigData = generateBigTreeData(2, 50);

// antd 的 Cascader 列表没有 virtual 开关，每一列都完整渲染
export default function Demo() {
  return <Cascader options={bigData} fieldNames={antdFieldNames} showSearch />;
}
