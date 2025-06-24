/**
 * cn - 自定义结果样式类名
 *    -- 通过 resultClassName 属性可以为选中的结果容器添加自定义的样式类名。支持字符串或函数形式
 * en - Custom result className
 *    -- Use the resultClassName property to add custom CSS class names to the selected result container. Supports both string and function forms
 */
import React from 'react';
import { Select } from 'shineout';

interface ColorData {
  id: number;
  name: string;
  color: string;
  category: string;
}

const data: ColorData[] = [
  { id: 1, name: 'Red', color: '#ff0000', category: 'warm' },
  { id: 2, name: 'Green', color: '#00ff00', category: 'cool' },
  { id: 3, name: 'Blue', color: '#0000ff', category: 'cool' },
  { id: 4, name: 'Orange', color: '#ffa500', category: 'warm' },
  { id: 5, name: 'Purple', color: '#800080', category: 'cool' },
  { id: 6, name: 'Yellow', color: '#ffff00', category: 'warm' },
];

const styles = `
  .result-warm {
    background-color: #fff3e0;
    border: 1px solid #ff9800;
    border-radius: 4px;
    padding: 2px 6px;
    color: #e65100;
  }
  
  .result-cool {
    background-color: #e3f2fd;
    border: 1px solid #2196f3;
    border-radius: 4px;
    padding: 2px 6px;
    color: #0d47a1;
  }
  
  .result-default {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 6px;
    color: #333;
  }
  
  .result-special {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border-radius: 8px;
    padding: 4px 8px;
    font-weight: bold;
  }
`;

export default () => {
  return (
    <div>
      <style>{styles}</style>
      
      <h4>字符串形式的 resultClassName</h4>
      <Select
        width={300}
        data={data}
        keygen="id"
        renderItem={(d: ColorData) => d.name}
        placeholder="选择颜色"
        resultClassName="result-special"
        style={{ marginBottom: 20 }}
      />
      
      <h4>函数形式的 resultClassName - 根据颜色类别动态设置</h4>
      <Select
        width={300}
        data={data}
        keygen="id"
        renderItem={(d: ColorData) => d.name}
        placeholder="选择颜色"
        resultClassName={(value: ColorData) => {
          if (value.category === 'warm') return 'result-warm';
          if (value.category === 'cool') return 'result-cool';
          return 'result-default';
        }}
        style={{ marginBottom: 20 }}
      />
      
      <h4>多选模式下的 resultClassName</h4>
      <Select
        width={300}
        data={data}
        keygen="id"
        renderItem={(d: ColorData) => d.name}
        placeholder="选择多个颜色"
        multiple
        resultClassName={(value: ColorData) => {
          return value.category === 'warm' ? 'result-warm' : 'result-cool';
        }}
        style={{ marginBottom: 20 }}
      />
      
      <h4>结合 renderResult 使用</h4>
      <Select
        width={300}
        data={data}
        keygen="id"
        renderItem={(d: ColorData) => d.name}
        renderResult={(d: ColorData) => (
          <span style={{ color: d.color }}>
            {d.name}
          </span>
        )}
        placeholder="选择颜色"
        resultClassName={(value: ColorData) => {
          return `result-${value.category}`;
        }}
      />
    </div>
  );
};