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
