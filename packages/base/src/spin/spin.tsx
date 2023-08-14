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

const Spin = (props: SpinProps = {}) => {
  const { name = 'default' } = props;

  if (name === 'default') {
    return <Default {...props}></Default>;
  }

  if (name === 'chasing-dots') {
    return <ChasingDots {...props}></ChasingDots>;
  }

  if (name === 'cube-grid') {
    return <CubeGrid {...props}></CubeGrid>;
  }

  if (name === 'double-bounce') {
    return <DoubleBounce {...props}></DoubleBounce>;
  }

  if (name === 'fading-circle') {
    return <FadingCircle {...props}></FadingCircle>;
  }

  if (name === 'scale-circle') {
    return <ScaleCircle {...props}></ScaleCircle>;
  }

  if (name === 'four-dots') {
    return <FourDots {...props}></FourDots>;
  }

  if (name === 'plane') {
    return <Plane {...props}></Plane>;
  }

  if (name === 'pulse') {
    return <Pulse {...props}></Pulse>;
  }

  if (name === 'ring') {
    return <Ring {...props}></Ring>;
  }

  if (name === 'three-bounce') {
    return <ThreeBounce {...props}></ThreeBounce>;
  }

  return <BaseSpin {...props}></BaseSpin>;
};

export default Spin;
