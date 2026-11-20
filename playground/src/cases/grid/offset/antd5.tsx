import { Col, Row } from 'antd-v5';

const gridStyle = { color: '#fff', lineHeight: '60px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };

export default function Demo() {
  return (
    <div style={{ background: '#e8ebf0' }}>
      <Row>
        <Col span={8} offset={8} style={gridStyle}>
          With 1/3, Offset 1/3
        </Col>
      </Row>
    </div>
  );
}
