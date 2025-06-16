import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import useStyle from '../style';
import { Avatar, Button, Empty, Select, Steps, Tag, Tree } from 'shineout';
import { userIcon } from '../svg';
import { url } from '../constants';

const treeData = [
  {
    id: '0',
    name: '一级树',
    children: [
      {
        id: '0-0',
        name: '二级树',
        children: [
          {
            id: '0-0-0',
            name: '三级树',
          },{
            id: '0-0-1',
            name: '三级树',
          },
        ],
      },
      {
        id: '0-1',
        name: '二级树',
        children: [
          {
            id: '0-1-0',
            name: '三级树',
          },{
            id: '0-1-1',
            name: '三级树',
          },
        ],
      },
    ],
  },
]

const selectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink']

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
      case: (
        <div className={styles.dynamicItemCaseMainTop} style={{ height: '280px' }}>
          <Select clearable data={selectData} keygen placeholder='Select Color' />
        </div>
      )
      
    },{
      title: '头像',
      type: 'add',
      case: (
        <>
          <Avatar icon={userIcon} />
          <Avatar src={`${url}/01.png`}></Avatar>
          <Avatar>W</Avatar>
          <Avatar.Group>{renderAvatars()}</Avatar.Group>
        </>
      )
    },{
      title: '按钮',
      type: 'update',
      case: (
        <div className={styles.dynamicItemCaseMainFlexStart} style={{ width: '188px' }}>
          <Button type='primary'>{'填充按钮'}</Button>
          <Button type='primary' mode='outline'>{'线框按钮'}</Button>
          <Button type='primary' mode='dashed'>{'虚线按钮'}</Button>
          <Button type='default'>{'填充按钮'}</Button>
          <Button type='danger'>{'填充按钮'}</Button>
          <Button type='warning'>{'填充按钮'}</Button>
          <Button type='success'>{'填充按钮'}</Button>
        </div>
      )
    },{
      title: '树组件',
      type: 'update',
      case: (
        <div className={styles.dynamicItemCaseMainFlexStart}>
          <Tree
            defaultExpandAll
            line={false}
            data={treeData}
            keygen='id'
            renderItem={'name'}
          ></Tree>
        </div>
      )
    },{
      title: '空状态',
      type: 'update',
      case: (
        <Empty description={'暂无数据'} />
      )
    },{
      title: '步骤条',
      type: 'add',
      case: (
        <Steps current={1} direction='vertical'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step title='Processing' description='This is a description' />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      )
    }
  ]
  
  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    let position = 0;
    const speed = 1;
    const gap = 24;
    const itemWidth = 320;

    const scroll = () => {
      if (!isPausedRef.current) {
        position -= speed;
        const itemFullWidth = itemWidth + gap;

        if (Math.abs(position) >= itemFullWidth) {
          const firstItem = content.children[0];
          content.appendChild(firstItem);
          position = 0;
          content.style.transform = `translateX(${position}px)`;
        } else {
          content.style.transform = `translateX(${position}px)`;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef.current = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    Array.from(content.children).forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      Array.from(content.children).forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

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