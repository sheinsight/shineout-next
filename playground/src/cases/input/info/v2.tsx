import { Input } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input width={300} placeholder='limit 20 characters' info={20} />
      <Input
        width={300}
        placeholder='custom info text'
        info={(text: string) => `已输入${text?.length || 0}个字符`}
      />
    </div>
  );
}
