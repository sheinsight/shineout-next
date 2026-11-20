import { Col, Row } from 'antd-v5';

const a = { color: '#fff', lineHeight: '30px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };
const b = { ...a, background: '#6bb5ff' };

// 24 / 8 = 3，1/8 可以整除成 span=3
export default function Demo() {
  return (
    <div style={{ background: '#e8ebf0' }}>
      <Row gutter={8}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col key={i} span={3}>
            <div style={(i + 1) % 2 === 0 ? b : a}>1/8</div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
