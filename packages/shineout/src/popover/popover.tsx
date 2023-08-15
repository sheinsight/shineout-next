import { Popover } from '@sheinx/base';
import { usePopoverStyle } from '@sheinx/shineout-style';
import { PopoverProps } from './popover.type';

export default (props: PopoverProps) => {
  const {} = props;
  const popoverStyle = usePopoverStyle();
  const jssStyle = useMemo(() => ({ popover: popoverStyle }), [popoverStyle]);

  return (
    <Popover
      jssStyle={jssStyle}
      // ...
    />
  );
};
