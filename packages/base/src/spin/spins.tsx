import clsx from 'clsx';
import { renderItemProps, SpinClasses, SpinProps } from './spin.type';
import BaseSpin from './base';
import { formatSize } from './utils';

const renderItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);
  const style = Object.assign({ backgroundColor: color }, itemStyle);
  return (
    <div key={index} className={clsx(spinStyles?.item)}>
      <div style={style}></div>
    </div>
  );
};

const renderSvgItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemClass, itemSize } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <div key={index} className={clsx(spinStyles.item, itemClass)}>
      <svg width={itemSize} height={itemSize} viewBox='0 0 100 100'>
        <circle fill={color} cx={50} cy={50} r={50} />
      </svg>
    </div>
  );
};

const renderSimpleItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemStyle } = props;
  const style = Object.assign({ backgroundColor: color }, itemStyle);
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return <div key={index} style={style} className={spinStyles.item} />;
};

const Default = (props: SpinProps) => {
  const { jssStyle, size = 'default' } = props;
  const { value, unit } = formatSize(size);
  const sizeSet = Math.ceil(value / 12.5) + unit;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin
      {...props}
      uniqueClassName={spinStyles.default}
      count={12}
      itemStyle={{ width: sizeSet, borderRadius: sizeSet }}
      render={renderItem}
    ></BaseSpin>
  );
};

const ChasingDots = (props: SpinProps) => {
  const { jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin
      {...props}
      count={2}
      uniqueClassName={spinStyles.chasingDots}
      render={renderSvgItem}
    ></BaseSpin>
  );
};

const CubeGrid = (props: SpinProps) => {
  const { jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin {...props} count={9} uniqueClassName={spinStyles.cubeGrid} render={renderSimpleItem} />
  );
};

const DoubleBounce = (props: SpinProps) => {
  const { jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin {...props} count={2} uniqueClassName={spinStyles.doubleBounce} render={renderSimpleItem} />
  );
};

const FadingCircle = (props: SpinProps) => {
  const { size = 40, jssStyle } = props;
  const { value, unit } = formatSize(size);
  const itemSize = (value / 7).toFixed(3) + unit;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin
      {...props}
      count={12}
      uniqueClassName={spinStyles.fadingCircle}
      itemSize={itemSize}
      itemClass={clsx(spinStyles.fade)}
      render={renderSvgItem}
    />
  );
};

const ScaleCircle = (props: SpinProps) => {
  const { size = 40, jssStyle } = props;
  const { value, unit } = formatSize(size);
  const itemSize = (value / 7).toFixed(3) + unit;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return (
    <BaseSpin
      {...props}
      count={12}
      uniqueClassName={spinStyles.fadingCircle}
      itemSize={itemSize}
      itemClass={clsx(spinStyles.scaleCircle)}
      render={renderSvgItem}
    />
  );
};

const FourDots = (props: SpinProps) => {
  const { jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return <BaseSpin {...props} count={4} uniqueClassName={spinStyles.fourDots} render={renderSvgItem} />;
};

const Plane = (props: SpinProps) => {
  const { color, jssStyle } = props;
  const style = {
    backgroundColor: color,
  };
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return <BaseSpin {...props} count={0} style={style} uniqueClassName={spinStyles.plane} />;
};

const Pulse = (props: SpinProps) => {
  const { color, jssStyle } = props;
  const style = {
    backgroundColor: color,
  };
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  return <BaseSpin {...props} count={0} style={style} uniqueClassName={spinStyles.pulse} />;
};

const Ring = (props: SpinProps) => {
  const { size = 40, color, jssStyle, style: styleProp = {} } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  const { value, unit } = formatSize(size);
  const style = {
    ...styleProp,
    borderWidth: value / 10 + unit,
    borderLeftColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    fontSize: value / 10 + unit,
  };

  return <BaseSpin {...props} count={0} style={style} uniqueClassName={spinStyles.ring} />;
};

const ThreeBounce = (props: SpinProps) => {
  const { size = 40, jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  const { value, unit } = formatSize(size);
  return (
    <BaseSpin
      {...props}
      count={3}
      itemSize={value / 2 + unit}
      style={{ width: value * 2 + unit, height: 'auto' }}
      uniqueClassName={spinStyles.threeBounce}
      render={renderSvgItem}
    />
  );
};

const Wave = (props: SpinProps) => {
  const { size = 40, jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  const { value, unit } = formatSize(size);
  let width = value / 7;
  let margin: string | number = value / 20;

  if (unit === 'px') {
    width = Math.floor(width);
    margin = Math.ceil(margin) + unit;
  } else {
    margin = '2px';
  }

  return (
    <BaseSpin
      {...props}
      itemStyle={{ width: width + unit, marginRight: margin }}
      count={5}
      uniqueClassName={spinStyles.wave}
      render={renderSimpleItem}
    />
  );
};

const ChasingRing = (props: SpinProps) => {
  const { size = 40, color, jssStyle } = props;
  const spinStyles = jssStyle?.spin?.() || ({} as SpinClasses);

  const { value, unit } = formatSize(size);
  const borderWidth = `${value / 10}${unit}`;
  const style = { borderWidth, borderTopColor: color, backgroundColor: 'transparent' };

  return (
    <BaseSpin
      {...props}
      count={4}
      itemStyle={style}
      uniqueClassName={spinStyles.chasingRing}
      render={renderSimpleItem}
    />
  );
};

export default {
  plane: Plane,
  pulse: Pulse,
  ring: Ring,
  wave: Wave,
  default: Default,
  'chasing-ring': ChasingRing,
  'chasing-dots': ChasingDots,
  'cube-grid': CubeGrid,
  'double-bounce': DoubleBounce,
  'fading-circle': FadingCircle,
  'four-dots': FourDots,
  'scale-circle': ScaleCircle,
  'three-bounce': ThreeBounce,
};
