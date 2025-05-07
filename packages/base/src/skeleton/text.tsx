import classNames from 'classnames';
import { SkeletonClasses, SkeletonTextProps } from './skeleton.type';
import { util } from '@sheinx/hooks';

interface TextProps extends SkeletonTextProps {
  classes: SkeletonClasses;
}

export default function Text({ classes, className, rows = 3, width, height, style }: TextProps): JSX.Element {
  const cls = classNames(classes.text, className);
  const nodes = [];

  function getTextWidth(index: number) {
    if (util.isArray(width)) {
      return width[index];
    }
    if (rows - 1 === index) {
      return width;
    }

    return undefined;
  }

  function getTextHeight(index: number) {
    if (util.isArray(height)) {
      return height[index];
    }
    if (rows - 1 === index) {
      return height;
    }

    return undefined;
  }

  for (let i = 0; i < rows; i++) {
    nodes.push(<li key={i} className={classes.textItem} style={{ width: getTextWidth(i), height: getTextHeight(i) }} />);
  }
  return <ul className={cls} style={style}>{nodes}</ul>;
}
