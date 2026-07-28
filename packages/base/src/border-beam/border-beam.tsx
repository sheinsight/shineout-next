import React from 'react';
import type { BorderBeamClasses, BorderBeamProps } from './border-beam.type';
import BorderBeamEffect from './border-beam-effect';
import useBorderSize from './use-border-size';
import useChildDom from './use-child-dom';
import {
  BORDER_BEAM_CSS_VARIABLES,
  getBorderBeamGradient,
  getBorderBeamInset,
  toCssUnit,
} from './util';

type BorderBeamEffectStyle = React.CSSProperties & Record<string, string | number | undefined>;

const BorderBeam = (props: BorderBeamProps) => {
  const { children, className, style, color, duration, lineWidth, outset, size, jssStyle } = props;
  const classes = jssStyle?.borderBeam?.() || ({} as BorderBeamClasses);
  const [childNode, host] = useChildDom(children);
  const { borderWidth, borderRadius } = useBorderSize(host);
  const gradient = React.useMemo(() => getBorderBeamGradient(color), [color]);

  const effectStyle: BorderBeamEffectStyle = {
    ...style,
    ...(gradient ? { [BORDER_BEAM_CSS_VARIABLES.gradient]: gradient } : {}),
    ...(typeof duration === 'number' && duration > 0
      ? { [BORDER_BEAM_CSS_VARIABLES.duration]: duration + 's' }
      : {}),
    ...(lineWidth !== undefined && lineWidth !== null
      ? { [BORDER_BEAM_CSS_VARIABLES.lineWidth]: toCssUnit(lineWidth) }
      : {}),
    ...(size !== undefined && size !== null
      ? { [BORDER_BEAM_CSS_VARIABLES.size]: toCssUnit(size) }
      : {}),
    [BORDER_BEAM_CSS_VARIABLES.insetOffset]: getBorderBeamInset(outset, borderWidth),
    [BORDER_BEAM_CSS_VARIABLES.borderRadius]: borderRadius,
  };

  return (
    <>
      {childNode}
      <BorderBeamEffect
        host={host}
        rootClassName={classes.rootClass}
        beamClassName={classes.beam}
        className={className}
        style={effectStyle}
      />
    </>
  );
};

export default BorderBeam;
