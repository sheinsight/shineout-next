import useStyle from '../style';
import { logo } from '../svg';
import { ecologyList } from '../constants';
import type { IEcologyList, IEcologyListItem } from '../types';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const styles = useStyle();

  const navigate = useNavigate()

  const renderItem = ({ title, target, onClick }: IEcologyListItem) => (
    <div className={styles.footerListItem} onClick={onClick || ( target ? (() => {
      if (target.startsWith('/')) {
        navigate(target);
        return;
      }

      window.open(target, '_blank', 'noopener,noreferrer');
    }) : undefined)}>
      {title}
    </div>
  )

  const renderList = ({title, list}: IEcologyList) => (
    <div className={styles.footerListContent}>
      {title}
      <div className={styles.footerListContentList}>
        {
          list.map(renderItem)
        }
      </div>
    </div>
  )

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        {logo}
        <div className={styles.footerList}>
          {ecologyList.map(renderList)}
        </div>
      </div>
    </div>
  )
}

export default Footer