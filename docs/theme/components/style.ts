import { createUseStyles } from 'react-jss';


const animations = {
  '@keyframes logoFadeUp': {
    '0%': { transform: 'translateY(200px)', opacity: 0, },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
  '@keyframes logoFadeDown': {
    '0%': { transform: 'translate(0, -200px)', opacity: 0, },
    '100%': { transform: 'translate(0, 0)', opacity: 1 },
  },
}
const top = 208;
export default createUseStyles(
  {
    pages: {},
    ...animations,
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      color: 'var(--soui-neutral-text-5)',
      padding: '0 40px',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      borderBottom: '1px solid var(--soui-neutral-border-1)',
      overflow: 'hidden',
      marginBottom: 0,
      // transition: 'all 0.3s ease',
      'body.rtl &': {
        right: 0,
        left: 0,
      },
      '& .title': {
        position: 'relative',
        fontSize: 36,
        fontWeight: 500,
        color: 'var(--soui-neutral-text-5)',
        marginBottom: 0,
        marginTop: 0,
        paddingTop: 32,
        transition: 'all 0.3s ease',
        lineHeight: '44px',
        height: 76,
      },

      '& .subtitle': {
        position: 'relative',
        fontSize: 14,
        lineHeight: '22px',
        opacity: 1,
        marginBottom: 0,
        marginTop: 12,
        color: 'var(--soui-neutral-text-5)',
        transition: 'all 0.3s ease',
      },
    },
    headerLogo: {
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      animation: '$logoFadeDown .3s ease forwards',
      'body.rtl &': {
        transition: 'transform 0.3s ease',
        transform: 'scaleX(-1)',
      },
    },

    headerLogoBg: {
      position: 'absolute',
      right: 0,
    },
    headerLogoTop: {
      top: 11,
      right: 37,
      position: 'absolute',
    },
    headerLogoBottom: {
      top: 110,
      right: 84,
      position: 'absolute',
    },
    headerLogoCircle: {
      top: 83,
      right: 267,
      position: 'absolute',
    },
    stickyHeader: {
      position: 'sticky',
      top: 0,
      marginTop: -65,
      // marginBottom: 32,
      '& .title': {
        paddingTop: 0,
        fontSize: 24,
        opacity: 0,
        height: 0,
        transition: 'none',
      },
      '& .subtitle': {
        height: 0,
        opacity: 0,
        marginTop: 0,
        transition: 'none',
      },
      '& $tabs': {
        marginTop: 12,
        marginBottom: 12,
        transition: 'none',
      },
      '& $headerLogo': {
        animation: '$logoFadeUp 0.3s ease forwards',
      }
    },
    hiddenHeader: {},
    tabs: {
      height: 40,
      marginTop: 24,
      borderRadius: 4,
      marginBottom: 32,
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      backgroundColor: 'var(--soui-neutral-fill-1)',
      whiteSpace: 'nowrap',
    },
    tab: {
      padding: '0 24px',
    },
    doc: {
      display: 'flex',
      marginTop: top,
      position: 'relative',
      '& .examples': {
        flex: 1,
        minWidth: 800,
      },
      '& .anchor': {
        width: 192,

        '@media (max-width: 960px)': {
          display: 'none',
        },
      },
    },
    guide: {
      display: 'flex',
      marginTop: top,
      '& .guides': {
        flex: 1,
        // '&:last-child': {
        //   marginBottom: 40,
        // },
        // 最后一个元素
        '& > .guide:last-child': {
          marginBottom: 40,
        },
      },
      '& .anchor': {
        width: 192,
      },
      '& .title': {
        fontSize: 20,
        marginTop: 48,
        fontWeight: 500,
        marginBottom: 16,
        padding: '0 40px',
        '&.first': {
          marginTop: 40,
        },
      },
      '& .paragraph': {},
      '& .image': {
        padding: '0 40px',
        width: 'calc(100% - 272px)',
        maxWidth: 908,
        marginTop: 16,
        marginBottom: 32,
        boxSizing: 'border-box',
      },
    },
    guideIcon: {
      width: 14,
      height: 14,
      marginRight: 4,
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
    guideIconSuccess: {
      '& svg': {
        fill: 'var(--soui-success-6)',
      },
    },
    guideIconWarning: {
      '& svg': {
        fill: 'var(--soui-warning-6)',
      },
    },
    api: {
      padding: 24,
      display: 'flex',
      marginTop: top,
    },
    playground: {
      display: 'flex',
      marginTop: top,
    },
    collocator: {
      flex: 1,
      minWidth: 0,
    },
    changelog: {
      padding: 40,
      marginTop: top,
    },
    changelogWrapper: {
      marginBottom: 64,
    },
    changelogVersion: {
      fontSize: 24,
      lineHeight: '40px',
      fontWeight: 600,
      marginBottom: 8,
    },
    changelogTime: {
      fontSize: 16,
    },
    changelogType: {
      '&:not(:first-child) $changelogTypeTitle': {
        marginTop: 32,
      },

      '& ul': {
        padding: 0,
      },
      '& li': {
        marginLeft: 14,
      },
    },
    changelogTypeTitle: {
      fontSize: 18,
      lineHeight: '26px',
      fontWeight: 500,
      marginBottom: 16,
    },
    changelogItem: {
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 8,
    },
    paragraph: {
      padding: '0 40px',
      fontSize: 14,
      lineHeight: '22px',
      fontWeight: 400,
      marginTop: 32,
      marginBottom: 0,
    },
    firstParagraph: {
      marginTop: 0,
    },
    imageWrapper: {
      marginTop: 16,
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 0 0 40px',
      maxWidth: 909,
      boxSizing: 'content-box',
      gap: 24,
      // 第二个元素
      // '& > :nth-child(2)': {
      //   '&$imageContent': {
      //     marginLeft: 24,
      //   },
      // },
    },
    image: {
      width: '100%',
      maxWidth: 442,
    },
    imageContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    imageType: {
      marginTop: 8,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      lineHeight: '20px',
      fontWeight: 'bold',
      '& svg': {
        marginRight: 4,
      },
    },
    imageDescription: {
      fontSize: 12,
      lineHeight: '20px',
      color: '#999DA8',
      marginTop: 8,
    },
    apiTable: {
      width: '100%',
      border: '1px solid  #ddd',
      background: '#fff',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      emptyCells: 'show',
      whiteSpace: 'pre-wrap',
      fontSize: 14,
      '& th': {
        background: '#f5f5f5',
        textAlign: 'left',
        whiteSpace: 'nowrap',
      },

      '& td, & th': {
        overflow: 'visible',
        padding: '12px 20px',
        margin: '0',
        border: '1px solid #ddd',
        borderWidth: '0 0 1px 1px',
        fontSize: 'inherit',
      },
    },
    apiCode: {
      marginRight: 4,
      color: '#c41d7f',
      margin: '1px',
      border: '1px solid rgba(5,5,5,0.06)',
      borderRadius: 4,
      background: 'rgba(0,0,0,0.04)',
      padding: '0.2em 0.4em',
    },
    activeApi: {
      '&& td': {
        background: 'var(--soui-table-tbody-hover-background-color,var(--soui-indigo-1,#EEF2FE))',
      }
    }
  },
  { name: 'doc-markdown' },
);
