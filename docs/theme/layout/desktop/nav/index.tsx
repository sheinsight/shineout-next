import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { localeIcon, logoIcon } from './icons';
import store, { dispatch } from '../../../store';
import useStyles from './style';
import { Button, Dropdown, setConfig, setLocale, Tag, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;
declare global {
  interface Window {
    __ALITA__?: any;
  }
}

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const state = useSnapshot(store);
  const location = useLocation();
  const search = location.search;
  // 获取search参数
  const searchParams = new URLSearchParams(search);
  const direction = searchParams.get('direction') === 'rtl' ? 'rtl' : 'ltr';
  const changeDirection = () => {
    const nextDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    searchParams.set('direction', nextDirection);
    navigate(location.pathname + '?' + searchParams.toString());
    document.body.className = nextDirection;
    if (window.__ALITA__) {
      const section = document.querySelector('body section[alita-name="shineout"] section');
      if (section) {
        section.className = nextDirection;
      }
    }
    setConfig({ direction: nextDirection });
  };

  const handleChangeLocales = () => {
    const nextLocales = state.locales === 'en' ? 'cn' : 'en';

    dispatch.setLocales(nextLocales);
    if (nextLocales === 'en') {
      setLocale('en-US');
    } else if (nextLocales === 'cn') {
      setLocale('zh-CN');
    }

    const nextPath = location.pathname.replace(`/${state.locales}/`, `/${nextLocales}/`);

    navigate(nextPath + location.search);
  };

  const data: DropdownItem[] = [
    <a target='_blank' href='https://shineout.biz.sheincorp.cn/2.0.x/cn/components/GetStart'>
      2.x
    </a>,
    <a target='_blank' href='https://shineout.biz.sheincorp.cn/1.12.x/cn/components/GetStart'>
      1.x
    </a>,
  ];
  const renderEntry = () => (
    <>
      <li>
        <Dropdown size='small' placeholder='3.x' data={data} />
      </li>
      <li>
        <Button size='small' mode='text' onClick={changeDirection}>
          {direction === 'rtl' ? 'LTR' : 'RTL'}
        </Button>
      </li>
      <li>
        <Button size="small" mode="text" onClick={handleChangeLocales}>{localeIcon}</Button>
      </li>
    </>
  )

  const renderShineoutForAlita = () => {
    return (
      <div style={{ display: 'none' }}>
        <Button />
        <Dropdown data={[]} />
      </div>
    )
  }

  if (window.__ALITA__) {
    const extraHeader = document.querySelector('#extra-header') as HTMLElement;
    if(!extraHeader) return null;

    extraHeader.style.display = 'flex';
    extraHeader.style.flex = '1';
    extraHeader.style.justifyContent = 'flex-end';
    extraHeader.setAttribute('alita-name', 'shineout');

    const entry = (
      <ul className={classes.entry}>
        {renderEntry()}
      </ul>
    );
    return (
      <>
        {renderShineoutForAlita()}
        {createPortal(entry, extraHeader)}
      </>
    );
  }

  const handleLogoClick = () => {
    navigate(`/${state.locales}/home`);
  };

  return (
    <div className={classes.nav}>
      <div className='logo' onClick={handleLogoClick}>{logoIcon}</div>
      <ul className={classes.entry}>
        {renderEntry()}
      </ul>
    </div>
  );
};

export default Nav;
