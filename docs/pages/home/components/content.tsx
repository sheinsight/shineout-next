import classNames from 'classnames';
import useStyle from '../style';
import { Icon, star, userIcon } from '../svg';
import { Avatar, Button, Carousel, Progress, Rate, Switch, TYPE, useToken } from 'shineout';
// @ts-ignore
import Item1 from '../static/item1.png';
// @ts-ignore
import Item2 from '../static/item2.png';
import AutoProgress from './auto-progress';
import { url } from '../constants';

type PropgressType = TYPE.Progress.Props['type'];

export interface ContentProps {}

const Content = (props: ContentProps) => {
  const { } = props;
  const styles = useStyle();
  const { token } = useToken();

  const StarRate = Rate(star, star)

  const renderArea = (children: React.ReactNode) => (
    <div className={styles.area}>
      {children}
    </div>
  )

  const renderCarousel = () => {
    const images = [Item1, Item2];
    return (
      <Carousel showArrow={'hover'} interval={5000} className={styles.carousel}>
        {images.map((item) => (
          <img key={item} src={item} />
        ))}
      </Carousel>
    )
  }

  const renderTheme = () => {
    const pickerList = ['brand', 'indigo', 'cyan']

    return (
      <>
        <div className={styles.font}>
          <Icon type='fontBorder' />
          <Icon type='font' className={styles.fontContent} />
        </div>
        <div className={styles.picker}>
          {pickerList.map((item, index) => (
            <div className={styles.pickerRow} key={index}>
              {
                new Array(6).fill(0).map((_, i) => i + 1).reverse().map((i) => (
                  <div key={i} className={styles.pickerItem} style={{ background: token[`${item}_${i}` as keyof typeof token] }} onClick={() => console.log('demo')}></div>
                ))
              }
            </div>
          ))}
        </div>
      </>
    )
  }

  const renderButton = () => (
    <>
      <div className={classNames(styles.buttons, styles.columnsAreaList)}>
        <Button type='primary' >{'Primary'}</Button>
        <Button type='success' >{'Success'}</Button>
        <Button type='primary' mode='outline' >{'Outline'}</Button>
      </div>
      <div className={classNames(styles.buttons, styles.columnsAreaList)}>
        <Button type='danger' >{'Danger'}</Button>
        <Button type='warning' >{'Warning'}</Button>
        <Button type='primary' mode='dashed' >{'Dottedline'}</Button>
      </div>
    </>
  )

  const renderSwitchAndRate = () => (
    <div className={styles.columnsArea}>
      {
        renderArea(
          <div className={styles.columnsAreaItem}>
            <Switch defaultValue={true} />
            <Switch />
          </div>
        )
      }
      {
        renderArea( <div className={styles.columnsAreaItem}><StarRate defaultValue={4} /></div>)
      }
    </div>
  )

  const firstNodes = [renderTheme(), renderButton()]

  const renderProgressAndAvatar = () => {
    const progresses = [
      { value: 40, type: 'info' },
      { value: 50, type: 'warning' },
      { value: 100, type: 'success' }
    ]

    const renderAvatars = () => {
      return new Array(5).fill(0).map((_, index) => {
        return <Avatar key={index} src={`${url}/0${index + 1}.png`}></Avatar>;
      });
    }

    return (
      (
        <div className={styles.columnsArea}>
          {renderArea(
            <div className={classNames(styles.columnsAreaList, styles.progress)}>
              {
                progresses.map((item, index) => (
                  <AutoProgress key={index} target={item.value} type={item.type as PropgressType} />
                ))
              }
            </div>
          )}
          {
            renderArea(
              <div className={styles.avatarList}>
                <Avatar icon={userIcon} />
                <Avatar src={`${url}/01.png`}></Avatar>
                <Avatar>W</Avatar>
                <Avatar.Group>{renderAvatars()}</Avatar.Group>
              </div>
            )
          }
        </div>
      )
    )
  }

  const renderIcons = () => {

    return (
      <div className={styles.icons}>
        {new Array(20).fill(0).map((_, index) => (
          <div key={index} className={styles.iconWrapper}>
            <Icon type={`icon${index + 1}`} className={styles.icon}/>
          </div>
        ))}
      </div>
    )
  }

  const lastNodes = [renderCarousel(), renderIcons()];

  return (
    <div className={styles.content}>
      {firstNodes.map(renderArea)}
      {renderSwitchAndRate()}
      {renderProgressAndAvatar()}
      {lastNodes.map(renderArea)}
    </div>
  )
}

export default Content;