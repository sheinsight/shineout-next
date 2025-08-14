/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import {
  Form,
  Input,
  Select,
  Switch,
  Rule,
  Radio,
  Textarea,
  DatePicker,
  Button,
  Checkbox,
} from 'shineout';

const rules = Rule();

const checkboxGroupData = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
];

export default () => {
  const [form, setForm] = Form.useForm();
  return (
    <Form setForm={setForm} name='请假申请单' onSubmit={(v) => console.log(v)}>
      <Form.Item label='假期类型' required>
        <Select
          keygen
          name='holidayType'
          data={['年假', '调休', '事假', '病假', '其他']}
          rules={[rules.required()]}
        />
      </Form.Item>

      <Form.Item label='下拉' required>
        <Select
          data={checkboxGroupData}
          keygen='id'
          renderItem={(d) => d.color}
          format='id'
          name='select'
        />
      </Form.Item>

      <Form.Item label='下拉多选' required>
        <Select
          data={checkboxGroupData}
          keygen='id'
          renderItem='color'
          format='id'
          name='multiSelect'
          multiple
          compressed
        />
      </Form.Item>

      <Form.Item label='工作代理人' required>
        <Input name='agent' rules={[rules.required()]} />
      </Form.Item>

      <Form.Item label='喜欢的颜色' required>
        <Checkbox.Group name='likeColors' keygen data={['red', 'green']} />
      </Form.Item>

      <Form.Item label='不喜欢的颜色' required>
        <Radio.Group name='dislikeColor' keygen data={['red', 'green']} />
      </Form.Item>

      <Form.Item label='是否支持颜色' required>
        <Switch name='isSupportColor' />
      </Form.Item>

      <Form.Item label='请假事由' required>
        <Textarea
          name='reason'
          rules={[rules.required(), { max: 100, message: '请假事由不能超过100个字' }]}
        />
      </Form.Item>

      <Form.Item label='请假时间' required tip='工作日时间：09:00 - 18:00'>
        <DatePicker
          range
          name='holidayTime'
          format='YYYY-MM-DD HH:mm'
          defaultTime={['09:00', '18:00']}
          rules={[rules.required()]}
        />
      </Form.Item>

      <Form.Item label='相关流程'>
        <Input name='relatedProcess' />
      </Form.Item>

      <Form.Item label=''>
        <Button onClick={() => console.log(form.getFormSchema())}>Get Schema</Button>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};
