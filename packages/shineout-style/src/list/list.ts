import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { ListClasses } from '@sheinx/base';

export type ListClassType = keyof ListClasses;

const listStyle: JsStyles<ListClassType> = {
  rootClass: {},
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapperBordered: {
    border: `${token.listBorderWidth} solid ${token.listBorderColor}`,
    borderRadius: token.listBorderRadius,
  },
  wrapperEmpty: {
    justifyContent: 'center',
  },
  wrapperSmall: {},
  wrapperLarge: {},
  wrapperStriped: {
    '& $row:nth-child(even)': {
      backgroundColor: token.listStripedBackgroundColor,
    },
  },
  scrollContainer: {
    overflow: 'auto',
    flex: '1',
    width: '100%',
    minHeight: 0,
  },
  loading: {
    padding: `${token.listItemPaddingY} ${token.listItemPaddingX}`,
    backgroundColor: 'hsla(0,0%,100%,.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBottom: {
    padding: 16,
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${token.listItemPaddingY} ${token.listItemPaddingX}`,
  },
  footer: {},
  row: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    boxSizing: 'border-box',
    '&:not(:last-child)': {
      borderBottom: `${token.listBorderWidth} solid ${token.listBorderColor}`,
    },
  },
  item: {
    fontSize: token.listFontSize,
    lineHeight: token.lineHeightDynamic,
    color: token.listFontColor,
    display: 'flex',
    flexWrap: 'nowrap',
    background: token.listItemBackgroundColor,
    boxSizing: 'border-box',
    padding: `${token.listItemPaddingY} ${token.listItemPaddingX}`,
    '$wrapperSmall &': {
      padding: `${token.listSmallItemPaddingY} ${token.listSmallItemPaddingX}`,
      fontSize: token.listSmallFontSize,
    },
    '$wrapperLarge &': {
      padding: `${token.listLargeItemPaddingY} ${token.listLargeItemPaddingX}`,
      fontSize: token.listLargeFontSize,
    },
  },
  checkContent: {
    flex: '1',
    minWidth: 0,
  },
  pagination: {
    margin: `${token.listPaginationMarginY} 0`,
  },

  // baseItem
  baseItem: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  baseItemMeta: {},
  baseItemMetaIncludes: {},
  baseItemMetaContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  baseItemMetaMeta: {},
  baseItemMetaAvatar: {
    boxSizing: 'border-box',
    width: '40px',
    height: '40px',
    marginRight: '12px',
    flex: 'none',
  },
  baseItemMetaTitle: {},
  baseItemMetaDesc: {},
  baseItemMetaCenter: {},
  baseItemMetaContent: {
    boxSizing: 'border-box',
    paddingTop: '12px',
  },
  baseItemExtra: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '16px',
  },
  baseItemExtraSplit: {
    width: '1px',
    height: '16px',
    backgroundColor: '#e9ecef',
  },
};

export default listStyle;
