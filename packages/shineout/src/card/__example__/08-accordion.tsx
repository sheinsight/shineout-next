/**
 * cn - 手风琴
 *    -- 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）
 * en - Accordion
 *    -- Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time
 */
import React from 'react';
import { Card } from 'shineout';

const bodyStyle = {
  background: 'var(--soui-neutral-fill-2)',
};
const App: React.FC = () => (
  <Card.Accordion defaultActive={1}>
    <Card split>
      <Card.Header>Card title 1</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
    <Card split>
      <Card.Header>Card title 2</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
    <Card split>
      <Card.Header>Card title 3</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
  </Card.Accordion>
);

export default App;
