import { useState, useRef } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import useStyles from '../style';
import store from '../../store';
import { Header as HeaderProps } from 'docs/types';
import Tabs from './tabs';
import HeaderLogo from './logo';
import { collocatorPreset } from '../collocator/preset';
import DesignDocLink from './design';

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const [moveRatio, setMoveRatio] = useState<[number, number]>([0, 0]);

  const headerRef = useRef<HTMLDivElement>(null);

  const { describe, title, guides } = props;
  const headerClasses = classnames(classes.header, {
    [classes.stickyHeader]: state.scroll,
    // [classes.stickyHeader]: true,
  });
  const showGuide = guides && guides[state.locales] && guides[state.locales].length > 0;
  const showPlayground = !!Object.keys(collocatorPreset?.[props.title?.en] || {}).find(
    (item) => !collocatorPreset?.[props.title?.en]?.[item]?.hide,
  );

  const onMouseMove = (e: React.MouseEvent) => {
    if (!e) return;
    if (!headerRef || !headerRef.current) return;
    const x = e.clientX - 259;
    const y = e.clientY - 59;
    const rect = headerRef.current.getBoundingClientRect();
    setMoveRatio([x / rect.width, y / rect.height]);
  };

  const onMouseLeave = () => {
    setMoveRatio([0, 0]);
  };

  const componentTitle = title[state.locales];
  // 'Button 按钮', 从其中解析出组件英文名'Button'
  const componentName = componentTitle?.split(' ')[0];

  return (
    <>
      <div
        ref={headerRef}
        className={headerClasses}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <HeaderLogo moveRatio={moveRatio}></HeaderLogo>
        <h1 className={classnames('title')}>{title[state.locales]}</h1>
        <p className='subtitle'>
          {describe[state.locales]}
          <DesignDocLink componentName={componentName} />
        </p>
        <Tabs showGuide={showGuide} showPlayground={showPlayground}></Tabs>
      </div>
    </>
  );
};

export default Header;
