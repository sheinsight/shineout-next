import { Cascader } from 'antd';
import { antdFieldNames, cities } from '../_shared/data';

const SHOW_CHILD = (Cascader as any).SHOW_CHILD;

// mode 0（级联勾选）→ 默认；mode 2（只要叶子）→ showCheckedStrategy=SHOW_CHILD；
// mode 4（不级联）→ antd 6 的 checkStrictly（5.29 没有这个属性，不渲染）
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
      <Cascader {...common} {...({ checkStrictly: true } as any)} />
    </div>
  );
}
