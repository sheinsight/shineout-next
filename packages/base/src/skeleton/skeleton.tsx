import { util } from '@sheinx/hooks';
import classNames from 'classnames';
import { SkeletonClasses, SkeletonProps } from './skeleton.type';
import Text from './text';
import Image from './image';
import Button from './button';

function getComponentProps(prop: any): Record<string, any> {
  return util.isObject(prop) ? prop : {};
}

const Skeleton = (props: SkeletonProps) => {
  const { animation, image, button, text = true, children, loading, jssStyle } = props;

  const classes = jssStyle?.skeleton?.() as SkeletonClasses;

  const rootClass = classNames(classes.rootClass, classes.wrapper, props.className, {
    [classes.animation]: animation,
  });

  const imageProps = getComponentProps(image);
  const textProps = getComponentProps(text);
  const buttonProps = getComponentProps(button);

  if (loading) {
    return (
      <div className={rootClass} style={props.style}>
        {image && imageProps.position !== 'right' && <Image classes={classes} {...imageProps} />}

        <div className={classes.content}>
          {text && <Text classes={classes} {...textProps} />}
          {button && <Button classes={classes} {...buttonProps} />}
        </div>

        {image && imageProps.position === 'right' && <Image classes={classes} {...imageProps} />}
      </div>
    );
  }

  return children;
};

export default Skeleton;
