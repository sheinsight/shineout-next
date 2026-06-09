/**
 * cn - 虚拟 Table + Form 级 rules 校验未挂载行
 *    -- 写法：<Form rules={{ rows: { 0:{name:[...]}, 1:{...}, ..., 499:{...} } }}>
 *      用嵌套对象 + 数字 key 描述数组每一项的校验规则
 *    -- submit 时 Form 内部会遍历 props.rules 所有叶子路径（含未挂载字段），
 *      对未挂载的虚拟行独立调用底层 validate 工具进行校验
 *    -- 500 行虚拟滚动；row #3 和 #200 故意留空 → Submit 必定捕获两条 required 错误
 *
 * en - Virtual Table + Form-level rules validates off-screen rows
 *    -- Nested object with numeric keys describes per-row rules
 *    -- On submit, Form walks ALL leaf paths in props.rules and validates off-screen fields
 *      via the standalone validate() util
 *    -- 500 rows; rows #3 and #200 are empty — Submit must report both required errors
 */
import { useRef, useState } from 'react';
import { Button, Form, Input, Table, TYPE, Rule, Message, Modal } from 'shineout';
import { ItemWithRequired } from './24-01-table-with-form';

type TableRef = TYPE.Table.TableRef;

interface TableRowData {
  id: number;
  name: string;
  age: string;
}

interface FormTableValues {
  rows: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const rules = Rule();

const ROW_COUNT = 500;
const EMPTY_INDICES = new Set([3, 200]);

const defaultData: TableRowData[] = Array.from({ length: ROW_COUNT }, (_, i) => ({
  id: i + 1,
  name: EMPTY_INDICES.has(i) ? '' : `Tom${i + 1}`,
  age: EMPTY_INDICES.has(i) ? '' : `${(i + 1) * 1}`,
}));

// Form 级 rules：嵌套对象 + 数字 key 描述每一行的校验
// submit 时会展开为 rows[0].name / rows[1].name / ... / rows[499].name，未挂载行也会校验
const formRules = (() => {
  const rowRules: Record<string, any> = {};
  for (let i = 0; i < ROW_COUNT; i++) {
    rowRules[i] = {
      name: [rules.required],
      age: [rules.required],
    };
  }
  return { rows: rowRules };
})();

export default () => {
  const [formDatas, setFormDatas] = useState<FormTableValues>({ rows: defaultData });
  const tableRef = useRef<TableRef>();

  // 走 Table 官方 ref API，避免 DOM 选择器跟文档站其他容器冲突
  const scrollToRow = (index: number) => {
    tableRef.current?.scrollToIndex(index);
  };
  const scrollToTop = () => {
    tableRef.current?.scrollToIndex(0);
  };

  const columns: TableColumnItem[] = [
    {
      title: 'ID',
      width: 80,
      render: (d) => <div style={{ lineHeight: '32px' }}>{d.id}</div>,
    },
    {
      title: <ItemWithRequired>Name</ItemWithRequired>,
      width: 240,
      // 视口内 cell 不写 rules，依赖 Form 级 rules
      render: (_d, index) => (
        <Form.Item style={{ marginBottom: 0 }}>
          <Input name={`rows[${index}].name`} placeholder='必填' />
        </Form.Item>
      ),
    },
    {
      title: <ItemWithRequired>Age</ItemWithRequired>,
      width: 200,
      render: (_d, index) => (
        <Form.Item style={{ marginBottom: 0 }}>
          <Input name={`rows[${index}].age`} placeholder='必填' />
        </Form.Item>
      ),
    },
    {
      title: 'Note',
      render: (d, index) =>
        EMPTY_INDICES.has(index) ? (
          <span style={{ color: '#EB4242' }}>
            ⚠️ Intentionally empty (id={d.id}) — must fail on submit even when off-screen
          </span>
        ) : (
          ''
        ),
    },
  ];

  return (
    <Form
      value={formDatas}
      onChange={setFormDatas}
      reserveAble
      rules={formRules}
      onSubmit={() => {
        Modal.success({
          title: 'All rows passed',
          content: 'Submit succeeded — all 500 rows (including off-screen) passed required.',
        });
      }}
      onError={(error) => {
        Message.error(`Validation failed: ${error?.message || 'check fields'}`);
      }}
    >
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <Form.Submit>Submit (校验所有 500 行 - 含未渲染)</Form.Submit>
        <Button onClick={() => scrollToRow(200)}>Scroll to row #200</Button>
        <Button onClick={scrollToTop}>Back to top</Button>
      </div>

      <Table
        virtual
        keygen='id'
        columns={columns}
        data={formDatas.rows}
        style={{ height: 480 }}
        rowsInView={20}
        bordered
        tableRef={(ref) => {
          tableRef.current = ref;
        }}
      />
    </Form>
  );
};
