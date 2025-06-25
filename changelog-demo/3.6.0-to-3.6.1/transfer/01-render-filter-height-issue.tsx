/**
 * cn - Transfer renderFilter 导致面板高度不一致问题
 *    -- 3.6.0 版本中，Transfer 组件设置了 renderFilter 属性后，可能导致左右面板高度不一致
 *    -- 这是因为过滤器的渲染会影响面板的高度计算
 *    -- 问题复现：设置 renderFilter 自定义过滤器后，观察左右面板高度差异
 *    -- 此问题在 3.6.1-beta.1 中已修复
 * en - Transfer renderFilter panel height inconsistency issue
 *    -- In version 3.6.0, after setting renderFilter property on Transfer component, left and right panels may have inconsistent heights
 *    -- This is because filter rendering affects panel height calculation
 *    -- Reproduction: After setting renderFilter custom filter, observe height difference between left and right panels
 *    -- Fixed in 3.6.1-beta.1
 */
import React, { useState } from 'react';
import { Transfer, TYPE } from 'shineout';

type TransferProps = TYPE.Transfer.Props<DataItem, number>;

interface DataItem {
  id: number;
  name: string;
  category: string;
  disabled?: boolean;
}

// 模拟数据
const generateData = (): DataItem[] => {
  const categories = ['前端', '后端', '设计', '产品', '测试'];
  const names = [
    'React开发', 'Vue开发', 'Angular开发', 'Node.js开发', 'Java开发',
    'Python开发', 'UI设计', 'UX设计', '产品规划', '需求分析',
    '自动化测试', '手工测试', '性能测试', '安全测试', '接口测试'
  ];
  
  return names.map((name, index) => ({
    id: index + 1,
    name,
    category: categories[index % categories.length],
    disabled: index % 10 === 0, // 每10个有一个禁用
  }));
};

const App: React.FC = () => {
  const [data] = useState<DataItem[]>(generateData());
  const [value, setValue] = useState<number[]>([1, 3, 5]);


  const renderTransferItem: TransferProps['renderItem'] = (item: DataItem) => (
    <div style={{ 
      padding: '4px 0',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <span>{item.name}</span>
      <span style={{ 
        fontSize: '12px', 
        color: '#666',
        backgroundColor: '#f0f0f0',
        padding: '2px 6px',
        borderRadius: '2px',
      }}>
        {item.category}
      </span>
    </div>
  );

  // 自定义过滤器渲染
  const renderFilter: TransferProps['renderFilter'] = (text, from) => {
    return (
      <div style={{ 
        padding: '8px 12px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        margin: '8px 0',
      }}>
        <div style={{ marginBottom: 4, fontSize: '12px', color: '#666' }}>
          自定义过滤器 ({from === 'left' ? '待选' : '已选'})
        </div>
        <input
          style={{
            width: '100%',
            padding: '4px 8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            fontSize: '14px',
          }}
          placeholder={`搜索${from === 'left' ? '待选' : '已选'}项目...`}
          value={text}
          onChange={() => {}} // 这里在实际使用中需要处理搜索逻辑
        />
        <div style={{ marginTop: 4, fontSize: '11px', color: '#999' }}>
          支持按名称和分类搜索
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Transfer renderFilter 面板高度不一致问题复现</h3>
        <p>
          在 3.6.0 版本中，使用自定义 renderFilter 后，左右面板的高度可能不一致，
          特别是当过滤器内容复杂时更容易出现此问题。
        </p>
      </div>

      {/* 问题复现示例 */}
      <div style={{ marginBottom: 30 }}>
        <h4>使用 renderFilter 的 Transfer (观察面板高度)</h4>
        <Transfer
          data={data}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          keygen="id"
          renderItem={renderTransferItem}
          renderFilter={renderFilter}
          titles={['待选项目', '已选项目']}
          listHeight={300}
          style={{ width: '100%' }}
        />
      </div>

      {/* 对比示例：不使用 renderFilter */}
      <div style={{ marginBottom: 30 }}>
        <h4>不使用 renderFilter 的 Transfer (对比参考)</h4>
        <Transfer
          data={data}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          keygen="id"
          renderItem={renderTransferItem}
          titles={['待选项目', '已选项目']}
          listHeight={300}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ padding: 10, backgroundColor: '#fff3cd', borderRadius: 4, border: '1px solid #ffeaa7' }}>
        <h4>问题说明：</h4>
        <ul>
          <li>使用 <code>renderFilter</code> 自定义过滤器时，左右面板高度可能不一致</li>
          <li>问题主要出现在过滤器内容较复杂或高度不同的情况下</li>
          <li>可能导致视觉上的不协调，影响用户体验</li>
          <li>3.6.1-beta.1 版本已修复此问题，面板高度会正确同步</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>对比上面两个 Transfer 组件的面板高度</li>
          <li>观察左右面板是否对齐</li>
          <li>在 3.6.0 版本中可能出现高度差异</li>
        </ol>
      </div>
    </div>
  );
};

export default App;