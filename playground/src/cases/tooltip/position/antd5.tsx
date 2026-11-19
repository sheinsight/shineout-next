import { Button, Tooltip } from 'antd-v5';

const style = { margin: 4, width: 110, display: 'inline-block' };

export default function Demo() {
  return (
    <div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <Tooltip placement='bottomLeft' title={<div><div>i am popover content</div><div>bottom-left</div></div>}><Button style={style}>bottom-left</Button></Tooltip>
        <Tooltip placement='bottom' title={<div><div>i am popover content</div><div>bottom</div></div>}><Button style={style}>bottom</Button></Tooltip>
        <Tooltip placement='bottomRight' title={<div><div>i am popover content</div><div>bottom-right</div></div>}><Button style={style}>bottom-right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
      </div>
      <div>
        <Tooltip placement='rightTop' title={<div><div>i am popover content</div><div>right-top</div></div>}><Button style={style}>right-top</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip placement='leftTop' title={<div><div>i am popover content</div><div>left-top</div></div>}><Button style={style}>left-top</Button></Tooltip>
      </div>
      <div>
        <Tooltip placement='right' title={<div><div>i am popover content</div><div>right</div></div>}><Button style={style}>right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip placement='left' title={<div><div>i am popover content</div><div>left</div></div>}><Button style={style}>left</Button></Tooltip>
      </div>
      <div>
        <Tooltip placement='rightBottom' title={<div><div>i am popover content</div><div>right-bottom</div></div>}><Button style={style}>right-bottom</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip placement='leftBottom' title={<div><div>i am popover content</div><div>left-bottom</div></div>}><Button style={style}>left-bottom</Button></Tooltip>
      </div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <Tooltip placement='topLeft' title={<div><div>i am popover content</div><div>top-left</div></div>}><Button style={style}>top-left</Button></Tooltip>
        <Tooltip placement='top' title={<div><div>i am popover content</div><div>top</div></div>}><Button style={style}>top</Button></Tooltip>
        <Tooltip placement='topRight' title={<div><div>i am popover content</div><div>top-right</div></div>}><Button style={style}>top-right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
      </div>
    </div>
  );
}
