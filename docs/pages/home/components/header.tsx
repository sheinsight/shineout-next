import { useEffect, useState } from 'react';
import useStyle from '../style';
import { logo } from '../svg';
import CustomDropdown from './custom-dropdown';
import clsx from 'clsx';
import { ecologyList } from '../constants';

const Header = () => {
  const styles = useStyle();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const layoutElement = document.getElementById('layout');
    
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      const scrollTop = target.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    if (layoutElement) {
      layoutElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (layoutElement) {
        layoutElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={clsx(styles.header, isScrolled && styles.headerScrolled)}>
      <div className={styles.headerContent}>
        {logo}
        <div className={styles.headerFunc}>
          <CustomDropdown content={'设计'} data={[ecologyList[0], ecologyList[1]]} />
          <CustomDropdown content={'生态产品'} data={[ecologyList[2]]} />
        </div>
      </div>
    </div>
  )
}

export default Header;