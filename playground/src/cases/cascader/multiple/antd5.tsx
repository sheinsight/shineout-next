import { Cascader } from 'antd-v5';
import { antdFieldNames, cities } from '../_shared/data';

const SHOW_CHILD = (Cascader as any).SHOW_CHILD;

// mode 0（级联勾选）→ 默认；mode 2（只要叶子）→ showCheckedStrategy=SHOW_CHILD；
// mode 4（不级联）→ antd 6 的 checkStrictly；antd 5.29 的 rc-cascader 没有这个属性（传了会被透传到 DOM 报警告），所以这里不渲染第三个
export default function Demo() {
  const common = {
    multiple: true,
    allowClear: true,
    style: { width: 300 },
    placeholder: 'Please select city',
    options: cities,
    fieldNames: antdFieldNames,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader {...common} />
      <Cascader {...common} showCheckedStrategy={SHOW_CHILD} />
    </div>
  );
}
