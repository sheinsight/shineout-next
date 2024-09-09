const Avatar = () => {
  return (
    <div
      style={{
        height: 32,
        width: 32,
        borderRadius: 4,
        background: 'rgba(232, 235, 240, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg fill='rgba(179, 183, 193, 1)' viewBox='0 0 24 24' width='16px' height='16px'>
        <path d='M12 13C15.3137 13 18 10.3137 18 7C18 3.68629 15.3137 1 12 1C8.68629 1 6 3.68629 6 7C6 10.3137 8.68629 13 12 13Z'></path>
        <path d='M8.16949 15C4.76218 15 2 17.7622 2 21.1695C2 21.6282 2.37183 22 2.83051 22H21.1695C21.6282 22 22 21.6282 22 21.1695C22 17.7622 19.2378 15 15.8305 15H8.16949Z'></path>
      </svg>
    </div>
  );
};

export default Avatar;
