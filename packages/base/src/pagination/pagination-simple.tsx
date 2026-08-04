import { PaginationSimpleProps } from './pagination-simple.type';
import Jumper from './pagination-jumper';
import Next from './pagination-next';
import Prev from './pagination-prev';

const PaginationSimple = (props: PaginationSimpleProps) => {
  const { jssStyle, pageSize, current, disabled, total, mode, size, text, onChange, semClass, semStyle } = props;

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
        semClass={semClass}
        semStyle={semStyle}
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
        semClass={semClass}
        semStyle={semStyle}
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
        current={current}
        pageSize={pageSize}
        onChange={onChange}
        semClass={semClass}
        semStyle={semStyle}
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
