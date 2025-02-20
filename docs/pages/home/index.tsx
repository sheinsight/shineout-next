import useStyle from './style';
import FrontPage from "./components/front-page";

const Home = () => {
  const styles = useStyle();

  return (
    <div className={styles.wrapper}>
      <FrontPage />
    </div>
  );
};

export default Home;
