import icons from './index';
import { CaretType } from './caret.type';
import { useConfig } from '../config';

const caretMap: Record<CaretType, JSX.Element> = {
  line: icons.CaretLine,
  fill: icons.CaretFill,
};

export default () => {
  const config = useConfig();
  if (config.caret) return caretMap[config.caret];
  return icons.CaretFill;
};
