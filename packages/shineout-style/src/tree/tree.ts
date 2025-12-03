import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { TreeClasses } from '@sheinx/base';

export type TreeClassType = keyof TreeClasses;

const childNodeMarginLeft = 12;

const treeStyle: JsStyles<TreeClassType> = {
  rootClass: {},
  tree: {},
  virtual: {},
  sizeSmall: {
    '&$line $node': {
      '&:last-child': {
        '&::before': {
          top: 0,
          height: 14,
        },
      },
      '&::before': {
        top: -2,
        height: 'calc(100% + 2px)',
      }
    },
  },
  sizeLarge: {},
  notTree: {
    '&$root > $node$leaf': {
      paddingLeft: 0,
    },
    '& $content': {
      marginLeft: 0,
    },
  },
  line: {
    '&$virtual $node': {
      '&::before, &::after': {
        display: 'none',
      }
    },
    '&$virtual $leaf $contentWrapper': {
      marginLeft: 12,
    },
    '&$virtual $leaf $contentWrapper, &$virtual $childnode$contentWrapper': {
      '&::after': {
        display: 'none',
      }
    },
    '& $node': {
      '&[dir=ltr]::before': { left: 0 },
      '&[dir=rtl]::before': { right: 0 },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -6,
        height: 'calc(100% + 6px)',
        width: 1,
        background: Token.treeLineBackgroundColor,
      },
    },

    '& $node:last-child': {
      '&::before': {
        top: 0,
        height: 18,
      },
    },

    '& $contentWrapper': {},

    '& $iconWrapper': {
      width: 24,
      '&[dir=ltr]': { left: -24 },
      '&[dir=rtl]': { right: -24 },
    },
    '& $childnode': {
      marginLeft: childNodeMarginLeft,
      '&$contentWrapper': {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 18,
          left: 0,
          marginLeft: -24,
          transform: 'translate(-100%, 0)',
          height: 1,
          width: 16,
          background: Token.treeLineBackgroundColor,
        },
      }
    },
    '& $leaf': {
      '& $contentWrapper': {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 18,
          left: 0,
          marginLeft: -24,
          transform: 'translate(-100%, 0)',
          height: 1,
          width: 16,
          background: Token.treeLineBackgroundColor,
        },
      }
    },
    '& $childnode[dir=rtl]': {
      '&$contentWrapper': {
        '&::after': {
          top: '50%',
          right: 0,
          transform: 'translate(100%, -50%)',
        }
      }
    },
    '&$sizeSmall': {
      '& $contentWrapper::after': {
        display: 'none',
      },
    },
    '&$sizeLarge': {
      '& $node:last-child::before': {
        height: 21,
      },
      '& $iconWrapper': {
        '&[dir=ltr]': { left: -32 },
        '&[dir=rtl]': { right: -32 },
      },
      '&:not($virtual) $childnode, &:not($virtual) $leaf': {
        marginLeft: 20,
      },
      '': {
        marginLeft: 20,
      },
      '& $node': {
        paddingLeft: 32,
        '&[dir=ltr]::before': { left: 4 },
        '&[dir=rtl]::before': { right: 4 },

        '&::before': {
          top: -4,
          height: 'calc(100% + 4px)',
        }
      },
      '& $node$leaf': {
        '&[dir=ltr]::before': { left: -16 },
        '&[dir=rtl]::before': { right: -16 },

        '&::after': {
          left: -14,
        }
      },
      '& > $root > $node': {
        paddingLeft: 12,
      },
      '& $leaf $contentWrapper::after': {
        left: -24,
        top: 21,
        transform: 'translate(0, -50%)',
      },
      '& $contentWrapper$childnode::after': {
        top: 21,
        marginLeft: -32,
      },
    },

    '& > $root > $node': {
      paddingLeft: 12,
      '& > $contentWrapper': {
        '&::after': {
          display: 'none'
        },
      }
    }
  },
  noline: {
    '& $iconWrapper': {
      '& $icon': {
        transition: 'transform .2s cubic-bezier(.34,.69,.1,1)',
      },
    },

    '& $iconWrapper[data-expanded="false"][data-icon="false"]': {
      '& $icon': {
        '&[dir=ltr]': { transform: 'rotate(-90deg)' },
        '&[dir=rtl]': { transform: 'rotate(90deg)' },
      },
    },
    '& $iconWrapper[data-expanded="true"][data-icon="false"]': {
      '& $icon': {
        transform: 'rotate(0deg)',
      },
    },
    '& $node': {
      paddingLeft: 24,
      '&$leaf': {
        paddingLeft: 24,
      },
    },
    '& > $root': {
      '& > $node': {
        paddingLeft: 24,
      },
    },
    '&$sizeLarge': {
      '& > $root > $node, & $node$leaf': {
        paddingLeft: 32,
      }
    }
  },

  lineIndent: {
    position: 'absolute',
    top: 0,
    width: 1,
    height: '100%',
    background: Token.treeLineBackgroundColor,
    '$sizeLarge &': {
      transform: 'translateX(-4px)',
    }
  },
  root: {
    '& > $node': {
      paddingLeft: 12,
      '&$leaf': {
        paddingLeft: 24,
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
  },
  small: {},
  large: {},
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '5px 0',

    '$sizeSmall &': {
      padding: '1px 0',
    },
    '$sizeLarge & $text': {
      lineHeight: '28px',
    },
  },
  inlineContent: {
    display: 'inline-flex',
  },
  contentDisabled: {
    '& $content[data-active="true"]': {
      background: Token.treeContentDisabledBackgroundColor,
    },
    '& $content:hover:not([data-active="true"])': {
      background: 'none',
      '& $text': {
        color: Token.treeContentDisabledFontColor,
      },
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 4,

    '$contentDisabled &': {
      '& $text': {
        color: Token.treeContentDisabledFontColor,
      },
    },

    '&[data-active="true"]': {
      '& $text': {
        background: Token.treeContentActiveBackgroundColor,
        borderRadius: Token.treeContentActiveBorderRadius,
        color: Token.treeContentActiveFontColor,
      },
    },
  },
  checkbox: {
    '&[class*="checkbox-wrapper"]': {
      height: 26,
      alignSelf: 'flex-start',
      marginRight: Token.treeCheckboxMarginX,
    },
    '$sizeLarge &': {
      marginTop: 4,
    }
  },
  text: {
    cursor: 'pointer',
    flex: 1,
    minWidth: 0,
    fontSize: Token.treeFontSize,
    lineHeight: Token.lineHeightDynamic,
    color: Token.treeFontColor,
    fontWeight: Token.treeFontWeight,
    padding: `${Token.treeTextPaddingY} ${Token.treeTextPaddingX}`,
    whiteSpace: 'nowrap',
    borderRadius: Token.treeContentBorderRadius,
    '$content:not([data-active="true"]) &:hover': {
      color: Token.treeContentHoverFontColor,
      background: Token.treeContentHoverBackgroundColor,
    },
  },
  list: {},
  node: {
    position: 'relative',
    paddingLeft: 28,
    '$sizeSmall$line &': {
      paddingLeft: 12,
      '&$leaf': {
        paddingLeft: 24,
      },
      "&::after": {
        position: 'absolute',
        content: '""',
        top: 28,
        width: 1,
        height: 'calc(100% - 28px)',
        background: Token.treeLineBackgroundColor,
      }
    },
    '$sizeLarge &': {
      paddingLeft: 32,
    },
    '&$leaf': {
      paddingLeft: 40,
    },

    '&[draggable="true"]': {
      cursor: 'pointer',
    }
  },
  leaf: {},
  childnode: {},
  iconWrapper: {
    '&[dir=ltr]': { left: 0 },
    '&[dir=rtl]': { right: 0 },
    position: 'absolute',
    width: 24,
    height: 24,
    margin: '1px 0',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-expanded="true"][data-icon="false"]': {
      '& $icon': {
        transform: 'rotate(0deg)',
      },
    },
    '$sizeLarge &': {
      width: 32,
      height: 32,
      top: 5,
    }
  },
  icon: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: Token.treeItemFontColor,
    cursor: 'pointer',
    transition: 'background .2s ease',
    // transform: 'rotate(-90deg)',
    '&:hover': {
      background: Token.treeItemHoverBackgroundColor,
    },
    '&:active': {
      background: Token.treeItemActiveBackgroundColor,
    },

    '& svg': {
      width: Token.treeIconSize,
      '$sizeLarge &': {
        width: `calc(${Token.treeIconSize} + 2px)`,
      }
    },
  },
  children: {},
  placement: {
    position: 'relative',
    zIndex: 0,
    width: '100%',
    height: 0,
    '& div': {
      borderBottom: `2px solid ${Token.treeDragBorderColor}`,
      background: Token.treeDragBackgroundColor,
    },
  },
};

export default treeStyle;
