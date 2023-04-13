import clsx from 'classnames';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import useStyle from './style';

export interface Props {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  customStyle?: typeof useStyle;
}
export default (props: Props) => {
  const styles = (props?.customStyle || useStyle)();
  const { children, style, className } = props;

  return (
    <div className={clsx(styles['group-wrapper'], className)} style={style}>
      {Children.map(children, (item) => {
        if (isValidElement(item)) {
          return cloneElement(item as ReactElement, {
            className: `${styles['group-item']} ${item?.props?.className}`,
          });
        }

        return item;
      })}
    </div>
  );
};
