import classNames from 'classnames';
import { SpinProps, renderItemProps } from './spin.type';
import BaseSpin from './base';
import { formatSize } from './utils';

const renderItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemStyle } = props;
  const style = Object.assign({ backgroundColor: color }, itemStyle);
  return (
    <div key={index} className={classNames(jssStyle?.spin.item)}>
      <div style={style}></div>
    </div>
  );
};

const renderSvgItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemClass, itemSize } = props;

  return (
    <div key={index} className={classNames(jssStyle?.spin.item, itemClass)}>
      <svg width={itemSize} height={itemSize} viewBox='0 0 100 100'>
        <circle fill={color} cx={50} cy={50} r={50} />
      </svg>
    </div>
  );
};

const renderSimpleItem = (props: renderItemProps) => {
  const { jssStyle, index, color, itemStyle } = props;
  const style = Object.assign({ backgroundColor: color }, itemStyle);

  return <div key={index} style={style} className={jssStyle?.spin.item} />;
};

const Default = (props: SpinProps) => {
  const { jssStyle, size = 'default', className } = props;
  const { value, unit } = formatSize(size);
  const sizeSet = Math.ceil(value / 12.5) + unit;

  return (
    <BaseSpin
      {...props}
      className={classNames(className, jssStyle?.spin.default)}
      count={12}
      itemStyle={{ width: sizeSet, borderRadius: sizeSet }}
      render={renderItem}
    ></BaseSpin>
  );
};

const ChasingDots = (props: SpinProps) => {
  const { jssStyle, className } = props;
  return (
    <BaseSpin
      {...props}
      count={2}
      className={classNames(className, jssStyle?.spin.chasingDots)}
      render={renderSvgItem}
    ></BaseSpin>
  );
};

const CubeGrid = (props: SpinProps) => {
  const { jssStyle, className } = props;

  return (
    <BaseSpin
      {...props}
      count={9}
      className={classNames(className, jssStyle?.spin.cubeGrid)}
      render={renderSimpleItem}
    />
  );
};

const DoubleBounce = (props: SpinProps) => {
  const { jssStyle, className } = props;
  return (
    <BaseSpin
      {...props}
      count={2}
      className={classNames(className, jssStyle?.spin.doubleBounce)}
      render={renderSimpleItem}
    />
  );
};

const FadingCircle = (props: SpinProps) => {
  const { size = 40, jssStyle, className } = props;
  const { value, unit } = formatSize(size);
  const itemSize = (value / 7).toFixed(3) + unit;

  return (
    <BaseSpin
      {...props}
      count={12}
      className={classNames(className, jssStyle?.spin.fadingCircle)}
      itemSize={itemSize}
      itemClass={classNames(jssStyle?.spin.fade)}
      render={renderSvgItem}
    />
  );
};

const ScaleCircle = (props: SpinProps) => {
  const { size = 40, jssStyle, className } = props;
  const { value, unit } = formatSize(size);
  const itemSize = (value / 7).toFixed(3) + unit;

  return (
    <BaseSpin
      {...props}
      count={12}
      className={classNames(className, jssStyle?.spin.fadingCircle)}
      itemSize={itemSize}
      itemClass={classNames(jssStyle?.spin.scaleCircle)}
      render={renderSvgItem}
    />
  );
};

const FourDots = (props: SpinProps) => {
  const { jssStyle, className } = props;
  return (
    <BaseSpin
      {...props}
      count={4}
      className={classNames(className, jssStyle?.spin.fourDots)}
      render={renderSvgItem}
    />
  );
};

const Plane = (props: SpinProps) => {
  const { color, jssStyle, className } = props;
  const style = {
    backgroundColor: color,
  };
  return (
    <BaseSpin
      {...props}
      count={0}
      style={style}
      className={classNames(className, jssStyle?.spin.plane)}
    />
  );
};

const Pulse = (props: SpinProps) => {
  const { color, jssStyle, className } = props;
  const style = {
    backgroundColor: color,
  };
  return (
    <BaseSpin
      {...props}
      count={0}
      style={style}
      className={classNames(className, jssStyle?.spin.pulse)}
    />
  );
};

const Ring = (props: SpinProps) => {
  const { size = 40, color, jssStyle, className } = props;
  const { value, unit } = formatSize(size);
  const style = {
    borderWidth: value / 10 + unit,
    borderTopColor: color,
    fontSize: value / 10 + unit,
  };
  console.log(style);
  return (
    <BaseSpin
      {...props}
      count={0}
      style={style}
      className={classNames(className, jssStyle?.spin.ring)}
    />
  );
};

const ThreeBounce = (props: SpinProps) => {
  const { size = 40, jssStyle, className } = props;
  const { value, unit } = formatSize(size);
  return (
    <BaseSpin
      {...props}
      count={3}
      itemSize={value / 2 + unit}
      style={{ width: value * 2 + unit, height: 'auto' }}
      className={classNames(className, jssStyle?.spin.threeBounce)}
      render={renderSvgItem}
    />
  );
};

const Wave = (props: SpinProps) => {
  const { size = 40, jssStyle, className } = props;
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
      className={classNames(className, jssStyle?.spin.wave)}
      render={renderSimpleItem}
    />
  );
};

const ChasingRing = (props: SpinProps) => {
  const { size = 40, color, className, jssStyle } = props;
  const { value, unit } = formatSize(size);
  const borderWidth = `${value / 10}${unit}`;
  const style = { borderWidth, borderTopColor: color, backgroundColor: 'transparent' };

  return (
    <BaseSpin
      {...props}
      count={4}
      itemStyle={style}
      className={classNames(className, jssStyle?.spin.chasingRing)}
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
