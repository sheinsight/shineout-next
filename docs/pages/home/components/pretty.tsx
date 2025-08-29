import { useMemo, useState } from 'react';
import classNames from 'classnames';
import useStyle from '../style';
import { Icon, prettyIcon } from '../svg';
import { Button, Menu } from 'shineout';

export interface IMenuData {
  id: string,
  title: string,
  icon?: React.ReactNode,
  children?: IMenuData[]
} 

export interface ISelectValue {
  color: string,
  radius: string,
  fontSize: string
}

export interface IThemeConfig {
  primaryColor: string,
  borderRadius: string,
  fontSize: string
}

const menuData = [
  {
    id: '1',
    title: 'Home page',
    icon: <Icon type='home' />,
    children: []
  },
  {
    id: '2',
    title: 'Experience Center',
    icon: <Icon type='list' />,
    children: [
      {
        id: '3',
        title: 'Themes'
      },{
        id: '4',
        title: 'Others'
      },
    ]
  },
  {
    id: '5',
    title: 'Global',
    icon: <Icon type='cards' />,
    children: []
  },
  {
    id: '6',
    title: 'Component',
    icon: <Icon type='com' />,
    children: []
  }
]

const Pretty = () => {
  const styles = useStyle();

  const prettyList = useMemo(() => [
    {
      title: '主题色',
      name: 'color',
      list: [
        {
          title: '山药蓝',
          color: '#197AFA',
        },
        {
          title: '生机绿',
          color: '#00A85F',
        },
        {
          title: '活力橙',
          color: '#F75229',
        },
        {
          title: '科技蓝',
          color: '#4446F7',
        },
        {
          title: '魅力粉',
          color: '#D84293',
        },
        {
          title: '喜庆红',
          color: '#EB4242',
        }
      ]
    },
    {
      title: '圆角',
      name: 'radius',
      list: [
        {
          title: '4px'
        },
        {
          title: '8px'
        },
        {
          title: '12px'
        },
        {
          title: '16px'
        },
        {
          title: '20px'
        },
        {
          title: '24px'
        },
      ]
    },
    {
      title: '字号',
      name: 'fontSize',
      list: [
        {
          title: '12px'
        },
        {
          title: '14px'
        },
        {
          title: '16px'
        },
        {
          title: '18px'
        },
      ]
    }
  ], [])

  const [selectValue, setSelectValue] = useState<ISelectValue>({
    color: '山药蓝',
    radius: '12px',
    fontSize: '14px'
  })

  // 主题颜色配置
  const themeColors = useMemo(() => ({
    '山药蓝': { primary: '#197AFA', light: '#E9F5FE' },
    '生机绿': { primary: '#00A85F', light: '#E6F7F0' },
    '活力橙': { primary: '#F75229', light: '#FEF0EA' },
    '科技蓝': { primary: '#4446F7', light: '#EAEAFF' },
    '魅力粉': { primary: '#D84293', light: '#F9E8F2' },
    '喜庆红': { primary: '#EB4242', light: '#FDEAEA' }
  }), []);

  // 主题配置映射
  const themeConfig = useMemo(() => {
    const selectedTheme = themeColors[selectValue.color as keyof typeof themeColors] || themeColors['山药蓝'];
    
    return {
      primaryColor: selectedTheme.primary,
      lightColor: selectedTheme.light,
      borderRadius: selectValue.radius,
      fontSize: selectValue.fontSize
    };
  }, [selectValue, themeColors]);

  // 处理卡片点击
  const handleItemClick = (name: keyof ISelectValue, title: string) => {
    setSelectValue(prev => ({
      ...prev,
      [name]: title
    }));
  };


  const renderIcon = (d: IMenuData) => d.icon

  const renderContentListArea = (title: string, name: string, list: {
    title: string,
    color?: string
  }[]) => (
    <div className={styles.prettyListArea}>
      {title}
      <div className={styles.prettyListAreaContent}>
        {
          list.map(({title, color}) => (
            <div 
              className={classNames(styles.prettyListAreaItem, [selectValue[name as keyof ISelectValue] === title && styles.prettyListAreaItemActive])} 
              key={title}
              onClick={() => handleItemClick(name as keyof ISelectValue, title)}
            >
              {color && <div className={styles.prettyListAreaItemColor} style={{backgroundColor: color}}></div>}
              {title}
            </div>
          ))
        }
      </div>
    </div>
  )

  const renderContent = () => (
    <div className={styles.prettyMain}>
      <Menu 
        keygen='id' 
        className={styles.prettyMenu} 
        mode='inline' 
        data={menuData} 
        inlineIndent={22} 
        renderItem={(v: IMenuData) => v.title}
        renderIcon={renderIcon}
        active={(d: IMenuData) => ['3'].includes(d.id)}
        defaultOpenKeys={['2']}
        // caretColor={themeConfig.primaryColor}
      />
      <div className={styles.prettyList}>
        {prettyList.map(({title, name, list}) => renderContentListArea(title, name, list))}
      </div>
    </div>
  )

  return (
    <div 
      className={classNames(styles.commonPageArea, styles.prettyWrapper)}
      style={{
        '--theme-primary-color': themeConfig.primaryColor,
        '--theme-light-color': themeConfig.lightColor,
        '--theme-border-radius': themeConfig.borderRadius,
        '--theme-font-size': themeConfig.fontSize
      } as React.CSSProperties}
    >
      {'定制主题 随心所欲'}
      <div className={styles.prettyContent}>
        <div className={styles.otherBack}></div>
        <div className={styles.pretty}>
          <div className={styles.prettyTitle}>
            {prettyIcon}
            <Button 
              type='primary' 
              shape='round' 
              onClick={() => {
                window.open('https://shineout-pretty.sheincorp.cn/', '_blank', 'noopener,noreferrer');
              }} 
              className={styles.titleButton}
            >
              {'立即使用'}
            </Button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Pretty;