/**
 * cn - 分级显示
 *    -- 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value
 * en - Array
 *    -- You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported
 */
import React from 'react';
import { Rate } from 'shineout';

const defaultIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.07 1 23 5.93 23 12C23 18.07 18.07 23 12 23C5.93 23 1 18.07 1 12C1 5.93 5.93 1 12 1ZM15.675 14.658H8.508C8.24281 14.658 7.9885 14.7634 7.80099 14.9509C7.61349 15.1385 7.50815 15.3928 7.50815 15.658C7.50815 15.9232 7.61349 16.1775 7.80099 16.3651C7.9885 16.5526 8.24281 16.658 8.508 16.658H15.675C15.8063 16.658 15.9364 16.6322 16.0577 16.5819C16.1791 16.5317 16.2893 16.458 16.3822 16.3652C16.4751 16.2723 16.5488 16.1621 16.599 16.0407C16.6493 15.9194 16.6752 15.7893 16.6752 15.658C16.6752 15.5267 16.6493 15.3966 16.599 15.2753C16.5488 15.1539 16.4751 15.0437 16.3822 14.9508C16.2893 14.858 16.1791 14.7843 16.0577 14.7341C15.9364 14.6838 15.8063 14.658 15.675 14.658ZM7.5 8C6.675 8 6 8.675 6 9.5C6 10.325 6.675 11 7.5 11C8.325 11 9 10.325 9 9.5C9 8.675 8.325 8 7.5 8ZM16.5 8C15.675 8 15 8.656 15 9.5C15 10.325 15.675 11 16.5 11C17.325 11 18 10.325 18 9.5C18 8.675 17.325 8 16.5 8Z'
      fill='#E8EBF0'
    />
  </svg>
);

const cryIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.9995 1.02002C18.0645 1.02002 22.9795 5.93502 22.9795 12C22.9795 18.065 18.0655 22.98 11.9995 22.98C5.93353 22.98 1.01953 18.066 1.01953 12C1.01953 5.93402 5.93353 1.02002 11.9995 1.02002ZM12.1195 12.34C9.16953 12.34 6.51753 13.673 5.36253 15.91C5.27799 16.0915 5.26685 16.2986 5.33144 16.4881C5.39603 16.6776 5.53135 16.8348 5.70913 16.9268C5.88691 17.0189 6.09338 17.0387 6.2854 16.982C6.47742 16.9254 6.64013 16.7968 6.73953 16.623C7.63253 14.895 9.74353 13.903 12.1195 13.903C14.5495 13.903 16.7065 14.909 17.4845 16.593C17.5716 16.7791 17.7288 16.9233 17.9217 16.9941C18.1146 17.0649 18.3277 17.0566 18.5145 16.971C18.7008 16.8841 18.8451 16.727 18.9158 16.5339C18.9865 16.3408 18.9777 16.1277 18.8915 15.941C17.8655 13.72 15.1435 12.34 12.1195 12.34ZM8.97553 8.63502C8.84854 8.63115 8.72234 8.65635 8.60657 8.70869C8.4908 8.76103 8.38852 8.83913 8.30753 8.93702C8.13853 9.15402 7.93053 9.41702 7.46353 9.41702C6.99353 9.41702 6.78753 9.15502 6.62153 8.93902C6.54049 8.84055 6.43796 8.76194 6.32182 8.70925C6.20568 8.65655 6.07901 8.63116 5.95153 8.63502C5.77999 8.62837 5.61049 8.67406 5.46553 8.76602C5.37883 8.82199 5.3047 8.89537 5.24784 8.9815C5.19099 9.06763 5.15265 9.16464 5.13525 9.26637C5.11786 9.36809 5.12179 9.47232 5.1468 9.57245C5.17181 9.67258 5.21735 9.76642 5.28053 9.84802C5.79253 10.512 6.44253 10.981 7.46353 10.981C8.48353 10.981 9.12853 10.513 9.64353 9.85102C9.91353 9.50602 9.86553 9.03802 9.46053 8.76602C9.31571 8.6746 9.14669 8.62895 8.97553 8.63502ZM18.2755 8.63502C18.1484 8.631 18.022 8.65612 17.906 8.70847C17.7901 8.76081 17.6876 8.83899 17.6065 8.93702C17.4375 9.15402 17.2295 9.41702 16.7625 9.41702C16.2925 9.41702 16.0865 9.15502 15.9205 8.93902C15.8395 8.84055 15.737 8.76194 15.6208 8.70925C15.5047 8.65655 15.378 8.63116 15.2505 8.63502C15.079 8.62837 14.9095 8.67406 14.7645 8.76602C14.6778 8.82199 14.6037 8.89537 14.5468 8.9815C14.49 9.06763 14.4516 9.16464 14.4343 9.26637C14.4169 9.36809 14.4208 9.47232 14.4458 9.57245C14.4708 9.67258 14.5163 9.76642 14.5795 9.84802C15.0925 10.512 15.7415 10.981 16.7625 10.981C17.7825 10.981 18.4275 10.513 18.9425 9.85102C19.2125 9.50602 19.1645 9.03802 18.7595 8.76602C18.6147 8.6746 18.4457 8.62895 18.2745 8.63502H18.2755Z'
      fill='#F78C35'
    />
  </svg>
);

const normallyIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.07 1 23 5.93 23 12C23 18.07 18.07 23 12 23C5.93 23 1 18.07 1 12C1 5.93 5.93 1 12 1ZM15.675 14.658H8.508C8.24281 14.658 7.9885 14.7634 7.80099 14.9509C7.61349 15.1385 7.50815 15.3928 7.50815 15.658C7.50815 15.9232 7.61349 16.1775 7.80099 16.3651C7.9885 16.5526 8.24281 16.658 8.508 16.658H15.675C15.8063 16.658 15.9364 16.6322 16.0577 16.5819C16.1791 16.5317 16.2893 16.458 16.3822 16.3652C16.4751 16.2723 16.5488 16.1621 16.599 16.0407C16.6493 15.9194 16.6752 15.7893 16.6752 15.658C16.6752 15.5267 16.6493 15.3966 16.599 15.2753C16.5488 15.1539 16.4751 15.0437 16.3822 14.9508C16.2893 14.858 16.1791 14.7843 16.0577 14.7341C15.9364 14.6838 15.8063 14.658 15.675 14.658ZM7.5 8C6.675 8 6 8.675 6 9.5C6 10.325 6.675 11 7.5 11C8.325 11 9 10.325 9 9.5C9 8.675 8.325 8 7.5 8ZM16.5 8C15.675 8 15 8.656 15 9.5C15 10.325 15.675 11 16.5 11C17.325 11 18 10.325 18 9.5C18 8.675 17.325 8 16.5 8Z'
      fill='#F78C35'
    />
  </svg>
);

const happyIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1ZM17.204 12.355H6.796C6.71831 12.3549 6.64135 12.3701 6.56953 12.3997C6.49771 12.4293 6.43244 12.4729 6.37745 12.5277C6.32247 12.5826 6.27885 12.6478 6.24908 12.7196C6.21932 12.7914 6.204 12.8683 6.204 12.946C6.204 13.7071 6.35392 14.4608 6.64519 15.164C6.93647 15.8672 7.3634 16.5062 7.90161 17.0444C8.43982 17.5826 9.07876 18.0095 9.78197 18.3008C10.4852 18.5921 11.2389 18.742 12 18.742C12.7611 18.742 13.5148 18.5921 14.218 18.3008C14.9212 18.0095 15.5602 17.5826 16.0984 17.0444C16.6366 16.5062 17.0635 15.8672 17.3548 15.164C17.6461 14.4608 17.796 13.7071 17.796 12.946C17.796 12.8683 17.7807 12.7914 17.7509 12.7196C17.7212 12.6478 17.6775 12.5826 17.6225 12.5277C17.5676 12.4729 17.5023 12.4293 17.4305 12.3997C17.3587 12.3701 17.2817 12.3549 17.204 12.355ZM7.42 7.269C7.23042 7.26397 7.04175 7.29696 6.86513 7.36604C6.68851 7.43511 6.52751 7.53886 6.39164 7.67117C6.25577 7.80348 6.14778 7.96167 6.07405 8.1364C6.00031 8.31113 5.96232 8.49885 5.96232 8.6885C5.96232 8.87815 6.00031 9.06588 6.07405 9.2406C6.14778 9.41533 6.25577 9.57352 6.39164 9.70583C6.52751 9.83814 6.68851 9.94189 6.86513 10.011C7.04175 10.08 7.23042 10.113 7.42 10.108C7.79661 10.108 8.15779 9.95839 8.42409 9.69209C8.69039 9.42579 8.84 9.06461 8.84 8.688C8.84 8.31139 8.69039 7.95021 8.42409 7.68391C8.15779 7.41761 7.79661 7.268 7.42 7.268V7.269ZM16.42 7.269C16.2304 7.26397 16.0417 7.29696 15.8651 7.36604C15.6885 7.43511 15.5275 7.53886 15.3916 7.67117C15.2558 7.80348 15.1478 7.96167 15.074 8.1364C15.0003 8.31113 14.9623 8.49885 14.9623 8.6885C14.9623 8.87815 15.0003 9.06588 15.074 9.2406C15.1478 9.41533 15.2558 9.57352 15.3916 9.70583C15.5275 9.83814 15.6885 9.94189 15.8651 10.011C16.0417 10.08 16.2304 10.113 16.42 10.108C16.7966 10.108 17.1578 9.95839 17.4241 9.69209C17.6904 9.42579 17.84 9.06461 17.84 8.688C17.84 8.31139 17.6904 7.95021 17.4241 7.68391C17.1578 7.41761 16.7966 7.268 16.42 7.268V7.269Z'
      fill='#F78C35'
    />
  </svg>
);

const background = defaultIcon;

const front = [cryIcon, cryIcon, normallyIcon, happyIcon, happyIcon];
const TextRate = Rate(background, front);

export default function () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TextRate size={24} defaultValue={5} />
      <TextRate size={24} defaultValue={4} />
      <TextRate size={24} defaultValue={3} />
      <TextRate size={24} defaultValue={2} />
      <TextRate size={24} defaultValue={1} />
      <TextRate size={24} defaultValue={0} />
    </div>
  );
}
