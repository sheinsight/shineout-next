import { Grid } from '@sheinx/base';
import { useGridStyle } from '@sheinx/shineout-style';
import { GridProps } from './grid.type';


const GridWithStyle = (props: GridProps) => {
  const jssStyle = {
    grid: useGridStyle,
  };
  return <Grid jssStyle={jssStyle} {...props} />;
};

GridWithStyle.isGrid = true;

export default GridWithStyle
