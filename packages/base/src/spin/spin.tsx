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

const Default = (props: SpinProps) => {
  const { size = 'default', jssStyle, className } = props;
  const { value, unit } = formatSize(size);
  const sizeSet = Math.ceil(value / 12.5) + unit;

  return (
    <BaseSpin
      {...props}
      className={classNames(className, jssStyle?.spin.default)}
      count={12}
      itemStyle={{ width: sizeSet, borderRadius: sizeSet }}
      jssStyle={jssStyle}
      render={renderItem}
    ></BaseSpin>
  );
};

const Spin = (props: SpinProps = {}) => {
  const { name = 'default' } = props;

  if (name === 'default') {
    return <Default {...props}></Default>;
  }

  return <BaseSpin></BaseSpin>;
};

export default Spin;
