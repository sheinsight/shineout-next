import { useEffect } from 'react';
import useStyles from '../style';
import { Button, setToken } from 'shineout';

const ButtonExample = () => {
  const classes = useStyles();

  useEffect(() => {
    setToken({
      selector: '#button1',
      token: {
        'Brand-1': '#FFFBE8',
        'Brand-2': '#FBEEB7',
        'Brand-10': '#4D2900',
        'Brand-3': '#F8DE87',
        'Brand-4': '#F4CB59',
        'Brand-5': '#F1B62C',
        'Brand-6': '#ED9E00',
        'Brand-7': '#C57D00',
        'Brand-8': '#9D5E00',
        'Brand-9': '#754200',
        buttonPrimaryHoverBackgroundColor: 'var(--soui-danger-5)',
        buttonPrimaryActiveBackgroundColor: 'var(--soui-danger-7)',
        buttonBorderRadius: 'var(--soui-radius-full)',
        buttonPrimaryBackgroundColor: 'var(--soui-danger-6)',
      },
    });

    setToken({
      selector: '#button2',
      token: {
        'Brand-1': '#F3E8FF',
        'Brand-2': '#C5AEE3',
        'Brand-10': '#0D004D',
        'Brand-3': '#9A7BC7',
        'Brand-4': '#7251AC',
        'Brand-5': '#4F2F90',
        'Brand-6': '#321574',
        'Brand-7': '#270E6A',
        'Brand-8': '#1D0960',
        'Brand-9': '#140456',
        buttonBorderRadius: 'var(--soui-radius-lesser)',
      },
    });

    setToken({
      selector: '#button3',
      token: {
        buttonPrimaryBackgroundColor: 'var(--soui-brand-6)',
        buttonBorderRadius: 'var(--soui-radius-lesser)',
        'Brand-1': '#FFF5E8',
        'Brand-2': '#FBDAB7',
        'Brand-10': '#4D1300',
        'Brand-3': '#F8BE87',
        'Brand-4': '#F49F59',
        'Brand-5': '#F17E2C',
        'Brand-6': '#ED5B00',
        'Brand-7': '#C54500',
        'Brand-8': '#9D3200',
        'Brand-9': '#752100',
      },
    });

    setToken({
      selector: '#button4',
      token: {
        'Custom-yellow-1': '#FFFFE8',
        'Custom-yellow-2': '#FEFDBE',
        'Custom-yellow-3': '#FDF894',
        'Custom-yellow-4': '#FCF06B',
        'Custom-yellow-5': '#FBE542',
        'Custom-yellow-6': '#FAD819',
        'Custom-yellow-7': '#CFAC0F',
        'Custom-yellow-8': '#A38208',
        'Custom-yellow-9': '#785B03',
        'Custom-yellow-10': '#4D3700',
        buttonPrimaryOutlineFontColor: 'var(--soui-custom-yellow-6)',
        'Brand-1': '#FFE8F7',
        'Brand-2': '#FFD1F0',
        'Brand-10': '#4D0049',
        'Brand-3': '#FFB9EB',
        'Brand-4': '#FFA2E8',
        'Brand-5': '#FF8AE6',
        'Brand-6': '#FF73E5',
        'Brand-7': '#D247BD',
        'Brand-8': '#A62597',
        'Brand-9': '#790E70',
      },
    });
  }, []);

  return (
    <div className={classes.button}>
      <Button id='button1' type='primary'>
        SHINEOUT 3.0
      </Button>
      <Button id='button2' type='primary'>
        SHINEOUT 3.0
      </Button>
      <Button id='button3' type='primary' mode='dashed'>
        SHINEOUT 3.0
      </Button>
      <Button id='button4' type='primary' mode='outline'>
        SHINEOUT 3.0
      </Button>
    </div>
  );
};

export default ButtonExample;
