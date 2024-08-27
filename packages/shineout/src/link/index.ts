import Link from './link';


type RefLink = typeof Link;

export interface LinkComponent extends RefLink {
    displayName: string;
}

const LinkComp: LinkComponent = Link as LinkComponent;

LinkComp.displayName = 'ShineoutLink';

export default LinkComp;
