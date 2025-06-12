import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyle from '../style';
import { Icon } from '../svg';
import { Popover } from 'shineout';
import type { IEcologyList, IEcologyListItem } from '../types';

export interface CustomDropdownProps {
  content: React.ReactNode;
  data: IEcologyList[]
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { content, data } = props;
  const styles = useStyle();

  const navigate = useNavigate()

  const [fold, setFold] = useState<boolean>(false)

  const renderItem = (title: React.ReactNode, list: IEcologyListItem[]) => (
    <div className={styles.customDropdownPopoverItem}>
      <div className={styles.customDropdownPopoverItemTitle}>{title}</div>
      <div className={styles.customDropdownPopoverItemList}>
        {
          list.map(({title, icon, target}) => (
            <div className={styles.customDropdownPopoverItemMain} onClick={() => {
              if (!target) return
              if (target.startsWith('/')) {
                navigate(target);
                return;
              }
        
              window.open(target, '_blank', 'noopener,noreferrer');
            }}>
              <div className={styles.customDropdownPopoverItemMainIcon}>{icon}</div>
              {title}
            </div>
          ))
        }
      </div>
    </div>
  )

  return (
    <div className={styles.customDropdown}>
      {content}
      {fold ? (<Icon type="up" />) :(< Icon type="down" />)}
      <Popover visible={fold} position='bottom-right' onVisibleChange={setFold} trigger="click" className={styles.customDropdownPopover} showArrow={false}>
        <div className={styles.customDropdownPopoverContent}>
          {data.map(({title, list}) => renderItem(title, list))}
        </div>
      </Popover>
    </div>
  )
}

export default CustomDropdown;