/**
 * cn - Form deepClone=false 直接修改外部 value
 *    -- 关闭 deepClone 后，直接修改外部 value 的嵌套字段会同步影响表单内部数据（getValue），但不会触发渲染，Input 仍显示旧值；需浅拷贝顶层后 setValue 才会渲染
 * en - Form deepClone=false mutate outer value
 *    -- With deepClone off, mutating nested fields of the outer value affects form data (getValue) but does not trigger rendering
 */
import React, { useRef, useState } from 'react';
import { Form, Input, Radio, Button, TYPE } from 'shineout';

type FormRef = TYPE.Form.Ref<any>;

const createValue = () => ({ user: { name: 'origin' } });

const Demo = ({ deepClone }: { deepClone: boolean }) => {
  const [value, setValue] = useState<any>(createValue);
  const [log, setLog] = useState('');
  const formRef = useRef<FormRef>();
  const seq = useRef(0);

  const mutate = () => {
    seq.current += 1;
    // 直接修改嵌套字段，不调用 setValue
    value.user.name = `mutated-${seq.current}`;
    setLog(`已修改 value.user.name = ${value.user.name}`);
  };

  const readValue = () => {
    setLog(`getValue().user.name = ${formRef.current?.getValue().user.name}`);
  };

  return (
    <div>
      <Form
        deepClone={deepClone}
        value={value}
        onChange={setValue}
        formRef={(f) => (formRef.current = f)}
      >
        <Form.Item label='user.name'>
          <Input name='user.name' />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <Button size='small' onClick={mutate}>
          直接修改 value.user.name
        </Button>
        <Button size='small' onClick={readValue}>
          读取 getValue()
        </Button>
        <Button size='small' type='primary' onClick={() => setValue({ ...value })}>
          浅拷贝顶层 setValue
        </Button>
      </div>
      <div>{log || '先点击"直接修改"，对比 Input 显示与 getValue() 的结果'}</div>
    </div>
  );
};

const App: React.FC = () => {
  const [deepClone, setDeepClone] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        deepClone：
        <Radio.Group
          keygen={(d) => String(d)}
          data={[false, true]}
          renderItem={(d) => String(d)}
          value={deepClone}
          onChange={setDeepClone}
        />
      </div>
      <Demo key={String(deepClone)} deepClone={deepClone} />
    </div>
  );
};

export default App;
