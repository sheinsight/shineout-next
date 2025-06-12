import { useNavigate } from 'react-router-dom';
import { Button } from 'shineout';
import useStyle from '../style';
import { useSnapshot } from 'valtio';
import { title, description } from '../constants';
import Locale from '../../../theme/locales'
import store from '../../../theme/store'
import Content from './content';

const FrontPage = () => {
  const styles = useStyle();
  const state = useSnapshot(store);
  const docsLocale = Locale({ locale: state.locales });
  const frontPageLocale = docsLocale['shineout.frontPage'];

  const navigate = useNavigate()

  const renderBack = () => (
    <>
      <div className={styles.pageBack}></div>
      <div className={styles.pageBackFilter}></div>
    </>
  )

  return (
    <div className={styles.frontPage}>
      {renderBack()}

      <div className={styles.title}>
        <div className={styles.titleTop}>
          <div className={styles.titleTopMain}>{title}</div>
          {description}
        </div>
        <Button onClick={() => navigate('/cn/doc/shineout/start')} type='primary' shape='round' className={styles.titleButton}>{frontPageLocale['begin']}</Button>
      </div>
      <Content />
    </div>
  )
}

export default FrontPage;