import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Tooltip, setToken } from 'shineout';
import { CommonTokenMap } from '@sheinx/theme';
import { dark, compact } from './theme';
import useStyles from '../style';

const FloatButton = () => {
  const [open, setOpen] = useState(false);
  const [darkActive, setDarkActive] = useState(localStorage.getItem('shineout-theme-dark'));
  const [compactActive, setCompactActive] = useState(
    localStorage.getItem('shineout-theme-compact'),
  );
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({
    top: -160,
  });

  const floatRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const classes = useStyles();

  const handleClickAway = (e: MouseEvent) => {
    if (floatRef.current && !floatRef.current.contains(e.target as Node)) {
      setOpen(false);
      document.removeEventListener('click', handleClickAway);
    }
  };

  const handleOpen = () => {
    setOpen(true);

    if (floatRef.current) {
      document.addEventListener('click', handleClickAway);
    }
  };

  const setDark = () => {
    const compactThemeCache = localStorage.getItem('shineout-theme-compact');
    const darkThemeCache = localStorage.getItem('shineout-theme-dark');

    if (!darkThemeCache) {
      if (compactThemeCache) {
        setToken({
          selector: 'html',
          token: { ...CommonTokenMap, ...dark, ...compact },
        });
        localStorage.setItem('shineout-theme-dark', 'true');
        setDarkActive('true');
        document.documentElement.style.setProperty('color-scheme', 'dark');
        return;
      }

      setToken({
        selector: 'html',
        update: true,
        token: dark,
      });
      localStorage.setItem('shineout-theme-dark', 'true');
      setDarkActive('true');
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      if (compactThemeCache) {
        setToken({
          selector: 'html',
          token: { ...CommonTokenMap, ...compact },
        });
        localStorage.removeItem('shineout-theme-dark');
        setDarkActive('');
        document.documentElement.style.removeProperty('color-scheme');
        return;
      }
      setToken({
        selector: 'html',
        token: CommonTokenMap as any,
      });
      localStorage.removeItem('shineout-theme-dark');
      setDarkActive('');
      // 设置 html 的 style color-scheme 属性
      document.documentElement.style.removeProperty('color-scheme');
    }
  };

  const setCompact = () => {
    const compactThemeCache = localStorage.getItem('shineout-theme-compact');
    const darkThemeCache = localStorage.getItem('shineout-theme-dark');

    if (!compactThemeCache) {
      if (darkThemeCache) {
        setToken({
          selector: 'html',
          token: { ...CommonTokenMap, ...dark, ...compact },
        });
        localStorage.setItem('shineout-theme-compact', 'true');
        setCompactActive('true');
        return;
      }

      setToken({
        selector: 'html',
        update: true,
        token: compact,
      });
      localStorage.setItem('shineout-theme-compact', 'true');
      setCompactActive('true');
    } else {
      if (darkThemeCache) {
        setToken({
          selector: 'html',
          token: { ...CommonTokenMap, ...dark },
        });
        localStorage.removeItem('shineout-theme-compact');
        setCompactActive('');
        return;
      }
      setToken({
        selector: 'html',
        token: CommonTokenMap as any,
      });
      localStorage.removeItem('shineout-theme-compact');
      setCompactActive('');
    }
  };

  const renderTarget = () => {
    return (
      <svg viewBox='0 0 24 24' width='18px' height='18px'>
        <path d='M6.23799 11.6686C6.13384 11.567 6.06039 11.4352 6.03603 11.2858C5.988 10.9878 6.13808 10.6965 6.41327 10.5593L10.9614 8.29173L10.171 3.35729C10.1238 3.05933 10.2519 2.79146 10.5273 2.655C10.8027 2.51885 11.0835 2.62259 11.3018 2.83581L14.8006 6.25382L19.4976 4.0559C19.7731 3.91884 20.1541 3.92521 20.373 4.13878L20.3598 4.15208C20.5782 4.36555 20.6048 4.71848 20.4645 4.98776L18.2062 9.63466L21.7068 13.0011C21.9248 13.2144 22.0313 13.4889 21.8917 13.758C21.7522 14.027 21.5045 14.1262 21.1994 14.0802L16.1338 13.3192L13.7983 17.7801C13.6578 18.0488 13.3559 18.1985 13.0508 18.1511C12.8983 18.1276 12.762 18.0574 12.6579 17.9554C12.5538 17.8539 12.4816 17.7211 12.4575 17.5721L11.656 12.6528L6.63043 11.863C6.47839 11.8392 6.34189 11.7703 6.23799 11.6686ZM9.55001 13.1277L10.2965 13.2782C10.6808 13.3238 11.0407 13.626 11.1024 14.0036L11.2025 14.6182L4.89384 21.6118C4.54542 21.9981 3.9795 22.1105 3.50878 21.8838C3.25127 21.7598 2.98478 21.6007 2.7877 21.4077C2.52623 21.1515 2.30623 20.8143 2.13671 20.503C1.87591 20.024 1.9981 19.4289 2.41925 19.0785L9.55001 13.1277ZM4.87108 5.94136C4.86651 5.91335 4.87038 5.88431 4.88396 5.85789C4.91126 5.80544 4.96889 5.77675 5.02829 5.78648L6.01 5.94795L6.46195 5.08009C6.48936 5.02777 6.5409 5.00011 6.60019 5.01005C6.65947 5.02 6.69168 5.06838 6.70116 5.12685L6.85321 6.06474L7.85026 6.25423C7.90966 6.26406 7.96894 6.30852 7.97854 6.3671L7.97492 6.3678C7.98429 6.42627 7.94728 6.48495 7.89375 6.51134L6.99487 6.98606L7.15326 7.91607C7.16274 7.97453 7.14739 8.02996 7.09397 8.05638C7.04055 8.08288 6.98993 8.07025 6.94717 8.02826L6.23771 7.33035L5.34843 7.767C5.29489 7.79328 5.22989 7.78239 5.18735 7.74015C5.16603 7.71908 5.15278 7.69247 5.14821 7.66446C5.14375 7.63669 5.14784 7.60751 5.16145 7.58123L5.6099 6.71453L4.91017 6.01674C4.88901 5.99566 4.87555 5.96916 4.87108 5.94136ZM13.6268 2.79065C13.623 2.76702 13.6262 2.74237 13.6378 2.72002C13.6609 2.67556 13.7097 2.65126 13.7601 2.65947L14.5919 2.79628L14.9748 2.06099C14.998 2.01664 15.0416 1.99326 15.0919 2.00171C15.1421 2.01016 15.1694 2.05115 15.1774 2.10068L15.3062 2.89525L16.151 3.0558C16.2014 3.06412 16.2516 3.10175 16.2597 3.15141L16.2566 3.15198C16.2646 3.20151 16.2332 3.2512 16.1879 3.27366L15.4263 3.6759L15.5604 4.46376C15.5684 4.51328 15.5555 4.56018 15.5102 4.58264C15.465 4.6051 15.4221 4.59442 15.3859 4.5588L14.7848 3.9675L14.0313 4.33745C13.986 4.35967 13.9309 4.35054 13.8948 4.31464C13.8768 4.29681 13.8655 4.27424 13.8617 4.25062C13.8579 4.22702 13.8613 4.20223 13.8729 4.18002L14.2528 3.44575L13.6601 2.85445C13.642 2.83671 13.6307 2.81427 13.6268 2.79065ZM20.7892 7.72233C20.8005 7.70808 20.8161 7.6971 20.8345 7.69188C20.8714 7.68169 20.9103 7.69594 20.9316 7.72788L21.2834 8.25527L21.8944 8.08662C21.9313 8.07654 21.967 8.08846 21.9881 8.12043C22.0092 8.15237 22.0002 8.18838 21.9766 8.21837L21.5959 8.69878L21.941 9.24551C21.9624 9.27745 21.967 9.32445 21.9433 9.35455L21.9414 9.35304C21.9176 9.38303 21.8734 9.39134 21.8374 9.37804L21.2186 9.16702L20.8445 9.64683C20.8208 9.67682 20.7877 9.69383 20.7517 9.6805C20.7157 9.6672 20.6997 9.63813 20.7011 9.59993L20.7238 8.96499L20.1274 8.7418C20.0915 8.72836 20.0683 8.69341 20.0698 8.6551C20.0706 8.636 20.0775 8.61817 20.0889 8.60392C20.1002 8.58956 20.1158 8.57881 20.1344 8.57361L20.7433 8.4039L20.7702 7.77348C20.7711 7.75438 20.7778 7.73655 20.7892 7.72233Z'></path>
      </svg>
    );
  };

  const renderDarkMenuItem = () => {
    return (
      <Tooltip tip='深色主题' position='left' style={{ width: 64 }}>
        <div
          className={classnames(
            classes.floatButtonMenuItem,
            darkActive && classes.floatButtonMenuItemActive,
          )}
          onClick={setDark}
        >
          <svg viewBox='0 0 20 20' width='18px' height='18px'>
            <path d='M10.0319 4.27273C6.84456 4.36818 4.31438 6.91364 4.31438 10C4.31438 13.15 6.976 15.7273 10.2291 15.7273C12.6936 15.7273 14.7966 14.2636 15.6838 12.2273H15.4866C12.2335 12.2273 9.5719 9.65 9.5719 6.5C9.5719 5.70455 9.7362 4.97273 10.0319 4.27273ZM10.0319 3C10.4591 3 10.8534 3.19091 11.1163 3.54091C11.3792 3.89091 11.412 4.36818 11.2477 4.75C11.0177 5.32273 10.8863 5.89545 10.8863 6.5C10.8863 8.95 12.9564 10.9545 15.4866 10.9545H15.6509H15.6838C16.1109 10.9545 16.5053 11.1455 16.7681 11.4955C17.031 11.8455 17.0639 12.3227 16.8996 12.7045C15.7495 15.3136 13.1536 17 10.2291 17C6.25309 17 3 13.85 3 10C3 6.21364 6.05594 3.12727 9.99908 3H10.0319Z'></path>
          </svg>
        </div>
      </Tooltip>
    );
  };

  const renderCompactMenuItem = () => {
    return (
      <Tooltip tip='紧凑主题' position='left' style={{ width: 64 }}>
        <div
          className={classnames(
            classes.floatButtonMenuItem,
            compactActive && classes.floatButtonMenuItemActive,
          )}
          onClick={setCompact}
        >
          <svg viewBox='0 0 1024 1024' width='18px' height='18px'>
            <path d='M938.666667 597.333333a42.666667 42.666667 0 0 1 0 85.333334l-256-0.042667V938.666667a42.666667 42.666667 0 0 1-85.333334 0v-341.333334h341.333334z m-512 0v341.333334a42.666667 42.666667 0 0 1-85.333334 0v-256H85.333333a42.666667 42.666667 0 0 1 0-85.333334h341.333334z m213.333333-554.666666a42.666667 42.666667 0 0 1 42.666667 42.666666l-0.042667 255.957334L938.666667 341.333333a42.666667 42.666667 0 0 1 0 85.333334l-256.042667-0.042667L682.666667 426.666667h-85.333334V85.333333a42.666667 42.666667 0 0 1 42.666667-42.666666zM384 42.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v341.333334H85.333333a42.666667 42.666667 0 1 1 0-85.333334h256V85.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z'></path>
          </svg>
        </div>
      </Tooltip>
    );
  };
  const renderPrettyItem = () => {
    return (
      <Tooltip tip='主题编辑器' position='left' style={{ width: 80 }}>
        <a
          className={classes.floatButtonMenuItem}
          href='https://shineout-pretty.sheincorp.cn/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <svg viewBox='0 0 1024 1024' width='18px' height='18px'>
            <path d='M220.586667 485.376l-17.152 5.674667a42.666667 42.666667 0 0 1-43.306667-10.197334L55.338667 377.429333a42.666667 42.666667 0 0 1 0-60.672L233.173333 140.373333A42.666667 42.666667 0 0 1 263.338667 128h49.664a42.666667 42.666667 0 0 1 34.986666 18.261333c64.298667 92.245333 119.210667 135.68 159.573334 135.68 38.826667 0 85.888-41.642667 136.832-132.224a42.666667 42.666667 0 0 1 37.12-21.717333H763.733333a42.666667 42.666667 0 0 1 32.64 15.189333l174.976 207.957334a42.666667 42.666667 0 0 1-1.834666 57.002666l-111.36 116.224a42.666667 42.666667 0 0 1-51.754667 7.68V853.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H263.253333a42.666667 42.666667 0 0 1-42.666666-42.666667v-367.914666z m64.042666-280.832l2.133334 2.944 5.162666-5.12-0.853333-0.426667-6.4 2.56h-0.042667z m6.4 8.789333h-10.154666l-134.826667 133.674667 55.466667 54.912 48.426666-15.957333a42.666667 42.666667 0 0 1 56.021334 40.533333v384.128h415.018666V426.453333c0-38.826667 47.530667-57.429333 73.898667-29.013333l32.853333 35.285333 53.589334-55.936L743.765333 213.333333h-37.76c-60.885333 100.608-125.866667 153.941333-198.442666 153.941334C435.754667 367.274667 365.013333 314.453333 290.986667 213.333333h0.042666z'></path>
          </svg>
        </a>
      </Tooltip>
    );
  };

  const renderFloatMenu = () => {
    return (
      <div
        ref={menuRef}
        style={menuStyle}
        className={classnames(classes.floatButtonMenu, open && classes.floatButtonMenuOpen)}
      >
        {renderDarkMenuItem()}
        {renderCompactMenuItem()}
        {renderPrettyItem()}
      </div>
    );
  };

  useEffect(() => {
    if (!menuRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (open) {
      const menuRect = menuRef.current.getBoundingClientRect();
      setMenuStyle({ top: -menuRect.height - 20 });
    } else {
      const menuRect = menuRef.current.getBoundingClientRect();
      setMenuStyle({ top: -menuRect.height + 20 });
      timerRef.current = setTimeout(() => {
        setMenuStyle({ top: -160, zIndex: -9999, pointerEvents: 'none' });
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    const compactThemeCache = localStorage.getItem('shineout-theme-compact');
    const darkThemeCache = localStorage.getItem('shineout-theme-dark');
    let token = { ...CommonTokenMap };

    if (compactThemeCache === 'true') {
      token = { ...token, ...compact };
    }

    if (darkThemeCache === 'true') {
      token = { ...token, ...dark };
      // 设置 html 的 color-scheme 属性
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }
    setToken({
      selector: 'html',
      token,
    });
  }, []);

  return (
    <div
      ref={floatRef}
      className={classnames(classes.floatButton, open && classes.floatButtonOpen)}
      onClick={handleOpen}
    >
      {renderFloatMenu()}
      <div className={classes.floatButtonTarget}>{renderTarget()}</div>
    </div>
  );
};

export default FloatButton;
