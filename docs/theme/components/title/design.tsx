const link = (id: string) =>
  `https://sodoc.sheincorp.cn/doc-preview?columnId=187&originalId=${id}`;

const docs: Record<string, string> = {
  Button: link('6439'),
  Card: link('6509'),
  Avatar: link('6522'),
  Carousel: link('6526'),
  Collapse: link('6512'),
  Descriptions: link('6458'),
  Empty: link('6525'),
  Image: link('6460'),
  List: link('9992'),
  Popover: link('6514'),
  Spin: link('6511'),
  Table: link('7858'),
  Tabs: link('6459'),
  Tag: link('6365'),
  Tooltip: link('6449'),
  Tree: link('9986'),
  Cascader: link('6508'),
  Checkbox: link('7842'),
  DatePicker: link('6530'),
  Form: link('6527'),
  Input: link('6505'),
  Radio: link('6503'),
  Rate: link('9985'),
  Select: link('6531'),
  Slider: link('9993'),
  Switch: link('6523'),
  Textarea: link('6507'),
  Transfer: link('9989'),
  TreeSelect: link('6532'),
  Upload: link('6513'),
  Alert: link('6455'),
  Badge: link('6504'),
  Drawer: link('6456'),
  Message: link('6451'),
  Modal: link('6457'),
  Progress: link('9962'),
  Breadcrumb: link('6450'),
  Dropdown: link('6506'),
  Group: link('6529'),
  Link: link('6524'),
  Pagination: link('6448'),
  Steps: link('6510'),
};

interface Props {
  componentName: string;
}

export default function ({ componentName }: Props) {
  if (!componentName || !docs[componentName]) return null;
  return (
    <>
      ，<a href={docs[componentName]} target="_blank" rel="noreferrer">查看交互设计规范</a>
    </>
  );
}
