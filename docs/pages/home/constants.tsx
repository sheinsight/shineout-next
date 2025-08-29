const title = 'Shineout 3.0'

const description = '一个兼顾『美丽』和『流畅』，坚信优雅永不过时的 React 组件库'

import EcologyWithIcon from "./components/ecology-with-icon";
import { more1, more2, more3, more4, more5, more6, more7, more8, more9, axureIcon } from "./svg";
import type { IEcologyList } from "./types";

export const ecologyList: IEcologyList[] = [
  {
    title: '设计规范',
    list: [
      {
        title: 'PC端交互设计规范',
        target: 'https://sodoc.sheincorp.cn/doc-preview?columnId=187&originalId=1',
        icon: more1
      },
      {
        title: '移动端交互设计规范',
        target: 'https://sodoc.sheincorp.cn/doc-preview?columnId=307&originalId=9963',
        icon: more2
      },
    ]
  },
  {
    title: '设计资源',
    list: [
      {
        title: 'Shineout 3.0 Figma 资源',
        target: 'https://www.figma.com/design/acWMc9QdCPENEypcLFxZ9F/%E5%B1%B1%E8%8D%AF3.0%EF%BC%88%E4%BA%AE%E8%89%B2%E7%89%88%EF%BC%89?node-id=622-18065&p=f&m=dev',
        icon: more3
      },
      {
        title: '业务组件 Figma 资源',
        target: 'https://www.figma.com/design/LtGuzFPsSOLfcqyB6yICsL/%E4%B8%9A%E5%8A%A1%E7%BB%84%E4%BB%B6?node-id=77-157&p=f&m=dev',
        icon: more3
      },
      {
        title: '设计规范 Figma 资源',
        target: 'https://www.figma.com/design/0XlP9VPlMzA7aiJu88KY4i/%E7%BB%84%E4%BB%B6-%E9%A1%B5%E9%9D%A2%E8%A7%84%E8%8C%83?node-id=101-26&p=f&m=dev',
        icon: more3
      },
      {
        title: '移动端 3.0 Figma 资源',
        target: 'https://www.figma.com/design/p6T6pz3CDqXtJA97QKPgMb/%E7%A7%BB%E5%8A%A8%E7%AB%AF3.0?node-id=318-7603&t=whgDiP8o0AzcNI1u-1&fuid=1358637105456413607',
        icon: more3
      },
      {
        title:'Shineout Axure 元件库',
        target:'https://arc.sheincorp.cn/docs/2810122401493379072',
        icon: axureIcon
      }
    ]
  },
  {
    title: '生态产品',
    list: [
      {
        title: 'Shineout基础组件',
        target: 'https://sodoc.sheincorp.cn/shineout/cn/doc/shineout/start',
        icon: more4
      },
      {
        title: 'PC端业务组件',
        target: 'https://sodoc.sheincorp.cn/ue-doc',
        icon: more5
      },
      {
        title: 'Shineout Mobile基础组件',
        target: 'https://sm-master.biz.sheincorp.cn/zh/components/introduction',
        icon: more6
      },
      {
        title: '移动端业务组件',
        target: 'https://ue.dev.sheincorp.cn/components/biz/1615860616816',
        icon: more5
      },
      {
        title: '主题编辑器',
        target: 'https://shineout-pretty.sheincorp.cn/',
        icon: more7
      },
      {
        title: 'iconCreator图标库',
        target: 'https://ue-icon.opscn.sheincorp.cn/',
        icon: more8
      },
      {
        title: 'Playground代码生成平台',
        target: 'https://shineout-playground.sheincorp.cn/',
        icon: more9
      },
    ]
  },
  {
    title: '联系我们',
    list: [
      {
        title: (
          <EcologyWithIcon content='前端组件框架客服' />
        ),
      },
      {
        title: (
          <EcologyWithIcon content="B端设计客服" />
        )
      }
    ]
  }
]

const url =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar'

export {
  title,
  description,
  url
}