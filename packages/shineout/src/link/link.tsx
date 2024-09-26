import React from 'react';
import { Link } from '@sheinx/base';
import { useLinkStyle } from '@sheinx/shineout-style';
import { LinkProps } from './link.type';


const jssStyle = {
    link: useLinkStyle
}
export default (props: LinkProps) => {
    return (
        <Link
            jssStyle={jssStyle}
            {...props}
        />
  );
}
