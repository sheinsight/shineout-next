interface ComponentProps {
  children: React.ReactNode;
}

const Component = (props: ComponentProps) => {
  return <div className='component'>{props.children}</div>;
};

export default Component;
