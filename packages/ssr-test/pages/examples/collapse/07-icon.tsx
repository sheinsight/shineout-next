/**
 * cn - 展开图标位置
 *    -- 可设置是否显示展开图标以及图标展示的位置
 * en - Icon position
 *    -- You can set whether to display the expand icon and the position of the icon
 */
import React from 'react';
import { Collapse, Radio } from 'shineout';

export default () => {
  type PositionType = 'left' | 'right';
  type RegionType = 'header' | 'icon' | 'disabled';

  const iconPosition: (PositionType | 'none')[] = ['left', 'right', 'none'];
  const regions: RegionType[] = ['header', 'icon', 'disabled'];
  const [position, setPosition] = React.useState('left');
  const [region, setRegion] = React.useState<RegionType>('header');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };

  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Icon:</div>
        <Radio.Group
          keygen
          data={iconPosition}
          value={position}
          onChange={(d) => setPosition(d)}
        />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Hotspot:</div>
        <Radio.Group
          keygen
          data={regions}
          value={region}
          onChange={(d) => setRegion(d)}
        />
      </div>
      
      <Collapse
        style={{ maxWidth: 1180 }}
        triggerRegion={region}
        expandIconPosition={(position !== 'none' && position) as PositionType}
      >
        <Collapse.Item
          title='This is panel header 1'
          keygen='0'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 2'
          keygen='1'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 3'
          keygen='2'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};
