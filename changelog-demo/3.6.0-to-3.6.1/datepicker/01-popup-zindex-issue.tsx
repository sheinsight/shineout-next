/**
 * cn - DatePicker 弹出层层级问题
 *    -- 3.6.0 版本中，DatePicker 的弹出层 z-index 层级可能存在问题
 *    -- 在复杂的页面布局中，弹出层可能被其他元素遮挡
 *    -- 问题复现：在有模态框、固定定位元素或高 z-index 元素的页面中使用 DatePicker
 *    -- 此问题在 3.6.1-beta.5 中已修复
 * en - DatePicker popup z-index layer issue
 *    -- In version 3.6.0, DatePicker popup z-index layer may have issues
 *    -- In complex page layouts, popup may be covered by other elements
 *    -- Reproduction: Use DatePicker in pages with modals, fixed positioned elements, or high z-index elements
 *    -- Fixed in 3.6.1-beta.5
 */
import React, { useState } from 'react';
import { DatePicker, Button, Modal, Card, TYPE } from 'shineout';

type DatePickerProps = TYPE.DatePicker.Props<Date>;
type DatePickerRangeProps = TYPE.DatePicker.Props<[Date?, Date?]>;
type ModalProps = TYPE.Modal.Props;
type ButtonProps = TYPE.Button.Props;

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DatePickerProps['value']>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date?, Date?] | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [showHighZIndexElement, setShowHighZIndexElement] = useState(false);


  return (
    <div style={{ padding: 20, minHeight: '100vh' }}>
      <div style={{ marginBottom: 20 }}>
        <h3>DatePicker 弹出层层级问题复现</h3>
        <p>
          在 3.6.0 版本中，DatePicker 的弹出层在复杂布局中可能被其他元素遮挡，
          特别是在有模态框、固定定位或高 z-index 元素的页面中。
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
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button 
            onClick={() => setShowModal(true)}
            type="primary"
          >
            打开模态框测试
          </Button>
          <Button 
            onClick={() => setShowHighZIndexElement(!showHighZIndexElement)}
            type={showHighZIndexElement ? 'danger' : 'default'}
          >
            {showHighZIndexElement ? '隐藏' : '显示'}高层级元素
          </Button>
        </div>
      </div>

      {/* 高 z-index 元素 */}
      {showHighZIndexElement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
          高 z-index 元素 (z-index: 9999) - 可能遮挡 DatePicker 弹出层
          <Button 
            onClick={() => setShowHighZIndexElement(false)}
            style={{ marginLeft: 20 }}
            size="small"
          >
            关闭
          </Button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {/* 基础测试 */}
        <Card>
          <Card.Header>基础 DatePicker 测试</Card.Header>
          <Card.Body>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>单个日期选择：</label>
              <DatePicker
                value={selectedDate}
                onChange={(value) => setSelectedDate(value)}
                placeholder="选择日期"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 5 }}>日期范围选择：</label>
              <DatePicker
                range
                value={selectedDateRange}
                onChange={(value) => setSelectedDateRange(value)}
                placeholder={['开始日期', '结束日期']}
                style={{ width: '100%' }}
              />
            </div>
          </Card.Body>
        </Card>

        {/* 在固定定位容器中的测试 */}
        <Card>
          <Card.Header>固定定位容器中的 DatePicker</Card.Header>
          <Card.Body>
            <div style={{
              position: 'relative',
              zIndex: 1000,
              backgroundColor: '#e9ecef',
              padding: 15,
              borderRadius: 4,
            }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '12px' }}>
                这个容器有 z-index: 1000
              </p>
              <DatePicker
                placeholder="在固定定位容器中选择日期"
                style={{ width: '100%' }}
              />
            </div>
          </Card.Body>
        </Card>

        {/* 在高层级元素附近的测试 */}
        <Card>
          <Card.Header>高层级元素附近的 DatePicker</Card.Header>
          <Card.Body>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 20,
                height: 20,
                backgroundColor: '#ff4d4f',
                borderRadius: '50%',
                zIndex: 5000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
              }}>
                !
              </div>
              <DatePicker
                placeholder="在高层级元素附近选择日期"
                style={{ width: '100%' }}
              />
              <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
                右上角的红色圆点有 z-index: 5000
              </p>
            </div>
          </Card.Body>
        </Card>

        {/* 多层嵌套容器测试 */}
        <Card>
          <Card.Header>多层嵌套容器测试</Card.Header>
          <Card.Body>
            <div style={{
              position: 'relative',
              zIndex: 100,
              backgroundColor: '#fff3cd',
              padding: 10,
              borderRadius: 4,
            }}>
              <div style={{
                position: 'relative',
                zIndex: 200,
                backgroundColor: '#d4edda',
                padding: 10,
                borderRadius: 4,
              }}>
                <div style={{
                  position: 'relative',
                  zIndex: 300,
                  backgroundColor: '#cce5ff',
                  padding: 10,
                  borderRadius: 4,
                }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '12px' }}>
                    三层嵌套 (z-index: 100 → 200 → 300)
                  </p>
                  <DatePicker
                    placeholder="在嵌套容器中选择日期"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 模态框测试 */}
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="模态框中的 DatePicker 测试"
        width={500}
        maskClosable={false}
      >
        <div style={{ padding: 20 }}>
          <p style={{ marginBottom: 15 }}>
            在模态框中使用 DatePicker，测试弹出层是否能正确显示在模态框之上。
          </p>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>选择日期：</label>
            <DatePicker
              placeholder="在模态框中选择日期"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>选择日期范围：</label>
            <DatePicker
              range
              placeholder={['开始日期', '结束日期']}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>在高 z-index 容器中：</label>
            <div style={{
              position: 'relative',
              zIndex: 10000,
              backgroundColor: '#f8f9fa',
              padding: 10,
              borderRadius: 4,
            }}>
              <DatePicker
                placeholder="z-index: 10000 容器中的日期选择"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button onClick={() => setShowModal(false)}>
              关闭
            </Button>
          </div>
        </div>
      </Modal>

      {/* 页面底部的 DatePicker - 测试弹出层方向 */}
      <div style={{ 
        marginTop: 50, 
        padding: 20, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 6,
        border: '2px dashed #6c757d'
      }}>
        <h4>页面底部的 DatePicker</h4>
        <p style={{ marginBottom: 15, fontSize: '12px', color: '#666' }}>
          测试弹出层在页面底部时的显示方向和层级
        </p>
        <div style={{ display: 'flex', gap: 15 }}>
          <DatePicker placeholder="底部日期选择" />
          <DatePicker range placeholder={['开始', '结束']} />
        </div>
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
          <li>DatePicker 的弹出层 z-index 可能不够高，被其他元素遮挡</li>
          <li>在模态框、固定定位元素或高 z-index 元素的页面中更容易出现</li>
          <li>弹出层可能部分或完全被遮挡，用户无法正常选择日期</li>
          <li>特别是在复杂的企业应用中，多层级的 UI 组件容易产生冲突</li>
        </ul>
        
        <h4>复现方法：</h4>
        <ol>
          <li>点击"显示高层级元素"按钮，创建一个高 z-index 的遮挡元素</li>
          <li>尝试打开各个 DatePicker 的弹出层，观察是否被遮挡</li>
          <li>点击"打开模态框测试"，在模态框中测试 DatePicker</li>
          <li>在 3.6.0 版本中可能出现弹出层被遮挡的情况</li>
        </ol>
        
        <h4>修复版本：</h4>
        <p>此问题已在 3.6.1-beta.5 版本中修复，DatePicker 弹出层的 z-index 得到了适当的调整</p>
      </div>
    </div>
  );
};

export default App;