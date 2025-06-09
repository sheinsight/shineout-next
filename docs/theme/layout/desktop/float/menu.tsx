import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import store, {dispatch} from '../../../store'
import useStyles from '../style';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};



export default function Component(): JSX.Element | null {
  const classes = useStyles();

  const winWidth = useWindowWidth();

  const { menuFloat, menuCollapsed } = useSnapshot(store);

  const setMenuFloat = (val: boolean) => {
    dispatch.setMenuFloat(val);
  };

  const setCollapsed = (val: boolean) => {
    dispatch.setMenuCollapsed(val);
  };

  useEffect(() => {
    const val = winWidth <= 1200;
    setMenuFloat(val);
    setCollapsed(val ? true : false);
  }, [winWidth]);

  if (!menuFloat) return null;

  return (
    <div
      className={classes.floatMenuButtonContainer}
      onClick={() => {
        setCollapsed(!menuCollapsed);
      }}
    >
      <div className={classes.floatMenuButton}>
        {menuCollapsed ? (
          <svg
            viewBox='64 64 896 896'
            focusable='false'
            data-icon='menu-unfold'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z'></path>
          </svg>
        ) : (
          <svg
            viewBox='64 64 896 896'
            focusable='false'
            data-icon='menu-fold'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z'></path>
          </svg>
        )}
      </div>
    </div>
  );
}
