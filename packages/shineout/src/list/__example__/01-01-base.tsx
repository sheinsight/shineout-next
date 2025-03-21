/**
 * cn - 基本用法
 *    -- 基础的列表展示，可承载文字、列表、图片、段落
 * en - Base
 *    -- Basic list display, can carry text, list, image, paragraph
 */
import React from 'react';
import { List } from 'shineout';

const data = [
  'This is a long list of contents',
  'This is a long list of contents',
  'This is a long list of contents',
  'This is a long list of contents',
]

const App: React.FC = () => {
  return <List keygen bordered data={data} />;
};

export default App;
