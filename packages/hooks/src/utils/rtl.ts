import type { PositionType } from '../components/use-popup/use-popup.type';

type OppositePositionType = PositionType | 'auto';

const oppositeMap: Record<OppositePositionType, OppositePositionType> = {
  left: 'right',
  right: 'left',
  'left-top': 'right-top',
  'left-bottom': 'right-bottom',
  'right-top': 'left-top',
  'right-bottom': 'left-bottom',
  'top-left': 'top-right',
  'top-right': 'top-left',
  'bottom-left': 'bottom-right',
  'bottom-right': 'bottom-left',
  top: 'top',
  bottom: 'bottom',
  auto: 'auto',
};

export const getRTLPosition = (
  position: OppositePositionType | undefined,
  isRTL: boolean,
): OppositePositionType | undefined => {
  if (!isRTL || !position) return position;

  return oppositeMap[position] || position;
};
