import {  useEffect, useCallback, useMemo } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import LayoutDasktop from './desktop';
// import LayoutMobile from './moblie';

const Layout = () => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    // setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const desktopLayout = useMemo(() => <LayoutDasktop />, []);
  // const mobileLayout = useMemo(() => <LayoutMobile />, []);

  // const layout = useMemo(() => {
  //   return windowWidth > 768 ? desktopLayout : mobileLayout;
  // }, [windowWidth, desktopLayout, mobileLayout]);

  return <Router>{desktopLayout}</Router>;
};

export default Layout;
