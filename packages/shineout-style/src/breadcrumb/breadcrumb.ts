import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { BreadcrumbClasses } from '@sheinx/base';

export type BreadcrumbClassType = keyof BreadcrumbClasses;

const breadcrumbStyle: JsStyles<BreadcrumbClassType> = {
  rootClass: {},
  wrapper: {
    lineHeight: token.lineHeightDynamic,
    fontSize: token.breadcrumbFontSize,
    fontWeight: token.breadcrumbFontWeight,
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
    '&[role=button]:active': {
      color: token.breadcrumbDefaultLinkActiveColor,
    }
  },
  contentMaxWidth: {
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&&': {
      display: 'block',
    }
  },
  ellipsis: {
    color: token.breadcrumbLinkColor,
    position: 'relative',
    top: '-0.25em',
    cursor: 'pointer',
    '&:hover': {
      color: token.breadcrumbLinkHoverColor,
    },
  },
  itemWrapper: {
    // padding: `0 ${token.breadcrumbListItemWrapperPaddingX}`,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    '& a:not(a[class])': {
      color: token.breadcrumbDefaultLinkColor,
      '&:hover': {
        color: token.breadcrumbDefaultLinkHoverColor,
      },
      '&:active': {
        color: token.breadcrumbDefaultLinkActiveColor,
      },
    },
    // '&:not(a) svg': {
    //   color: token.breadcrumbIconBackgroundColor,
    // },
    // '& a svg': {
    //   color: 'inherit',
    // },
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
    borderRadius: token.dropdownListBorderRadius,
    backgroundColor: token.dropdownListBackgroundColor,
    boxShadow: token.dropdownListBoxShadow,
    border: `1px solid ${token.dropdownListBorderColor}`,
    // padding: `${token.breadcrumbListPaddingY} 0`,
    padding: `${token.dropdownListPaddingY} ${token.dropdownListPaddingX}`,
    color: token.breadcrumbLinkColor,
  },
  dropdownItem: {
    lineHeight: token.lineHeightDynamic,
    fontSize: token.dropdownListFontSize,
    fontWeight: token.breadcrumbFontWeight,
    cursor: 'pointer',
    color: token.dropdownOptionFontColor,
    borderRadius: token.dropdownOptionBorderRadius,
    '&:hover': {
      color: token.dropdownOptionHoverFontColor,
      backgroundColor: token.dropdownOptionHoverBackgroundColor,
    },
    '& $content, & a': {
      padding: `${token.dropdownOptionPaddingY} ${token.dropdownOptionPaddingX}`,
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
