/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import { Button } from 'shineout';
export default () => {
  return (
    <div>
      <div>
        <Button.Group type='primary' outline style={{ marginBottom: 10 }}>
          <Button disabled>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
        </Button.Group>

        <Button.Group type='primary' shape='round' outline style={{ marginBottom: 10 }}>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
        </Button.Group>

        <Button.Group type='primary' text style={{ marginBottom: 10 }}>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
        </Button.Group>

        <Button.Group type='success' style={{ marginBottom: 10 }}>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
        </Button.Group>

        <Button.Group type='success' shape='round' style={{ marginBottom: 10 }}>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
          <Button>SHEIN</Button>
        </Button.Group>
      </div>
    </div>
  );
};
