import { Breadcrumb } from 'shineout-v3';

const data = [{ name: 'home', link: '#home' }, { name: 'menu', link: 'https://www.google.com' }, { name: 'self' }];

export default function Demo() {
  return (
    <Breadcrumb
      data={data}
      renderItem={(value: any) => (value.link ? <a href={value.link}>{value.name}</a> : value.name)}
    />
  );
}
