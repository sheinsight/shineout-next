import { createUseStyles } from 'react-jss';
// @ts-ignore
import BackImage from './static/image.png';

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
  },
  frontPage: {
    height: '100%',
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
    width: '410px',
    height: '410px',
    position: 'absolute',
    top: '21px',
    borderRadius: '410px',
    background: 'var(---Neutral-fill-1-, #FFF)',
    filter: 'blur(130px)',
    zIndex: 1
  },
  title: {
    width: '1200px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    zIndex: 2
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
  }
})