import { Button } from 'shineout';
import useStyle from '../../style';
import { title, description } from '../../constants';

const FrontPage = () => {
  const styles = useStyle();

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
        <Button type='primary' shape='round' className={styles.titleButton}>{'开始使用'}</Button>
      </div>
    </div>
  )
}

export default FrontPage;