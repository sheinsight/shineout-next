import { HashRouter as Router, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './desktop/nav';
import Menu from './desktop/menu';
import LayoutDasktop from './desktop';
import useStyles from './style'

// 全局 URL 参数清理函数
const cleanUrlParams = (keepParams: string[] = []) => {
  const currentHash = window.location.hash;
  const questionMarkIndex = currentHash.indexOf('?');
  
  if (questionMarkIndex === -1) return;
  
  const basePath = currentHash.substring(0, questionMarkIndex);
  const queryString = currentHash.substring(questionMarkIndex + 1);
  const params = new URLSearchParams(queryString);
  
  // 只保留指定的参数
  const newParams = new URLSearchParams();
  keepParams.forEach(param => {
    const value = params.get(param);
    if (value) {
      newParams.set(param, value);
    }
  });
  
  const newQueryString = newParams.toString();
  const newHash = newQueryString ? `${basePath}?${newQueryString}` : basePath;
  
  if (newHash !== currentHash) {
    window.location.hash = newHash;
  }
};

const LayoutWithoutRouter = () => {
  const classes = useStyles();
  const location = useLocation();

  // 全局路由监听，处理参数清理
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 如果不是 changelog 页面，清理 version 参数
    if (!currentPath.includes('/changelog')) {
      cleanUrlParams([]);
    }
    // 如果是 changelog 页面，只保留 version 参数
    else {
      cleanUrlParams(['version']);
    }
  }, [location.pathname]);

  const isFullScreen = location.pathname?.includes('/home')

  return (
    <>
      {!isFullScreen && <Nav />}
      <main className={classes.container}>
        {!isFullScreen && <Menu />}
        <LayoutDasktop isFullScreen={isFullScreen} />
      </main>
    </>
  )
}

const Layout = () => (
  <Router>
    <LayoutWithoutRouter />
  </Router>
)

export default Layout;
