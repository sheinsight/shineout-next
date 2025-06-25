/**
 * cn - Tooltip persistent 配置优先级问题
 *    -- 3.6.0 版本中，Tooltip 的 persistent 配置优先级存在问题，不能正确遵循就近原则
 *    -- 全局配置可能会覆盖组件级别的 persistent 设置，导致行为不符合预期
 *    -- 问题复现：设置全局 persistent 配置，再在具体组件上设置不同的 persistent 值
 *    -- 此问题在 3.6.1 正式版本中已修复
 * en - Tooltip persistent configuration priority issue
 *    -- In version 3.6.0, Tooltip persistent configuration priority has issues, cannot correctly follow proximity principle
 *    -- Global configuration may override component-level persistent settings, causing unexpected behavior
 *    -- Reproduction: Set global persistent configuration, then set different persistent values on specific components
 *    -- Fixed in 3.6.1 official version
 */
import React, { useState } from 'react';
import { Tooltip, Button, Card, Switch, TYPE } from 'shineout';

type TooltipProps = TYPE.Tooltip.Props;
type ButtonProps = TYPE.Button.Props;
type CardProps = TYPE.Card.Props;
type SwitchProps = TYPE.Switch.Props;

const App: React.FC = () => {
  const [globalPersistent, setGlobalPersistent] = useState(false);
  const [showTooltips, setShowTooltips] = useState({
    persistent1: false,
    persistent2: false,
    persistent3: false,
    persistent4: false,
  });

  // 模拟全局配置（在实际应用中这通常在应用初始化时设置）
  const mockGlobalConfig = {
    tooltip: {
      persistent: globalPersistent
    }
  };

  const toggleTooltip = (key: keyof typeof showTooltips) => {
    setShowTooltips(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };


  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Tooltip persistent 配置优先级问题复现</h3>
        <p>
          在 3.6.0 版本中，Tooltip 的 persistent 配置优先级可能不正确，
          全局配置可能会覆盖组件级别的设置，不符合就近原则。
        </p>
      </div>

      {/* 全局配置控制 */}
      <div style={{ 
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 6,
        border: '1px solid #e9ecef'
      }}>
        <h4>全局配置模拟</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>全局 persistent 配置:</span>
          <Switch
            checked={globalPersistent}
            onChange={(checked) => setGlobalPersistent(checked)}
          />
          <span style={{ fontSize: '12px', color: '#666' }}>
            {globalPersistent ? '开启（鼠标离开不隐藏）' : '关闭（鼠标离开隐藏）'}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#999', marginTop: 5 }}>
          模拟全局配置: {JSON.stringify(mockGlobalConfig, null, 2)}
        </div>
      </div>

      {/* 测试用例 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        
        {/* 用例1: 明确设置 persistent={true} */}
        <Card>
          <Card.Header>用例1: 明确设置 persistent={`true`}</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>
                组件级别设置 persistent={`true`}，应该始终保持显示，不受全局配置影响
              </p>
              <Tooltip
                tip="这个 Tooltip 设置了 persistent={true}，鼠标离开后应该保持显示"
                persistent={true}
                visible={showTooltips.persistent1}
              >
                <Button 
                  onClick={() => toggleTooltip('persistent1')}
                  type={showTooltips.persistent1 ? 'primary' : 'default'}
                >
                  显示 persistent=true 的 Tooltip
                </Button>
              </Tooltip>
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              <strong>预期行为:</strong> 无论全局配置如何，鼠标离开按钮后 Tooltip 都应该保持显示
            </div>
          </Card.Body>
        </Card>

        {/* 用例2: 明确设置 persistent={false} */}
        <Card>
          <Card.Header>用例2: 明确设置 persistent={`false`}</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>
                组件级别设置 persistent={`false`}，应该在鼠标离开时隐藏，不受全局配置影响
              </p>
              <Tooltip
                tip="这个 Tooltip 设置了 persistent={false}，鼠标离开后应该隐藏"
                persistent={false}
                visible={showTooltips.persistent2}
              >
                <Button 
                  onClick={() => toggleTooltip('persistent2')}
                  type={showTooltips.persistent2 ? 'primary' : 'default'}
                >
                  显示 persistent=false 的 Tooltip
                </Button>
              </Tooltip>
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              <strong>预期行为:</strong> 无论全局配置如何，鼠标离开按钮后 Tooltip 都应该隐藏
            </div>
          </Card.Body>
        </Card>

        {/* 用例3: 不设置 persistent (使用全局配置) */}
        <Card>
          <Card.Header>用例3: 未设置 persistent</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>
                组件未设置 persistent，应该使用全局配置
              </p>
              <Tooltip
                tip="这个 Tooltip 未设置 persistent，应该使用全局配置"
                visible={showTooltips.persistent3}
              >
                <Button 
                  onClick={() => toggleTooltip('persistent3')}
                  type={showTooltips.persistent3 ? 'primary' : 'default'}
                >
                  显示使用全局配置的 Tooltip
                </Button>
              </Tooltip>
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              <strong>预期行为:</strong> 根据全局配置决定是否在鼠标离开后保持显示
            </div>
          </Card.Body>
        </Card>

        {/* 用例4: 复杂嵌套场景 */}
        <Card>
          <Card.Header>用例4: 嵌套 Tooltip 测试</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>
                测试嵌套场景下的 persistent 优先级
              </p>
              <Tooltip
                tip="外层 Tooltip (persistent=true)"
                persistent={true}
                visible={showTooltips.persistent4}
              >
                <div style={{ 
                  padding: 10, 
                  border: '1px dashed #ccc', 
                  borderRadius: 4,
                  display: 'inline-block'
                }}>
                  <Tooltip
                    tip="内层 Tooltip (persistent=false)"
                    persistent={false}
                  >
                    <Button 
                      onClick={() => toggleTooltip('persistent4')}
                      type={showTooltips.persistent4 ? 'primary' : 'default'}
                      size="small"
                    >
                      嵌套 Tooltip 测试
                    </Button>
                  </Tooltip>
                </div>
              </Tooltip>
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              <strong>预期行为:</strong> 每个 Tooltip 都应该按照自己的 persistent 设置工作
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 交互测试区域 */}
      <div style={{ marginTop: 30 }}>
        <Card>
          <Card.Header>交互测试区域</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '14px', marginBottom: 10 }}>
                鼠标悬停测试（测试真实的 hover 行为）：
              </p>
              <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
                <Tooltip
                  tip="persistent=true，悬停测试"
                  persistent={true}
                >
                  <Button>悬停我 (persistent=true)</Button>
                </Tooltip>

                <Tooltip
                  tip="persistent=false，悬停测试"
                  persistent={false}
                >
                  <Button>悬停我 (persistent=false)</Button>
                </Tooltip>

                <Tooltip
                  tip="使用全局配置，悬停测试"
                >
                  <Button>悬停我 (全局配置)</Button>
                </Tooltip>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#666' }}>
              <strong>测试方法:</strong> 将鼠标悬停在按钮上显示 Tooltip，然后移开鼠标观察 Tooltip 是否按预期隐藏或保持显示
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 当前状态显示 */}
      <div style={{ marginTop: 20 }}>
        <Card>
          <Card.Header>当前状态</Card.Header>
          <Card.Body>
            <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              <div>全局 persistent 配置: <strong>{String(globalPersistent)}</strong></div>
              <div>Tooltip 显示状态: {JSON.stringify(showTooltips, null, 2)}</div>
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
          <li>Tooltip 的 <code>persistent</code> 配置应该遵循就近原则</li>
          <li>组件级别的设置应该优先于全局配置</li>
          <li>在 3.6.0 版本中，可能出现全局配置覆盖组件配置的情况</li>
          <li>这会导致开发者设置的 persistent 值不生效，影响用户体验</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>切换上方的"全局 persistent 配置"开关</li>
          <li>测试各个用例中的 Tooltip 行为是否符合预期</li>
          <li>特别注意用例1和用例2，它们应该不受全局配置影响</li>
          <li>在交互测试区域使用鼠标悬停测试真实的行为</li>
        </ol>
        
        <h4>就近原则应该是：</h4>
        <ol>
          <li>组件上明确设置的 persistent 值（最高优先级）</li>
          <li>上下文提供的配置</li>
          <li>全局默认配置（最低优先级）</li>
        </ol>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1 正式版本中修复，persistent 配置现在正确遵循就近原则</p>
      </div>
    </div>
  );
};

export default App;