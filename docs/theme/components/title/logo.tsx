import useStyles from '../style';

const HeaderLogo = (props: { moveRatio: [number, number] }) => {
  const { moveRatio } = props;
  const classes = useStyles();

  const [xRatio, yRatio] = moveRatio;

  const baseSizeY = 10;
  const baseSizeX = 30;

  return (
    <div className={classes.headerLogo}>
      <svg
        className={classes.headerLogoBg}
        width='737'
        height='206'
        viewBox='0 0 737 206'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_4800_10557)'>
          <rect width='737' height='206' fill='url(#paint0_linear_4800_10557)' />
          <g opacity='0.13' filter='url(#filter0_f_4800_10557)'>
            <circle cx='665' cy='256' r='195' fill='#6BB5FF' />
          </g>
          <g filter='url(#filter1_f_4800_10557)'>
            <ellipse cx='610.5' cy='305.5' rx='249.5' ry='145.5' fill='white' />
          </g>
          <g filter='url(#filter2_ii_4800_10557)'>
            <circle cx='545.5' cy='38.5' r='8.5' fill='white' />
          </g>
          <g opacity='0.5' filter='url(#filter3_iif_4800_10557)'>
            <circle cx='719' cy='178' r='28' fill='white' />
          </g>
          <g opacity='0.4' filter='url(#filter4_iif_4800_10557)'>
            <circle cx='399.5' cy='109.5' r='13.5' fill='white' />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_f_4800_10557'
            x='366'
            y='-43'
            width='598'
            height='598'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='52' result='effect1_foregroundBlur_4800_10557' />
          </filter>
          <filter
            id='filter1_f_4800_10557'
            x='257'
            y='56'
            width='707'
            height='499'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='52' result='effect1_foregroundBlur_4800_10557' />
          </filter>
          <filter
            id='filter2_ii_4800_10557'
            x='534'
            y='27'
            width='20'
            height='21'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-3' dy='-3' />
            <feGaussianBlur stdDeviation='4.5' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.419608 0 0 0 0 0.709804 0 0 0 0 1 0 0 0 0.4 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow_4800_10557' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='1' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_4800_10557'
              result='effect2_innerShadow_4800_10557'
            />
          </filter>
          <filter
            id='filter3_iif_4800_10557'
            x='676'
            y='135'
            width='86'
            height='86'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-9' dy='-13' />
            <feGaussianBlur stdDeviation='9' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.419608 0 0 0 0 0.709804 0 0 0 0 1 0 0 0 0.4 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow_4800_10557' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='11' />
            <feGaussianBlur stdDeviation='7' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_4800_10557'
              result='effect2_innerShadow_4800_10557'
            />
            <feGaussianBlur stdDeviation='7.5' result='effect3_foregroundBlur_4800_10557' />
          </filter>
          <filter
            id='filter4_iif_4800_10557'
            x='377'
            y='83'
            width='40'
            height='51'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-9' dy='-13' />
            <feGaussianBlur stdDeviation='9' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.419608 0 0 0 0 0.709804 0 0 0 0 1 0 0 0 0.4 0'
            />
            <feBlend mode='normal' in2='shape' result='effect1_innerShadow_4800_10557' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='11' />
            <feGaussianBlur stdDeviation='7' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_4800_10557'
              result='effect2_innerShadow_4800_10557'
            />
            <feGaussianBlur stdDeviation='2' result='effect3_foregroundBlur_4800_10557' />
          </filter>
          <linearGradient
            id='paint0_linear_4800_10557'
            x1='235.778'
            y1='103'
            x2='737'
            y2='103'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#F2F8FF' />
          </linearGradient>
          <clipPath id='clip0_4800_10557'>
            <rect width='737' height='206' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <div
        style={{
          transition: 'all 0.2s ease',
          transform: `translateY(${baseSizeY * yRatio}px) translateX(${baseSizeX * xRatio}px)`,
        }}
      >
        <svg
          style={{}}
          className={classes.headerLogoTop}
          width='200'
          height='183'
          viewBox='0 0 200 183'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_dii_4800_11873)'>
            <path
              d='M163.862 0.955032C166.58 -0.0814437 169.461 2.03862 169.279 4.94228L167.739 29.5663C166.468 49.8735 153.447 67.5647 134.435 74.8135L35.8054 112.418C33.0869 113.455 30.2065 111.335 30.3882 108.431L31.9286 83.8072C33.199 63.4999 46.2204 45.8087 65.2325 38.5599L163.862 0.955032Z'
              fill='#6BB5FF'
            />
          </g>
          <defs>
            <filter
              id='filter0_dii_4800_11873'
              x='0.380127'
              y='-3.31201'
              width='198.907'
              height='185.997'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='40' />
              <feGaussianBlur stdDeviation='15' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.0980392 0 0 0 0 0.478431 0 0 0 0 0.980392 0 0 0 0.12 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_4800_11873'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_4800_11873'
                result='shape'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='-7' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.0980392 0 0 0 0 0.478431 0 0 0 0 0.980392 0 0 0 0.5 0'
              />
              <feBlend mode='normal' in2='shape' result='effect2_innerShadow_4800_11873' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dx='-3' dy='5' />
              <feGaussianBlur stdDeviation='2.5' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0' />
              <feBlend
                mode='normal'
                in2='effect2_innerShadow_4800_11873'
                result='effect3_innerShadow_4800_11873'
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        style={{
          transition: 'all 0.2s ease',
          transform: `translateY(${baseSizeY * yRatio}px) translateX(${baseSizeX * xRatio}px)`,
        }}
      >
        <svg
          className={classes.headerLogoBottom}
          width='200'
          height='184'
          viewBox='0 0 200 184'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_dii_4800_11874)'>
            <path
              d='M165.39 0.373535C167.393 -0.390175 169.515 1.17196 169.381 3.31147L167.739 29.5672C166.468 49.8745 153.447 67.5656 134.435 74.8144L34.2777 113.002C32.2746 113.766 30.1522 112.203 30.2861 110.064L31.9286 83.8082C33.199 63.5009 46.2204 45.8097 65.2325 38.5609L165.39 0.373535Z'
              fill='#197AFA'
            />
          </g>
          <defs>
            <filter
              id='filter0_dii_4800_11874'
              x='0.280273'
              y='-3.82324'
              width='199.107'
              height='187.021'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='40' />
              <feGaussianBlur stdDeviation='15' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.0980392 0 0 0 0 0.478431 0 0 0 0 0.980392 0 0 0 0.12 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_4800_11874'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_4800_11874'
                result='shape'
              />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='-7' />
              <feGaussianBlur stdDeviation='2' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.068 0 0 0 0 0.33184 0 0 0 0 0.68 0 0 0 0.5 0'
              />
              <feBlend mode='normal' in2='shape' result='effect2_innerShadow_4800_11874' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dx='-3' dy='5' />
              <feGaussianBlur stdDeviation='2.5' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0' />
              <feBlend
                mode='normal'
                in2='effect2_innerShadow_4800_11874'
                result='effect3_innerShadow_4800_11874'
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        style={{
          transition: 'all 0.2s ease',
          transform: `translateY(${baseSizeY * yRatio}px) translateX(${baseSizeX * xRatio}px)`,
        }}
      >
        <svg
          className={classes.headerLogoCircle}
          width='53'
          height='53'
          viewBox='0 0 53 53'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_ii_4800_11875)'>
            <circle cx='26.5' cy='26.5' r='26.5' fill='url(#paint0_radial_4800_11875)' />
          </g>
          <defs>
            <filter
              id='filter0_ii_4800_11875'
              x='-8'
              y='-4'
              width='61'
              height='63'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dx='-8' dy='-4' />
              <feGaussianBlur stdDeviation='9.5' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.858398 0 0 0 0 0.277799 0 0 0 0 0.0873627 0 0 0 0.6 0'
              />
              <feBlend mode='normal' in2='shape' result='effect1_innerShadow_4800_11875' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='6' />
              <feGaussianBlur stdDeviation='12' />
              <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
              <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
              <feBlend
                mode='normal'
                in2='effect1_innerShadow_4800_11875'
                result='effect2_innerShadow_4800_11875'
              />
            </filter>
            <radialGradient
              id='paint0_radial_4800_11875'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(9.5 10) rotate(52.8355) scale(38.9005)'
            >
              <stop stopColor='#FFBDA7' />
              <stop offset='1' stopColor='#FF8259' />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default HeaderLogo;
