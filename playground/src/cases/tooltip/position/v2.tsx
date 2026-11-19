import { Button, Tooltip } from 'shineout-v2';

const style = { margin: 4, width: 110, display: 'inline-block' };

export default function Demo() {
  return (
    <div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='bottom' tip={<div><div>i am popover content</div><div>bottom</div></div>}><Button style={style}>bottom</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
      </div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
      </div>
      <div>
        <Tooltip position='right' tip={<div><div>i am popover content</div><div>right</div></div>}><Button style={style}>right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='left' tip={<div><div>i am popover content</div><div>left</div></div>}><Button style={style}>left</Button></Tooltip>
      </div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
      </div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='top' tip={<div><div>i am popover content</div><div>top</div></div>}><Button style={style}>top</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
      </div>
    </div>
  );
}
