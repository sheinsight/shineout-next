/**
 * cn - shineout icons
 *    -- shineout icons
 */
import React from 'react';
import { icons } from 'shineout';
function MyIcon(props: any) {
  const style = {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 4px',
    color: 'var(--soui-input-icon-color,var(--soui-neutral-text-4,#666C7C))',
    ...props.style,
  };
  return <div style={style}>{props.children}</div>;
}

type IconType = keyof typeof icons;

const App: React.FC = () => (
  <div>
    {Object.keys(icons).map((key) => {
      return (
        <div
          key={key}
          style={{ display: 'inline-block', width: 160, height: 100, textAlign: 'center' }}
        >
          <MyIcon>{icons[key as IconType]}</MyIcon>
          <div>{key}</div>
        </div>
      );
    })}
  </div>
);
export default App;
