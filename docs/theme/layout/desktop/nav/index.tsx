import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store, { dispatch } from '../../../store';
import useStyles from '../style';
import { Dropdown, Input } from 'shineout';

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const state = useSnapshot(store);
  const location = useLocation();

  const navs = [
    // {
    //   title: 'Home',
    //   path: `/${state.locales}/home`,
    // },
    // {
    //   title: 'Design',
    //   path: `/${state.locales}/design`,
    // },
    // {
    //   title: 'Introduce',
    //   path: `/${state.locales}/introduce`,
    // },
    {
      title: 'Component',
      path: `/${state.locales}/component/${state.doc}`,
    },
    // {
    //   title: 'Changelog',
    //   path: `/${state.locales}/changelog`,
    // },
  ];

  const handleChangeLocales = () => {
    const nextLocales = state.locales === 'en' ? 'cn' : 'en';

    dispatch.setLocales(nextLocales);

    const nextPath = location.pathname.replace(`/${state.locales}/`, `/${nextLocales}/`);

    navigate(nextPath);
  };

  const renderLeftNav = () => {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4Z'
          fill='#999DA8'
        />
        <path
          d='M6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12Z'
          fill='#999DA8'
        />
        <path
          d='M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z'
          fill='#999DA8'
        />
        <path
          d='M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4Z'
          fill='#999DA8'
        />
        <path
          d='M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z'
          fill='#999DA8'
        />
        <path
          d='M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z'
          fill='#999DA8'
        />
        <path
          d='M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z'
          fill='#999DA8'
        />
        <path
          d='M22 12C22 13.1046 21.1046 14 20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10C21.1046 10 22 10.8954 22 12Z'
          fill='#999DA8'
        />
        <path
          d='M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z'
          fill='#999DA8'
        />
      </svg>
    );
  };

  // const renderRightNav = () => {};

  // const handleChangeEnv = () => {
  //   dispatch.setEnv(state.env === 'SHEIN' ? 'GitHub' : 'SHEIN');
  // };

  const renderPrefix = () => {
    return (
      <svg
        style={{ marginRight: 8 }}
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_193_361)'>
          <path
            d='M2.87521 2.63359C0.824961 4.68384 0.824961 8.00796 2.87521 10.0582C4.78609 11.9691 7.80351 12.099 9.86484 10.4479L11.7081 12.2915C11.9359 12.5193 12.3053 12.5193 12.5331 12.2915C12.7609 12.0637 12.7609 11.6943 12.5331 11.4665L10.6899 9.62276C12.3406 7.56144 12.2106 4.54432 10.2998 2.63359C8.24958 0.583338 4.92547 0.583338 2.87521 2.63359ZM3.70017 3.45855C5.29481 1.86391 7.88024 1.86391 9.47488 3.45855C11.0695 5.05319 11.0695 7.63861 9.47488 9.23325C7.88024 10.8279 5.29481 10.8279 3.70017 9.23325C2.10553 7.63861 2.10553 5.05319 3.70017 3.45855Z'
            fill='#B3B7C1'
          />
        </g>
        <defs>
          <clipPath id='clip0_193_361'>
            <rect width='14' height='14' fill='white' />
          </clipPath>
        </defs>
      </svg>
    );
  };

  const renderAvatar = () => {
    return (
      <div style={{ height: 32, width: 32, borderRadius: '50%', background: '#F4F5F8' }}></div>
    );
  };

  const renderLogo = () => {
    return (
      <svg
        width='171'
        height='30'
        viewBox='0 0 171 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20.1436 0.524074C20.1436 0.325408 19.8999 0.215519 19.746 0.341137C18.6153 1.26402 15.138 3.79076 10.1588 4.54082C9.22536 4.68144 8.3406 4.88807 7.51137 5.13736C2.24508 6.72055 -0.00102615 12.3563 -0.00102615 17.8554C-0.00102615 17.8554 4.20306 14.0842 10.1588 13.1607C11.1936 13.0002 12.1703 12.7584 13.0777 12.4684C17.9856 10.9 20.1436 5.67656 20.1436 0.524074Z'
          fill='#197AFA'
        />
        <path
          d='M20.1436 12.4342C20.1436 12.2356 19.8999 12.1257 19.746 12.2513C18.6153 13.1742 15.138 15.7009 10.1588 16.451C9.22536 16.5916 8.3406 16.7982 7.51137 17.0475C2.24508 18.6307 -0.00102425 24.2665 -0.00102425 29.7656C-0.00102425 29.7656 4.20306 25.9944 10.1588 25.0708C11.1936 24.9104 12.1703 24.6686 13.0777 24.3786C17.9856 22.8101 20.1436 17.5867 20.1436 12.4342Z'
          fill='#FF8259'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M40.584 21.5263C40.9106 20.9474 41.075 20.2859 41.075 19.5416H41.0761C41.0761 18.7973 40.9928 18.1357 40.7473 17.5569C40.5019 16.978 40.1742 16.4818 39.6821 15.9856C39.1911 15.4894 38.6169 15.0759 37.8793 14.6624C37.1428 14.249 36.3231 13.9182 35.2578 13.5874C34.4381 13.3393 33.7827 13.0912 33.2096 12.8431C33.1584 12.821 33.1086 12.7996 33.06 12.7787C32.5631 12.5649 32.1973 12.4075 31.8988 12.1815C31.8675 12.1578 31.8369 12.1348 31.8071 12.1124C31.5255 11.901 31.3167 11.7443 31.2424 11.52C31.0791 11.2719 30.9969 11.0238 30.9969 10.693C30.9969 10.4449 31.078 10.1968 31.2424 9.94871C31.4068 9.70062 31.5712 9.45253 31.8166 9.28713C32.0621 9.12174 32.3076 8.95634 32.7175 8.87365C33.0452 8.79095 33.3729 8.70825 33.7827 8.70825C34.6025 8.70825 35.34 8.79095 35.9954 9.03904C36.6508 9.28713 37.2239 9.70062 37.716 10.1141L40.5019 7.55049C39.6832 6.80622 38.6991 6.31003 37.6338 5.89655C36.5686 5.48306 35.1757 5.31767 33.6194 5.31767C32.73 5.32731 31.8466 5.46659 30.9969 5.73115C30.2336 5.97125 29.5141 6.33432 28.8664 6.80622C28.211 7.3024 27.7201 7.88128 27.3924 8.54286C27.0647 9.20443 26.9003 9.94871 26.9003 10.7757C26.9003 11.6027 27.0636 12.3469 27.4735 13.0912C27.7201 13.6701 28.211 14.249 28.7031 14.6624C29.2466 15.1322 29.8536 15.522 30.5059 15.8202C31.2424 16.151 31.9799 16.3991 32.7175 16.6472L32.7175 16.6472C33.4445 16.8433 34.1566 17.092 34.848 17.3915C34.9022 17.4149 34.955 17.4377 35.0064 17.4598C35.498 17.6716 35.862 17.8284 36.1587 18.053C36.4864 18.2184 36.733 18.4665 36.8141 18.7146C36.8963 18.9627 36.9785 19.2108 36.9785 19.5416C36.9785 19.7897 36.8974 20.0378 36.733 20.2859C36.6807 20.3385 36.6285 20.3994 36.5737 20.4635C36.4563 20.6007 36.3268 20.752 36.1587 20.8647C35.9132 21.0301 35.5855 21.1955 35.2578 21.2782C34.9302 21.3609 34.6025 21.4436 34.1926 21.4436C33.2918 21.4436 32.472 21.2782 31.6523 21.0301C30.8336 20.782 30.0138 20.3686 29.1941 19.707L26.3271 22.2706C26.5877 22.435 26.8353 22.5994 27.075 22.7586C27.4383 22.9998 27.7836 23.2291 28.1289 23.4284C28.295 23.5001 28.4611 23.5789 28.6291 23.6585C29.0417 23.854 29.4659 24.0551 29.9316 24.1726L29.9421 24.1753C30.5951 24.3398 31.2463 24.5039 31.9799 24.5861C32.6353 24.6688 33.4551 24.7515 34.3559 24.7515C35.2728 24.7482 36.1842 24.6088 37.0606 24.338C37.8426 24.1041 38.568 23.7099 39.1911 23.1803C39.7643 22.6841 40.2553 22.1879 40.584 21.5263ZM56.4551 24.5035H60.4695V5.73125H56.4551V13.174H48.9984V5.73125H44.983V24.5035H48.9984V16.2338H56.4551V24.5035ZM95.7558 24.5035H110.423V21.1956H99.6891V16.0684H109.603V13.174H99.6891V8.70835H110.423V5.73125H95.7558V24.5035ZM66.2177 24.5035H70.2321H70.2332V5.73125H66.2177V24.5035ZM90.6218 24.9997V5.73122H86.6896V14.9933L75.464 5.15234V24.3381H79.3973V15.1587L90.6218 24.9997ZM123.486 24.726C122.096 24.726 120.81 24.4783 119.628 23.9828C118.464 23.4873 117.439 22.7971 116.552 21.9123C115.666 21.0274 114.98 20.001 114.493 18.833C114.006 17.6473 113.763 16.3732 113.763 15.0105C113.763 13.6302 114.006 12.356 114.493 11.188C114.98 10.02 115.657 9.00245 116.526 8.13531C117.395 7.25047 118.412 6.56914 119.576 6.09133C120.758 5.59582 122.044 5.34807 123.434 5.34807C124.807 5.34807 126.076 5.59582 127.24 6.09133C128.422 6.56914 129.447 7.25047 130.316 8.13531C131.203 9.00245 131.889 10.0289 132.376 11.2146C132.862 12.3825 133.106 13.6567 133.106 15.0371C133.106 16.3997 132.862 17.6739 132.376 18.8596C131.889 20.0275 131.211 21.054 130.342 21.9388C129.473 22.8059 128.448 23.4873 127.266 23.9828C126.102 24.4783 124.842 24.726 123.486 24.726ZM123.434 20.9301C124.529 20.9301 125.485 20.6823 126.302 20.1868C127.136 19.6913 127.779 19.0011 128.231 18.1163C128.683 17.2138 128.909 16.1785 128.909 15.0105C128.909 14.1257 128.778 13.3293 128.518 12.6214C128.257 11.8959 127.883 11.2765 127.397 10.7633C126.91 10.2324 126.328 9.8342 125.65 9.56875C124.99 9.2856 124.251 9.14403 123.434 9.14403C122.34 9.14403 121.375 9.39178 120.541 9.88729C119.724 10.3651 119.09 11.0464 118.638 11.9313C118.186 12.7984 117.96 13.8248 117.96 15.0105C117.96 15.8953 118.09 16.7006 118.351 17.4261C118.612 18.1517 118.977 18.7799 119.446 19.3108C119.933 19.824 120.515 20.2222 121.193 20.5054C121.87 20.7885 122.618 20.9301 123.434 20.9301ZM139.995 23.7172C141.16 24.372 142.498 24.6994 144.01 24.6994C145.522 24.6994 146.851 24.372 147.998 23.7172C149.145 23.0624 150.04 22.1599 150.683 21.0096C151.326 19.8593 151.648 18.5409 151.648 17.0543V5.66646H147.529V17.2933C147.529 18.0365 147.373 18.6824 147.06 19.231C146.764 19.762 146.356 20.1778 145.835 20.4787C145.313 20.7618 144.705 20.9034 144.01 20.9034C143.35 20.9034 142.741 20.7618 142.185 20.4787C141.646 20.1778 141.221 19.7531 140.908 19.2045C140.595 18.6559 140.439 18.01 140.439 17.2667V5.66646H136.32V17.0278C136.32 18.5143 136.641 19.8416 137.284 21.0096C137.945 22.1599 138.848 23.0624 139.995 23.7172ZM160.882 9.30315V24.4074H164.975V9.30315H170.736V5.66646H155.121V9.30315H160.882Z'
          fill='#141737'
        />
      </svg>
    );
  };

  return (
    <div className={classes.nav}>
      <div className='left-nav'>{renderLeftNav()}</div>
      <div className='logo'>{renderLogo()}</div>
      <ul className='entry'>
        <li>
          <Input
            placeholder='搜索...'
            prefix={renderPrefix()}
            border={false}
            style={{ backgroundColor: '#F4F5F8', width: 280 }}
          ></Input>
        </li>
        <li style={{ padding: '0 12px' }}>
          <Dropdown placeholder={<span style={{ color: '#141737' }}>RTL</span>} data={[]} />
        </li>
        <li style={{ paddingRight: 24 }} onClick={handleChangeLocales}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.6667 10H6.66667C6.20643 10 5.83333 10.3731 5.83333 10.8333V17.5C5.83333 17.9602 6.20643 18.3333 6.66667 18.3333H16.6667C17.1269 18.3333 17.5 17.9602 17.5 17.5V10.8333C17.5 10.3731 17.1269 10 16.6667 10ZM6.66667 9.16667C5.74619 9.16667 5 9.91286 5 10.8333V17.5C5 18.4205 5.74619 19.1667 6.66667 19.1667H16.6667C17.5871 19.1667 18.3333 18.4205 18.3333 17.5V10.8333C18.3333 9.91286 17.5871 9.16667 16.6667 9.16667H6.66667Z'
              fill='#333E59'
            />
            <path
              d='M7.25 10.7167H11.525V11.4917H8.15833V13.225H11.325V14H8.15833V15.8917H11.6667V16.6667H7.25V10.7167Z'
              fill='#333E59'
            />
            <path
              d='M14.6885 12.2417C15.7552 12.2417 16.2969 12.825 16.2969 14.0083V16.6667H15.4135V14.0833C15.4135 13.35 15.0719 12.9833 14.4052 12.9833C14.1552 12.9833 13.9302 13.0667 13.7469 13.25C13.5469 13.45 13.4219 13.725 13.3885 14.075V16.6667H12.5052V12.3583H13.3885V12.8917C13.5552 12.675 13.7469 12.5167 13.9635 12.4083C14.1802 12.2917 14.4219 12.2417 14.6885 12.2417Z'
              fill='#333E59'
            />
            <rect x='1.66669' y='1.66667' width='11.6667' height='11.6667' rx='2' fill='#333E59' />
            <path
              d='M7.01002 2.59334H7.99002V4.32334H11.55V9.15334H10.6V8.58334H7.99002V11.9333H7.01002V8.58334H4.41002V9.15334H3.46002V4.32334H7.01002V2.59334ZM4.41002 7.65334H7.01002V5.25334H4.41002V7.65334ZM7.99002 7.65334H10.6V5.25334H7.99002V7.65334Z'
              fill='white'
            />
          </svg>
        </li>
        <li style={{ paddingRight: 24 }}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.99219 1.49024C5.16211 1.48828 1.25 5.39844 1.25 10.2246C1.25 14.041 3.69727 17.2852 7.10547 18.4766C7.56445 18.5918 7.49414 18.2656 7.49414 18.043V16.5293C4.84375 16.8398 4.73633 15.0859 4.55859 14.793C4.19922 14.1797 3.34961 14.0234 3.60352 13.7305C4.20703 13.4199 4.82227 13.8086 5.53516 14.8613C6.05078 15.625 7.05664 15.4961 7.56641 15.3691C7.67773 14.9102 7.91602 14.5 8.24414 14.1816C5.49805 13.6895 4.35352 12.0137 4.35352 10.0215C4.35352 9.05469 4.67188 8.16602 5.29688 7.44922C4.89844 6.26758 5.33398 5.25586 5.39258 5.10547C6.52734 5.00391 7.70703 5.91797 7.79883 5.99024C8.44336 5.81641 9.17969 5.72461 10.0039 5.72461C10.832 5.72461 11.5703 5.82031 12.2207 5.99609C12.4414 5.82813 13.5352 5.04297 14.5898 5.13867C14.6465 5.28906 15.0723 6.27734 14.6973 7.44336C15.3301 8.16211 15.6523 9.0586 15.6523 10.0273C15.6523 12.0234 14.5 13.7012 11.7461 14.1855C12.2051 14.6387 12.4902 15.2676 12.4902 15.9629V18.1602C12.5059 18.3359 12.4902 18.5098 12.7832 18.5098C16.2422 17.3438 18.7324 14.0762 18.7324 10.2266C18.7324 5.39844 14.8184 1.49024 9.99219 1.49024Z'
              fill='#333E59'
            />
          </svg>
        </li>
        <li style={{ paddingRight: 24 }}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.25 17.5C11.471 17.5 11.6829 17.5878 11.8392 17.7441C11.9954 17.9004 12.0832 18.1123 12.0832 18.3333C12.0832 18.5543 11.9954 18.7663 11.8392 18.9225C11.6829 19.0788 11.471 19.1666 11.25 19.1667H8.75C8.52901 19.1666 8.31708 19.0788 8.16083 18.9225C8.00457 18.7663 7.91679 18.5543 7.91679 18.3333C7.91679 18.1123 8.00457 17.9004 8.16083 17.7441C8.31708 17.5878 8.52901 17.5 8.75 17.5H11.25ZM10.0017 0.833328C10.2227 0.833328 10.4346 0.921126 10.5909 1.07741C10.7472 1.23369 10.835 1.44565 10.835 1.66666V2.49999L10.8317 2.55833C12.2204 2.75872 13.4904 3.45282 14.409 4.51345C15.3276 5.57408 15.8333 6.9302 15.8333 8.33333V14.1667H16.6667C16.8877 14.1667 17.0996 14.2545 17.2559 14.4107C17.4122 14.567 17.5 14.779 17.5 15C17.5 15.221 17.4122 15.433 17.2559 15.5892C17.0996 15.7455 16.8877 15.8333 16.6667 15.8333H3.33333C3.11232 15.8333 2.90036 15.7455 2.74408 15.5892C2.5878 15.433 2.5 15.221 2.5 15C2.5 14.779 2.5878 14.567 2.74408 14.4107C2.90036 14.2545 3.11232 14.1667 3.33333 14.1667H4.16667V8.33333C4.1668 6.92983 4.6728 5.5734 5.59191 4.51272C6.51101 3.45203 7.78164 2.75817 9.17083 2.55833C9.16895 2.53894 9.16812 2.51947 9.16833 2.49999V1.66666C9.16833 1.44565 9.25613 1.23369 9.41241 1.07741C9.56869 0.921126 9.78065 0.833328 10.0017 0.833328ZM10 4.16666C8.92628 4.16672 7.89403 4.58128 7.11852 5.32388C6.34301 6.06648 5.8841 7.07979 5.8375 8.15249L5.83333 8.33333V14.1667H14.1667V8.33333C14.1666 7.25961 13.752 6.22736 13.0095 5.45185C12.2669 4.67633 11.2535 4.21743 10.1808 4.17083L10 4.16666Z'
              fill='#333E59'
            />
          </svg>
        </li>
        {navs.map((nav) => (
          <li key={nav.title} onClick={() => navigate(nav.path)}>
            {nav.title === 'Component' ? renderAvatar() : ''}
          </li>
        ))}
        {/* <li onClick={handleChangeEnv}>{state.env}</li> */}
      </ul>
    </div>
  );
};

export default Nav;
