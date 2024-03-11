const Code = (props: any) => {
  const { value } = props;
  return (
    <pre
      style={{
        flex: 1,
        margin: 0,
        marginLeft: 10,
        background: '#1d1d1d',
        color: '#94d5fc',
        borderRadius: 4,
        padding: 10,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <code style={{ color: '#5D8E4E' }}>
          <span>/</span>
          <span>/</span> value
        </code>
      </div>
      {value && <code>{JSON.stringify(value, null, 2)}</code>}
      {!value && <code style={{ color: '#757575' }}>no data</code>}
    </pre>
  );
};

export default Code;
