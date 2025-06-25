/**
 * cn - Input.Group flex:1 样式丢失问题
 *    -- 3.6.0 版本中，Input.Group 内部的 Input 组件的 flex:1 样式会丢失
 *    -- 这会导致输入框无法正常占满容器宽度，影响布局效果
 *    -- 问题复现：在 Input.Group 中使用多个 Input，期望它们平均分布时会发现样式异常
 *    -- 此问题在 3.6.1-beta.1 中已修复
 * en - Input.Group flex:1 style missing issue
 *    -- In version 3.6.0, the flex:1 style of Input components inside Input.Group would be lost
 *    -- This causes input boxes to not properly fill the container width, affecting layout
 *    -- Reproduction: When using multiple Inputs in Input.Group expecting them to distribute evenly, styles appear abnormal
 *    -- Fixed in 3.6.1-beta.1
 */
import React from 'react';
import { Input, Button, TYPE } from 'shineout';

type InputProps = TYPE.Input.Props;
type InputGroupProps = TYPE.Input.GroupProps;
type ButtonProps = TYPE.Button.Props;

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>问题复现示例 (3.6.0 版本)</h3>
        <p>
          在 3.6.0 版本中，下面的 Input.Group 中的输入框可能无法正确应用 flex:1 样式，
          导致布局异常。期望的效果是输入框应该占满剩余空间。
        </p>
      </div>
      
      {/* 场景1: Input.Group 与 Button 组合 */}
      <div style={{ marginBottom: 20 }}>
        <h4>场景1: 输入框 + 按钮组合</h4>
        <Input.Group>
          <Input placeholder="这个输入框应该占满剩余空间" />
          <Button type="primary">搜索</Button>
        </Input.Group>
      </div>

      {/* 场景2: 多个 Input 组合 */}
      <div style={{ marginBottom: 20 }}>
        <h4>场景2: 多个输入框组合</h4>
        <Input.Group>
          <Input placeholder="姓" />
          <Input placeholder="名" />
          <Button type="primary">提交</Button>
        </Input.Group>
      </div>

      {/* 场景3: 复杂布局 */}
      <div style={{ marginBottom: 20 }}>
        <h4>场景3: 复杂布局组合</h4>
        <Input.Group>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
            https://
          </div>
          <Input placeholder="输入域名" />
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
            .com
          </div>
        </Input.Group>
      </div>

      <div style={{ marginTop: 30, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
        <h4>问题说明：</h4>
        <ul>
          <li>在 3.6.0 版本中，Input 组件的 flex:1 样式可能丢失</li>
          <li>导致输入框无法按预期占满容器剩余空间</li>
          <li>特别是在与按钮或其他元素组合使用时更容易出现</li>
          <li>升级到 3.6.1 版本后此问题已解决</li>
        </ul>
      </div>
    </div>
  );
};

export default App;