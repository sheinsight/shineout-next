import React from 'react';

function icon(paths: (string | JSX.Element)[]) {
  return (
    <svg viewBox='0 0 24 24' focusable='false' fill='currentColor' aria-hidden='true'>
      {paths.map((p, i) => {
        if (typeof p === 'string') return <path key={i} d={p} />;
        return p;
      })}
    </svg>
  );
}

const TableSortIconUp = (
  <svg
    width='8'
    height='5'
    viewBox='0 0 8 5'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.656815 3.87248L3.6396 0.192827C3.84802 -0.064284 4.18544 -0.0642746 4.39384 0.192848L7.3432 3.83158C7.55194 4.08911 7.55231 4.50711 7.34403 4.76521C7.2446 4.88842 7.10983 4.9581 6.96905 4.95907L1.03691 4.99999C0.742031 5.00202 0.501653 4.70811 0.500008 4.34351C0.499211 4.16689 0.555689 3.99723 0.656815 3.87248Z'
    />
  </svg>
);
const TableSortIconDown = (
  <svg
    width='8'
    height='5'
    viewBox='0 0 8 5'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.34319 1.12752L4.3604 4.80717C4.15198 5.06428 3.81456 5.06427 3.60616 4.80715L0.656798 1.16842C0.448058 0.910888 0.447688 0.49289 0.65597 0.234795C0.755405 0.111578 0.890173 0.041904 1.03095 0.0409327L6.96309 1.09673e-05C7.25797 -0.00202322 7.49835 0.291892 7.49999 0.656489C7.50079 0.833113 7.44431 1.00277 7.34319 1.12752Z'
    />
  </svg>
);

const clock = [
  'M12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23ZM12 21C15.2154 21 18.1865 19.2846 19.7942 16.5C21.4019 13.7154 21.4019 10.2846 19.7942 7.5C18.1865 4.71539 15.2154 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H12C11.4477 13 11 12.5523 11 12V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11Z',
];

const closeCircle = [
  <path
    key={'1'}
    d='M12 23C5.924 23 1 18.076 1 12C1 5.924 5.924 1 12 1C18.076 1 23 5.924 23 12C23 18.076 18.076 23 12 23Z'
    fill='currentColor'
  />,
  <path
    key={'2'}
    d='M9.6129 8.2097C9.22061 7.90468 8.65338 7.93241 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.413 11.828L8.29289 13.9497L8.2097 14.044C7.90468 14.4362 7.93241 15.0035 8.29289 15.364C8.68342 15.7545 9.31658 15.7545 9.70711 15.364L11.828 13.242L13.9497 15.364L14.044 15.4471C14.4362 15.7522 15.0035 15.7244 15.364 15.364C15.7545 14.9734 15.7545 14.3403 15.364 13.9497L13.242 11.828L15.364 9.70711L15.4471 9.6129C15.7522 9.22061 15.7244 8.65338 15.364 8.29289C14.9734 7.90237 14.3403 7.90237 13.9497 8.29289L11.828 10.413L9.70711 8.29289L9.6129 8.2097Z'
    fill='white'
  />,
];

const recoverCircle = [
  <path
    key={'1'}
    d='M12 23C5.924 23 1 18.076 1 12C1 5.924 5.924 1 12 1C18.076 1 23 5.924 23 12C23 18.076 18.076 23 12 23Z'
    fill='currentColor'
  />,
  <path
    key={'2'}
    d='M9 9.00001H14C16.2091 9.00001 18 10.7909 18 13C18 15.2092 16.2091 17 14 17H9M10.5004 12.5711L6.96484 9.03553L10.5004 5.5'
    stroke='white'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  />,
];

const arrowDown = [
  'M11.2929 15.7071C11.6534 16.0676 12.2206 16.0953 12.6129 15.7903L12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3466 7.93241 17.7794 7.90468 17.3871 8.2097L17.2929 8.29289L12.7072 12.8779C12.3165 13.2683 11.6835 13.2683 11.2928 12.8779L6.70711 8.29289C6.34662 7.93241 5.77939 7.90468 5.3871 8.2097L5.29289 8.29289C4.93241 8.65338 4.90468 9.22061 5.2097 9.6129L5.29289 9.70711L11.2929 15.7071Z',
];

const arrowLeft = [
  'M7.29289 12.7071C6.93241 12.3466 6.90468 11.7794 7.2097 11.3871L7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289C15.0676 5.65338 15.0953 6.22061 14.7903 6.6129L14.7071 6.70711L10.1221 11.2928C9.7317 11.6835 9.7317 12.3165 10.1221 12.7072L14.7071 17.2929C15.0676 17.6534 15.0953 18.2206 14.7903 18.6129L14.7071 18.7071C14.3466 19.0676 13.7794 19.0953 13.3871 18.7903L13.2929 18.7071L7.29289 12.7071Z',
];
const arrowLeftDouble = [
  'M11.3871 5.2097C11.7794 4.90468 12.3466 4.93241 12.7071 5.29289L12.7903 5.3871C13.0953 5.77939 13.0676 6.34662 12.7071 6.70711L8.12205 11.2928C7.7317 11.6835 7.7317 12.3165 8.12205 12.7072L12.7071 17.2929L12.7903 17.3871C13.0953 17.7794 13.0676 18.3466 12.7071 18.7071C12.3166 19.0976 11.6834 19.0976 11.2929 18.7071L5.29289 12.7071L5.2097 12.6129C4.90468 12.2206 4.93241 11.6534 5.29289 11.2929L11.2929 5.29289L11.3871 5.2097ZM17.3871 5.2097C17.7794 4.90468 18.3466 4.93241 18.7071 5.29289L18.7903 5.3871C19.0953 5.77939 19.0676 6.34662 18.7071 6.70711L14.1221 11.2928C13.7317 11.6835 13.7317 12.3165 14.1221 12.7072L18.7071 17.2929L18.7903 17.3871C19.0953 17.7794 19.0676 18.3466 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L11.2929 12.7071L11.2097 12.6129C10.9047 12.2206 10.9324 11.6534 11.2929 11.2929L17.2929 5.29289L17.3871 5.2097Z',
];

const arrowRightDouble = [
  'M11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L18.7071 11.2929L18.7903 11.3871C19.0953 11.7794 19.0676 12.3466 18.7071 12.7071L12.7071 18.7071L12.6129 18.7903C12.2206 19.0953 11.6534 19.0676 11.2929 18.7071L11.2097 18.6129C10.9047 18.2206 10.9324 17.6534 11.2929 17.2929L15.8779 12.7072C16.2683 12.3165 16.2683 11.6835 15.8779 11.2928L11.2929 6.70711L11.2097 6.6129C10.9047 6.22061 10.9324 5.65338 11.2929 5.29289ZM5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12.7071 11.2929L12.7903 11.3871C13.0953 11.7794 13.0676 12.3466 12.7071 12.7071L6.70711 18.7071L6.6129 18.7903C6.22061 19.0953 5.65338 19.0676 5.29289 18.7071L5.2097 18.6129C4.90468 18.2206 4.93241 17.6534 5.29289 17.2929L9.87795 12.7072C10.2683 12.3165 10.2683 11.6835 9.87795 11.2928L5.29289 6.70711L5.2097 6.6129C4.90468 6.22061 4.93241 5.65338 5.29289 5.29289Z',
];

const arrowRight = [
  'M16.7071 12.7071C17.0676 12.3466 17.0953 11.7794 16.7903 11.3871L16.7071 11.2929L10.7071 5.29289C10.3166 4.90237 9.68342 4.90237 9.29289 5.29289C8.93241 5.65338 8.90468 6.22061 9.2097 6.6129L9.29289 6.70711L13.8779 11.2928C14.2683 11.6835 14.2683 12.3165 13.8779 12.7072L9.29289 17.2929C8.93241 17.6534 8.90468 18.2206 9.2097 18.6129L9.29289 18.7071C9.65338 19.0676 10.2206 19.0953 10.6129 18.7903L10.7071 18.7071L16.7071 12.7071Z',
];

const caretFill = [
  'M18.2213 9.72149L12.6348 15.2953C12.2444 15.6847 11.6125 15.6847 11.2222 15.2952L5.69827 9.78345C5.30731 9.39335 5.30662 8.76019 5.69671 8.36924C5.88295 8.18259 6.13536 8.07705 6.39902 8.07558L17.5094 8.0136C18.0617 8.01052 18.5119 8.45573 18.515 9.008C18.5165 9.27554 18.4107 9.53253 18.2213 9.72149Z',
];

const imageCount = [
  'M17 5C18.1046 5 19 5.89543 19 7V20C19 21.1046 18.1046 22 17 22H3C1.89543 22 1 21.1046 1 20V7C1 5.89543 1.89543 5 3 5H17ZM12.583 14.1855L10.7002 16.3748C10.3326 16.8019 9.69133 16.8619 9.25032 16.5105L8.06047 15.5625C7.66313 15.2459 7.09157 15.2776 6.73163 15.6361L3.123 19.23L3.12999 19.2623C3.20929 19.5548 3.41805 19.7941 3.69098 19.9149H16.309C16.626 19.7746 16.8565 19.4744 16.898 19.1166L16.9048 19V16.0936L13.9471 14.042C13.5261 13.7213 12.9281 13.7842 12.583 14.1855ZM15.9048 7H4.09524C3.5824 7 3.15973 7.38604 3.10197 7.88338L3.09524 8L3.095 16.306L6.54494 12.8709C6.89094 12.5262 7.42472 12.4697 7.83235 12.7185L7.94016 12.7939L9.01459 13.6503C9.43496 13.9854 10.045 13.9282 10.3957 13.5208L12.2522 11.3644C12.614 10.944 13.2424 10.8783 13.684 11.2146L16.904 13.3738L16.9048 8C16.9048 7.44772 16.457 7 15.9048 7ZM22 1C22.5523 1 23 1.44772 23 2V14C23 14.5523 22.5523 15 22 15C21.4477 15 21 14.5523 21 14V3H5C4.44772 3 4 2.55228 4 2C4 1.44772 4.44772 1 5 1H22ZM6 8C7.10455 8 8 8.89545 8 10C8 11.1046 7.10455 12 6 12C4.89545 12 4 11.1046 4 10C4 8.89545 4.89545 8 6 8ZM6 9.71429C5.84219 9.71429 5.71429 9.84219 5.71429 10C5.71429 10.1578 5.84219 10.2857 6 10.2857C6.15781 10.2857 6.28571 10.1578 6.28571 10C6.28571 9.84219 6.15781 9.71429 6 9.71429Z',
];

const imageError = [
  'M10.0071 3C11.1116 3 12.0071 3.89543 12.0071 5C12.0071 5.26258 11.9554 5.5226 11.8549 5.7652L11.1365 7.5L13 10.3708L10.7847 14.714L12.0609 18.3352C12.428 19.377 11.8811 20.5192 10.8394 20.8863C10.6258 20.9616 10.401 21 10.1746 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3H10.0071ZM21 3C22.1046 3 23 3.89543 23 5V19C23 20.1046 22.1046 21 21 21H16.1711C15.3094 21 14.5446 20.4481 14.2731 19.6303L12.6405 14.714L14.7279 10L13 7.5L13.652 4.56614C13.8553 3.65106 14.6669 3 15.6043 3H21ZM6.20564 14.3044L3 17.496V18C3 18.5523 3.44772 19 4 19H8.76192C9.3142 19 9.76192 18.5523 9.76192 18C9.76192 17.8868 9.74269 17.7744 9.70506 17.6676L8.795 15.087L7.7077 14.2212C7.25856 13.8634 6.6125 13.8992 6.20564 14.3044ZM15.442 13.325L14.9389 14.4637C14.8383 14.691 14.8259 14.9477 14.9043 15.1837L15.9441 18.3151C16.0799 18.724 16.4623 19 16.8931 19H20C20.5523 19 21 18.5523 21 18V17.558L15.442 13.325ZM20 5H16.4067C15.9379 5 15.5321 5.32567 15.4305 5.78334L15.237 6.65499C15.1768 6.92663 15.2324 7.2111 15.3905 7.44004L16.692 9.32396C16.8898 9.61032 16.9245 9.97894 16.7836 10.2972L16.222 11.564L21 15.202V6C21 5.44772 20.5523 5 20 5ZM8.54231 5H4C3.44772 5 3 5.44772 3 6V15.14L6.20564 11.948C6.6125 11.5427 7.25856 11.5069 7.7077 11.8648L9.05265 12.9364C9.1471 13.0116 9.24968 13.0702 9.35675 13.1124L10.4307 11.0053C10.593 10.6871 10.5732 10.3064 10.3787 10.0067L9.17247 8.14775C8.99328 7.8716 8.96147 7.52496 9.08742 7.22081L9.44666 6.35332C9.65349 5.85386 9.41626 5.2813 8.91681 5.07447C8.79807 5.02531 8.67082 5 8.54231 5ZM6 6C7.10455 6 8 6.89545 8 8C8 9.10455 7.10455 10 6 10C4.89545 10 4 9.10455 4 8C4 6.89545 4.89545 6 6 6ZM6 7.71429C5.84219 7.71429 5.71429 7.84219 5.71429 8C5.71429 8.15781 5.84219 8.28571 6 8.28571C6.15781 8.28571 6.28571 8.15781 6.28571 8C6.28571 7.84219 6.15781 7.71429 6 7.71429Z',
];

const imageDownload = [
  'M12.0673 2C15.7465 2 18.7667 4.82116 19.0828 8.41823C21.3999 9.28602 23 11.5182 23 14.0734C23 17.4074 20.2973 20.1101 16.9633 20.1101C16.4003 20.1101 15.8467 20.0328 15.3143 19.8819C14.7797 19.7303 14.4692 19.1741 14.6207 18.6395C14.7722 18.1049 15.3285 17.7944 15.8631 17.9459C16.2174 18.0464 16.5863 18.0979 16.9633 18.0979C19.1859 18.0979 20.9878 16.2961 20.9878 14.0734C20.9878 12.1996 19.6962 10.5854 17.8988 10.158C17.48 10.0584 17.1852 9.71041 17.1333 9.30733C17.1101 9.22299 17.0979 9.13434 17.0979 9.04283C17.0979 6.26452 14.8456 4.01224 12.0673 4.01224C9.289 4.01224 7.03671 6.26452 7.03671 9.04283C7.03671 9.38979 6.86109 9.69572 6.5939 9.8766C6.46424 10.0114 6.29617 10.1116 6.10124 10.158C4.30384 10.5854 3.01224 12.1996 3.01224 14.0734C3.01224 16.2961 4.81407 18.0979 7.03671 18.0979C7.41365 18.0979 7.78262 18.0464 8.13692 17.9459C8.67152 17.7944 9.22775 18.1049 9.3793 18.6395C9.53085 19.1741 9.22032 19.7303 8.68572 19.8819C8.15329 20.0328 7.59966 20.1101 7.03671 20.1101C3.70274 20.1101 1 17.4074 1 14.0734C1 11.4678 2.66387 9.19804 5.05663 8.36901C5.39497 4.79594 8.40463 2 12.0673 2ZM12.0673 8.03671C12.5833 8.03671 13.0085 8.42511 13.0667 8.9255L13.0734 9.04283V15.2164L14.9464 13.3592C15.3408 12.9678 15.9779 12.9703 16.3692 13.3648C16.7305 13.7289 16.7562 14.2997 16.4477 14.6932L16.3637 14.7876L12.7759 18.3475C12.4124 18.7082 11.8427 18.7344 11.4491 18.4273L11.3547 18.3435L7.86619 14.8435C7.47392 14.45 7.47497 13.8129 7.86853 13.4207C8.23182 13.0586 8.80257 13.0316 9.19675 13.3392L9.2914 13.423L11.0612 15.1993V9.04283C11.0612 8.48717 11.5116 8.03671 12.0673 8.03671Z',
];

const imagePreview = [
  'M17.177 11.248C15.258 9.776 13.429 9 12 9C10.57 9 8.74 9.775 6.822 11.246C6.466 11.519 6.118 11.809 5.792 12.101C6.118 12.394 6.467 12.684 6.823 12.957C8.743 14.428 10.573 15.204 12.003 15.204C13.433 15.204 15.262 14.429 17.18 12.959C17.535 12.686 17.883 12.397 18.208 12.105C17.8755 11.8062 17.5316 11.5203 17.177 11.248ZM20.581 11.628C20.743 11.802 20.885 11.964 21 12.105C20.885 12.245 20.743 12.407 20.582 12.58C19.9074 13.293 19.1763 13.9505 18.396 14.546C16.234 16.204 13.994 17.204 12.003 17.204C10.012 17.204 7.771 16.203 5.607 14.544C4.82603 13.9482 4.09433 13.2904 3.419 12.577C3.27436 12.4231 3.13463 12.2647 3 12.102C3.115 11.961 3.257 11.799 3.419 11.626C4.09367 10.913 4.8247 10.2555 5.605 9.66C7.77 8 10.01 7 12 7C13.99 7 16.23 8.001 18.394 9.661C19.1747 10.2572 19.906 10.9143 20.581 11.628ZM4 4V7C4.00002 7.13134 3.97417 7.26139 3.92392 7.38273C3.87368 7.50407 3.80002 7.61433 3.70716 7.70721C3.6143 7.80008 3.50405 7.87375 3.38272 7.92402C3.26138 7.97428 3.13133 8.00015 3 8.00015C2.86867 8.00015 2.73862 7.97428 2.61728 7.92402C2.49595 7.87375 2.3857 7.80008 2.29284 7.70721C2.19998 7.61433 2.12632 7.50407 2.07608 7.38273C2.02583 7.26139 1.99998 7.13134 2 7V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H7C7.13134 1.99998 7.26139 2.02583 7.38273 2.07608C7.50407 2.12632 7.61433 2.19998 7.70721 2.29284C7.80008 2.3857 7.87375 2.49595 7.92402 2.61728C7.97428 2.73862 8.00015 2.86867 8.00015 3C8.00015 3.13133 7.97428 3.26138 7.92402 3.38272C7.87375 3.50405 7.80008 3.6143 7.70721 3.70716C7.61433 3.80002 7.50407 3.87368 7.38273 3.92392C7.26139 3.97417 7.13134 4.00002 7 4H4ZM4 20H7C7.26519 20 7.51951 20.1054 7.70701 20.2929C7.89451 20.4805 7.99985 20.7348 7.99985 21C7.99985 21.2652 7.89451 21.5195 7.70701 21.7071C7.51951 21.8946 7.26519 22 7 22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21V17C2.00004 16.7348 2.10542 16.4805 2.29295 16.293C2.48048 16.1055 2.73481 16.0002 3 16.0002C3.26519 16.0002 3.51952 16.1055 3.70705 16.293C3.89458 16.4805 3.99996 16.7348 4 17V20ZM20 4H17C16.7348 3.99996 16.4805 3.89458 16.293 3.70705C16.1055 3.51952 16.0002 3.26519 16.0002 3C16.0002 2.73481 16.1055 2.48048 16.293 2.29295C16.4805 2.10542 16.7348 2.00004 17 2H21C21.2652 2 21.5196 2.10536 21.7071 2.29289C21.8946 2.48043 22 2.73478 22 3V7C22 7.26519 21.8946 7.51951 21.7071 7.70701C21.5195 7.89451 21.2652 7.99985 21 7.99985C20.7348 7.99985 20.4805 7.89451 20.2929 7.70701C20.1054 7.51951 20 7.26519 20 7V4ZM20 20V17C20 16.7348 20.1054 16.4805 20.2929 16.293C20.4805 16.1055 20.7348 16.0002 21 16.0002C21.2652 16.0002 21.5195 16.1055 21.7071 16.293C21.8946 16.4805 22 16.7348 22 17V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H17C16.7348 22 16.4805 21.8946 16.293 21.7071C16.1055 21.5195 16.0002 21.2652 16.0002 21C16.0002 20.7348 16.1055 20.4805 16.293 20.2929C16.4805 20.1054 16.7348 20 17 20H20ZM12 14.5C11.6717 14.5 11.3466 14.4353 11.0433 14.3097C10.74 14.1841 10.4644 13.9999 10.2322 13.7678C10.0001 13.5356 9.81594 13.26 9.6903 12.9567C9.56467 12.6534 9.5 12.3283 9.5 12C9.5 11.6717 9.56467 11.3466 9.6903 11.0433C9.81594 10.74 10.0001 10.4644 10.2322 10.2322C10.4644 10.0001 10.74 9.81594 11.0433 9.6903C11.3466 9.56467 11.6717 9.5 12 9.5C12.663 9.5 13.2989 9.76339 13.7678 10.2322C14.2366 10.7011 14.5 11.337 14.5 12C14.5 12.663 14.2366 13.2989 13.7678 13.7678C13.2989 14.2366 12.663 14.5 12 14.5ZM12 12.5C12.1326 12.5 12.2598 12.4473 12.3536 12.3536C12.4473 12.2598 12.5 12.1326 12.5 12C12.5 11.8674 12.4473 11.7402 12.3536 11.6464C12.2598 11.5527 12.1326 11.5 12 11.5C11.8674 11.5 11.7402 11.5527 11.6464 11.6464C11.5527 11.7402 11.5 11.8674 11.5 12C11.5 12.1326 11.5527 12.2598 11.6464 12.3536C11.7402 12.4473 11.8674 12.5 12 12.5Z',
];

const hide = [
  'M13.0384 12.1565V16.2235C13.0213 16.7681 12.5748 17.2007 12.0299 17.2007C11.485 17.2007 11.0386 16.7681 11.0214 16.2235V12.1895V12.1565C9.98553 12.0881 8.95945 11.9131 7.95942 11.6345L4.63942 14.9555C4.24564 15.3498 3.60675 15.3502 3.21242 14.9565C2.81809 14.5627 2.81764 13.9238 3.21142 13.5295L5.86142 10.8795C4.16901 10.1224 2.63013 9.06073 1.32142 7.74745C1.0512 7.49584 0.940005 7.11672 1.03149 6.75901C1.12298 6.4013 1.40255 6.12213 1.76038 6.03114C2.11822 5.94016 2.49718 6.05189 2.74842 6.32245C5.20494 8.79141 8.54557 10.1773 12.0284 10.1725C15.5564 10.1725 18.8604 8.77445 21.3044 6.32845C21.5569 6.06287 21.9336 5.95508 22.2884 6.04686C22.6432 6.13865 22.9203 6.41558 23.0123 6.7703C23.1044 7.12502 22.9968 7.50176 22.7314 7.75445C21.4239 9.06462 19.8871 10.1238 18.1974 10.8795L20.8474 13.5295C21.2247 13.9262 21.2167 14.5514 20.8294 14.9384C20.4421 15.3254 19.8169 15.333 19.4204 14.9555L16.1004 11.6355C15.1094 11.9105 14.0844 12.0875 13.0374 12.1555L13.0384 12.1565Z',
];

const display = [
  'M20.41 11.536C19.7483 10.8368 19.0313 10.1921 18.266 9.608C16.146 7.98 13.951 7 12 7C10.049 7 7.853 7.98 5.733 9.606C4.96801 10.19 4.25136 10.8348 3.59 11.534C3.34585 11.7967 3.34584 12.2033 3.58999 12.466C4.25208 13.1649 4.96941 13.8093 5.735 14.393C7.855 16.02 10.05 17 12.003 17C13.954 17 16.149 16.02 18.269 14.395C19.0333 13.8113 19.7493 13.1668 20.41 12.468C20.4106 12.4674 20.4111 12.4668 20.4117 12.4662C20.6554 12.2037 20.6547 11.7975 20.41 11.536ZM12 5C16.416 5 22.997 10.05 23 12.001C23.003 13.953 16.42 19.001 12.003 19C7.586 19 1.003 13.953 1 12.001C0.997002 10.05 7.583 5 12 5ZM12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z',
];

// const info = [
//   'M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8ZM12 19C12.5523 19 13 18.5523 13 18V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V18C11 18.5523 11.4477 19 12 19Z',
// ];

const pcAttentionCircleFill = [
  'M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16ZM12 5C12.5523 5 13 5.44772 13 6V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V6C11 5.44772 11.4477 5 12 5Z',
];

const success = [
  'M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6.34315 13.8284L8.46305 15.9483C9.24511 16.7304 10.5122 16.7304 11.2943 15.9483L17.6569 9.58579C18.0472 9.19546 18.0472 8.5619 17.6569 8.17157C17.2665 7.78125 16.633 7.78125 16.2426 8.17157L10.5872 13.827C10.1962 14.218 9.56119 14.218 9.17016 13.827L7.75736 12.4142C7.36704 12.0239 6.73347 12.0239 6.34315 12.4142C5.95282 12.8045 5.95282 13.4381 6.34315 13.8284Z',
];

const danger = [
  'M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM9.7845 8.38125C9.39221 8.07623 8.82498 8.10396 8.46449 8.46444C8.07397 8.85497 8.07397 9.48813 8.46449 9.87866L10.5846 11.9995L8.46449 14.1213L8.3813 14.2155C8.07628 14.6078 8.10401 15.175 8.46449 15.5355C8.85502 15.926 9.48818 15.926 9.87871 15.5355L11.9996 13.4136L14.1213 15.5355L14.2156 15.6187C14.6078 15.9237 15.1751 15.896 15.5356 15.5355C15.9261 15.145 15.9261 14.5118 15.5356 14.1213L13.4136 11.9995L15.5356 9.87866L15.6187 9.78445C15.9238 9.39216 15.896 8.82493 15.5356 8.46444C15.145 8.07392 14.5119 8.07392 14.1213 8.46444L11.9996 10.5845L9.87871 8.46444L9.7845 8.38125Z',
];

const angleDoubleLeft = [
  'M11.3871 5.2097C11.7794 4.90468 12.3466 4.93241 12.7071 5.29289L12.7903 5.3871C13.0953 5.77939 13.0676 6.34662 12.7071 6.70711L8.12205 11.2928C7.7317 11.6835 7.7317 12.3165 8.12205 12.7072L12.7071 17.2929L12.7903 17.3871C13.0953 17.7794 13.0676 18.3466 12.7071 18.7071C12.3166 19.0976 11.6834 19.0976 11.2929 18.7071L5.29289 12.7071L5.2097 12.6129C4.90468 12.2206 4.93241 11.6534 5.29289 11.2929L11.2929 5.29289L11.3871 5.2097ZM17.3871 5.2097C17.7794 4.90468 18.3466 4.93241 18.7071 5.29289L18.7903 5.3871C19.0953 5.77939 19.0676 6.34662 18.7071 6.70711L14.1221 11.2928C13.7317 11.6835 13.7317 12.3165 14.1221 12.7072L18.7071 17.2929L18.7903 17.3871C19.0953 17.7794 19.0676 18.3466 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L11.2929 12.7071L11.2097 12.6129C10.9047 12.2206 10.9324 11.6534 11.2929 11.2929L17.2929 5.29289L17.3871 5.2097Z',
];

const angleDoubleRight = [
  'M11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L18.7071 11.2929L18.7903 11.3871C19.0953 11.7794 19.0676 12.3466 18.7071 12.7071L12.7071 18.7071L12.6129 18.7903C12.2206 19.0953 11.6534 19.0676 11.2929 18.7071L11.2097 18.6129C10.9047 18.2206 10.9324 17.6534 11.2929 17.2929L15.8779 12.7072C16.2683 12.3165 16.2683 11.6835 15.8779 11.2928L11.2929 6.70711L11.2097 6.6129C10.9047 6.22061 10.9324 5.65338 11.2929 5.29289ZM5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12.7071 11.2929L12.7903 11.3871C13.0953 11.7794 13.0676 12.3466 12.7071 12.7071L6.70711 18.7071L6.6129 18.7903C6.22061 19.0953 5.65338 19.0676 5.29289 18.7071L5.2097 18.6129C4.90468 18.2206 4.93241 17.6534 5.29289 17.2929L9.87795 12.7072C10.2683 12.3165 10.2683 11.6835 9.87795 11.2928L5.29289 6.70711L5.2097 6.6129C4.90468 6.22061 4.93241 5.65338 5.29289 5.29289Z',
];

const calendar1 = [
  <path
    key={'calendar'}
    fillRule='evenodd'
    clipRule='evenodd'
    d='M17 1C17.5523 1 18 1.44772 18 2V3H21C22.1046 3 23 3.89543 23 5V20C23 21.1046 22.1046 22 21 22H3C1.89543 22 1 21.1046 1 20V5C1 3.89543 1.89543 3 3 3H6V2C6 1.44772 6.44772 1 7 1C7.55228 1 8 1.44772 8 2V3H16V2C16 1.44772 16.4477 1 17 1ZM21 10H3V20H21V10ZM7 16C7.82843 16 8.5 16.6716 8.5 17.5C8.5 18.3284 7.82843 19 7 19C6.17157 19 5.5 18.3284 5.5 17.5C5.5 16.6716 6.17157 16 7 16ZM12 16C12.8284 16 13.5 16.6716 13.5 17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5C10.5 16.6716 11.1716 16 12 16ZM17 16C17.8284 16 18.5 16.6716 18.5 17.5C18.5 18.3284 17.8284 19 17 19C16.1716 19 15.5 18.3284 15.5 17.5C15.5 16.6716 16.1716 16 17 16ZM7 11C7.82843 11 8.5 11.6716 8.5 12.5C8.5 13.3284 7.82843 14 7 14C6.17157 14 5.5 13.3284 5.5 12.5C5.5 11.6716 6.17157 11 7 11ZM12 11C12.8284 11 13.5 11.6716 13.5 12.5C13.5 13.3284 12.8284 14 12 14C11.1716 14 10.5 13.3284 10.5 12.5C10.5 11.6716 11.1716 11 12 11ZM17 11C17.8284 11 18.5 11.6716 18.5 12.5C18.5 13.3284 17.8284 14 17 14C16.1716 14 15.5 13.3284 15.5 12.5C15.5 11.6716 16.1716 11 17 11ZM6 5H3V8H21V5H18C18 5.55228 17.5523 6 17 6C16.4477 6 16 5.55228 16 5H8C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5Z'
  />,
];
const radioChecked = [
  <path
    key={'radioChecked'}
    fillRule='evenodd'
    clipRule='evenodd'
    d='M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z'
  />,
];

const radioUnChecked = [
  <path
    key={'radioUnChecked'}
    fillRule='evenodd'
    clipRule='evenodd'
    d='M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1Z'
  />,
];

const close = [
  <path
    key={'close'}
    d='M4.6129 3.2097L4.70711 3.29289L12 10.585L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0676 3.65338 21.0953 4.22061 20.7903 4.6129L20.7071 4.70711L13.415 12L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3466 21.0676 19.7794 21.0953 19.3871 20.7903L19.2929 20.7071L12 13.415L4.70711 20.7071C4.31658 21.0976 3.68342 21.0976 3.29289 20.7071C2.93241 20.3466 2.90468 19.7794 3.2097 19.3871L3.29289 19.2929L10.585 12L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289C3.65338 2.93241 4.22061 2.90468 4.6129 3.2097Z'
  />,
];

const file = [
  <path
    key={'file'}
    d='M16 2L22 7.5V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H16ZM15.2 4H5C4.48716 4 4.06449 4.38604 4.00673 4.88338L4 5V19C4 19.5128 4.38604 19.9355 4.88338 19.9933L5 20H19C19.5128 20 19.9355 19.614 19.9933 19.1166L20 19V8.4L15.2 4ZM13.1111 15C13.602 15 14 15.4477 14 16C14 16.5128 13.6569 16.9355 13.2148 16.9933L13.1111 17H6.88889C6.39797 17 6 16.5523 6 16C6 15.4872 6.34315 15.0645 6.78523 15.0067L6.88889 15H13.1111ZM17.0769 10C17.5867 10 18 10.4477 18 11C18 11.5128 17.6437 11.9355 17.1846 11.9933L17.0769 12H6.92308C6.41328 12 6 11.5523 6 11C6 10.4872 6.35635 10.0645 6.81543 10.0067L6.92308 10H17.0769Z'
  />,
];

const del = [
  <path
    key={'del'}
    fillRule='evenodd'
    clipRule='evenodd'
    d='M14.0525 2C14.4425 2 14.797 2.22679 14.9604 2.58094L16.076 4.999L20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5L7.923 4.999L9.03957 2.58094C9.20302 2.22679 9.55747 2 9.94753 2H14.0525ZM16.1423 7.00015L7.858 7L7.75838 7.00673C7.2993 7.06005 6.93505 7.4243 6.88173 7.88338L6.875 8V19.2222C6.875 19.7351 7.26104 20.1577 7.75838 20.2155L7.875 20.2222H16.125C16.6378 20.2222 17.0605 19.8362 17.1183 19.3388L17.125 19.2222V8C17.125 7.4535 16.6866 7.00939 16.1423 7.00015ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10ZM13.486 4H10.5089C10.3839 4 10.2648 4.04668 10.1737 4.12897L10.111 4.1972L9.88052 4.5C9.83926 4.55421 9.81692 4.62046 9.81692 4.68859C9.81692 4.83601 9.91935 4.9595 10.0569 4.99178L10.1283 5H13.8697C13.9382 5 14.0047 4.97742 14.0589 4.93577C14.1757 4.8462 14.2112 4.69006 14.1532 4.56153L14.1163 4.5L13.8827 4.1956C13.7881 4.07229 13.6415 4 13.486 4Z'
  />,
];

const ireturn = [
  'M7.20702 9.79292C7.5675 10.1534 7.59522 10.7206 7.29019 11.1129L7.207 11.2071C6.84651 11.5676 6.27928 11.5953 5.88699 11.2903L5.79278 11.2071L2.29288 7.70711C2.25484 7.66908 2.22054 7.62879 2.18995 7.5867C2.17548 7.56659 2.16126 7.54536 2.14785 7.52359C2.14086 7.51251 2.13445 7.50164 2.12827 7.49068C2.1164 7.46937 2.10484 7.44697 2.09412 7.4241C2.08688 7.40894 2.08035 7.39401 2.0742 7.37896C2.0665 7.35996 2.0592 7.34043 2.0525 7.32062C2.0466 7.30329 2.04118 7.28562 2.03626 7.26784C2.03061 7.24742 2.02557 7.2267 2.02118 7.20575C2.01805 7.19068 2.01528 7.17566 2.01284 7.1606C2.00957 7.14048 2.00687 7.11973 2.00482 7.09878C2.00225 7.07259 2.00072 7.04657 2.0002 7.02054C2.00007 7.01361 2 7.00682 2 7.00002L2.00004 6.99059C2.00028 6.96616 2.0014 6.94175 2.00341 6.91741L2 7.00002C2 6.95394 2.00312 6.90858 2.00915 6.86416C2.01177 6.84557 2.01486 6.82687 2.01847 6.80826C2.02191 6.79005 2.02591 6.77214 2.03038 6.75442C2.03547 6.73462 2.04111 6.71483 2.04736 6.69519C2.0528 6.67801 2.05875 6.66102 2.06514 6.64425C2.07174 6.62683 2.07876 6.60977 2.08627 6.59288C2.09441 6.57484 2.10293 6.5572 2.11193 6.53985C2.11958 6.52474 2.12804 6.50938 2.13693 6.49422C2.1487 6.47459 2.16074 6.45561 2.17339 6.43707C2.18153 6.42473 2.19041 6.41232 2.19961 6.40008C2.21368 6.38171 2.22796 6.364 2.24281 6.34679C2.24857 6.3399 2.25464 6.33309 2.26081 6.32634L2.27239 6.31402C2.29136 6.29391 2.31115 6.27458 2.33172 6.2561L2.3492 6.24077L5.8491 3.24077C6.26842 2.88134 6.89972 2.9299 7.25915 3.34922C7.59093 3.73628 7.57508 4.30397 7.24087 4.67171L7.1507 4.75927L5.703 6L14.4969 6.00002C18.4758 6.00002 21.8394 9.2348 21.9944 13.2111C22.1552 17.3326 18.8314 20.8644 14.7341 20.9962L14.4969 21H5.9992C5.44692 21 4.9992 20.5523 4.9992 20C4.9992 19.4872 5.38524 19.0645 5.88258 19.0067L5.9992 19H14.4969C17.5678 19 20.1155 16.3548 19.996 13.289C19.8856 10.4588 17.5241 8.11965 14.7139 8.00446L14.4969 8.00002L5.415 8L7.20702 9.79292Z',
];

const add = [
  'M12.0317 4C12.5445 4.00067 12.9667 4.38727 13.0238 4.88468L13.0303 5.00131L13.022 11H19C19.5523 11 20 11.4477 20 12C20 12.5128 19.614 12.9355 19.1166 12.9933L19 13H13.02L13.012 19.0013C13.0113 19.5536 12.563 20.0007 12.0107 20C11.4979 19.9993 11.0757 19.6127 11.0186 19.1153L11.012 18.9987L11.02 13H5C4.44772 13 4 12.5523 4 12C4 11.4872 4.38604 11.0645 4.88338 11.0067L5 11H11.022L11.0304 4.99869C11.0311 4.44641 11.4794 3.99928 12.0317 4Z',
];

const more = [
  'M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10ZM19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10Z',
];

const warningSimple = [
  <path
    key='warning'
    fillRule='evenodd'
    clipRule='evenodd'
    d='M12 3C11.4477 3 11 3.44772 11 4V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V4C13 3.44772 12.5523 3 12 3ZM12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19Z'
  />,
];

const check = [
  <path
    key='check'
    fillRule='evenodd'
    clipRule='evenodd'
    d='M2.29274 13.0709L7.94818 18.7264C8.73024 19.5084 9.99738 19.5084 10.7794 18.7264L22.7988 6.70696C23.1892 6.31663 23.1892 5.68307 22.7988 5.29274C22.4085 4.90242 21.7749 4.90242 21.3846 5.29274L10.0723 16.605C9.6813 16.9961 9.04632 16.9961 8.65529 16.605L3.70696 11.6567C3.31663 11.2664 2.68307 11.2664 2.29274 11.6567C1.90242 12.047 1.90242 12.6806 2.29274 13.0709Z'
  />,
];

const pcStarFill = [
  <path
    key='star'
    d='M8.27612 7.825L1.85661 8.7559L1.7429 8.77878C1.00773 8.96968 0.736981 9.90915 1.30105 10.4606L5.95312 15.008L4.84243 21.3268L4.82923 21.4327C4.773 22.2003 5.59427 22.7575 6.29775 22.3824L11.9991 19.343L17.7025 22.3825L17.799 22.4279C18.5106 22.7194 19.2949 22.1128 19.1579 21.3281L18.0541 15.008L22.6998 10.46L22.7781 10.3745C23.2587 9.78723 22.9243 8.86973 22.1444 8.75601L15.7581 7.825L12.8952 2.05544C12.5266 1.31273 11.4662 1.31545 11.1014 2.06004L8.27612 7.825Z'
  />,
];

const odecShrink = [
  <path
    key='odec-shrink'
    fillRule='evenodd'
    clipRule='evenodd'
    d='M19.5 2C20.8807 2 22 3.11929 22 4.5V19.5C22 20.8807 20.8807 22 19.5 22H4.5C3.11929 22 2 20.8807 2 19.5V4.5C2 3.11929 3.11929 2 4.5 2H19.5ZM19.5 4H4.5C4.22386 4 4 4.22386 4 4.5V19.5C4 19.7761 4.22386 20 4.5 20H19.5C19.7761 20 20 19.7761 20 19.5V4.5C20 4.22386 19.7761 4 19.5 4ZM12 7C12.5128 7 12.9355 7.38604 12.9933 7.88338L13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H13V16C13 16.5523 12.5523 17 12 17C11.4872 17 11.0645 16.614 11.0067 16.1166L11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H11V8C11 7.44772 11.4477 7 12 7Z'
  />,
];

const expand = [
  <path
    key={0}
    fillRule='evenodd'
    clipRule='evenodd'
    d='M22 4.5C22 3.11929 20.8807 2 19.5 2H4.5C3.11929 2 2 3.11929 2 4.5V19.5C2 20.8807 3.11929 22 4.5 22H19.5C20.8807 22 22 20.8807 22 19.5V4.5ZM4.5 4H19.5C19.7761 4 20 4.22386 20 4.5V19.5C20 19.7761 19.7761 20 19.5 20H4.5C4.22386 20 4 19.7761 4 19.5V4.5C4 4.22386 4.22386 4 4.5 4ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z'
  />,
];

const treeArrow = [
  'M18.2209 9.72141L12.6344 15.2952C12.2441 15.6847 11.6121 15.6846 11.2218 15.2952L5.6979 9.78337C5.30695 9.39327 5.30625 8.76011 5.69635 8.36915C5.88258 8.18251 6.13499 8.07697 6.39865 8.0755L17.5091 8.01351C18.0613 8.01043 18.5116 8.45564 18.5146 9.00792C18.5161 9.27546 18.4103 9.53244 18.2209 9.72141Z',
];

const treePlus = [
  'M19.5 2C20.8807 2 22 3.11929 22 4.5V19.5C22 20.8807 20.8807 22 19.5 22H4.5C3.11929 22 2 20.8807 2 19.5V4.5C2 3.11929 3.11929 2 4.5 2H19.5ZM19.5 4H4.5C4.22386 4 4 4.22386 4 4.5V19.5C4 19.7761 4.22386 20 4.5 20H19.5C19.7761 20 20 19.7761 20 19.5V4.5C20 4.22386 19.7761 4 19.5 4ZM12 7C12.5128 7 12.9355 7.38604 12.9933 7.88338L13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H13V16C13 16.5523 12.5523 17 12 17C11.4872 17 11.0645 16.614 11.0067 16.1166L11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H11V8C11 7.44772 11.4477 7 12 7Z',
];

const treeMinus = [
  'M22 4.5C22 3.11929 20.8807 2 19.5 2H4.5C3.11929 2 2 3.11929 2 4.5V19.5C2 20.8807 3.11929 22 4.5 22H19.5C20.8807 22 22 20.8807 22 19.5V4.5ZM4.5 4H19.5C19.7761 4 20 4.22386 20 4.5V19.5C20 19.7761 19.7761 20 19.5 20H4.5C4.22386 20 4 19.7761 4 19.5V4.5C4 4.22386 4.22386 4 4.5 4ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z',
];

const pcHelpCircleFill = [
  'M11 0C13.9562 0 16.7292 1.17289 18.7782 3.22183C20.8271 5.27079 22 8.04381 22 11C22 13.9562 20.8271 16.7292 18.7782 18.7782C16.7292 20.8271 13.9562 22 11 22C8.04381 22 5.27079 20.8271 3.22182 18.7782C1.17289 16.7292 0 13.9562 0 11C0 8.04381 1.17289 5.27079 3.22183 3.22182C5.27079 1.17289 8.04381 0 11 0ZM11 15.3125C10.3097 15.3125 9.75 15.8721 9.75 16.5625C9.75 17.2528 10.3097 17.8125 11 17.8125C11.6903 17.8125 12.25 17.2528 12.25 16.5625C12.25 15.8721 11.6903 15.3125 11 15.3125ZM11 4.31245C8.79086 4.31245 7 6.10332 7 8.31245C7 8.86474 7.44772 9.31245 8 9.31245C8.55229 9.31245 9 8.86474 9 8.31245C9 7.20789 9.89543 6.31245 11 6.31245C12.1046 6.31245 13 7.20789 13 8.31245C13 9.41702 12.1046 10.3125 11 10.3125L10.8834 10.3192C10.386 10.3769 10 10.7996 10 11.3125V13.3125L10.0067 13.4291C10.0645 13.9264 10.4872 14.3125 11 14.3125L11.1166 14.3057C11.614 14.248 12 13.8253 12 13.3125V12.185L12.1553 12.1431C13.8012 11.6474 15 10.1199 15 8.31245C15 6.10332 13.2091 4.31245 11 4.31245Z',
];

const search = [
  'M11 2C15.9706 2 20 6.02944 20 11C20 13.1248 19.2637 15.0776 18.0323 16.6172L21.1213 19.7071C21.5118 20.0976 21.5118 20.7308 21.1213 21.1213C20.7308 21.5118 20.0976 21.5118 19.7071 21.1213L16.6172 18.0323C15.0776 19.2637 13.1248 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2ZM11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z',
];

const Icons = {
  TableSortIconUp,
  TableSortIconDown,
  OdecShrink: icon(odecShrink),
  Expand: icon(expand),
  Search: icon(search),
  ArrowLeft: icon(arrowLeft),
  ArrowLeftDouble: icon(arrowLeftDouble),
  ArrowRight: icon(arrowRight),
  ArrowRightDouble: icon(arrowRightDouble),
  Delete: icon(del),
  Add: icon(add),

  More: icon(more),

  Calendar1: icon(calendar1),

  RadioUnChecked: icon(radioUnChecked),
  RadioChecked: icon(radioChecked),

  Display: icon(display),
  Hide: icon(hide),
  AngleDoubleLeft: icon(angleDoubleLeft),
  AngleDoubleRight: icon(angleDoubleRight),

  ArrowDown: icon(arrowDown),
  PcArrowFillDown: icon(caretFill),
  PcHelpCircleFill: icon(pcHelpCircleFill),
  PcInfoCircleFill: icon(pcAttentionCircleFill),
  PcCloseCircleFill: icon(danger),
  PcWarningCircleFill: icon(pcAttentionCircleFill),
  PcCheckCircleFill: icon(success),

  Warning: icon(warningSimple),
  Check: icon(check),
  Close: icon(close),

  CloseOpaqueMultic1: icon(closeCircle),
  Pics2: icon(imageCount),
  LoadingError2: icon(imageError),
  Download: icon(imageDownload),
  Preview: icon(imagePreview),
  Time: icon(clock),
  File: icon(file),
  Return: icon(ireturn),
  UndeleteOpaque: icon(recoverCircle),
  PcStarFill: icon(pcStarFill),
  TreeArrow: icon(treeArrow),
  TreePlus: icon(treePlus),
  TreeMinus: icon(treeMinus),
};

export default Icons;
