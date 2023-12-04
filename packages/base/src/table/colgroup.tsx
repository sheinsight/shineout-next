interface ColgroupProps {
  colgroup?: (number | undefined)[];
  columns?: { key: string | number; width?: number }[];
  shouldLastColAuto: boolean;
}
const Colgroup = (props: ColgroupProps) => {
  const { colgroup = [], columns = [] } = props;
  const useColgroup = colgroup && colgroup.length === columns.length;
  if (useColgroup) {
    return (
      <colgroup>
        {colgroup?.map((item, index) => {
          const isLast = index === colgroup.length - 1;
          return (
            <col
              key={columns[index].key}
              style={{ width: isLast && props.shouldLastColAuto ? undefined : item }}
            />
          );
        })}
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
