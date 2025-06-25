/**
 * cn - Input.Number 小数点丢失问题
 *    -- 3.6.0 版本中，Input.Number 输入"0.0"这种格式时小数点会丢失
 *    -- 用户输入的小数点和后续的零会被意外移除，影响数值的精确显示
 *    -- 问题复现：输入"0.0"、"1.0"、"10.00"等带尾随零的小数，观察显示结果
 *    -- 此问题在 3.6.1-beta.7 中已修复
 * en - Input.Number decimal point loss issue
 *    -- In version 3.6.0, when inputting formats like "0.0" in Input.Number, decimal points get lost
 *    -- User-inputted decimal points and trailing zeros are unexpectedly removed, affecting precise value display
 *    -- Reproduction: Input "0.0", "1.0", "10.00" etc. decimals with trailing zeros, observe display results
 *    -- Fixed in 3.6.1-beta.7
 */
import React, { useState } from 'react';
import { Input, Card, Button, TYPE } from 'shineout';

type InputNumberProps = TYPE.Input.NumberProps;
type CardProps = TYPE.Card.Props;
type ButtonProps = TYPE.Button.Props;

interface TestCase {
  label: string;
  value: string;
  expected: string;
  description: string;
}

const App: React.FC = () => {
  const [values, setValues] = useState<Record<string, number | string>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // 测试用例
  const testCases: TestCase[] = [
    {
      label: 'case1',
      value: '0.0',
      expected: '0.0',
      description: '输入 0.0 应该保持显示为 0.0'
    },
    {
      label: 'case2', 
      value: '1.0',
      expected: '1.0',
      description: '输入 1.0 应该保持显示为 1.0'
    },
    {
      label: 'case3',
      value: '10.00',
      expected: '10.00',
      description: '输入 10.00 应该保持显示为 10.00'
    },
    {
      label: 'case4',
      value: '0.10',
      expected: '0.10',
      description: '输入 0.10 应该保持显示为 0.10'
    },
    {
      label: 'case5',
      value: '100.000',
      expected: '100.000',
      description: '输入 100.000 应该保持显示为 100.000'
    },
    {
      label: 'case6',
      value: '0.50',
      expected: '0.50',
      description: '输入 0.50 应该保持显示为 0.50'
    }
  ];

  const handleChange: (key: string, value: InputNumberProps['value']) => void = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key: string, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };


  const createTestCaseHandler = (testCaseLabel: string): InputNumberProps['onChange'] => {
    return (v) => handleChange(testCaseLabel, v);
  };

  const resetAll = () => {
    setValues({});
    setInputValues({});
  };

  const fillTestData = () => {
    const newValues: Record<string, string> = {};
    const newInputValues: Record<string, string> = {};
    
    testCases.forEach(testCase => {
      newValues[testCase.label] = testCase.value;
      newInputValues[testCase.label] = testCase.value;
    });
    
    setValues(newValues);
    setInputValues(newInputValues);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Input.Number 小数点丢失问题复现</h3>
        <p>
          在 3.6.0 版本中，Input.Number 输入带有尾随零的小数时（如"0.0"、"1.0"等），
          小数点和尾随零会被意外移除，无法保持用户输入的精确格式。
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
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={fillTestData} type="primary">
            填充测试数据
          </Button>
          <Button onClick={resetAll}>
            重置所有值
          </Button>
        </div>
      </div>

      {/* 手动测试区域 */}
      <div style={{ marginBottom: 30 }}>
        <Card>
          <Card.Header>手动测试区域</Card.Header>
          <Card.Body>
            <p style={{ marginBottom: 15, fontSize: '14px', color: '#666' }}>
              请在下面的输入框中手动输入带有尾随零的小数，观察输入后的显示结果：
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  自由测试 - 尝试输入 "0.0"
                </label>
                <Input.Number
                  placeholder="输入 0.0 试试"
                  value={values.manual1}
                  onChange={(v) => handleChange('manual1', v)}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  当前值: {JSON.stringify(values.manual1)}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  自由测试 - 尝试输入 "1.0"
                </label>
                <Input.Number
                  placeholder="输入 1.0 试试"
                  value={values.manual2}
                  onChange={(v) => handleChange('manual2', v)}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  当前值: {JSON.stringify(values.manual2)}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  自由测试 - 尝试输入 "10.00"
                </label>
                <Input.Number
                  placeholder="输入 10.00 试试"
                  value={values.manual3}
                  onChange={(v) => handleChange('manual3', v)}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  当前值: {JSON.stringify(values.manual3)}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 系统测试用例 */}
      <div style={{ marginBottom: 30 }}>
        <Card>
          <Card.Header>系统测试用例</Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 15 }}>
              {testCases.map((testCase) => (
                <div key={testCase.label} style={{ 
                  padding: 10, 
                  border: '1px solid #e9ecef', 
                  borderRadius: 4,
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ marginBottom: 8 }}>
                    <strong style={{ fontSize: '14px' }}>测试 {testCase.label.toUpperCase()}</strong>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
                      {testCase.description}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ display: 'block', marginBottom: 3, fontSize: '12px' }}>
                      输入值: "{testCase.value}" → 期望显示: "{testCase.expected}"
                    </label>
                    <Input.Number
                      value={values[testCase.label]}
                      onChange={createTestCaseHandler(testCase.label)}
                      placeholder={`输入 ${testCase.value}`}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div style={{ fontSize: '11px' }}>
                    <div style={{ color: '#666' }}>
                      当前显示值: <code>{JSON.stringify(values[testCase.label])}</code>
                    </div>
                    <div style={{ 
                      color: values[testCase.label] === testCase.value ? '#52c41a' : '#ff4d4f',
                      fontWeight: 'bold'
                    }}>
                      {values[testCase.label] === testCase.value ? '✓ 正确' : 
                       values[testCase.label] ? '✗ 小数点/尾随零丢失' : '⚪ 未测试'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 不同配置的测试 */}
      <div style={{ marginBottom: 30 }}>
        <Card>
          <Card.Header>不同配置下的测试</Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  精度限制 (digits=2)
                </label>
                <Input.Number
                  value={values.digits2}
                  onChange={(v) => handleChange('digits2', v)}
                  digits={2}
                  placeholder="输入 0.0"
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  值: {JSON.stringify(values.digits2)}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  精度限制 (digits=3)
                </label>
                <Input.Number
                  value={values.digits3}
                  onChange={(v) => handleChange('digits3', v)}
                  digits={3}
                  placeholder="输入 0.000"
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  值: {JSON.stringify(values.digits3)}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  最小值限制 (min=0)
                </label>
                <Input.Number
                  value={values.withMin}
                  onChange={(v) => handleChange('withMin', v)}
                  min={0}
                  placeholder="输入 0.0"
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  值: {JSON.stringify(values.withMin)}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 5, fontSize: '12px' }}>
                  步长设置 (step=0.1)
                </label>
                <Input.Number
                  value={values.withStep}
                  onChange={(v) => handleChange('withStep', v)}
                  step={0.1}
                  placeholder="输入 0.0"
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>
                  值: {JSON.stringify(values.withStep)}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div style={{ 
        padding: 15, 
        backgroundColor: '#fff3cd', 
        borderRadius: 4, 
        border: '1px solid #ffeaa7' 
      }}>
        <h4>问题说明：</h4>
        <ul>
          <li>Input.Number 在处理带有尾随零的小数时，会自动移除尾随零和不必要的小数点</li>
          <li>例如输入 "0.0" 可能会显示为 "0"，输入 "1.0" 可能显示为 "1"</li>
          <li>这在某些需要精确显示小数位的场景中会造成问题</li>
          <li>特别是在财务、科学计算等对数值格式有严格要求的应用中</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>点击"填充测试数据"按钮，观察各个测试用例的显示结果</li>
          <li>在手动测试区域输入 "0.0"、"1.0"、"10.00" 等值</li>
          <li>观察输入框显示的值是否与输入的值一致</li>
          <li>在 3.6.0 版本中可能出现小数点和尾随零丢失的情况</li>
        </ol>
        
        <h4>影响场景：</h4>
        <ul>
          <li>价格输入（如 ¥10.00 显示为 ¥10）</li>
          <li>百分比输入（如 0.0% 显示为 0%）</li>
          <li>精确测量值输入（如 1.0cm 显示为 1cm）</li>
          <li>科学计算或工程应用中的精度要求</li>
        </ul>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1-beta.7 版本中修复，Input.Number 现在可以正确保持用户输入的小数格式</p>
      </div>
    </div>
  );
};

export default App;