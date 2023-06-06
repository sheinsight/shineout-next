interface OpenProps {
  onClick: () => void;
}

const Open = (props: OpenProps) => {
  return (
    <span className='icon' onClick={props.onClick}>
      <svg
        fill='none'
        stroke='currentColor'
        strokeWidth='4'
        viewBox='0 0 48 48'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453'></path>
      </svg>
    </span>
  );
};

export default Open;
