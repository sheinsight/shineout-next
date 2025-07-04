import { useRoutes, Navigate } from 'react-router-dom';
import { dispatch } from '../../store';
import useStyles from './style';
import { useEffect, useRef } from 'react';
import FloatButton from './float';

import Content from './content';

import Home from '../../../pages/home';
import Design from '../../../pages/design';
import Introduce from '../../../pages/introduce';
import Component from '../../../pages/component';
import Changelog from '../../../pages/changelog';
import Debugger from '../../../pages/debug';
import Markdown from '../../../pages/markdown';

export interface DesktopProps {
  isFullScreen: boolean;
}

const Desktop = (props: DesktopProps) => {
  const { isFullScreen } = props;
  const classes = useStyles();

  const ref = useRef<HTMLDivElement>(null);

  const routes = [
    {
      path: ':lan/home',
      element: <Home />,
    },
    {
      path: ':lan/design',
      element: <Design />,
    },
    {
      path: ':lan/introduce',
      element: <Introduce />,
    },
    {
      path: ':lan/component/:project?/:comp?',
      element: (
        <Component>
          <Content></Content>
        </Component>
      ),
      children: [],
    },
    {
      path: ':name/debugger',
      element: <Debugger />,
    },
    {
      path: ':lan/doc/:project/changelog',
      element: <Changelog />,
    },
    {
      path: ':lan/doc/:project/:comp',
      element: <Markdown />,
    },
    {
      path: '*',
      element: <Navigate to='/cn/doc/shineout/start' replace={true} />,
    },
  ];

  function Routes() {
    return useRoutes(routes);
  }

  useEffect(() => {
    const scrollElement = ref.current;
    let scroll = false;
    if (!scrollElement) return;

    const handleScroll = () => {
      const top = scrollElement.scrollTop + 108;
      const titleElements = document.querySelectorAll('.anchor-title');
      let newActive = '';
      titleElements.forEach((item) => {
        if ((item as HTMLElement).offsetTop - 108 <= top) {
          newActive = item.id.split('-')[1];
        }
      });

      if (newActive) {
        dispatch.setActiveAnchor(newActive);
      }
      if (!scroll && top >= 230) {
        dispatch.setScroll(true);
        scroll = true;
      } else if (scroll && top <= 180) {
        dispatch.setScroll(false);
        scroll = false;
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={ref} id='layout' className={classnames(classes.desktop, !isFullScreen && classes.customScrollbar, isFullScreen && classes.fullScreen)}>
      <Routes></Routes>
      {!isFullScreen && <FloatButton></FloatButton>}
    </section>
  );
};

export default Desktop;
