import { Footer } from 'dumi-theme-antd-style';

export default () => {
  return (
    <Footer
      bottom={
        <div className='dumi-default-footer'>
          <span>Copyright © 2023 | Powered by </span>
          <a target={'_blank'} href='https://d.umijs.org/'>
            dumi
          </a>
        </div>
      }
      columns={[]}
    />
  );
};
