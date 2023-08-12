import classNames from 'classnames';
import { SpinProps, renderItemProps } from './spin.type';
import BaseSpin from './base';
import { formatSize } from './utils';

const renderItem = (props: renderItemProps) => {
  const { jssStyle, index, color, style } = props;
  const styleSet = Object.assign({ backgroundColor: color }, style);
  return (
    <div key={index} className={classNames(jssStyle?.spin.item)}>
      <div style={styleSet}></div>
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
      className={classNames(className, jssStyle?.spin.chasingDots)}
      count={2}
      render={renderSvgItem}
    ></BaseSpin>
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

  return <BaseSpin></BaseSpin>;
};

export default Spin;
