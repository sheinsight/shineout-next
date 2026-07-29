import React from 'react';
import { BorderBeam as UnStyledBorderBeam } from '@sheinx/base';
import { useBorderBeamStyle } from '@sheinx/shineout-style';
import type { BorderBeamProps } from './border-beam.type';

const jssStyle = {
  borderBeam: useBorderBeamStyle,
};

export default (props: BorderBeamProps) => <UnStyledBorderBeam {...props} jssStyle={jssStyle} />;
