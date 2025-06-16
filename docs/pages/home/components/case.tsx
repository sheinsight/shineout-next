import { useState, useEffect, useRef } from 'react';
import useStyle from '../style';
import { caseUp } from '../svg';
import UpNum from './up-num';
// @ts-ignore
import Case1 from '../static/case1.png';
// @ts-ignore
import Case2 from '../static/case2.png';
import { Image } from 'shineout';

const data = [
  {
    name: '接入项目数量',
    num: 202
  },
  {
    name: '迁移升级数量',
    num: 27
  },
  {
    name: '组件累积下载量',
    num: 12000,
  },
]

const Case = () => {
  const styles = useStyle();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderIndexItem = (num: number | string, name: string, index: number) => {
    const unit = num.toString().length > 4 ? 'W' : '';

    return (
      <div className={styles.caseIndexItem} key={index}>
        <div className={styles.caseIndexItemNum}>
          <div className={styles.caseIndexItemNumContent}>
            <UpNum target={Number(num)} isVisible={isVisible} />
            <div className={styles.caseIndexItemNumUnit}>{unit}</div>
          </div>
          {caseUp}
        </div>
        {name}
      </div>
    );
  };

  const renderCasePicItem = (pic: any) => (
    <div className={styles.casePicItem}>
      <div className={styles.casePicItemContent}>
        <Image src={pic} className={styles.casePicItemImg} />
      </div>
    </div>
  )
  
  return (
    <div className={styles.commonPageArea} ref={containerRef}>
      {'多场景的接入案例'}
      <div className={styles.caseIndex}>
        {data.map(({ name, num }, index) => renderIndexItem(num, name, index))}
      </div>
      <div className={styles.casePicList}>
        {renderCasePicItem(Case1)}
        {renderCasePicItem(Case2)}
      </div>
    </div>
  )
}

export default Case;