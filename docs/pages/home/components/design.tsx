import classNames from 'classnames';
import { Button } from 'shineout';
import useStyle from '../style';
import { designArea, designBorder } from '../svg';

const designList = ['基础设计规范', '组件基本用法', '组件交互状态', '组件功能场景', '组件注意事项', '页面级规范']

const Design = () => {
  const styles = useStyle();

  const renderArea = (content: string) => (
    <div className={styles.designArea}>
      <div className={styles.designAreaBack}>
        {designArea}
      </div>
      <div className={styles.designAreaContent}>
        {content}
      </div>
    </div>
  )

  return (
    <div className={classNames(styles.design, styles.commonPageArea)}>
      <div className={styles.designTitle}>
        {'B端设计规范 诠释专业与高效之美'}
        <Button onClick={() => window.open('https://sodoc.sheincorp.cn/doc-preview?columnId=187&originalId=1', '_blank', 'noopener,noreferrer')} type='primary' shape='round' className={styles.titleButton}>{'立即查看'}</Button>
      </div>
      <div className={styles.designContent}>
        <div className={styles.designList}>
          {designList.map(renderArea)}
        </div>
        <div className={styles.designPic}>
          <div className={styles.designPicFont}>{designBorder}</div>
        </div>
      </div>
    </div>
  )
}

export default Design;