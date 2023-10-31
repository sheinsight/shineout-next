import icons from './index';
import { CaretType } from './caret.type';
import { useConfig } from '../config';

const caretMap: Record<CaretType, JSX.Element> = {
  line: icons.ArrowDown,
  fill: icons.PcArrowFillDown,
};

export default () => {
  const config = useConfig();
  if (config.caret) return caretMap[config.caret];
  return icons.PcArrowFillDown;
};
