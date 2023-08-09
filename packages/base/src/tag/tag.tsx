import { TagProps } from './tag.type';

const Tag = (props: TagProps) => {
  const { jssStyle } = props;
  console.log(jssStyle);
  return <div>Tag</div>;
};

export default Tag;
