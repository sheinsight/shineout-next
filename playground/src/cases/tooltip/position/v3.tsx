import { Button, Tooltip } from 'shineout-v3';

const style = { margin: 4, width: 110, display: 'inline-block' };

export default function Demo() {
  return (
    <div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='bottom-left' tip={<div><div>i am popover content</div><div>bottom-left</div></div>}><Button mode='outline' style={style}>bottom-left</Button></Tooltip>
        <Tooltip position='bottom' tip={<div><div>i am popover content</div><div>bottom</div></div>}><Button mode='outline' style={style}>bottom</Button></Tooltip>
        <Tooltip position='bottom-right' tip={<div><div>i am popover content</div><div>bottom-right</div></div>}><Button mode='outline' style={style}>bottom-right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
      </div>
      <div>
        <Tooltip position='right-top' tip={<div><div>i am popover content</div><div>right-top</div></div>}><Button mode='outline' style={style}>right-top</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='left-top' tip={<div><div>i am popover content</div><div>left-top</div></div>}><Button mode='outline' style={style}>left-top</Button></Tooltip>
      </div>
      <div>
        <Tooltip position='right' tip={<div><div>i am popover content</div><div>right</div></div>}><Button mode='outline' style={style}>right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='left' tip={<div><div>i am popover content</div><div>left</div></div>}><Button mode='outline' style={style}>left</Button></Tooltip>
      </div>
      <div>
        <Tooltip position='right-bottom' tip={<div><div>i am popover content</div><div>right-bottom</div></div>}><Button mode='outline' style={style}>right-bottom</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='left-bottom' tip={<div><div>i am popover content</div><div>left-bottom</div></div>}><Button mode='outline' style={style}>left-bottom</Button></Tooltip>
      </div>
      <div>
        <div style={{ ...style, border: 0 }} />
        <Tooltip position='top-left' tip={<div><div>i am popover content</div><div>top-left</div></div>}><Button mode='outline' style={style}>top-left</Button></Tooltip>
        <Tooltip position='top' tip={<div><div>i am popover content</div><div>top</div></div>}><Button mode='outline' style={style}>top</Button></Tooltip>
        <Tooltip position='top-right' tip={<div><div>i am popover content</div><div>top-right</div></div>}><Button mode='outline' style={style}>top-right</Button></Tooltip>
        <div style={{ ...style, border: 0 }} />
      </div>
    </div>
  );
}
