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
  const { jssStyle, index, color } = props;

  return (
    <div key={index} className={classNames(jssStyle?.spin.item)}>
      <svg viewBox='0 0 100 100'>
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

  return <BaseSpin></BaseSpin>;
};

export default Spin;
