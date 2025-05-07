import classNames from 'classnames';
import { SkeletonClasses, SkeletonImageProps } from './skeleton.type';

interface ImageProps extends SkeletonImageProps {
  classes: SkeletonClasses;
}

export default function Image({ classes, className, size, position, shape = 'circle', style }: ImageProps): JSX.Element {
  const cls = classNames(classes.image, {
    [classes.imageLeft]: position !== 'right',
    [classes.imageRight]: position === 'right',
    [classes.imageCircle]: shape === 'circle',
    [classes.imageSquare]: shape === 'square',
    [classes.imageSmall]: size === 'small',
    [classes.imageLarge]: size === 'large',
  }, className);

  return <div className={cls} style={style} />;
}
