/**
 * cn - Pagination simple 模式输入框不展示当前页问题
 *    -- 3.6.0 版本中引入的回归问题，Pagination 的 simple 模式下输入框不显示当前页码
 *    -- 这会导致用户无法看到当前所在页面，影响用户体验
 *    -- 问题复现：使用 simple 模式的 Pagination，观察输入框是否显示当前页码
 *    -- 此问题在 3.6.1-beta.2 中已修复
 * en - Pagination simple mode input not showing current page issue
 *    -- Regression issue introduced in version 3.6.0, input box in simple mode of Pagination doesn't show current page number
 *    -- This causes users unable to see which page they are on, affecting user experience
 *    -- Reproduction: Use Pagination in simple mode, observe if input box shows current page number
 *    -- Fixed in 3.6.1-beta.2
 */
import React, { useState } from 'react';
import { Pagination, TYPE } from 'shineout';

type PaginationProps = TYPE.Pagination.Props;

const App: React.FC = () => {
  const [current1, setCurrent1] = useState(1);
  const [current2, setCurrent2] = useState(5);
  const [current3, setCurrent3] = useState(10);


  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Pagination simple 模式当前页显示问题复现</h3>
        <p>
          在 3.6.0 版本中，Pagination 的 simple 模式下输入框可能不显示当前页码，
          这是一个回归问题，用户无法直观地看到当前所在页面。
        </p>
      </div>

      {/* 问题复现示例1 */}
      <div style={{ marginBottom: 30 }}>
        <h4>示例1: 基础 simple 模式 (当前页: {current1})</h4>
        <p>期望：输入框应该显示当前页码 "{current1}"</p>
        <Pagination
          current={current1}
          pageSize={10}
          total={100}
          simple
          onChange={(page) => setCurrent1(page)}
          style={{ marginBottom: 10 }}
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          ↑ 检查输入框是否显示当前页码
        </div>
      </div>

      {/* 问题复现示例2 */}
      <div style={{ marginBottom: 30 }}>
        <h4>示例2: 中间页码 simple 模式 (当前页: {current2})</h4>
        <p>期望：输入框应该显示当前页码 "{current2}"</p>
        <Pagination
          current={current2}
          pageSize={10}
          total={500}
          simple
          onChange={(page) => setCurrent2(page)}
          style={{ marginBottom: 10 }}
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          ↑ 检查输入框是否显示当前页码
        </div>
      </div>

      {/* 问题复现示例3 */}
      <div style={{ marginBottom: 30 }}>
        <h4>示例3: 较大页码 simple 模式 (当前页: {current3})</h4>
        <p>期望：输入框应该显示当前页码 "{current3}"</p>
        <Pagination
          current={current3}
          pageSize={20}
          total={1000}
          simple
          onChange={(page) => setCurrent3(page)}
          style={{ marginBottom: 10 }}
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          ↑ 检查输入框是否显示当前页码
        </div>
      </div>

      {/* 对比示例：标准模式 */}
      <div style={{ marginBottom: 30 }}>
        <h4>对比示例: 标准模式 (正常显示)</h4>
        <p>标准模式下当前页码显示正常</p>
        <Pagination
          current={current1}
          pageSize={10}
          total={100}
          onChange={(page) => setCurrent1(page)}
        />
      </div>

      {/* 交互测试区域 */}
      <div style={{ marginBottom: 30 }}>
        <h4>交互测试</h4>
        <p>点击按钮切换页码，观察 simple 模式输入框是否正确更新：</p>
        <div style={{ marginBottom: 10 }}>
          <button 
            onClick={() => setCurrent1(Math.max(1, current1 - 1))}
            style={{ marginRight: 8, padding: '4px 8px' }}
          >
            上一页
          </button>
          <button 
            onClick={() => setCurrent1(Math.min(10, current1 + 1))}
            style={{ marginRight: 8, padding: '4px 8px' }}
          >
            下一页
          </button>
          <span style={{ marginLeft: 8 }}>
            当前页: {current1}
          </span>
        </div>
        <Pagination
          current={current1}
          pageSize={10}
          total={100}
          simple
          onChange={(page) => setCurrent1(page)}
        />
      </div>

      <div style={{ padding: 10, backgroundColor: '#fff3cd', borderRadius: 4, border: '1px solid #ffeaa7' }}>
        <h4>问题说明：</h4>
        <ul>
          <li>3.6.0 版本中 Pagination 的 <code>simple</code> 模式输入框不显示当前页码</li>
          <li>这是一个回归问题，在之前版本中是正常工作的</li>
          <li>用户无法直观地看到当前所在页面，需要通过其他方式判断</li>
          <li>影响用户体验，特别是在页面数量较多的情况下</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>使用 <code>simple</code> 属性的 Pagination 组件</li>
          <li>检查输入框是否显示当前页码</li>
          <li>尝试切换页码，观察输入框值是否更新</li>
          <li>在 3.6.0 版本中输入框可能为空或不正确</li>
        </ol>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1-beta.2 版本中修复</p>
      </div>
    </div>
  );
};

export default App;