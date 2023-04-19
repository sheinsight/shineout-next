import { useOutlet } from 'dumi';

export default () => {
  const outlet = useOutlet();

  return <div>{outlet}</div>;
};
