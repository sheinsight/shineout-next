import { Col, Row } from 'antd';

const COUNT = 5;
const gridStyle = { color: '#fff', paddingInlineStart: 8, background: '#197afa', fontSize: 14 };
const style = { background: '#e8ebf0', marginBottom: 4, lineHeight: '30px' };

// Shineout 的 width={i/5} 是占宽的比例，antd 是 24 栅格，换算成 span = 24 * i / 5（不是整数，antd 允许小数的 flex 宽度，这里用 style 的百分比宽度更准确）
export default function Demo() {
  return (
    <div>
      {Array.from({ length: COUNT }).map((_, i) => (
        <div key={i} style={style}>
          <Row>
            <Col flex={`0 0 ${((i + 1) / COUNT) * 100}%`} style={gridStyle}>
              {`${i + 1}/${COUNT}`}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
