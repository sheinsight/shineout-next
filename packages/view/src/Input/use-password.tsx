import type { InputProps } from '@soui/able';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import HideIcon from './icon/hide';
import ShowIcon from './icon/show';
import useStyle from './style';

export default function usePassword(
  type: InputProps['type'],
  customStyle: any,
): [boolean, ReactNode] {
  const [hide, setHide] = useState(true);
  const styles = (customStyle || useStyle)();
  const Icon = hide ? HideIcon : ShowIcon;

  const handleChange = useCallback(() => {
    setHide((h) => !h);
  }, []);

  if (type !== 'password') return [false, null];
  return [
    hide,
    <span key='el' className={styles.pwd} onClick={handleChange}>
      <Icon />
    </span>,
  ];
}
