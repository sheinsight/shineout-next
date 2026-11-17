import { Select } from 'antd-v5';
import { cities, groupName } from '../_shared/data';

// antd 的分组是 options 里 { label: 分组名, options: [...] }，先把 groupBy 的结果归好类
const groups: Record<string, { value: string; label: string }[]> = {};
cities.forEach((c) => {
  const g = groupName(c.group);
  (groups[g] = groups[g] || []).push({ value: c.value, label: c.value });
});
const options = Object.keys(groups).map((label) => ({ label, options: groups[label] }));

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select style={{ width: 300 }} mode='multiple' allowClear options={options} placeholder='Select a city' />
    </span>
  );
}
