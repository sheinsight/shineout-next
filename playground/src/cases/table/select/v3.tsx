import { useState } from 'react';
import { Table } from 'shineout-v3';
import { useBenchState } from '../../../core/define';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(20);

const columns: any[] = [
  { type: 'checkbox', width: 40 },
  { title: 'id', render: 'id', width: 60 },
  { title: 'Name', render: (d: Person) => fullName(d), width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default function Demo() {
  const [selected, setSelected] = useState<Person[]>([DATA[2]]);
  useBenchState({ selected: selected.length });
  return (
    <div>
      <Table
        data={DATA}
        keygen='id'
        columns={columns}
        value={selected}
        style={{ height: 300 }}
        onRowSelect={(v: Person[]) => setSelected(v)}
        prediction={(v: Person, d: Person) => v.id === d.id}
      />
      <div style={{ marginTop: 24, fontSize: 14 }}>{`selected rows: [${selected.map((v) => v.id).join(', ')}]`}</div>
    </div>
  );
}
