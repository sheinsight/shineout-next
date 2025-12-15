import { CommonType, CommonChangeType } from '../common/type';

export interface SliderClasses {
  rootClass: string;
  wrapper: string;
  track: string;
  trackInner: string;
  indicator: string;
  indicatorStart: string;
  indicatorEnd: string;
  indicatorActive: string;
  indicatorHover: string;
  scaleWrapper: string;
  scale: string;
  label: string;
  value: string;
  valueHover: string;
  startValue: string;
  endValue: string;
  autoHide: string;
  disabled: string;
  vertical: string;
}

export interface SliderJssStyle {
  slider?: () => SliderClasses;
}

export interface SliderProps<Value>
  extends Pick<CommonType, 'className' | 'style'>,
    CommonChangeType<Value> {
  /**
   * @cn 展示当前值的方式,默认为常驻展示
   * @en The way to show the current value, the default is always displayed
   * @default 'always'
   */
  valueTipType?: 'always' | 'hover';
  jssStyle?: SliderJssStyle;
  /**
   * @en Automatically hides the current value and scale
   * @cn 是否自动隐藏当前值和刻度
   * @default false
   */
  autoHide?: boolean;

  /**
   * @en Format displayed scale. When it is false, the scale is not displayed.
   * @cn 格式化显示刻度，为 false 时，不显示刻度
   * @default v => v
   */
  formatScale?: ((value: number, index?: number) => React.ReactNode) | false;

  /**
   * @en Format displayed current value. When it is false, the current value is not displayed.
   * @cn 格式化显示当前值，为 false 时，不显示当前值
   * @default v => v
   */
  formatValue?: ((value: number) => React.ReactNode) | false;

  /**
   * @en height. Only effect when vertical is true
   * @cn 高度，仅在 vertical 为 true 情况下有效
   * @default 200
   */
  height?: number;

  /**
   * @en The callback function when the value is changing.
   * @cn 值改变时回调函数
   */
  onChange?: (value: Value) => void;

  /**
   * @en Value range. An array whose length is greater than 2.
   * @cn 取值范围，长度 >= 2 的数组
   * @default [0, 100]
   */
  scale?: number[];

  /**
   * @en Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected.
   * @cn 步长，必须大于等于0；为0时，只能选取 scale 指定的值
   * @default 1
   */
  step?: number;

  /**
   * @en current value
   * @cn 当前值
   * @override number | number[]
   */
  value?: Value;

  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: Value;

  /**
   * @en Whether to be vertical
   * @cn 是否垂直
   * @default false
   */
  vertical?: boolean;

  /**
   * @en Whether to display double slider
   * @cn 是否显示双滑块
   * @default false
   */
  range?: boolean;

  /**
   * @en Disable component
   * @cn 是否禁用组件
   * @default false
   */
  disabled?: boolean;

  /**
   * @en Drag over the maximum event
   * @cn 拖动超过最大值事件
   */
  onIncrease?: () => void;
}
