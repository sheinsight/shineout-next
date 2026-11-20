import { Cascader } from 'shineout-v3';
import { generateBigTreeData } from '../_shared/data';

const bigData = generateBigTreeData(2, 50);

export default function Demo() {
  return (
    <Cascader
      keygen='value'
      data={bigData}
      virtual
      onChange={() => {}}
      renderItem={(n: any) => `${n.value}`}
      onFilter={(text: string) => (d: any) => d.value.indexOf(text) >= 0}
    />
  );
}
