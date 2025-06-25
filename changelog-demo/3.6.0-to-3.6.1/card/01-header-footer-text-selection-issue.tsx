/**
 * cn - Card.Header 和 Card.Footer 文本选中问题
 *    -- 3.6.0 版本中，Card.Header 和 Card.Footer 在未开启 moveable 属性时不可选中文本
 *    -- 这会影响用户复制标题或脚注信息的操作，降低可用性
 *    -- 问题复现：在未设置 moveable 的 Card 中尝试选中 Header 或 Footer 的文本
 *    -- 此问题在 3.6.1 正式版本中已修复
 * en - Card.Header and Card.Footer text selection issue
 *    -- In version 3.6.0, Card.Header and Card.Footer cannot select text when moveable property is not enabled
 *    -- This affects users' ability to copy title or footer information, reducing usability
 *    -- Reproduction: Try to select text in Header or Footer of Card without moveable property set
 *    -- Fixed in 3.6.1 official version
 */
import React, { useState } from 'react';
import { Card, Button, Switch, TYPE } from 'shineout';

type CardProps = TYPE.Card.Props;
type SwitchProps = TYPE.Switch.Props;
type SwitchOnChange = SwitchProps['onChange'];

interface CardConfig {
  moveable?: CardProps['moveable'];
  title: string;
  content: string;
  footer: string;
}

const App: React.FC = () => {
  const [configs, setConfigs] = useState<Record<string, CardConfig>>({
    card1: {
      moveable: false,
      title: '问题复现卡片 - 不可移动',
      content: '这是卡片内容，文本选择应该正常工作。',
      footer: '版本：3.6.0 | 状态：存在文本选择问题'
    },
    card2: {
      moveable: true,
      title: '对比卡片 - 可移动',
      content: '这是可移动卡片的内容，文本选择应该正常工作。',
      footer: '版本：3.6.0 | 状态：可移动卡片正常'
    },
    card3: {
      moveable: undefined,
      title: '默认配置卡片 - 未设置 moveable',
      content: '这是默认配置的卡片内容。',
      footer: '版本：3.6.0 | 状态：默认配置问题'
    }
  });

  const updateConfig = (key: string, field: keyof CardConfig, value: any) => {
    setConfigs(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };


  const longTitle = "这是一个很长的标题，用于测试文本选择功能是否正常工作，用户应该能够选择并复制这段文字";
  const longFooter = "这是一个很长的脚注信息，包含版权信息、联系方式、更新时间等重要信息，用户应该能够选择并复制这些内容进行引用或记录。";

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Card.Header 和 Card.Footer 文本选择问题复现</h3>
        <p>
          在 3.6.0 版本中，Card.Header 和 Card.Footer 在未开启 moveable 属性时，
          用户无法选择其中的文本内容，这影响了信息的复制和使用。
        </p>
      </div>

      {/* 说明和测试指引 */}
      <div style={{ 
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: '#e7f3ff', 
        borderRadius: 6,
        border: '1px solid #91d5ff'
      }}>
        <h4>测试方法：</h4>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>尝试用鼠标选择下方卡片的标题（Header）文本</li>
          <li>尝试用鼠标选择下方卡片的脚注（Footer）文本</li>
          <li>对比可移动和不可移动卡片的文本选择行为</li>
          <li>在 3.6.0 版本中，不可移动卡片的 Header/Footer 文本可能无法选择</li>
        </ol>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20 }}>
        
        {/* 问题复现卡片1 - 不可移动 */}
        <Card moveable={configs.card1.moveable}>
          <Card.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                {configs.card1.title}
              </span>
              <Switch
                size="small"
                checked={configs.card1.moveable || false}
                onChange={(checked) => updateConfig('card1', 'moveable', checked)}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: 5 }}>
              moveable = {String(configs.card1.moveable)} | 尝试选择这段文字
            </div>
          </Card.Header>
          
          <Card.Body style={{ padding: 16 }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {configs.card1.content}
            </p>
            <div style={{ marginTop: 15, fontSize: '12px', color: '#666' }}>
              <strong>测试步骤：</strong>
              <ul style={{ margin: '5px 0', paddingLeft: 16 }}>
                <li>尝试选择上方标题区域的文本</li>
                <li>尝试选择下方脚注区域的文本</li>
                <li>观察是否能够成功选择和复制</li>
              </ul>
            </div>
          </Card.Body>
          
          <Card.Footer>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {configs.card1.footer}
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: 5 }}>
              尝试选择这段脚注文字进行复制测试
            </div>
          </Card.Footer>
        </Card>

        {/* 对比卡片 - 可移动 */}
        <Card moveable={configs.card2.moveable}>
          <Card.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
                {configs.card2.title}
              </span>
              <Switch
                size="small"
                checked={configs.card2.moveable || false}
                onChange={(checked) => updateConfig('card2', 'moveable', checked)}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: 5 }}>
              moveable = {String(configs.card2.moveable)} | 尝试选择这段文字
            </div>
          </Card.Header>
          
          <Card.Body style={{ padding: 16 }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {configs.card2.content}
            </p>
            <div style={{ marginTop: 15, fontSize: '12px', color: '#666' }}>
              <strong>对比参考：</strong>
              <ul style={{ margin: '5px 0', paddingLeft: 16 }}>
                <li>可移动卡片的文本选择通常正常</li>
                <li>但是启用拖拽功能时可能影响文本选择体验</li>
                <li>需要在拖拽和文本选择之间找到平衡</li>
              </ul>
            </div>
          </Card.Body>
          
          <Card.Footer>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {configs.card2.footer}
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: 5 }}>
              这是可移动卡片的脚注，文本选择行为可能不同
            </div>
          </Card.Footer>
        </Card>

        {/* 默认配置卡片 */}
        <Card>
          <Card.Header>
            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
              {configs.card3.title}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: 5 }}>
              moveable = undefined (默认) | 尝试选择这段文字
            </div>
          </Card.Header>
          
          <Card.Body style={{ padding: 16 }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {configs.card3.content}
            </p>
          </Card.Body>
          
          <Card.Footer>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {configs.card3.footer}
            </div>
          </Card.Footer>
        </Card>
      </div>

      {/* 长文本测试卡片 */}
      <div style={{ marginTop: 30 }}>
        <h4>长文本选择测试</h4>
        <Card>
          <Card.Header>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
              长标题文本选择测试
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
              {longTitle}
            </div>
          </Card.Header>
          
          <Card.Body style={{ padding: 16 }}>
            <h5>测试说明：</h5>
            <ul>
              <li>上方的长标题应该可以被正常选择和复制</li>
              <li>下方的长脚注也应该可以被正常选择和复制</li>
              <li>在 3.6.0 版本中，如果卡片不可移动，这些文本可能无法选择</li>
              <li>尝试双击选择单词，或拖拽选择整段文本</li>
            </ul>
          </Card.Body>
          
          <Card.Footer>
            <div style={{ fontSize: '12px', lineHeight: 1.5, color: '#666' }}>
              {longFooter}
            </div>
          </Card.Footer>
        </Card>
      </div>

      {/* 交互测试区域 */}
      <div style={{ marginTop: 30 }}>
        <Card>
          <Card.Header>
            <strong>交互测试区域</strong>
          </Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <h5>选择测试结果记录：</h5>
              <div style={{ 
                padding: 10, 
                backgroundColor: '#f8f9fa', 
                borderRadius: 4,
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <div style={{ marginBottom: 5 }}>
                  请在上方卡片中测试文本选择，然后在这里记录结果：
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>不可移动卡片的 Header 文本选择：[ 待测试 ]</li>
                  <li>不可移动卡片的 Footer 文本选择：[ 待测试 ]</li>
                  <li>可移动卡片的 Header 文本选择：[ 待测试 ]</li>
                  <li>可移动卡片的 Footer 文本选择：[ 待测试 ]</li>
                  <li>默认配置卡片的文本选择：[ 待测试 ]</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#666' }}>
              <strong>键盘快捷键测试：</strong>
              <ul style={{ margin: '5px 0', paddingLeft: 16 }}>
                <li>Ctrl+A (全选) 在卡片内容区域是否正常工作</li>
                <li>双击单词选择是否在 Header/Footer 中有效</li>
                <li>三击行选择是否在 Header/Footer 中有效</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div style={{ 
        marginTop: 20,
        padding: 15, 
        backgroundColor: '#fff3cd', 
        borderRadius: 4, 
        border: '1px solid #ffeaa7' 
      }}>
        <h4>问题说明：</h4>
        <ul>
          <li>Card.Header 和 Card.Footer 在未开启 <code>moveable</code> 时，文本可能无法被选择</li>
          <li>这可能是由于事件处理或 CSS 样式设置导致的用户选择被阻止</li>
          <li>影响用户复制标题、版权信息、链接等重要内容的能力</li>
          <li>在信息展示、文档系统、数据面板等场景中会显著影响可用性</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>在不可移动的卡片中尝试选择 Header 或 Footer 的文本</li>
          <li>对比可移动卡片和不可移动卡片的文本选择行为</li>
          <li>测试不同的选择方式：拖拽选择、双击选择、三击选择等</li>
          <li>在 3.6.0 版本中可能出现无法选择的情况</li>
        </ol>
        
        <h4>影响场景：</h4>
        <ul>
          <li>用户需要复制卡片标题作为引用</li>
          <li>复制版权信息或联系方式</li>
          <li>复制错误信息或状态信息用于报告</li>
          <li>复制配置信息或技术参数</li>
        </ul>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1 正式版本中修复，Card.Header 和 Card.Footer 的文本现在可以正常选择</p>
      </div>
    </div>
  );
};

export default App;