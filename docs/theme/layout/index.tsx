import { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import LayoutDasktop from './Desktop';
import LayoutMobile from './Moblie';

const Layout = () => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Router>{windowWidth > 768 ? <LayoutDasktop /> : <LayoutMobile />}</Router>;
};

export default Layout;
