import { util } from '@sheinx/hooks';
import classNames from 'classnames';
import { SkeletonClasses, SkeletonProps, SkeletonSemanticKey } from './skeleton.type';
import Text from './text';
import Image from './image';
import Button from './button';
import { useConfig } from '../config';
import { useSemantic } from '../common';

function getComponentProps(prop: any): Record<string, any> {
  return util.isObject(prop) ? prop : {};
}

const Skeleton = (props: SkeletonProps) => {
  const { animation, image, button, text = true, children, loading, jssStyle, classNames: classNamesProp, styles: stylesProp } = props;

  const classes = jssStyle?.skeleton?.() as SkeletonClasses;

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<SkeletonSemanticKey>(
    classNamesProp,
    stylesProp,
    config.skeleton,
  );

  const rootClass = classNames(classes.rootClass, classes.wrapper, props.className, {
    [classes.animation]: animation,
  }, semClass('root'));

  const imageProps = getComponentProps(image);
  const textProps = getComponentProps(text);
  const buttonProps = getComponentProps(button);

  if (loading) {
    return (
      <div className={rootClass} style={{ ...props.style, ...semStyle('root') }}>
        {image && imageProps.position !== 'right' && <Image classes={classes} {...imageProps} className={classNames(imageProps.className, semClass('image'))} style={{ ...imageProps.style, ...semStyle('image') }} />}

        <div className={classes.content}>
          {text && <Text classes={classes} {...textProps} className={classNames(textProps.className, semClass('text'))} style={{ ...textProps.style, ...semStyle('text') }} />}
          {button && <Button classes={classes} {...buttonProps} className={classNames(buttonProps.className, semClass('button'))} style={{ ...buttonProps.style, ...semStyle('button') }} />}
        </div>

        {image && imageProps.position === 'right' && <Image classes={classes} {...imageProps} className={classNames(imageProps.className, semClass('image'))} style={{ ...imageProps.style, ...semStyle('image') }} />}
      </div>
    );
  }

  return children;
};

export default Skeleton;
