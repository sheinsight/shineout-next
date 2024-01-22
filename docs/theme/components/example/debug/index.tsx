import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStyles from '../style';
import { Button, Tooltip } from 'shineout';

interface CopyProps {
  example: React.FC;
  name: string;
}

const Debug = (props: CopyProps) => {
  const { example: Example, name } = props;

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [relative, setRelative] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [reload, setReload] = useState(false);
  const [flexCenter, setFlexCenter] = useState(false);
  const [y, setY] = useState(0);
  const searchParams = new URLSearchParams(location.search);

  const getStyle = () => {
    const style: React.CSSProperties = {};

    if (relative) {
      style.position = 'relative';
    }

    if (flexCenter) {
      style.display = 'flex';
      style.justifyContent = 'center';
      style.alignItems = 'center';
    }

    if (scroll) {
      style.overflow = 'auto';
    } else {
      style.overflow = 'hidden';
    }

    return style;
  };

  const getBodyStyle = () => {
    const style: React.CSSProperties = {};
    if (y !== 0) {
      style.height = `calc(100% + ${y}px)`;
    } else {
      style.height = '100%';
    }

    if (flexCenter) {
      style.display = 'flex';
      style.justifyContent = 'center';
      style.alignItems = 'center';
    }

    return style;
  };

  const handleOpen = () => {
    navigate({
      search: `?example=${name}`,
    });
    setOpen(true);
  };

  const handleClose = () => {
    navigate({
      search: `?tab=examples`,
    });
    setOpen(false);
  };

  const handleScroll = () => {
    setScroll(!scroll);
  };

  const handleScrollY = (value?: number) => {
    if (value === undefined) {
      setY(0);
      setScroll(false);
      return;
    }
    setY(y + value);
  };

  const handleRelative = () => {
    setRelative(!relative);
  };

  const handleReload = () => {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 500);
  };

  const handleFlexCenter = () => {
    setFlexCenter(!flexCenter);
  };

  useEffect(() => {
    const example = searchParams.get('example');
    if (example && example === name) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <div className='iconbox'>
        <Tooltip tip='Debug' trigger='hover' position='top'>
          <div className='icon' onClick={handleOpen}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 3C10.3431 3 9 4.34315 9 6H7C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H15C15 4.34315 13.6569 3 12 3ZM5.08668 9.89527C3.63999 9.5574 2.49516 8.43439 2.12598 7H4.26752C4.61333 7.5978 5.25968 8 5.99996 8H18C18.7402 8 19.3866 7.5978 19.7324 7H21.8739C21.5048 8.43437 20.36 9.55736 18.9133 9.89525C18.9704 10.2551 19 10.6241 19 11V12H23V14H19V15C19 15.705 18.8958 16.3857 18.7019 17.0275C19.9662 17.9343 20.8302 19.3638 20.9776 21H18.9646C18.8448 20.1622 18.4282 19.4201 17.8248 18.8836C16.5695 20.7625 14.4293 22 12 22C9.57073 22 7.43049 20.7626 6.17523 18.8836C5.57185 19.4201 5.15532 20.1622 5.03548 21H3.02246C3.1699 19.3639 4.03386 17.9343 5.29815 17.0276C5.10424 16.3858 5 15.7051 5 15V14H1V12H5V11C5 10.6241 5.02963 10.2551 5.08668 9.89527ZM17 11C17 10.6575 16.9656 10.3231 16.9 10H7.10002C7.03443 10.3231 7 10.6575 7 11V15C7 17.419 8.71776 19.4367 11 19.9V14H13V19.9C15.2822 19.4367 17 17.419 17 15V11Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </Tooltip>
      </div>
      {open && (
        <div className={classes.debug}>
          <div className='toolbar'>
            <div>
              <Button loading={reload} size='small' type='secondary' onClick={handleReload}>
                重载组件
              </Button>
              <Button size='small' type='secondary' onClick={handleRelative}>
                容器相对定位
              </Button>
              <Button size='small' type='secondary' onClick={handleFlexCenter}>
                Flex 居中
              </Button>
              <Button.Group size='small' type='secondary'>
                <Button onClick={handleScroll}>容器滚动</Button>

                <Button disabled={!scroll} onClick={() => handleScrollY(100)}>
                  +
                </Button>
                <Button disabled={!scroll} onClick={() => handleScrollY(-100)}>
                  -
                </Button>
                <Button disabled={!scroll} onClick={() => handleScrollY(undefined)}>
                  重置
                </Button>
              </Button.Group>
            </div>
            <div>
              <Button size='small' type='danger' onClick={handleClose}>
                关闭
              </Button>
            </div>
          </div>
          <div className='container' style={getStyle()}>
            <div className='body' style={getBodyStyle()}>
              {!reload && <Example></Example>}
            </div>
            <pre className='css'>{JSON.stringify(getStyle(), null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Debug;
