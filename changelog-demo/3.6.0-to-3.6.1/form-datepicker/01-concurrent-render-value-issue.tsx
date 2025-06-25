/**
 * cn - Form 中 DatePicker 并发渲染 value 设置问题
 *    -- 3.6.0 版本中，Form 同时设置 value 和 names 为数组的 DatePicker 在并发渲染时，value 未按预期设置
 *    -- 这是由于并发渲染时组件初始化的时序问题导致的
 *    -- 问题复现：在 Form 中使用数组形式的 names 和初始 value，观察 DatePicker 是否正确显示初始值
 *    -- 此问题在 3.6.1-beta.4 中已修复
 * en - Form DatePicker concurrent rendering value setting issue
 *    -- In version 3.6.0, when Form sets both value and names as arrays for DatePicker during concurrent rendering, value is not set as expected
 *    -- This is caused by component initialization timing issues during concurrent rendering
 *    -- Reproduction: Use array-form names and initial value in Form, observe if DatePicker displays initial value correctly
 *    -- Fixed in 3.6.1-beta.4
 */
import React, { useState } from 'react';
import { Form, DatePicker, Button, Card, TYPE } from 'shineout';

type FormProps = TYPE.Form.Props<FormData>;
type DatePickerProps = TYPE.DatePicker.Props;
type ButtonProps = TYPE.Button.Props;

interface FormData {
  dateRange: [Date, Date];
  singleDate: Date;
  multipleDates: Date[];
}

const App: React.FC = () => {
  // 初始数据 - 模拟从 API 获取的数据
  const [initialData, setInitialData] = useState<FormData>({
    dateRange: [new Date('2023-01-01'), new Date('2023-12-31')],
    singleDate: new Date('2023-06-15'),
    multipleDates: [
      new Date('2023-03-01'),
      new Date('2023-06-01'),
      new Date('2023-09-01'),
    ],
  });

  const [formValue, setFormValue] = useState<FormData>(initialData);
  const [renderKey, setRenderKey] = useState(0);


  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Form 中 DatePicker 并发渲染 value 设置问题复现</h3>
        <p>
          在 3.6.0 版本中，Form 同时设置 value 和 names 为数组的 DatePicker 在并发渲染时，
          初始 value 可能无法正确设置到组件中，导致显示空值或错误值。
        </p>
      </div>

      {/* 控制面板 */}
      <div style={{ 
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 6,
        border: '1px solid #e9ecef'
      }}>
        <h4>测试控制面板</h4>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <Button onClick={() => {
            const newData = {
              dateRange: [new Date('2024-01-01'), new Date('2024-12-31')] as [Date, Date],
              singleDate: new Date('2024-07-15'),
              multipleDates: [
                new Date('2024-02-01'),
                new Date('2024-05-01'),
                new Date('2024-08-01'),
              ],
            };
            setInitialData(newData);
            setFormValue(newData);
          }} type="primary">
            模拟加载新数据
          </Button>
          <Button onClick={() => setRenderKey(prev => prev + 1)}>
            强制重新渲染 (key={renderKey})
          </Button>
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          <strong>当前初始数据:</strong>
          <pre style={{ margin: '5px 0', fontSize: '11px' }}>
            {JSON.stringify({
              dateRange: initialData.dateRange.map(d => d.toISOString().split('T')[0]),
              singleDate: initialData.singleDate.toISOString().split('T')[0],
              multipleDates: initialData.multipleDates.map(d => d.toISOString().split('T')[0]),
            }, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* 问题复现示例 */}
        <Card>
          <Card.Header>问题复现：使用数组 names</Card.Header>
          <Card.Body>
            <Form
              key={`problem-${renderKey}`}
              value={formValue}
              onChange={setFormValue as FormProps['onChange']}
              labelWidth={120}
            >
              {/* 使用数组形式的 names - 容易出现问题的场景 */}
              <Form.Item label="日期范围" names={['dateRange', 0]} required>
                <DatePicker 
                  range
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="单个日期" names={['singleDate']}>
                <DatePicker 
                  placeholder="选择日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {/* 多个日期选择器 */}
              <Form.Item label="第一个日期" names={['multipleDates', 0]}>
                <DatePicker 
                  placeholder="选择第一个日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="第二个日期" names={['multipleDates', 1]}>
                <DatePicker 
                  placeholder="选择第二个日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="第三个日期" names={['multipleDates', 2]}>
                <DatePicker 
                  placeholder="选择第三个日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </Card.Body>
        </Card>

        {/* 对比示例 */}
        <Card>
          <Card.Header>对比示例：使用字符串 names</Card.Header>
          <Card.Body>
            <Form
              key={`comparison-${renderKey}`}
              value={formValue}
              onChange={setFormValue as FormProps['onChange']}
              labelWidth={120}
            >
              {/* 使用字符串形式的 names - 相对稳定 */}
              <Form.Item label="日期范围" name="dateRange">
                <DatePicker 
                  range
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="单个日期" name="singleDate">
                <DatePicker 
                  placeholder="选择日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {/* 注意：由于 DatePicker 不支持多选，这里演示单个日期绑定 */}
              <Form.Item label="第一个日期" name={['multipleDates', 0]}>
                <DatePicker 
                  placeholder="选择第一个日期"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* 当前表单值显示 */}
      <div style={{ marginTop: 20 }}>
        <Card>
          <Card.Header>当前表单值</Card.Header>
          <Card.Body>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: 10, 
              borderRadius: 4, 
              fontSize: '12px',
              overflow: 'auto',
            }}>
              {JSON.stringify({
                dateRange: formValue.dateRange?.map(d => d?.toISOString?.()?.split('T')[0] || d),
                singleDate: formValue.singleDate?.toISOString?.()?.split('T')[0] || formValue.singleDate,
                multipleDates: formValue.multipleDates?.map(d => d?.toISOString?.()?.split('T')[0] || d),
              }, null, 2)}
            </pre>
          </Card.Body>
        </Card>
      </div>

      <div style={{ 
        marginTop: 20,
        padding: 10, 
        backgroundColor: '#fff3cd', 
        borderRadius: 4, 
        border: '1px solid #ffeaa7' 
      }}>
        <h4>问题说明：</h4>
        <ul>
          <li>使用数组形式的 <code>names</code> (如 <code>['dateRange', 0]</code>) 时，并发渲染可能导致初始值设置失败</li>
          <li>特别是在 React 18 的并发模式下，组件初始化的时序可能不确定</li>
          <li>DatePicker 可能显示空值，即使 Form 的 value 中有对应的数据</li>
          <li>问题通常在页面首次加载或强制重新渲染时出现</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>观察左侧"问题复现"卡片中的 DatePicker 是否显示初始值</li>
          <li>点击"强制重新渲染"按钮，观察值是否丢失</li>
          <li>点击"模拟加载新数据"，观察新值是否正确设置</li>
          <li>在 3.6.0 版本中可能出现值不显示的情况</li>
        </ol>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1-beta.4 版本中修复，Form 和 DatePicker 的初始化时序得到了优化</p>
      </div>
    </div>
  );
};

export default App;