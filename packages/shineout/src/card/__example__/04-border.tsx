/**
 * cn - 无边框卡片
 *    -- 通过设置 border 样式，可以去掉卡片的边框
 * en - Hover
 *    -- Set shadow to hover to show shadow when the mouse is over the card, and you can customize the hover style by overriding the style.
 */
import React from 'react';
import { Card, TYPE, Button } from 'shineout';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 360,
  border: 'none',
};

const App: React.FC = () => (
  <div style={{ padding: 32, background: '#f4f5f8' }}>
    <Card style={cardStyle} split>
      <Card.Header
        extra={
          <Button mode='text' type='primary'>
            文字按钮
          </Button>
        }
      >
        Card title
      </Card.Header>
      <Card.Body>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open.
      </Card.Body>
    </Card>
  </div>
);

export default App;
