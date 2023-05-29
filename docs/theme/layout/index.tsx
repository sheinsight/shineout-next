import { useState, useEffect } from 'react';
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

  return <>{windowWidth > 768 ? <LayoutDasktop /> : <LayoutMobile />}</>;
};

export default Layout;
