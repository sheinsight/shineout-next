/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React from 'react';
import { Form, Select, Switch, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter: SelectProps['onFilter'] = (v) => (d) => d.indexOf(v) >= 0;
  const [highlight, setHighlight] = React.useState(true);

  return (
    <div>
      <Form>
        <Form.Item label='高亮关键字' labelWidth={72}>
          <Switch value={highlight} onChange={setHighlight} />
        </Form.Item>
      </Form>

      <Select
        width={200}
        data={data}
        keygen
        placeholder='Select Color'
        onFilter={handleFilter}
        clearable
        highlight={highlight}
      />
      <br />
      <br />
      <Select
        width={300}
        data={data}
        keygen
        placeholder='Select Multiple Color'
        onFilter={handleFilter}
        clearable
        multiple
        highlight={highlight}
      />
    </div>
  );
};
