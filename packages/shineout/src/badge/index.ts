import Badge from './badge';


type RefBadge = typeof Badge;

export interface BadgeComponent extends RefBadge {
    displayName: string;
}

const BadgeComp: BadgeComponent = Badge as BadgeComponent;

BadgeComp.displayName = 'ShineoutBadge';

export default BadgeComp;
