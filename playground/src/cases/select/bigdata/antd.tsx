import { Select } from 'antd';
import { bigOptions } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select
        style={{ width: 300 }}
        options={bigOptions}
        placeholder='Static lineHeight'
        allowClear
        showSearch
        filterOption={(v: string, o?: { label?: unknown }) => String(o?.label).indexOf(v) >= 0}
      />
    </span>
  );
}
