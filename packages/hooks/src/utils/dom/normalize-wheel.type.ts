export interface OldWheelEvent extends WheelEvent {
  axis?: number;
  wheelDelta?: number;
  wheelDeltaY?: number;
  wheelDeltaX?: number;
  HORIZONTAL_AXIS?: number;
}
