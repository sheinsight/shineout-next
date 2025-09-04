import { useEffect } from 'react';
import useStyle from './style';
import FrontPage from "./components/front-page";
import Header from './components/header';
import Introduce from './components/introduce';
import Pretty from './components/pretty';
import Design from './components/design';
import Case from './components/case';
import Dynamic from './components/dynamic';
import Footer from './components/footer';

const Home = () => {
  const styles = useStyle();

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <FrontPage />

      <Introduce />
      <Case />
      <Dynamic />
      <Design />
      <Pretty />
      <Footer />
    </div>
  );
};

export default Home;
