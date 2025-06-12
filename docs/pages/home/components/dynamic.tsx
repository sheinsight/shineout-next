import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import useStyle from '../style';
import { Avatar, Tag } from 'shineout';
import { userIcon } from '../svg';
import { url } from '../constants';

export type IDynamicItemType = 'update' | 'add'

const Dynamic = () => {
  const styles = useStyle();
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isPausedRef = useRef(false);

  const renderAvatars = () => {
    return new Array(5).fill(0).map((_, index) => {
      return <Avatar key={index} src={`${url}/0${index + 1}.png`}></Avatar>;
    });
  }

  const dynamicList: {
    title: string,
    type: IDynamicItemType
    case?: React.ReactNode
  }[] = [
    {
      title: '下拉列表',
      type: 'update',
      
    },{
      title: '头像',
      type: 'add',
      case: (
        <>
          <Avatar icon={userIcon} />
          <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png'></Avatar>
          <Avatar>W</Avatar>
          <Avatar.Group>{renderAvatars()}</Avatar.Group>
        </>
      )
    },{
      title: '按钮',
      type: 'update'
    },{
      title: '树组件',
      type: 'update'
    },{
      title: '空状态',
      type: 'update'
    },{
      title: '表格',
      type: 'update'
    },{
      title: '步骤条',
      type: 'add'
    }
  ]
  
  // useEffect(() => {
  //   const content = contentRef.current;
  //   const container = containerRef.current;
  //   if (!content || !container) return;

  //   let position = 0;
  //   const speed = 1;
  //   const gap = 24;
  //   const itemWidth = 320;

  //   const scroll = () => {
  //     if (!isPausedRef.current) {
  //       position -= speed;
  //       const itemFullWidth = itemWidth + gap;

  //       if (Math.abs(position) >= itemFullWidth) {
  //         const firstItem = content.children[0];
  //         content.appendChild(firstItem);
  //         position = 0;
  //         content.style.transform = `translateX(${position}px)`;
  //       } else {
  //         content.style.transform = `translateX(${position}px)`;
  //       }
  //     }

  //     animationRef.current = requestAnimationFrame(scroll);
  //   };

  //   animationRef.current = requestAnimationFrame(scroll);

  //   const handleMouseEnter = () => {
  //     isPausedRef.current = true;
  //   };

  //   const handleMouseLeave = () => {
  //     isPausedRef.current = false;
  //   };

  //   container.addEventListener('mouseenter', handleMouseEnter);
  //   container.addEventListener('mouseleave', handleMouseLeave);

  //   Array.from(content.children).forEach(item => {
  //     item.addEventListener('mouseenter', handleMouseEnter);
  //     item.addEventListener('mouseleave', handleMouseLeave);
  //   });

  //   return () => {
  //     if (animationRef.current) {
  //       cancelAnimationFrame(animationRef.current);
  //     }
  //     container.removeEventListener('mouseenter', handleMouseEnter);
  //     container.removeEventListener('mouseleave', handleMouseLeave);
      
  //     Array.from(content.children).forEach(item => {
  //       item.removeEventListener('mouseenter', handleMouseEnter);
  //       item.removeEventListener('mouseleave', handleMouseLeave);
  //     });
  //   };
  // }, []);

  const renderItem = (title: string, type: IDynamicItemType, caseNode: React.ReactNode) => (
    <div 
      className={styles.dynamicItem} 
      key={title}
    >
      <div className={styles.dynamicItemTitle}>
        {title}
        <Tag className={styles.dynamicTag} color={type === 'add' ? 'success' : 'info'}>{type === 'add' ? '新增' : '更新'}</Tag>
      </div>
      <div className={styles.dynamicItemCase}>
        <div className={styles.dynamicItemCaseMain}>
          {caseNode}
        </div>
      </div>
    </div>
  );

  return (
    <div className={classNames(styles.commonPageArea, styles.dynamic)}>
      {'组件最新动态'}
      <div className={styles.dynamicList} ref={containerRef}>
        <div className={styles.dynamicListContent} ref={contentRef}>
          {dynamicList.map(({title, type, case: caseNode}) => renderItem(title, type, caseNode))}
        </div>
      </div>
    </div>
  );
};

export default Dynamic;