import classNames from 'classnames';
import { SkeletonClasses, SkeletonButtonProps } from './skeleton.type';

interface ButtonProps extends SkeletonButtonProps {
  classes: SkeletonClasses;
}

export default function Button({
  classes,
  className,
  size,
  position,
  count = 1,
  style,
}: ButtonProps): JSX.Element {
  const cls = classNames(classes.button, {
    [classes.buttonLeft]: position !== 'right',
    [classes.buttonRight]: position === 'right',
    [classes.buttonSmall]: size === 'small',
    [classes.buttonLarge]: size === 'large',
  }, className);

  const buttons = [];

  for (let i = 0; i < count; i++) {
    buttons.push(<div key={i} className={classes.buttonItem} />);
  }

  return (
    <div className={cls} style={style}>
      {buttons}
    </div>
  );
}
