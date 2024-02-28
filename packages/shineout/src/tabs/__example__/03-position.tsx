/**
 * cn - 不同位置
 *    -- 通过设置 `position` 属性来控制选项卡的位置
 *    -- 当 `shape` 为 button 或 fill 时，仅支持 top-left, top-right, bottom-left, bottom-right 四个位置
 *    -- 目前支持的位置有 top-left, top-right, bottom-left, bottom-right, left-top, right-top 六种布局
 * en - Position
 *    -- Set the position of the tab through the `position` property. When the `shape` is button or fill, only the four positions of top-left, top-right, bottom-left, bottom-right are supported
 *    -- Currently supported positions are top-left, top-right, bottom-left, bottom-right, left-top, right-top
 */
import { useState } from 'react';
import { Tabs, Radio, Form } from 'shineout';

export default () => {
  const [shape, setShape] = useState('line');
  const [position, setPosition] = useState('top-left');
  const shapes = ['line', 'card', 'button', 'fill', 'dash'];
  const positions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'left-top',
    'right-top',
  ];

  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({
      title: `Tab ${i + 1}`,
      content:
        i === 1
          ? 'Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open. Joy in living can never be assumed as a pose, or put on from the outside as a mask. People who have this joy do not need to talk about it; they radiate it. They just live out their joy and let it splash its sunlight and glow into other lives as naturally as bird sings. We can never get it by working for it directly. It comes, like happiness, to those who are aiming at something higher. It is a byproduct of great, simple living. The joy of living comes from what we put into living, not from what we seek to get from it. As you travel through life there are always those times when decisions just have to be made when the choices are hard, and solutions seem scarce and the rain seems to soak your parade!Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open. Joy in living can never be assumed as a pose, or put on from the outside as a mask. People who have this joy do not need to talk about it; they radiate it. They just live out their joy and let it splash its sunlight and glow into other lives as naturally as bird sings. We can never get it by working for it directly. It comes, like happiness, to those who are aiming at something higher. It is a byproduct of great, simple living. The joy of living comes from what we put into living, not from what we seek to get from it. As you travel through life there are always those times when decisions just have to be made when the choices are hard, and solutions seem scarce and the rain seems to soak your parade!'
          : `Content of Tab ${i + 1}`,
    });
  }

  return (
    <div>
      <Form labelWidth={65} labelAlign='left'>
        <Form.Item label='Position:' style={{ marginBottom: 16 }}>
          <Radio.Group keygen data={positions} value={position} onChange={setPosition} />
        </Form.Item>

        <Form.Item label='Type:' style={{ marginBottom: 24 }}>
          <Radio.Group keygen data={shapes} value={shape} onChange={setShape} />
        </Form.Item>
      </Form>

      <div style={{ height: 150 }}>
        <Tabs shape={shape as any} position={position as any} autoFill defaultActive={0}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title} disabled={index === tabs.length - 1}>
                <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
