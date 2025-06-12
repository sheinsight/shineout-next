import useStyle from '../style';
// @ts-ignore
import Icon1 from '../static/icon1.png';
// @ts-ignore
import Icon2 from '../static/icon2.png';
// @ts-ignore
import Icon3 from '../static/icon3.png';
// @ts-ignore
import Icon4 from '../static/icon4.png';
import { Image } from 'shineout';

const introduceData = [
  {
    icon: Icon1,
    name: '专业设计团队倾心打造',
    desc: '为组件注入优雅与灵魂'
  },
  {
    icon: Icon2,
    name: '全新B端设计体系',
    desc: '为你而用，为你而想'
  },
  {
    icon: Icon3,
    name: '全新主题解决方案',
    desc: '更山药，更闪耀！'
  },
  {
    icon: Icon4,
    name: '全新原生虚拟滚动',
    desc: '美丽与性能双双起飞'
  }
]

const Introduce = () => {
  const styles = useStyle();

  const renderItem = (icon: any, name: string, desc: string) => (
    <div className={styles.introduceItem} key={name}>
      <Image src={icon} className={styles.introduceItemIcon} />
      <div className={styles.introduceItemContent}>
        {name}
        <div className={styles.introduceItemDesc}>{desc}</div>
      </div>
    </div>
  )
  
  return (
    <div className={styles.introduce}>
      {'Shineout 3.0 的能力'}

      <div className={styles.introduceList}>
        {
          introduceData.map((item) => (
            renderItem(
              item.icon,
              item.name,
              item.desc
            )
          ))
        }
      </div>
    </div>
  )
}

export default Introduce;