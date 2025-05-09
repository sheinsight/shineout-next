/**
 * cn - 自定义下拉面板
 *    -- 使用 `renderOptionList` 属性自定义下拉面板，可以自定义实现全选功能
 * en - Custom dropdown panel
 *    -- Use the `renderOptionList` property to customize the dropdown panel, and you can customize the implementation of the select all function
 */
import React from 'react';
import { Cascader, Checkbox } from 'shineout';

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
        ],
      },
    ],
  },
];

export default () => {
  const [full, setFull] = React.useState<'indeterminate' | boolean | undefined>();
  const [checked, setChecked] = React.useState<string[]>([]);
  const rootIds = data.map((d) => d.value);

  React.useEffect(() => {
    setFull(
      rootIds.every((id) => checked.includes(id))
        ? true
        : checked.length > 0
        ? 'indeterminate'
        : false,
    );
  }, [checked]);

  React.useEffect(() => {
    if (full === true) {
      setChecked(rootIds);
    } else if (!full) {
      setChecked([]);
    }
  }, [full]);

  return (
    <Cascader
      width={300}
      mode={3}
      clearable
      multiple
      value={checked}
      onChange={(v) => {
        setChecked(v);
      }}
      placeholder='Please select city'
      data={data}
      keygen='value'
      renderItem={(n) => `${n?.value}`}
      renderOptionList={(list) => (
        <div>
          <div
            style={{
              padding: '5px 12px',
              borderBottom:
                '1px solid var(--soui-cascader-list-border-color,var(--soui-neutral-border-1,#E8EBF0))',
            }}
          >
            <Checkbox checked={full} onChange={setFull} style={{ display: 'flex' }}>
              全选
            </Checkbox>
          </div>
          {list}
        </div>
      )}
    />
  );
};
