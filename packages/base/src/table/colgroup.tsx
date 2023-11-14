interface ColgroupProps {
  colgroup?: number[];
  columns?: { key: string | number; width?: number }[];
  adjustScrollY?: number;
}
const Colgroup = (props: ColgroupProps) => {
  const { colgroup = [], columns = [] } = props;
  const useColgroup = colgroup && colgroup.length === columns.length;
  if (useColgroup) {
    return (
      <colgroup>
        {colgroup?.map((item: number, index: number) => (
          <col key={columns[index].key} style={{ width: item }} />
        ))}
      </colgroup>
    );
  }

  return (
    <colgroup>
      {columns.map((item) => (
        <col key={item.key} style={{ width: item.width }} />
      ))}
    </colgroup>
  );
};

export default Colgroup;
