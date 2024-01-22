import { Tooltip } from 'shineout';

const Codesandbox = () => {
  return (
    <div className='iconbox'>
      <Tooltip tip='在 CodeSandbox 打开' trigger='hover' position='top'>
        <div className='icon'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth='4'
            viewBox='0 0 48 48'
            aria-hidden='true'
            focusable='false'
          >
            <path
              fill='currentColor'
              stroke='none'
              d='m25.002 1.6 17.9 10.3c.6.4 1 1 1 1.7v20.7c0 .7-.4 1.4-1 1.7l-17.9 10.4c-.6.4-1.4.4-2 0l-17.9-10.3c-.6-.4-1-1-1-1.7V13.7c0-.7.4-1.4 1-1.7l17.9-10.4c.6-.4 1.4-.4 2 0Zm13.5 12.4-7.9-4.5-6.6 4.5-6.5-4-7.3 4.3 13.8 8.7 14.5-9Zm-16.5 26.4V26.3l-14-8.9v7.9l8 5.5V37l6 3.4Zm4 0 6-3.5v-5.2l8-5.5v-8.9l-14 8.9v14.2Z'
            ></path>
          </svg>
        </div>
      </Tooltip>
    </div>
  );
};

export default Codesandbox;
