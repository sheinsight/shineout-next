interface ColgroupProps {
  colgroup?: (number | string | undefined)[];
  columns?: {
    key: string | number;
    width?: number | string;
    minWidth?: number;
  }[];
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
          const width = isLast && props.shouldLastColAuto ? undefined : item;
          const minWidth = columns[index].minWidth;
          const style: { width?: string | number; minWidth?: number } = {};
          if (minWidth) {
            style.minWidth = minWidth;
          }
          style.width = width;
          return <col key={columns[index].key} style={style} />;
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
