import { createUseStyles } from 'react-jss';
import { useToken } from 'shineout';
// @ts-ignore
import BackImage from './static/image.png';
import Back3 from './static/back-3.png';
import Back4 from './static/back-4.png';
import Back5 from './static/back-5.png';
import DesignPic from './static/design.png';
import DesignFont from './static/design-font.png';

const { token } = useToken();

const wrapperSuffix = {
  content: '""',
  position: 'absolute',
  width: '336px',
  height: '336px',
  borderRadius: '336px',
  opacity: 0.2,
  zIndex: 0,
};

export default createUseStyles({
  wrapper: {
    height: '100vh',
    width: '100vw',
    position: 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 24px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  headerScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
  },
  headerContent: {
    width: '100%',
    maxWidth: '1920px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  frontPage: {
    width: '100%',
    display: 'flex',
    padding: '160px 0 80px 0',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '48px',
    alignSelf: 'stretch',
    background: 'linear-gradient(180deg, #EEF5FF 27.01%, #FFF 62.21%)',
    position: 'relative',
    '&::after': {
      ...wrapperSuffix,
      background: '#D39DFF',
      right: '-85px',
      top: '-168px',
      filter: 'blur(127px)',
    },
    '&::before': {
      ...wrapperSuffix,
      background: 'var(---Brand-6-, #197AFA)',
      left: '-110px',
      top: '-169px',
      filter: 'blur(100px)',
    },
  },
  pageBack: {
    width: '674px',
    height: '427px',
    position: 'absolute',
    top: '32px',
    backgroundImage: `url(${BackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  },
  pageBackFilter: {
    width: '510px',
    height: '500px',
    position: 'absolute',
    top: '100px',
    left: '425px',
    background: '#fff',
    filter: 'blur(105px)',
    zIndex: 1
  },
  title: {
    width: '1200px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    zIndex: 2,
  },
  titleTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: 'var(---Neutral-text-5-, #141737)',
    width: '100%',
    lineHeight: 'calc(1em + 8px)',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'PingFang SC',
  },
  titleTopMain: {
    fontFamily: 'Outfit',
    fontSize: '48px',
    lineHeight: 'calc(1em + 8px)',
    fontWeight: 600,
    background: 'linear-gradient(90deg, #141737 5.98%, #39429D 92.83%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  titleButton: {
    padding: '8px 32px !important',
    background: 'var(--theme-primary-color, linear-gradient(90deg, var(---Brand-5-, #429AFF) 0%, var(---Brand-6-, #197AFA) 100%)) !important',
    border: 'none',
    borderRadius: 'var(--theme-border-radius, 20px)',
    fontSize: 'var(--theme-font-size, 14px)',
    boxShadow: '0px 8px 20px 0px var(--theme-light-color, rgba(25, 122, 250, 0.10)) !important',
    transition: 'all 0.2s ease !important',
    '&:hover': {
      opacity: '0.8 !important',
    }
  },
  customDropdown: {
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    lineHeight: token.line_height_dynamic,
    '&:hover': {
      color: token.brand_6
    }
  },
  customDropdownPopover: {
    background: 'rgba(255, 255, 255, 0.80) !important',
    borderRadius: '16px !important',
    boxShadow: '0px 8px 22px 0px rgba(0, 63, 154, 0.05) !important',
    backdropFilter: 'blur(12px) !important',
    width: '560px !important',
    '& .soui-popover-content': {
      padding: '12px !important',
      
    }
  },
  customDropdownPopoverContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '4px'
  },
  customDropdownPopoverItem: {

  },
  customDropdownPopoverItemTitle: {
    padding: '12px 12px 4px 12px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic,
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  customDropdownPopoverItemList: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '12px',
    flexWrap: 'wrap',
  },
  customDropdownPopoverItemMain: {
    display: 'flex',
    width: '260px',
    padding: '10px 12px',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '12px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: token.line_height_dynamic,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:hover': {
      background: token.neutral_fill_2,
      color: token.brand_6,
    }
  },
  customDropdownPopoverItemMainIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    background: 'linear-gradient(0deg, var(---Brand-6-, #197AFA) 0%, var(---Brand-6-, #197AFA) 100%), linear-gradient(90deg, var(---Brand-5-, #429AFF) 0%, var(---Brand-6-, #197AFA) 100%)'
  },
  headerFunc: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  content: {
    height: '508px',
    width: '1011px',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    borderRadius: '24px',
    position: 'relative',
    background: '#F7F8FA',
    zIndex: 2,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '24px',
      border: '8px solid transparent',
      background: `linear-gradient(${token.brand_4}, #B8A5FF, ${token.brand_3}) border-box`,
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }
  },
  area: {
    background: '#fff',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '24px',
    height: 'fit-content'
  },
  font: {
    width: '127px',
    height: '128px',
    color: token.brand_5,
    position: 'relative',
    cursor: 'pointer',
  },
  fontContent: {
    color: token.brand_6,
    position: 'absolute',
    top: '0px',
    left: '0px',
    '&:hover': {
      color: token.brand_5,
    }
  },
  picker: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2
  },
  pickerRow: {
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
      '& $pickerItem:first-child': {
        borderTopLeftRadius: '8px',
      },
      '& $pickerItem:last-child': {
        borderTopRightRadius: '8px',
      }
    },
    '&:last-child': {
      '& $pickerItem:first-child': {
        borderBottomLeftRadius: '8px',
      },
      '& $pickerItem:last-child': {
        borderBottomRightRadius: '8px',
      }
    }
  },
  pickerItem: {
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.167)',
      zIndex: 1
    }
  },
  columnsAreaList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  buttons: {
    zIndex: 2,
    '& .soui-button-button + .soui-button-button': {
      marginInlineStart: '0px !important',
    },
    '& span': {
      width: '68px'
    }
  },
  columnsArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  columnsAreaItem: {
    width: '144px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
  },
  progress: {
    width: '305px'
  },
  avatarList: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    height: '40px'
  },
  carousel: {
    width: '320px',
    height: '212px !important',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  icons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '28px',
    alignItems: 'center',
    width: '170px',
    height: '212px',
    color: token.brand_6,
  },
  icon: {
    position: 'relative',
    '&::after': {

    }
  },
  introduce: {
    padding: '80px 0 40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '48px',
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic
  },
  introduceList: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
  },
  introduceItem: {
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    width: '270px',
    cursor: 'pointer',
    // '&:hover': {
    //   '& $introduceItemIcon': {
    //     transform: 'rotateY(45deg)',
    //   }
    // }
  },
  introduceItemIcon: {
    width: '132px !important',
    height: '132px',
    paddingBottom: '0px !important',
    outline: 'none !important',
    background: 'transparent !important',
    transform: 'rotateY(0)',
    transition: 'transform 0.3s ease',
  },
  introduceItemContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    lineHeight: token.line_height_dynamic,
    fontSize: '20px',
    fontWeight: 500,
  },
  introduceItemDesc: {
    fontSize: '16px',
    fontWeight: 400,
    color: token.neutral_text_3
  },
  commonPageArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    gap: '48px',
    position: 'relative',
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic,
    overflow: 'hidden',
  },
  prettyWrapper: {
    background: 'linear-gradient(180deg, #FFF 24.38%, #E0E5FF 100%)',
  },
  prettyContent: {
    position: 'relative',
    background: 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '301px',
      height: '301px',
      right: '-100px',
      bottom: '-130px',
      transform: 'rotate(-15deg)',
      background: `url(${Back3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(120%) opacity(0.8)',
      zIndex: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '160px',
      height: '159px',
      left: '-60px',
      bottom: '-60px',
      background: `url(${Back4})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 0,
      backgroundSize: '110% 110%',
      filter: 'brightness(120%) opacity(0.8)'
    }
  },
  otherBack: {
    position: 'absolute',
    width: '220px',
    height: '202px',
    right: '-80px',
    top: '-70px',
    background: `url(${Back5})`,
    backgroundSize: '143.217% 158.269%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-37.259px -53.076px',
    zIndex: 0,
    filter: 'brightness(120%) opacity(0.8)'
  },
  pretty: {
    display: 'flex',
    width: '1200px',
    height: '554px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid #E3E7FF',
    background: 'rgba(255, 255, 255, 0.40)',
    backdropFilter: 'blur(12px)',
    zIndex: 999,
    position: 'relative',
  },
  prettyTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    justifyContent: 'space-between',
    width: '100%',
  },
  prettyMain: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    background: token.neutral_fill_1,
    borderRadius: '24px',
    padding: '24px',
    flex: 1,
    width: '100%'
  },
  
  prettyMenu: {
    width: '200px',
    position: 'relative',
    
    // 使用更强势的全局选择器
    '& *': {
      transition: 'all 0.2s ease'
    },
    
    // 直接针对 Shineout Menu 的具体激活状态类名
    '& .soui-menu-item.soui-menu-item-active': {
      backgroundColor: 'var(--theme-light-color, ' + token.brand_1 + ')',
      color: 'var(--theme-primary-color, ' + token.brand_6 + ')',
      
      '& .soui-menu-title': {
        backgroundColor: 'var(--theme-light-color, ' + token.brand_1 + ')',
      }
    },

    '& .soui-menu-item-has-children': {
      '& .soui-menu-item-content.soui-menu-item-content-back': {
        color: 'var(--theme-primary-color, ' + token.brand_6 + ')'
      },
    },

    '& .soui-menu-icon': {
      color: 'var(--theme-primary-color, ' + token.brand_6 + ') !important'
    },
    
    // 确保未选中的二级菜单项保持默认颜色
    '& .soui-menu-item:not(.soui-menu-item-active):not(.soui-menu-item-in-path)': {
      color: token.neutral_text_5 ,
      
      '& .soui-menu-title': {
        color: token.neutral_text_5 
      }
    }
  },
  prettyList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  prettyListArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic
  },
  prettyListAreaContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap'
  },
  prettyListAreaItem: {
    padding: '16px 16px 12px 16px',
    borderRadius: '12px',
    background: '#F7F8FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid transparent',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: token.line_height_dynamic,
    width: '126px',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer'
  },
  prettyListAreaItemActive: {
    background: 'var(--theme-light-color, ' + token.brand_1 + ')',
    border: '2px solid var(--theme-primary-color, ' + token.brand_6 + ')',
    color: 'var(--theme-primary-color, ' + token.brand_6 + ')',
    borderRadius: 'var(--theme-border-radius, 8px)',
    fontSize: 'var(--theme-font-size, 14px)',
  },
  prettyListAreaItemColor: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
  },
  design: {
    paddingBottom: '0px !important',
    height: '688px',
    background: 'linear-gradient(158deg, var(---Brand-1-, #E9F5FE) 16.97%, var(---Brand-1-, #E9F5FE) 34.48%, var(---Brand-2-, #BDE2FF) 86.66%)'
  },
  designTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  designContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  designList: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  designPic: {
    background: `url(${DesignPic})`,
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    backgroundPositionY: 'bottom',
    backgroundRepeat: 'no-repeat',
    width: '1126px',
    flex: 1,
    position: 'relative',
  },
  designPicFont: {
    width: '255px',
    height: '169px',
    background: `url(${DesignFont})`,
    backgroundSize: '120% 170%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(120%) opacity(0.9)',
    position: 'absolute',
    top: '40%',
    left: '250px',
  },
  designArea: {
    width: '144px',
    height: '50px',
    position: 'relative',
  },
  designAreaBack: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  designAreaContent: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: 'calc(100% - 10px)',
    zIndex: 1,
    fontSize: '16px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, var(---Brand-5-, #429AFF) 0%, var(---Brand-6-, #197AFA) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: token.line_height_dynamic
  },
  caseIndex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '120px'
  },
  caseIndexItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: token.line_height_dynamic,
    textAlign: 'center',

  },
  caseIndexItemNum: {
    width: '144px',
    height: '60px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '6px',
  },
  caseIndexItemNumContent: {
    width: 'fit-content',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 500,
    background: 'linear-gradient(90deg, var(---Brand-5-, #429AFF) 0%, var(---Brand-6-, #197AFA) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent'
  },
  caseIndexItemNumUnit: {
    fontSize: '24px',
    height: 'calc(100% - 16px)',
    display: 'flex',
    alignItems: 'flex-end',
  },
  casePicList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
  },
  casePicItem: {
    width: '588px',
    height: '400px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(0deg, var(---Neutral-fill-2-, #F4F5F8) 0%, var(---Neutral-fill-2-, #F4F5F8) 100%), linear-gradient(113deg, var(---Indigo-6-, rgba(68, 70, 247, 0.10)) 17.01%, var(---Brand-6-, rgba(25, 122, 250, 0.10)) 93.16%)'
  },
  casePicItemContent: {
    width: '449px',
    height: '290px',
    background: '#fff',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: '""',
      width: '490px',
      height: '256px',
      background: 'rgba(255, 255, 255, 0.60)',
      borderRadius: '4px',
      position: 'absolute',
      zIndex: 0,
    }
  },
  casePicItemImg: {
    zIndex: 1,
    paddingBottom: '0px !important',
    width: '439px !important',
    height: '280px !important',
    outline: 'none !important',
  },
  dynamic: {
    background: 'linear-gradient(0deg, var(---Neutral-fill-1-1-, #F7F8FA) 0%, var(---Neutral-fill-1-1-, #F7F8FA) 100%), linear-gradient(180deg, #F7F8FA 0%, #F8F9FB 87.21%, #FFF 100%)'
  },
  dynamicList: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflowX: 'hidden',
  },
  dynamicListContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    willChange: 'transform',
  },
  dynamicItem: {
    borderRadius: '24px',
    background: '#fff',
    width: '320px',
    height: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    cursor: 'pointer'
  },
  dynamicItemTitle: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic
  },
  dynamicItemCase: {
    flex: 1,
    width: '100%',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dynamicItemCaseMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    width: '100%',
  },
  dynamicItemCaseMainFlexStart: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '24px',
    flexWrap: 'wrap',
    '& .soui-button-button + .soui-button-button': {
      marginInlineStart: '0px !important',
    },
  },
  dynamicItemCaseMainTop: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    width: '100%',
  },
  dynamicTag: {
    padding: '0 8px !important',
    borderRadius: `${token.radius_1000} !important`
  },
  footer: {
    display: 'flex',
    alignItem: 'center',
    padding: '80px 10px',
    justifyContent: 'center'
  },
  footerContent: {
    width: '1200px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px'
  },
  footerList: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '64px'
  },
  footerListContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: token.line_height_dynamic
  },
  footerListContentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  footerListItem: {
    fontSize: '12px',
    fontWeight: 400,
    color: token.neutral_text_4,
    cursor: 'pointer',
    '&:hover': {
      color: token.brand_6
    }
  },
  ecologyWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
})