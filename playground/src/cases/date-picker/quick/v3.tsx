import { DatePicker } from 'shineout-v3';

const QUICK = [
  { name: 'Today', value: () => Date.now() },
  { name: 'A week later', value: () => Date.now() + 7 * 24 * 60 * 60 * 1000 },
  {
    name: 'A month later',
    value: () => {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()).getTime();
    },
  },
];

export default function Demo() {
  return <DatePicker placeholder='Quick Date' quickSelect={QUICK} />;
}
