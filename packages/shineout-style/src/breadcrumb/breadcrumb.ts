import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BreadcrumbClasses = {
  wrapper: string;
  content: string;
  itemWrapper: string;
  item: string;
  itemWithDrop: string;
  down: string;
  downOpen: string;
  dropdownItem: string;
  separator: string;
  dropdown: string;
  ellipsis: string;
};
export type BreadcrumbClassType = keyof BreadcrumbClasses;

const breadcrumbStyle: JsStyles<BreadcrumbClassType> = {
  wrapper: {
    lineHeight: token.lineHeightDynamic,
    fontSize: token.breadcrumbFontSize,
    display: 'flex',
    alignItems: 'center',
    color: token.breadcrumbFontColor,
    '& a': {
      textDecoration: 'none',
      color: token.breadcrumbLinkColor,
      cursor: 'pointer',
      '&:hover': {
        color: token.breadcrumbLinkHoverColor,
      },
    },
  },
  content: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  ellipsis: {
    color: token.breadcrumbLinkColor,
    position: 'relative',
    top: '-3px',
  },
  itemWrapper: {
    padding: `0 ${token.breadcrumbListItemWrapperPaddingX}`,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  itemWithDrop: {
    display: 'flex',
    alignItems: 'center',
    color: token.breadcrumbLinkColor,
    '&:hover': {
      '&>a': {
        color: token.breadcrumbLinkHoverColor,
      },
      color: token.breadcrumbLinkHoverColor,
    },
  },
  down: {
    width: 14,
    height: 14,
    lineHeight: '1',
    marginLeft: 4,
  },
  downOpen: {
    transform: 'rotate(180deg)',
  },
  dropdown: {
    backgroundColor: token.breadcrumbListBackgroundColor,
    boxShadow: token.breadcrumbListShadow,
    border: `1px solid ${token.breadcrumbListBorderColor}`,
    padding: `${token.breadcrumbListPaddingY} 0`,
    color: token.breadcrumbLinkColor,
  },
  dropdownItem: {
    lineHeight: token.lineHeightDynamic,
    fontSize: token.breadcrumbFontSize,
    cursor: 'pointer',
    color: token.breadcrumbFontColor,
    borderRadius: token.breadcrumbListItemBorderRadius,
    '&:hover': {
      backgroundColor: token.breadcrumbListItemHoverBackgroundColor,
    },
    '& $content, &  a': {
      padding: `${token.breadcrumbListItemPaddingY} ${token.breadcrumbListItemPaddingX}`,
      display: 'inline-block',
      textDecoration: 'none',
      color: 'inherit',
      minWidth: '100px',
    },
  },
  separator: {
    margin: `0 ${token.breadcrumbSeparatorMarginX}`,
    color: token.breadcrumbLinkColor,
  },
};

export default breadcrumbStyle;
