import Watermark from './watermark';

type RefWatermark = typeof Watermark;

export interface WatermarkComponent extends RefWatermark {
  displayName: string;
}

const WatermarkComp: WatermarkComponent = Watermark as WatermarkComponent;

WatermarkComp.displayName = 'ShineoutWatermark';

export default WatermarkComp;
