import { useState, useEffect, useCallback, useMemo } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import LayoutDasktop from './Desktop';
import LayoutMobile from './Moblie';

const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const desktopLayout = useMemo(() => <LayoutDasktop />, []);
  const mobileLayout = useMemo(() => <LayoutMobile />, []);

  const layout = useMemo(() => {
    return windowWidth > 768 ? desktopLayout : mobileLayout;
  }, [windowWidth, desktopLayout, mobileLayout]);

  return <Router>{layout}</Router>;
};

export default Layout;
