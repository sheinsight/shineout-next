import Breadcrumb from './breadcrumb';

type RefBreadcrumb = typeof Breadcrumb;

export interface BreadcrumbComponent extends RefBreadcrumb {
  displayName: string;
}

const BreadcrumbComp: BreadcrumbComponent = Breadcrumb as BreadcrumbComponent;

BreadcrumbComp.displayName = 'ShineoutBreadcrumb';

export default BreadcrumbComp;
