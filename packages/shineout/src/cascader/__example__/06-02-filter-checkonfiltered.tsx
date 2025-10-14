/**
 * cn -
 *    -- 开启 `checkOnFiltered` 后，勾选操作仅针对筛选后的数据生效
 * en -
 *    -- When `checkOnFiltered` is enabled, the check operation only applies to filtered data
 */
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
          {
            value: 'xuanwu',
          },
          {
            value: 'qinhuai',
          },
          {
            value: 'jianye',
          }
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
          {
            value: 'luyang',
          },
          {
            value: 'shushan',
          },
          {
            value: 'baohe',
          }
        ],
      },
    ],
  },
];

export default () => {
  const handleFilter: CascaderProps['onFilter'] = (text) => (d) => d.value.indexOf(text) >= 0;

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <Cascader
      mode={3}
      width={300}
      placeholder='Please select city'
      data={data}
      keygen='value'
      onFilter={handleFilter}
      renderItem={renderItem}
      highlight
      clearable
      checkOnFiltered
    />
  );
};
