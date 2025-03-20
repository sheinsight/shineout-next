import { PaginationSimpleProps } from './pagination-simple.type';
import Jumper from './pagination-jumper';
import Next from './pagination-next';
import Prev from './pagination-prev';

const PaginationSimple = (props: PaginationSimpleProps) => {
  const { jssStyle, pageSize, current, disabled, total, mode, size, text, onChange } = props;

  const renderPrev = () => {
    return (
      <Prev
        jssStyle={jssStyle}
        pageSize={pageSize}
        disabled={disabled}
        current={current}
        total={total}
        mode={mode}
        size={size}
        onChange={onChange}
      ></Prev>
    );
  };

  const renderNext = () => {
    return (
      <Next
        jssStyle={jssStyle}
        pageSize={pageSize}
        disabled={disabled}
        current={current}
        total={total}
        mode={mode}
        size={size}
        onChange={onChange}
      ></Next>
    );
  };

  const renderJumper = () => {
    return (
      <Jumper
        jssStyle={jssStyle}
        simple
        total={total}
        text={text}
        size={size}
        pageSize={pageSize}
        onChange={onChange}
      ></Jumper>
    );
  };

  return (
    <>
      {renderPrev()}
      {renderJumper()}
      {renderNext()}
    </>
  );
};

export default PaginationSimple;
