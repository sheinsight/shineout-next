import { useRef, useState } from "react"
import { Button, Divider, Gap, Grid, Sticky, Alert, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, Spin, Table, Tabs, Tag, TYPE, Tooltip, Tree, Cascader, Checkbox, DatePicker, Input, Radio, Rate, Select, Slider, Switch, Textarea, Transfer, TreeSelect, Upload, Badge, Drawer, Message, Modal, Progress, Breadcrumb, Dropdown, Link, Menu, Pagination, Steps, Form } from "shineout"
// @ts-ignore
import { user } from "@sheinx/mock"

const Now = Date.now();

export const collocatorPreset: Record<string, any> = {
  Button: {
    Button: {
      element: (props: any) => <Button {...props}>{'确定'}</Button>,
      code:  `<Button#placeholder>{'确定'}</Button>`,
      properties: [
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click'),
        },{
          name: 'renderLoading',
          type: 'other',
          initValue: () => 'loading...'
        }
      ]
    },
    'Button.Group': {
      element: (props: any) => {
        const { Button: buttonProps, Group: groupProps } = props

        return (
          <Button.Group {...groupProps}>
            <Button {...buttonProps}>确定</Button>
            <Button>取消</Button>
          </Button.Group>
        )
      },
      code: `<Button.Group#placeholder-Group>
  <Button#placeholder-Button>确定</Button>
  <Button>取消</Button>
</Button.Group>`,
      merge: ['Button.Group', 'Button'],
    }
  },
  Divider: {
    Divider: {
      element: (props: any) => (
        <div>
          <p>A design is a plan or specification for the construction of an object.</p>
          <Divider {...props} />
          <p>A design is a plan or specification for the construction of an object.</p>
        </div>
      ),
      code: `<Divider#placeholder />`,
      properties: [
        {
          name: 'children',
          type: 'other',
          initValue: 'children'
        }
      ]
    }
  },
  Gap: {
    Gap: {
      element: (props: any) => (
        <Gap {...props}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Button key={i} type='primary'>
              Button
            </Button>
          ))}
        </Gap>
      ),
      code: `<Gap#placeholder>
  {Array.from({ length: 10 }).map((_, i) => (
    <Button key={i} type='primary'>
      Button
    </Button>
  ))}  
</Gap>`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 400 },
          notHideDefaultValue: true
        }
      ]
    }
  },
  Grid: {
    Grid: {
      element: (props: any) => (
        <div style={{ background: '#e8ebf0', marginBottom: 4, lineHeight: '30px', width: '100%' }}>
          <Grid {...props}>{'gird'}</Grid>
        </div>
      ),
      code: `<Grid#placeholder>{'grid'}</Grid>`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: {
            color: '#fff',
            paddingInlineStart: 8,
            background: '#197afa',
            fontSize: 14,
          },
          notHideDefaultValue: true
        }
      ]
    }
  },
  Sticky: {
    Sticky: {
      element: (props: any) => {
        const elRef = useRef(null)
        return (
          <div style={{ position: 'relative', zIndex: 0, width: '100%' }}>
            <div id='sticky_element' ref={elRef} style={{ width: '100%', height: 400, overflow: 'auto' }}>
              <div
                style={{
                  width: '100%',
                  height: 1600,
                  backgroundColor: '#f4f5f8',
                  backgroundImage:
                    'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
                    'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              >
                <div style={{ height: 600 }}></div>
                <Sticky {...props}>
                  <Alert style={{ marginBottom: 0 }} type='info'>
                    Sticky to element
                  </Alert>
                </Sticky>
              </div>
            </div>
          </div>
        )
      },
      code: `<Sticky#placeholder>
  <Alert style={{ marginBottom: 0 }} type='info'>
    Sticky to element
  </Alert>
</Sticky>`,
      properties: [
        {
          name: 'scrollContainer',
          type: 'other',
          initValue: '#sticky_element'
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        }
      ]
    }
  },
  Card: {
    Card: {
      element: (props: any) => {
        const {Card: cardProps, Header: headerProps, Body: bodyProps, Footer: footerProps} = props
        return (
          <Card {...cardProps}>
            <Card.Header
              {...headerProps}
            >
              Card title
            </Card.Header>
            <Card.Body {...bodyProps}>
              Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
              bird in the open.
            </Card.Body>
            <Card.Footer {...footerProps}>
              <div
                style={{
                  marginInlineEnd: 8,
                }}
              >
                <Button>Cancel</Button>
              </div>
            </Card.Footer>
          </Card>
        )
      },
      code: `<Card#placeholder-Card>
  <Card.Header#placeholder-Header>
    Card title
  </Card.Header>
  <Card.Body#placeholder-Body>
    Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
    bird in the open.
  </Card.Body>
  <Card.Footer#placeholder-Footer>
    <div
      style={{
        marginInlineEnd: 8,
      }}
    >
      <Button>Cancel</Button>
    </div>
  </Card.Footer>
</Card>`,
      merge: ['Card', 'Card.Header', 'Card.Body', 'Card.Footer'],
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 360 },
          notHideDefaultValue: true
        }, {
          name: 'collapsible',
          type: 'select',
          value: ['true', 'false', 'bottom'],
          defaultValue: false
        }, {
          name: 'resizable',
          type: 'select',
          value: ['true', 'false', 'x', 'y', 'xy'],
          defaultValue: false
        }, {
          name: 'shadow',
          type: 'select',
          value: ['true', 'false', 'hover'],
          defaultValue: false
        }, {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        }
      ]
    },
    'Card.Header': {
      element: (props: any) => (
        <Card style={{ width: 360 }}>
          <Card.Header
            {...props}
          >
            Card title
          </Card.Header>
        </Card>
      ),
      code: `<Card style={{ width: 360 }}>
  <Card.Header#placeholder>
    Card title
  </Card.Header>
</Card>`,
      properties: [
        {
          name: 'extra',
          type: 'other',
          initValue: 'Text Button'
        }
      ]
    },
    'Card.Body': {
      element: (props: any) => (
        <Card style={{ width: 360 }}>
          <Card.Body {...props}>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
            bird in the open.
          </Card.Body>
        </Card>
      ),
      code: `<Card style={{ width: 360 }}>
  <Card.Body#placeholder>
    Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
    bird in the open.
  </Card.Body>
</Card>`
    },
    'Card.Footer': {
      element: (props: any) => (
        <Card style={{ width: 360 }}>
          <Card.Footer {...props}>
            <div
              style={{
                marginInlineEnd: 8,
              }}
            >
              <Button>Cancel</Button>
            </div>
          </Card.Footer>
        </Card>
      ),
      code: `<Card style={{ width: 360 }}>
  <Card.Footer#placeholder>
    <div
      style={{
        marginInlineEnd: 8,
      }}
    >
      <Button>Cancel</Button>
    </div>
  </Card.Footer>
</Card>`
    }
  },
  Carousel: {
    Carousel: {
      element: (props: any) => {
        const images = [
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
        ];
        return (
          <Carousel
            style={{ width: 600, height: 280 }}
            {...props}
          >
            {images.map((src) => (
              <img key={src} src={src} />
            ))}
          </Carousel>
        )
      },
      code: `<Carousel#placeholder>
  {images.map((src) => (
    <img key={src} src={src} />
  ))}
</Carousel>`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 600, height: 280 },
          notHideDefaultValue: true
        },
        {
          name: 'onMove',
          type: 'other',
          initValue: () => console.log('move')
        },
        {
          name: 'indicatorType',
          type: 'select',
          value: ['circle', 'line', 'slider', 'number'],
          defaultValue: 'circle'
        },
        {
          name: 'animation',
          type: 'select',
          value: ['slide', 'slide-y', 'fade'],
          defaultValue: 'slide'
        }
      ]
    }
  },
  Collapse: {
    Collapse: {
      element: (props: any) => {
        const {Collapse: collapseProps, Item: itemProps} = props
        return (
          <Collapse {...collapseProps}>
            <Collapse.Item {...itemProps} keygen="0">
              <p>Content 1</p>
            </Collapse.Item>
            <Collapse.Item title='Title 2' keygen="1">
              <p>Content 2</p>
            </Collapse.Item>
          </Collapse>
        )
      },
      code: `<Collapse#placeholder-Collapse>
  <Collapse.Item keygen="0"#placeholder-Item>
    <p>Content 1</p>
  </Collapse.Item>
  <Collapse.Item title='Title 2' keygen="1">
    <p>Content 2</p>
  </Collapse.Item>
</Collapse>`,
      merge: ['Collapse', 'Collapse.Item'],
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: '100%' },
          notHideDefaultValue: true
        },
        {
          name: 'expandIcon',
          type: 'other',
          initValue: 'icon'
        },
      ]
    },
    'Collapse.Item': {
      element: (props: any) => (
        <Collapse style={{ width: '100%' }}>
          <Collapse.Item keygen="0" {...props}>
            <p>Content 1</p>
          </Collapse.Item>
        </Collapse>
      ),
      code: `<Collapse>
  <Collapse.Item keygen="0"#placeholder>
    <p>Content 1</p>
  </Collapse.Item>
</Collapse>`,
      properties: [
        {
          name: 'expandIcon',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'extra',
          type: 'other',
          initValue: 'extra content'
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'Title 1'
        },
      ]
    }
  },
  Descriptions: {
    Descriptions: {
      element: (props: any) => {
        const data = [
          {
            label: 'Name',
            value: 'Mai Mai',
          },
          {
            label: 'Residence',
            value: 'Beijing',
          },
          {
            label: 'Address',
            value: 'Yingdu Building',
          },
          {
            label: 'Mobile',
            value: '187-2323-9834',
          },
          {
            label: 'Hometown',
            value: 'Beijing',
          },
        ]
        return (
          <div style={{ width: '100%', marginBottom: '-12px' }}>
            <Descriptions
              items={data}
              {...props}
            />
          </div>
        )
      },
      code: `<Descriptions items={data}#placeholder />`,
      properties: [
        {
          name: 'colon',
          type: 'other',
          initValue: ': '
        },
        {
          name: 'extra',
          type: 'other',
          initValue: 'extra'
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'title'
        }
      ]
    },
    'ItemType': {
      hide: true,
    }
  },
  Empty: {
    Empty: {
      element: (props: any) => (
        <Empty {...props} />
      ),
      code: `<Empty#placeholder />`,
      properties: [
        {
          name: 'description',
          type: 'other',
          initValue: 'description'
        },
        {
          name: 'icon',
          type: 'other',
          initValue: 'icon'
        }
      ]
    }
  },
  Image: {
    Image: {
      element: (props: any) => (
        <div
          style={{
            gap: 8,
            display: 'flex',
            width: 200,
            height: 200,
          }}
        >
          <Image
            {...props}
            src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
            href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
          />
        </div>
      ),
      code: `<Image#placeholder />`,
      exclude: ['src', 'href'],
      properties: [
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onError',
          type: 'other',
          initValue: () => console.log('error')
        },
        {
          name: 'placeholder',
          type: 'other',
          initValue: 'loading'
        },
        {
          name: 'error',
          type: 'other',
          initValue: 'error'
        }
      ]
    },
    'Image.Group': {
      element: (props: any) => {
        const images = [
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
          'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
        ]
        return (
          <div
            style={{
              gap: 16,
              display: 'flex',
              width: 200,
              height: 200,
            }}
          >
            <Image.Group {...props}>
              {images.map((item, index) => <Image key={index} width={128} height={128} src={item} href={item} />)}
            </Image.Group>
          </div>
        )
      },
      code: `<Image.Group#placeholder>
  {images.map((item, index) => <Image key={index} width={128} height={128} src={item} href={item} />)}
</Image.Group>`,
    }
  },
  List: {
    List: {
      element: (props: any) => {
        // const names = user.fetchSync(1000)
        const renderItem = ({ id, firstName }: any) => (
          <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
            <span style={{
              width: 30,
              height: 30,
              background: '#eee',
              borderRadius: '50%',
              marginInlineEnd: 12,
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
            }}>{firstName.slice(0, 1)}</span>
            <span style={{ flex: 1 }}>{firstName}</span>
            <span>-{id}</span>
          </div>
        )
        return (
          <List
            keygen='id'
            renderItem={renderItem}
            {...props}
          />
        )
      },
      code: `<List keygen='id' renderItem={renderItem}#placeholder />`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: '80%' },
          notHideDefaultValue: true
        },
        {
          name: 'data',
          type: 'other',
          initValue: user.fetchSync(20),
        },
        {
          name: 'empty',
          type: 'other',
          initValue: 'empty...',
        },
        {
          name: 'disabled',
          type: 'switch',
          defaultValue: false,
        },
        {
          name: 'footer',
          type: 'other',
          initValue: 'footer...',
        },
        {
          name: 'loading',
          type: 'switch',
          defaultValue: false,
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change'),
        },
      ]
    }
  },
  Popover: {
    Popover: {
      element: (props: any) => (
        <Button id="button">
          Popover
          <Popover {...props} >some text</Popover>
        </Button>
      ),
      code: `<Popover#placeholder>some text</Popover>`,
      exclude: ['arrowClass'],
      properties: [
        {
          name: 'getPopupContainer',
          type: 'other',
          initValue: () => document.getElementById('button')
        },
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        },
        {
          name: 'onOpen',
          type: 'other',
          initValue: () => console.log('open')
        },
        {
          name: 'onVisibleChange',
          type: 'other',
          initValue: () => console.log('visible change')
        },
        {
          name: 'scrollDismiss',
          type: 'switch',
          defaultValue: false
        }
      ]
    },
    'Popover.Confirm': {
      element: (props: any) => (
        <Button>
          <Popover.Confirm
            {...props}
          >
            some text
          </Popover.Confirm>
          Delete
        </Button>
      ),
      code: `<Popover.Confirm#placeholder>some text</Popover.Confirm>`,
      properties: [
        {
          name: 'icon',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'onCancel',
          type: 'other',
          initValue: () => console.log('cancel')
        },
        {
          name: 'onOk',
          type: 'other',
          initValue: () => console.log('ok')
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'title'
        },
        {
          name: 'text',
          type: 'other',
          initValue: { ok: "确定", cancel: "取消" }
        }
      ]
    }
  },
  Spin: {
    Spin: {
      element: (props: any) => (
        <div style={{ width: 20 }}>
          <Spin {...props} />
        </div>
      ),
      code: `<Spin#placeholder />`,
      properties: [
        {
          name: 'tip',
          type: 'other',
          initValue: 'loading...'
        }
      ],
      exclude: ['tipClassName'],
    }
  },
  Table: {
    Table: {
      element: (props: any) => {
        const { Table: tableProps, columns: columnsProps } = props
        interface TableRowData {
          id: number;
          time: string;
          start: string;
          height: number;
          salary: number;
          office: string;
          country: string;
          office5: string;
          position: string;
          lastName: string;
          firstName: string;
        }
        type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>
        const data: TableRowData[] = user.fetchSync(30);
        const columns: TableColumnItem[] = [
          { title: 'id', render: 'id', width: 80 },
          {
            width: 250,
            ...columnsProps,
            render: (d: any) => <div style={{ height: d.height }}>{`${d.firstName} ${d.lastName}`}</div>,
          },
          { title: 'Country', render: 'country', width: 200 },
          { title: 'Position', render: 'position' },
          { title: 'Office', render: 'office' },
          { title: 'Start Date', render: 'start', width: 140 },
        ];
        return (
          <Table style={{ height: 426 }} {...tableProps} keygen={'id'} data={tableProps.data || data} columns={columns} />
        )
      },
      code: `const columns: TableColumnItem[] = [
  {
    #placeholder-columns
  }
]
<Table keygen={'id'} data={data} columns={columns}#placeholder-Table />`,
      exclude: ['rowClassName'],
      merge: ['Table', 'columns'],
      properties: [
        {
          name: 'data',
          alias: 'treeData',
          type: 'other',
          initValue: [
            {
              id: 1,
              firstName: 'Ephraim',
              lastName: 'Wisozk',
              position: 'Marketing Designer',
              country: 'Reunion',
              office: 'Miami',
              children: [
                {
                  id: 6,
                  firstName: 'Ialu',
                  lastName: 'Opis',
                  position: 'Finalick Designer',
                  country: 'Tokiy',
                  office: 'Miami',
                }
              ]
            }
          ]
        },
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { height: 426 },
          notHideDefaultValue: true
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 1400
        },
        {
          name: 'empty',
          type: 'other',
          initValue: 'empty...'
        },
        {
          name: 'loading',
          type: 'other',
          initValue: 'loading...'
        },
        {
          name: 'onCellClick',
          type: 'other',
          initValue: () => console.log('cell click')
        },
        {
          name: 'onColumnResize',
          type: 'other',
          initValue: () => console.log('column resize')
        },
        {
          name: 'onRowClick',
          type: 'other',
          initValue: () => console.log('row click')
        },
        {
          name: 'onRowSelect',
          type: 'other',
          initValue: () => console.log('row select')
        },
        {
          name: 'onScroll',
          type: 'other',
          initValue: () => console.log('scroll')
        },
        {
          name: 'onSortCancel',
          type: 'other',
          initValue: () => console.log('sort cancel')
        },
        {
          name: 'onTreeExpand',
          type: 'other',
          initValue: () => console.log('tree expand')
        },
        {
          name: 'pagination',
          type: 'other',
          initValue: {
            current: 1,
            pageSize: 10,
            layout: ['links', 'list'],
            onChange: () => console.log('change'),
            pageSizeList: [10, 15, 20],
            text: {
              page: '/ page',
            },
          }
        },
        {
          name: 'renderSorter',
          type: 'other',
          initValue: () => 'sorter'
        },
        {
          name: 'sticky',
          type: 'switch',
        }
      ]
    },
    'columns': {
      hide: true,
      exclude: ['key'],
      properties: [
        {
          name: 'treeColumnsName',
          type: 'other',
          initValue: 'children'
        },
        {
          name: 'columnResizable',
          type: 'other',
          initValue: false
        },
        {
          name: 'colSpan',
          type: 'other',
          initValue: () => 2
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 250
        },
        {
          name: 'group',
          type: 'other',
          initValue: 'init name'
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('colunm click')
        },
        {
          name: 'rowSpan',
          type: 'other',
          initValue: () => true
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'Name',
          defaultValue: 'Name'
        },
      ]
    }
  },
  Tabs: {
    Tabs: {
      element: (props: any) => {
        const {Tabs: tabsProps, Panel: panelProps} = props
        const tabs = [];
        for (let i = 0; i < 3; i++) {
          tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
        }
        return (
          <div style={{ height: 100, width: '100%' }}>
            <Tabs defaultActive={0} {...tabsProps}>
              {tabs.map((tab, index) => {
                return (
                  <Tabs.Panel {...panelProps} key={index} tab={tab.title}>
                    <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
                  </Tabs.Panel>
                );
              })}
            </Tabs>
          </div>
        )
      },
      code: `<Tabs defaultActive={0}#placeholder-Tabs>
  {tabs.map((tab, index) => {
    return (
      <Tabs.Panel key={index} tab={tab.title}#placeholder-Panel>
        <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
      </Tabs.Panel>
    );
  })}
</Tabs>`,
      merge: ['Tabs', 'Tabs.Panel'],
      properties: [
        {
          name: 'extra',
          type: 'other',
          initValue: 'extra'
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        }
      ]
    },
    'Tabs.Panel': {
      hide: true,
      exclude: ['id'],
    }
  },
  Tag: {
    Tag: {
      element: (props: any) => (<Tag {...props}>tag</Tag>),
      code: `<Tag#placeholder>tag</Tag>`,
      properties: [
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        },
        {
          name: 'onCompleted',
          type: 'other',
          initValue: () => {console.log('completed')}
        },
        {
          name: 'onEnterPress',
          type: 'other',
          initValue: () => console.log('enter press')
        },
        {
          name: 'onKeyUp',
          type: 'other',
          initValue: () => console.log('key up')
        }
      ]
    },
    'Tag.Input': {
      element: (props: any) => (<Tag.Input {...props} />),
      code: `<Tag.Input#placeholder />`,
      properties: [
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'onEnterPress',
          type: 'other',
          initValue: () => console.log('enter press')
        },
        {
          name: 'onKeyUp',
          type: 'other',
          initValue: () => console.log('key up')
        }
      ]
    }
  },
  Tooltip: {
    Tooltip: {
      element: (props: any) => (
        <Tooltip {...props}>
          <Button>Tooltip</Button>
        </Tooltip>
      ),
      code: `<Tooltip#placeholder>
  <Button>Tooltip</Button>
</Tooltip>`,
      properties: [
        {
          name: 'tip',
          type: 'other',
          initValue: 'tip...'
        }
      ]
    }
  },
  Tree: {
    Tree: {
      element: (props: any) => {
        const data = [
          {
            id: '0',
            children: [
              {
                id: '0-0',
                children: [
                  {
                    id: '0-0-0',
                  },
                ],
              },
              {
                id: '0-1',
                children: [
                  {
                    id: '0-1-0',
                  },
                ],
              },
            ],
          }
        ]
        const renderItem = (node: any) => {
          return `node ${node.id}`;
        }
        return (
          <Tree
            {...props}
            keygen='id'
            data={data}
            renderItem={renderItem}
          />
        )
      },
      code: `<Tree keygen='id' data={data} renderItem={renderItem}#placeholder />`,
      exclude: ['iconClass'],
      properties: [
        {
          name: 'childrenKey',
          type: 'input',
          defaultValue: 'children'
        },
        {
          name: 'disabled',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'expandIcons',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'mode',
          type: 'select',
          value: [0, 1, 2, 3,  4],
          defaultValue: 1
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onExpand',
          type: 'other',
          initValue: () => console.log('expand')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onDrop',
          type: 'other',
          initValue: () => console.log('drop')
        },
        {
          name: 'onDragEnd',
          type: 'other',
          initValue: () => console.log('drop end')
        },
        {
          name: 'onDragLeave',
          type: 'other',
          initValue: () => console.log('drop leave')
        },
        {
          name: 'onDragOver',
          type: 'other',
          initValue: () => console.log('drop over')
        },
        {
          name: 'onDragStart',
          type: 'other',
          initValue: () => console.log('drop start')
        },
      ]
    }
  },
  Cascader: {
    Cascader: {
      element: (props: any) => {
        const data = [
          {
            value: 'jiangsu',
            children: [
              {
                value: 'nanjing',
                children: [
                  {
                    value: 'jiangning',
                  },
                ],
              },
            ],
          },
          {
            value: 'anhui',
            children: [
              {
                value: 'hefei',
                children: [
                  {
                    value: 'feidong',
                  },
                ],
              },
            ],
          },
        ]
        return (
          <Cascader {...props} keygen='value' data={data} renderItem={(n: any) => `${n?.value}`} />
        )
      },
      code: `<Cascader keygen='value' data={data} renderItem={(n) => \`\${n?.value}\`}#placeholder />`,
      exclude: ['compressedClassName'],
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 300 },
          notHideDefaultValue: true
        },
        {
          name: 'absolute',
          type: 'switch',
          defaultValue: true
        },
        {
          name: 'beforeChange',
          require: false,
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'childrenKey',
          type: 'input',
          defaultValue: 'children'
        },
        {
          name: 'compressed',
          require: false,
          type: 'select',
          value: ['false', 'true', 'no-repeat'],
          exclude: ['compressedClassName'],
          defaultValue: false
        },
        {
          name: 'disabled',
          require: false,
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'innerTitle',
          require: false,
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'loading',
          require: false,
          type: 'switch',
        },
        {
          name: 'mode',
          type: 'select',
          value: [0, 1, 2, 3,  4],
          defaultValue: 1
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        },
        {
          name: 'onFilter',
          type: 'other',
          initValue: (text: string) => (d: any) => d.value.indexOf(text) >= 0
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'renderOptionList',
          type: 'other',
          initValue: 'list'
        },
        {
          name: 'renderUnmatched',
          type: 'other',
          initValue: 'unmatched'
        }
      ]
    },
    CascaderRef: {
      hide: true
    }
  },
  Checkbox: {
    Checkbox: {
      element: (props: any) => {
        const { Checkbox: checkboxProps, Group: groupProps } = props

        const data = [
          { id: 1, color: 'red' },
          { id: 2, color: 'cyan' },
          { id: 3, color: 'blue' },
          { id: 4, color: 'green' },
          { id: 5, color: 'yellow' },
          { id: 6, color: 'orange' },
          { id: 7, color: 'violet' },
        ]

        return (
          <Checkbox.Group {...groupProps} keygen='id'>
            {data.map((d) => (
              <Checkbox {...checkboxProps} key={d.id} htmlValue={d.id}>
                {d.color}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )
      },
      code: `<Checkbox.Group keygen='id'#placeholder-Group>
  {data.map((d) => (
    <Checkbox key={d.id} htmlValue={d.id}#placeholder-Checkbox>
      {d.color}
    </Checkbox>
  ))}
</Checkbox.Group>`,
      properties: [
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'checked',
          type: 'select',
          value: ['true', 'false', 'indeterminate']
        },
        {
          name: 'defaultChecked',
          type: 'select',
          value: ['true', 'false', 'indeterminate']
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
      ],
      merge: ['Checkbox', 'Checkbox.Group']
    },
    'Checkbox.Group': {
      hide: true,
      properties: [
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('group before change')
        },
        {
          name: 'disabled',
          type: 'select',
          value: ['true', 'false', '(d) => d === 1']
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('group change')
        },
      ]
    }
  },
  DatePicker: {
    DatePicker: {
      element: (props: any) => <DatePicker {...props} />,
      code: `<DatePicker#placeholder />`,
      properties: [
        {
          name: 'absolute',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'disabled',
          type: 'switch',
          defaultValue: false,
        },
        {
          name: 'disabledTime',
          type: 'other',
          initValue: (time: string) => time === '12:00:00'
        },
        {
          name: 'formatResult',
          type: 'other',
          initValue: (d: Date) => `render ${d}`
        },
        {
          name: 'innerTitle',
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'min',
          type: 'other',
          initValue: Now
        },
        {
          name: 'max',
          type: 'other',
          initValue: Now + 4 * 86400000
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'onPickerChange',
          type: 'other',
          initValue: () => console.log('picker change')
        },
        {
          name: 'placeTitle',
          type: 'other',
          initValue: 'place title'
        },
        {
          name: 'quickSelect',
          type: 'other',
          initValue: [
            {
              name: 'Next Week',
              value: () => {
                const now = Date.now();
                return [now, now + 7 * 24 * 60 * 60 * 1000];
              },
            },
            {
              name: 'Last Week',
              value: () => {
                const now = Date.now();
                return [now - 7 * 24 * 60 * 60 * 1000, now];
              },
            }]
        },
        {
          name: 'range',
          type: 'select',
          value: ['false', 'true', 2 * 24 * 3600]
        }
      ]
    }
  },
  Form: {
    Form: {
      element: (props: any) => {
        const { Form: formProps, Item: itemProps } = props

        return (
          <Form {...formProps}>
            <Form.Item {...itemProps}>
              <Input name='email' clearable />
            </Form.Item>
  
            <Form.Item label='Password'>
              <Input name='password' type='password' clearable />
            </Form.Item>
  
            <Form.Item label=''>
              <Form.Submit>Submit</Form.Submit>
              <Form.Reset>Reset</Form.Reset>
            </Form.Item>
          </Form>
        )
      },
      code: `<Form#placeholder-Form>
  <Form.Item#placeholder-Item>
    <Input name='email' clearable />
  </Form.Item>

  <Form.Item label='Password'>
    <Input name='password' type='password' clearable />
  </Form.Item>

  <Form.Item label=''>
    <Form.Submit>Submit</Form.Submit>
    <Form.Reset>Reset</Form.Reset>
  </Form.Item>
</Form>`,
      merge: ['Form', 'Form.Item'],
      properties: [
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onReset',
          type: 'other',
          initValue: () => console.log('reset')
        },
        {
          name: 'onSubmit',
          type: 'other',
          initValue: () => console.log('submit')
        },
        {
          name: 'scrollToError',
          type: 'select',
          value: ['true', 'false', 100],
        }
      ]
    },
    'Form.Item': {
      hide: true,
      properties: [
        {
          name: 'label',
          type: 'input',
          defaultValue: 'Email',
          notHideDefaultValue: true
        },
        {
          name: 'tip',
          type: 'other',
          initValue: 'tip...'
        }
      ]
    },
    'Form.Field': {
      hide: true
    },
    'Form.FieldSet': {
      hide: true
    },
    'Form.Flow': {
      hide: true
    },
    'FormRef': {
      hide: true
    }
  },
  Input: {
    Input: {
      element: (props: any) => <Input {...props} />,
      code: `<Input#placeholder />`,
      properties: [
        {
          name: 'placeholder',
          type: 'input',
        },
        {
          name: 'clearable',
          type: 'select',
          value: ['true', 'false', '() => console.log("clear")'],
          defaultValue: false
        },
        {
          name: 'clearIcon',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'info',
          type: 'number',
          initValue: 5
        },
        {
          name: 'innerTitle',
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onEnterPress',
          type: 'other',
          initValue: () => console.log('enter press')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'placeTitle',
          type: 'other',
          initValue: 'place title'
        },
        {
          name: 'prefix',
          type: 'other',
          initValue: 'prefix'
        },
        {
          name: 'suffix',
          type: 'other',
          initValue: 'suffix'
        },
        {
          name: 'tip',
          type: 'other',
          initValue: 'tip...'
        },
      ]
    },
    'Input.Number': {
      element: (props: any) => <Input.Number {...props} />,
      code: `<Input.Number#placeholder />`,
      properties: [
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'clearable',
          type: 'select',
          value: ['true', 'false', '() => console.log("clear")'],
          defaultValue: false
        },
        {
          name: 'clearIcon',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'info',
          type: 'number',
          initValue: 5
        },
        {
          name: 'innerTitle',
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onEnterPress',
          type: 'other',
          initValue: () => console.log('enter press')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'placeTitle',
          type: 'other',
          initValue: 'place title'
        },
        {
          name: 'prefix',
          type: 'other',
          initValue: 'prefix'
        },
        {
          name: 'suffix',
          type: 'other',
          initValue: 'suffix'
        },
        {
          name: 'tip',
          type: 'other',
          initValue: 'tip...'
        },
      ]
    },
    'Input.Password': {
      element: (props: any) => <Input.Password {...props} />,
      code: `<Input.Password#placeholder />`,
      properties: [
        {
          name: 'onVisibilityChange',
          type: 'other',
          initValue: () => console.log('visibility change')
        }
      ]
    }
  },
  Radio: {
    Radio: {
      element: (props: any) => {
        const { Radio: radioProps, Group: groupProps } = props
        const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
        return (
          <Radio.Group
            {...groupProps}
            keygen
            defaultValue='yellow'
          >
            {data.map((d) => (
              <Radio {...radioProps} key={d} htmlValue={d}>
                {d}
              </Radio>
            ))}
          </Radio.Group>
        )
      },
      code: ` <Radio.Group keygen defaultValue='yellow'#placeholder-Group>
  {data.map((d) => (
    <Radio key={d} htmlValue={d}#placeholder-Radio>
      {d}
    </Radio>
  ))}
</Radio.Group>`,
      merge: ['Radio', 'Radio.Group'],
      properties: [
        {
          name: 'checked',
          type: 'select',
          value: ['true', 'false', '() => true'],
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        }
      ]
    },
    'Radio.Group': {
      hide: true,
      properties: [
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('group before change')
        },
        {
          name: 'button',
          type: 'select',
          value: ['true', 'false', 'outline'],
        },
        {
          name: 'disabled',
          type: 'select',
          value: ['true', 'false', '(d) => true'],
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('group change')
        },
      ]
    }
  },
  Rate: {
    Rate: {
      element: (props: any) => {
        const star = (
          <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
          </svg>
        )
        const StarRate = Rate(star, star)
        return (
          <StarRate {...props} />
        )
      },
      code: `const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
)
const StarRate = Rate(star, star)
<StarRate#placeholder />`,
      properties: [
        {
          name: 'background',
          type: 'other',
          initValue: 'background'
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'front',
          type: 'other',
          initValue: 'front'
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'text',
          type: 'other',
          initValue: ['1', '2', '3', '4', '5']
        }
      ]
    },
    'RateFunction': {
      hide: true
    }
  },
  Rule: {
    required: {
      hide: true
    },
    min: {
      hide: true
    },
    max: {
      hide: true
    },
    range: {
      hide: true
    },
    regExp: {
      hide: true
    },
    type: {
      hide: true
    },
    custom: {
      hide: true
    },
  },
  Select: {
    Select: {
      element: (props: any) => <Select {...props} keygen={'id'} />,
      code: `<Select keygen#placeholder />`,
      properties: [
        {
          name: 'data',
          type: 'other',
          initValue: [
            {
              id: 1,
              name: 'name1'
            }, {
              id: 2,
              name: 'name2'
            }, {
              id: 3,
              name: 'name3'
            }
          ]
        },
        {
          name: 'renderItem',
          type: 'input',
          defaultValue: 'name'
        },
        {
          name: 'absolute',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'childrenKey',
          type: 'input',
          defaultValue: 'children'
        },
        {
          name: 'columnsTitle',
          type: 'other',
          initValue: 'columns title'
        },
        {
          name: 'compressed',
          type: 'select',
          value: ['false', 'true', 'no-repeat'],
          defaultValue: false
        },
        {
          name: 'convertBr',
          type: 'input',
          defaultValue: ' '
        },
        {
          name: 'disabled',
          type: 'select',
          value: ['false', 'true', '(d) => d === 1'],
          defaultValue: false
        },
        {
          name: 'footer',
          type: 'other',
          initValue: 'footer'
        },
        {
          name: 'header',
          type: 'other',
          initValue: 'header'
        },
        {
          name: 'innerTitle',
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'loading',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        },
        {
          name: 'onCreate',
          type: 'select',
          value: ['false', 'true', '() => console.log("create")'],
        },
        {
          name: 'onEnterExpand',
          type: 'other',
          initValue: () => console.log('enter expand')
        },
        {
          name: 'onExpand',
          type: 'other',
          initValue: () => console.log('expand')
        },
        {
          name: 'onFilter',
          type: 'other',
          initValue: () => console.log('filter')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'renderOptionList',
          type: 'other',
          initValue: 'option list'
        },
        {
          name: 'renderResult',
          type: 'other',
          initValue: 'result'
        },
        {
          name: 'renderUnmatched',
          type: 'other',
          initValue: 'unmatched'
        },
        {
          name: 'treeData',
          type: 'other',
          initValue: [
            {
              id: 1,
              name: 'name1',
              children: [
                {
                  id: 2,
                  name: 'name2'
                }
              ]
            },
            {
              id: 3,
              name: 'name3',
              children: [
                {
                  id: 4,
                  name: 'name4'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  Slider: {
    Slider: {
      element: (props: any) => <Slider {...props} />,
      code: `<Slider#placeholder />`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 300 },
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'formatScale',
          type: 'select',
          value: ['false', '(v) => `${v} px`'],
        },
        {
          name: 'formatValue',
          type: 'select',
          value: ['false', '(v) => `${v} px`']
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onIncrease',
          type: 'other',
          initValue: () => console.log('increase')
        },
        {
          name: 'scale',
          type: 'inputWithArray',
          defaultValue: [0, 100]
        }
      ]
    }
  },
  Switch: {
    Switch: {
      element: (props: any) => <Switch {...props} />,
      code: `<Switch#placeholder />`,
      properties: [
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'content',
          type: 'other',
          initValue: ['off', 'on']
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
      ]
    }
  },
  Textarea: {
    Textarea: {
      element: (props: any) => <Textarea {...props} />,
      code: `<Textarea#placeholder />`,
      properties: [
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'info',
          type: 'number',
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onEnterPress',
          type: 'other',
          initValue: () => console.log('enter press')
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'renderFooter',
          type: 'other',
          initValue: () => 'footer'
        },
      ]
    }
  },
  Transfer: {
    Transfer: {
      element: (props: any) => {
        const data: { id: string; name: string }[] = [];
        for (let i = 0; i < 10; i++) {
          data.push({
            id: `id-${i}`,
            name: `name-${i + 1}`,
          });
        }
        return (
          <Transfer {...props} data={data} keygen='id' />
        )
      },
      code: `<Transfer data={data} keygen='id'#placeholder />`,
      exclude: ['itemClass', 'listClassName'],
      properties: [
        {
          name: 'renderItem',
          type: 'input',
          defaultValue: 'name'
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'disabled',
          type: 'select',
          value: ['false', 'true', '(d) => d?.id === "id-1"'],
        },
        {
          name: 'empty',
          type: 'other',
          initValue: 'empty'
        },
        {
          name: 'footers',
          type: 'other',
          initValue: ['footer left', 'footer right']
        },
        {
          name: 'loading',
          type: 'switch',
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onFilter',
          type: 'other',
          initValue: () => console.log('filter')
        },
        {
          name: 'onSearch',
          type: 'other',
          initValue: () => console.log('search')
        },
        {
          name: 'onSelectChange',
          type: 'other',
          initValue: () => console.log('select change')
        },
        {
          name: 'operations',
          type: 'other',
          initValue: ['to left', 'to right']
        },
        {
          name: 'searchPlaceholder',
          type: 'other',
          initValue: ['left placeholder', 'right placeholder']
        },
        {
          name: 'titles',
          type: 'other',
          initValue: ['left title', 'right title']
        }
      ]
    }
  },
  TreeSelect: {
    TreeSelect: {
      element: (props: any) => {
        const data = [
          {
            id: '0',
            children: [
              {
                id: '0-0',
                children: [
                  {
                    id: '0-0-0',
                  },
                ],
              },
              {
                id: '0-1',
                children: [
                  {
                    id: '0-1-0',
                  },
                ],
              },
            ],
          }
        ]
        return (
          <TreeSelect {...props} keygen='id' data={data} renderItem={(d: any) => d.id} />
        )
      },
      code: `<TreeSelect keygen='id' data={data} renderItem={(d: any) => d.id}#placeholder />`,
      exclude: ['compressedClassName', 'resultClassName'],
      properties: [
        {
          name: 'absolute',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'childrenKey',
          type: 'input',
          defaultValue: 'children'
        },
        {
          name: 'compressed',
          type: 'select',
          value: ['false', 'true', 'no-repeat'],
          defaultValue: false
        },
        {
          name: 'disabled',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'empty',
          type: 'other',
          initValue: 'empty'
        },
        {
          name: 'innerTitle',
          type: 'other',
          initValue: 'inner title'
        },
        {
          name: 'loading',
          type: 'select',
          value: ['true', 'false', 'loading'],
        },
        {
          name: 'mode',
          type: 'select',
          value: [0, 1, 2, 3,  4],
          defaultValue: 1
        },
        {
          name: 'onBlur',
          type: 'other',
          initValue: () => console.log('blur')
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        },
        {
          name: 'onEnterExpand',
          type: 'other',
          initValue: () => console.log('enter expand')
        },
        {
          name: 'onExpand',
          type: 'other',
          initValue: () => console.log('expand')
        },
        {
          name: 'onFilter',
          type: 'other',
          initValue: (text: string) => (d: any) => d.id.indexOf(text) >= 0
        },
        {
          name: 'onFocus',
          type: 'other',
          initValue: () => console.log('focus')
        },
        {
          name: 'renderResult',
          type: 'other',
          initValue: (d: any) => `${d.id} render result`
        },
        {
          name: 'renderUnmatched',
          type: 'other',
          initValue: (d: any) => `${d.id} render unmatched`
        }
      ]
    },
    TreeSelectRef: {
      hide: true
    }
  },
  Upload: {
    Upload: {
      element: (props: any) => (
        <Upload {...props}>
          <Button>Upload</Button>
        </Upload>
      ),
      code: `<Upload {...props}>
  <Button>Upload</Button>
</Upload>`,
      properties: [
        {
          name: 'action',
          type: 'input',
        },
        {
          name: 'beforeCancel',
          type: 'other',
          initValue: () => console.log('before cancel')
        },
        {
          name: 'beforeChange',
          type: 'other',
          initValue: () => console.log('before change')
        },
        {
          name: 'beforeRemove',
          type: 'other',
          initValue: () => new Promise<void>((resolve) => {
            console.log('before remove');
            resolve();
          })
        },
        {
          name: 'beforeUpload',
          type: 'other',
          initValue: () => new Promise<void>((resolve) => {
            console.log('before upload');
            resolve();
          })
        },
        {
          name: 'canDelete',
          type: 'select',
          value: ['true', 'false', '(d) => true'],
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onErrorRemove',
          type: 'other',
          initValue: () => console.log('error remove')
        },
        {
          name: 'onHttpError',
          type: 'other',
          initValue: () => console.log('http error')
        },
        {
          name: 'onPreview',
          type: 'other',
          initValue: () => console.log('preview')
        },
        {
          name: 'onProgress',
          type: 'select',
          value: ['false', '(d) => console.log("process")'],
        },
        {
          name: 'onStart',
          type: 'other',
          initValue: () => console.log('start')
        },
        {
          name: 'onSuccess',
          type: 'other',
          initValue: () => console.log('success')
        },
        {
          name: 'removeConfirm',
          type: 'input',
        }
      ]
    },
    'Upload.Image': {
      hide: true
    },
    'Upload.Button': {
      element: (props: any) => (
        <Upload.Button {...props} />
      ),
      code: `<Upload.Button#placeholder />`,
      properties: [
        {
          name: 'placeholder',
          type: 'other',
          initValue: 'Click to upload'
        },
        {
          name: 'loading',
          type: 'other',
          initValue: 'Uploading...'
        }
      ]
    },
    UploadOptions: {
      hide: true
    },
    Validator: {
      hide: true
    }
  },
  Alert: {
    Alert: {
      element: (props: any) => (
        <Alert {...props}>This is a line of important text for alerting purposes</Alert>
      ),
      code: `<Alert#placeholder>This is a line of important text for alerting purposes</Alert>`,
      properties: [
        {
          name: 'closable',
          type: 'select',
          value: ['true', 'false', 'only'],
        },
        {
          name: 'closeItem',
          type: 'other',
          initValue: 'close'
        },
        {
          name: 'icon',
          type: 'select',
          value: ['true', 'false', 'icon'],
        },
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'title'
        },
      ]
    }
  },
  Badge: {
    Badge: {
      element: (props: any) => (
        <Badge {...props}>
          <Button>Badge</Button>
        </Badge>
      ),
      code: `<Badge#placeholder></Badge>`,
      properties: [
        {
          name: 'count',
          type: 'number',
        },
        {
          name: 'offset',
          type: 'other',
          initValue: [5, 5]
        },
        {
          name: 'text',
          type: 'other',
          initValue: 'text'
        }
      ]
    }
  },
  Drawer: {
    Drawer: {
      element: (props: any) => {
        const [visible, setVisible] = useState(false)

        return (
          <>
            <Button onClick={() => setVisible(true)}>Open</Button>
            <Drawer {...props} visible={visible} onClose={() => setVisible(false)}>
              {'Drawer content'}
            </Drawer>
          </>
        )
      },
      code: `<Drawer visible={visible} onClose={() => setVisible(false)}#placeholder>
  {'Drawer content'}
</Drawer>`,
      exclude: ['rootClassName'],
      properties: [
        {
          name: 'footer',
          type: 'other',
          initValue: 'footer'
        },
        {
          name: 'maskCloseAble',
          type: 'select',
          value: ['true', 'false', 'null'],
          defaultValue: true
        },
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'Drawer title'
        }
      ]
    }
  },
  Message: {
    Message: {
      element: (props: any) => {
        const { Message: messageProps, MessageOptions: messageOptionsProps } = props

        return (
          <Button
            onClick={() => {
              // @ts-ignore
              Message?.[messageProps.type](messageProps.content, messageProps.duration, {...messageOptionsProps})
            }}
          >
            Message
          </Button>
        )
      },
      merge: ['Message', 'MessageOptions'],
      properties: [
        {
          name: 'type',
          type: 'select',
          value: ['show', 'success', 'error', 'warning', 'info'],
          defaultValue: 'show'
        },
        {
          name: 'content',
          type: 'input',
        }
      ]
    },
    MessageOptions: {
      hide: true,
      properties: [
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        }
      ]
    }
  },
  Modal: {
    Modal: {
      element: (props: any) => {
        const [visible, setVisible] = useState(false)

        return (
          <>
            <Button onClick={() => setVisible(true)}>Modal</Button>
            <Modal {...props} visible={visible} onClose={() => setVisible(false)}>
              {'Modal content'}
            </Modal>
          </>
        )
      },
      code: `<Modal visible={visible} onClose={() => setVisible(false)}#placeholder>`,
      exclude: ['rootClassName'],
      properties: [
        {
          name: 'footer',
          type: 'other',
          initValue: 'footer'
        },
        {
          name: 'maskCloseAble',
          type: 'select',
          value: ['true', 'false', 'null'],
        },
        {
          name: 'onClose',
          type: 'other',
          initValue: () => console.log('close')
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'Modal title'
        }
      ]
    },
    ModalMethods: {
      hide: true
    }
  },
  Progress: {
    Progress: {
      element: (props: any) => <Progress {...props} />,
      code: `<Progress#placeholder />`,
      properties: [
        {
          name: 'style',
          type: 'textarea',
          defaultValue: { width: 400 },
        },
        {
          name: 'children',
          type: 'other',
          initValue: 'progress'
        },
        {
          name: 'color',
          type: 'input',
        },
        {
          name: 'shape',
          type: 'select',
          value: ['line', 'circle', 'line-pop', 'line-inner'],
          defaultValue: 'line'
        }
      ]
    }
  },
  Breadcrumb: {
    Breadcrumb: {
      element: (props: any) => {
        const {Breadcrumb: breadcrumbProps, BreadcrumbData: breadcrumbDataProps} = props

        const data = [
          {title: 'Home', ...breadcrumbDataProps},
          {title: 'List'},
          {title: 'Self'}
        ]

        return <Breadcrumb {...breadcrumbProps} data={data} />
      },
      merge: ['Breadcrumb', 'BreadcrumbData'],
      code: `<Breadcrumb data={data}#placeholder-Breadcrumb />`,
      properties: [
        {
          name: 'separator',
          type: 'input',
          defaultValue: '/'
        },
        {
          name: 'renderItem',
          type: 'other',
          initValue: (v: any) => `render ${v.title}`
        }
      ]
    },
    BreadcrumbData: {
      hide: true,
      properties: [
        {
          name: 'icon',
          type: 'other',
          initValue: 'icon'
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'title'
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        }
      ]
    }
  },
  Dropdown: {
    Dropdown: {
      element: (props: any) => {
        const data = [
          {
            content: 'Submenu',
            children: [
              {
                content: 'Option1'
              },
              {
                content: 'Option2',
                disabled: true,
              }
            ]
          },
          <a>Home</a>
        ]

        return (
          <Dropdown {...props} data={data} />
        )
      },
      code: `<Dropdown data={data}#placeholder />`,
      properties: [
        {
          name: 'placeholder',
          type: 'input',
          defaultValue: 'Dropdown'
        },
        {
          name: 'absolute',
          type: 'switch',
          defaultValue: false
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onCollapse',
          type: 'other',
          initValue: () => console.log('collapse')
        },
        {
          name: 'renderItem',
          type: 'other',
          initValue: (d: any) => `render ${d.content}`
        }
      ]
    },
    DropdownData: {
      hide: true,
    }
  },
  Link: {
    Link: {
      element: (props: any) => (
        <Link {...props}>Link</Link>
      ),
      code: `<Link#placeholder>Link</Link>`,
      properties: [
        {
          name: 'icon',
          type: 'select',
          value: ['true', 'false', 'icon'],
        },
        {
          name: 'underline',
          type: 'select',
          value: ['true', 'false', 'hover'],
        }
      ]
    }
  },
  Menu: {
    Menu: {
      element: (props: any) => {
        const data = [
          {
            id: '1',
            title: 'Home',
            link: '/'
          },
          {
            id: '2',
            title: 'List',
            children: [
              {
                id: '3',
                title: 'Option1',
                link: '/'
              }
            ]
          }
        ]

        return (
          <Menu {...props} keygen='id' data={data} renderItem={(d: any) => d.title} />
        )
      },
      code: `<Menu keygen='id' data={data} renderItem={(d: any) => d.title}#placeholder />`,
      properties: [
        {
          name: 'active',
          type: 'other',
          initValue: (d: any) => d.id === '1'
        },
        {
          name: 'disabled',
          type: 'other',
          initValue: (d: any) => d.id === '2'
        },
        {
          name: 'header',
          type: 'other',
          initValue: 'menu header'
        },
        {
          name: 'linkKey',
          type: 'input',
          defaultValue: 'link',
          notHideDefaultValue: true
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'onOpenChange',
          type: 'other',
          initValue: () => console.log('open change')
        },
        {
          name: 'renderIcon',
          type: 'other',
          initValue: (d: any) => `render ${d.title}`
        },
        {
          name: 'renderItem',
          type: 'other',
          initValue: (d: any) => `render ${d.title}`
        }
      ]
    }
  },
  Pagination: {
    Pagination: {
      element: (props: any) => (
        <Pagination {...props} />
      ),
      code: `<Pagination#placeholder />`,
      properties: [
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'pageSizeList',
          type: 'other',
          initValue: [10, 20, 30, 50, 100]
        },
        {
          name: 'text',
          type: 'other',
          initValue: {
            prev: 'render 上一页',
            next: 'render 下一页',
            page: 'render 页码',
            jumper: 'render 跳转'
          }
        },
        {
          name: 'layout',
          type: 'select',
          multiple: true,
          value: ['links', 'list', 'jumper', 'simple'],
        }
      ]
    }
  },
  Steps: {
    Steps: {
      element: (props: any) => {
        const { Steps: stepsProps, Step: stepProps } = props

        return (
          <Steps {...stepsProps}>
            <Steps.Step {...stepProps} />
            <Steps.Step title='Processing' />
            <Steps.Step title='Pending' />
          </Steps>
        )
      },
      code: `<Steps#placeholder-Steps>
  <Steps.Step#placeholder-Step />
  <Steps.Step title='Processing' />
  <Steps.Step title='Pending' />
</Steps>`,
      merge: ['Steps', 'Step'],
      properties: [
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'renderIcon',
          type: 'other',
          initValue: (index: number, status: any) => `render ${status}`
        }
      ]
    },
    Step: {
      hide: true,
      properties: [
        {
          name: 'title',
          type: 'input',
          defaultValue: 'Succeeded',
          notHideDefaultValue: true
        },
        {
          name: 'description',
          type: 'input',
        },
        {
          name: 'disabled',
          type: 'select',
          value: ['true', 'false', '(index) => index === 1'],
        },
        {
          name: 'onChange',
          type: 'other',
          initValue: () => console.log('change')
        },
        {
          name: 'onClick',
          type: 'other',
          initValue: () => console.log('click')
        },
        {
          name: 'renderIcon',
          type: 'other',
          initValue: (index: number, status: any) => `render ${status} icon`
        },
        {
          name: 'title',
          type: 'other',
          initValue: 'render title'
        },
      ]
    }
  }
}