import Slider from './slider';

type RefSlider = typeof Slider;

export interface SliderComponent extends RefSlider {
  displayName: string;
}

const SliderComp: SliderComponent = Slider as SliderComponent;

SliderComp.displayName = 'ShineoutSlider';

export default SliderComp;
