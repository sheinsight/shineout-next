/**
 * cn - Input.Number defaultValue 测试
 *    -- 场景1: Input.Number + Form + defaultValue, 聚焦清空后失焦恢复
 *    -- 场景2: Form.Field 数组 name + defaultValue, 接口数据不含对应字段
 * en - Input.Number defaultValue test
 *    -- Case 1: Input.Number + Form + defaultValue, restore on blur after clearing
 *    -- Case 2: Form.Field array name + defaultValue, API data missing fields
 */
import React, { useMemo, useState } from 'react';
import { Form, Input, Rule, Table } from 'shineout';

const rules = Rule();

const sizeColumns = [
  {
    sku: 'sM23022541101918-one-size',
    skuCode: 'A3rnqQ8cYKI4',
    sizeName: 'one-size',
    skuOrderQty: 400,
    skuTotalTailoredQty: 400,
    skuSuffixZh: '黑色-单一尺寸',
    skuKey: 'a3yk81kntjc00',
  },
];

// ===== 场景2: Form.Field 数组 name + defaultValue，接口数据不含对应字段 =====
const ArrayFieldDisplay = (props: { value?: any[]; onChange?: (v: any[]) => void }) => {
  const { value = [] } = props;
  return (
    <div>
      <span>a: {JSON.stringify(value[0])}</span>
      <span style={{ marginLeft: 12 }}>b: {JSON.stringify(value[1])}</span>
    </div>
  );
};

const ArrayNameTest: React.FC = () => {
  const [formValue, setFormValue] = useState<Record<string, any>>({ c: 'xxx' });

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
      <h4>场景2: Form.Field name=["a","b"], defaultValue=[obj], 接口数据不含a/b</h4>
      <Form
        value={formValue}
        onChange={(v) => {
          console.log('ArrayNameTest onChange:', v);
          setFormValue(v);
        }}
      >
        <Form.Item label='数组字段'>
          <Form.Field
            name={['a', 'b']}
            defaultValue={[{ name: 'xxx', title: 'xxx' }]}
          >
            <ArrayFieldDisplay />
          </Form.Field>
        </Form.Item>
        <Form.Item label='表单数据'>
          {JSON.stringify(formValue)}
        </Form.Item>
      </Form>
      <button onClick={() => setFormValue({ c: 'yyy' })}>
        模拟接口: setValue(&#123;c: &apos;yyy&apos;&#125;)
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [value, setValue] = useState([
    {
      type: 'deliveryNum',
      id: 'i4oyhqdzzwg00',
      a3yk81kntjc00: undefined,
    },
  ]);

  /** 表单数据转换 */
  const formValue = useMemo(() => {
    return Object.fromEntries(value.map((item) => [item.id, item]));
  }, [value.length]);

  const columns = [
    ...sizeColumns.map((column) => {
      const { skuKey, skuSuffixZh, skuOrderQty } = column || {};
      return {
        title: (
          <>
            {`${skuSuffixZh}`}
            <span style={{ color: 'red' }}>{`（${Number(skuOrderQty || 0) - 0}）`}</span>
          </>
        ),
        width: 180,
        render: (data: any) => {
          return (
            <Form.Item>
              <Input.Number
                defaultValue={1}
                name={`${data.id}.${skuKey}`}
                placeholder={'请输入'}
                rules={[rules.required('不能为空')]}
                clearable
                digits={0}
                min={0}
                max={9999}
              />
            </Form.Item>
          );
        },
      };
    }),
  ];

  return (
    <div>
      <ArrayNameTest />
      <div style={{ border: '1px solid #ccc', padding: 16 }}>
        <h4>场景1: Input.Number + defaultValue=1, 聚焦清空后失焦应恢复</h4>
        <Form
          value={formValue}
          onChange={(v) => {
            console.log('%c Line:36 🍤 v', 'color:#2eafb0', v, value);
            setValue(Object.values(v));
          }}
          removeUndefined={false}
        >
          <Table keygen='id' height={100} rowsInView={0} data={value} columns={columns} />
          <Form.Item label='数值'>{JSON.stringify(value)}</Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
