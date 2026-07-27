/**
 * cn - Form + DatePicker(needConfirm + inputable)
 *    -- 验证在 Form name 受控用法下，DatePicker 同时开启 needConfirm 和 inputable 时，输入日期后回车可以正常提交值
 * en - Form + DatePicker(needConfirm + inputable)
 *    -- Verify DatePicker with needConfirm and inputable works correctly in Form controlled mode
 */
import React, { useState } from 'react';
import { Form, DatePicker, Button } from 'shineout';

interface FormValue {
  date?: string;
  dateRange?: string[];
}

const App: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({});

  return (
    <div>
      <h4>Form 受控 + DatePicker needConfirm + inputable</h4>
      <Form
        value={formValue}
        onChange={(v) => {
          console.log('Form onChange:', v);
          setFormValue(v);
        }}
        onSubmit={(data) => {
          console.log('Form onSubmit:', data);
        }}
      >
        <Form.Item label="单选日期">
          <DatePicker name="date" needConfirm inputable clearable />
        </Form.Item>

        <Form.Item label="范围日期">
          <DatePicker name="dateRange" range needConfirm inputable clearable />
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
          <Button onClick={() => setFormValue({})}>Clear</Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5' }}>
        <strong>当前 Form 值：</strong>
        <pre>{JSON.stringify(formValue, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
