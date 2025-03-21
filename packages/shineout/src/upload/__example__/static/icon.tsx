import React from 'react';
import { icons } from 'shineout';

interface IconProps {
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

const UploadIcon = (props: IconProps) => (
  <svg
    width={props.fontSize || 14}
    height={props.fontSize || 14}
    style={props.style}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.00195 12.9061C3.55424 12.9061 4.00195 13.3538 4.00195 13.9061V18.9061C4.00195 19.4584 4.44967 19.9061 5.00195 19.9061H19.002C19.5542 19.9061 20.002 19.4584 20.002 18.9061V13.9061C20.002 13.3538 20.4497 12.9061 21.002 12.9061C21.5542 12.9061 22.002 13.3538 22.002 13.9061V19.9061C22.002 21.0106 21.1065 21.9061 20.002 21.9061H4.00195C2.89738 21.9061 2.00195 21.0106 2.00195 19.9061V13.9061C2.00195 13.3538 2.44967 12.9061 3.00195 12.9061Z'
    ></path>
    <path
      fill='currentColor'
      d='M13.0039 5.38576V16.9061C13.0039 17.4584 12.5562 17.9061 12.0039 17.9061C11.4516 17.9061 11.0039 17.4584 11.0039 16.9061V5.38576L6.96361 9.4264C6.57702 9.81303 5.9502 9.81304 5.56359 9.42643C5.177 9.03984 5.177 8.41306 5.56358 8.02646L11.2968 2.29291C11.6873 1.90237 12.3205 1.90236 12.7111 2.2929L18.4446 8.02646C18.8312 8.41306 18.8312 9.03985 18.4446 9.42645C18.058 9.81305 17.4311 9.81305 17.0445 9.42645L13.0039 5.38576Z'
    ></path>
  </svg>
);

const AddIcon = (props: IconProps) => (
  <svg
    width={props.fontSize || 20}
    height={props.fontSize || 20}
    style={props.style}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10.0263 3.33484C10.4537 3.3354 10.8055 3.65756 10.8531 4.07207L10.8585 4.16927L10.8516 9.16817H15.8333C16.2935 9.16817 16.6666 9.54127 16.6666 10.0015C16.6666 10.4289 16.3449 10.7811 15.9304 10.8292L15.8333 10.8348H10.8499L10.8433 15.8359C10.8426 16.2962 10.4691 16.6688 10.0088 16.6682C9.58146 16.6676 9.22966 16.3455 9.18207 15.9309L9.17659 15.8337L9.18325 10.8348H4.16659C3.70635 10.8348 3.33325 10.4617 3.33325 10.0015C3.33325 9.57414 3.65495 9.22192 4.0694 9.17378L4.16659 9.16817H9.18492L9.19188 4.16708C9.19248 3.70684 9.56607 3.33424 10.0263 3.33484Z'
      fill='currentColor'
    />
  </svg>
);

const ImageIcon = (props: IconProps) => (
  <svg
    width={props.fontSize || 20}
    height={props.fontSize || 20}
    style={props.style}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3 21C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3H21C22.1046 3 23 3.89543 23 5V19C23 20.1046 22.1046 21 21 21H3ZM13.9471 12.042C13.5261 11.7213 12.9281 11.7842 12.583 12.1855L10.7002 14.3748C10.3326 14.8019 9.69133 14.8619 9.25032 14.5105L8.06047 13.5625C7.66313 13.2459 7.09157 13.2776 6.73163 13.6361L3.09524 17.2581V18C3.09524 18.4084 3.34007 18.7596 3.69098 18.9149H20.309C20.626 18.7746 20.8565 18.4744 20.898 18.1166L20.9048 18V17.3416L13.9471 12.042ZM19.9048 5H4.09524C3.5824 5 3.15973 5.38604 3.10197 5.88338L3.09524 6L3.095 14.306L6.54494 10.8709C6.89094 10.5262 7.42472 10.4697 7.83235 10.7185L7.94016 10.7939L9.01459 11.6503C9.43496 11.9854 10.045 11.9282 10.3957 11.5208L12.2522 9.36442C12.614 8.94402 13.2424 8.87827 13.684 9.21461L20.904 14.714L20.9048 6C20.9048 5.44772 20.457 5 19.9048 5ZM6 6C7.10455 6 8 6.89545 8 8C8 9.10455 7.10455 10 6 10C4.89545 10 4 9.10455 4 8C4 6.89545 4.89545 6 6 6ZM6 7.71429C5.84219 7.71429 5.71429 7.84219 5.71429 8C5.71429 8.15781 5.84219 8.28571 6 8.28571C6.15781 8.28571 6.28571 8.15781 6.28571 8C6.28571 7.84219 6.15781 7.71429 6 7.71429Z'
      fill='currentColor'
    />
  </svg>
);

const FielWordIcon = (props: IconProps) => (
  <svg
    width={props.fontSize || 20}
    height={props.fontSize || 20}
    style={Object.assign({ display: 'block' }, props.style)}
    viewBox='0 0 24 24'
  >
    <path d='M15.1184 1.08377C15.6814 1.08377 16.2184 1.32112 16.5974 1.73752L20.4814 6.00468C20.8166 6.37293 21.0024 6.85298 21.0024 7.35093V20.9095C21.0024 22.0141 20.1069 22.9095 19.0024 22.9095L5.00195 22.9163C3.89738 22.9163 3.00195 22.0208 3.00195 20.9163V3.08374C3.00195 1.97917 3.89738 1.08374 5.00195 1.08374L15.1184 1.08377ZM15.5015 3.42957C15.3115 3.20997 15.0355 3.08377 14.7451 3.08377L6.00195 3.08374C5.48912 3.08374 5.06645 3.46978 5.00868 3.96712L5.00195 4.08374V19.9163C5.00195 20.4291 5.38799 20.8518 5.88533 20.9095L6.00195 20.9163L18.0024 20.9095C18.5152 20.9095 18.9379 20.5235 18.9956 20.0262L19.0024 19.9095V7.84949C19.0024 7.60924 18.9159 7.37701 18.7587 7.1953L15.5015 3.42957Z'></path>
    <path d='M16.0022 16V8.00001H14.0022V13L12.0022 11L10.0022 13V8.00001H8.00216V16H10.0022L12.0022 14L14.0022 16H16.0022Z'></path>
  </svg>
);

const FilePdfIcon = (props: IconProps) => (
  <svg
    width={props.fontSize || 20}
    height={props.fontSize || 20}
    style={Object.assign({ display: 'block' }, props.style)}
    viewBox='0 0 24 24'
  >
    <path d='M15.1184 1.08377C15.6814 1.08377 16.2184 1.32112 16.5974 1.73752L20.4814 6.00468C20.8166 6.37293 21.0024 6.85298 21.0024 7.35093V20.9095C21.0024 22.0141 20.1069 22.9095 19.0024 22.9095L5.00195 22.9163C3.89738 22.9163 3.00195 22.0208 3.00195 20.9163V3.08374C3.00195 1.97917 3.89738 1.08374 5.00195 1.08374L15.1184 1.08377ZM15.5015 3.42957C15.3115 3.20997 15.0355 3.08377 14.7451 3.08377L6.00195 3.08374C5.48912 3.08374 5.06645 3.46978 5.00868 3.96712L5.00195 4.08374V19.9163C5.00195 20.4291 5.38799 20.8518 5.88533 20.9095L6.00195 20.9163L18.0024 20.9095C18.5152 20.9095 18.9379 20.5235 18.9956 20.0262L19.0024 19.9095V7.84949C19.0024 7.60924 18.9159 7.37701 18.7587 7.1953L15.5015 3.42957Z'></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.6563 6.58395C11.1041 6.58395 10.6596 7.03264 10.6006 7.58176C10.4572 8.91481 10.0436 10.3716 9.43137 11.7374C8.82757 13.0843 8.05901 14.2797 7.23314 15.1524C6.86511 15.5413 6.78083 16.1438 7.09686 16.576L7.14588 16.6431C7.46191 17.0753 8.06112 17.1797 8.51741 16.8996C10.9397 15.4122 13.544 14.4004 16.105 14.4931C16.6222 14.5119 17.106 14.1882 17.2249 13.6845L17.2626 13.5247C17.3816 13.0211 17.0925 12.5161 16.6283 12.2873C14.6981 11.3358 13.1741 9.47865 12.7649 7.57609C12.6488 7.03615 12.2086 6.58395 11.6563 6.58395ZM11.9601 10.7125C11.7606 11.3403 11.5237 11.9592 11.2563 12.5556C11.1115 12.8788 10.9563 13.1983 10.7916 13.5116C11.7229 13.1436 12.6847 12.8551 13.6665 12.6793C13.0117 12.1022 12.4317 11.4371 11.9601 10.7125Z'
    ></path>
  </svg>
);

const FileIcon = (props: IconProps) => (
  <div style={Object.assign({ display: 'flex', width: props.fontSize || 20, height: props.fontSize || 20 }, props.style)}>
    {icons.File}
  </div>
);

export { UploadIcon, AddIcon, ImageIcon, FielWordIcon, FilePdfIcon, FileIcon };
