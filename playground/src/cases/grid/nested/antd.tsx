import { Col, Row } from 'antd';

const style = { color: '#fff', lineHeight: '30px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };

export default function Demo() {
  return (
    <Row style={{ textAlign: 'center' }}>
      <Col span={12} style={style}>
        1/2
      </Col>
      <Col span={12} style={{ lineHeight: '30px' }}>
        <div style={{ fontSize: 14 }}>1/2</div>
        <Row>
          <Col span={8} style={style}>
            1/3
          </Col>
          <Col span={8} style={{ ...style, background: '#6bb5ff' }}>
            1/3
          </Col>
          <Col span={8} style={style}>
            1/3
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
