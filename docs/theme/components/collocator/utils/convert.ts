import { ComponentType, type IItem } from "../types";
import { collocatorPreset } from "../preset";

export const stringConvert = (code: string) => Function('"use strict"; return (' + code + ')')();

export const inputValueConvert = (value: string) => (/^\d+$/).test(value) ? Number(value) : value

export const inputValueConvertByArray = (value: string) => {
  if ((/^\[((?:'[^']*'|\"[^\"]*\"|\d+)(?:,\s*(?:'[^']*'|\"[^\"]*\"|\d+))*)\]$/).test(value)) {
    const formatValue = value.replace(/'/g, '"')

    const array = JSON.parse(formatValue)

    if (Array.isArray(array)) return array
  }

  return value
}

const filterApiList = ['className', 'arrowClassName', 'keygen']

const typeMap: Record<string, ComponentType> = {
  'CSSProperties': ComponentType.TEXTAREA,
  'boolean': ComponentType.SWITCH,
  'string': ComponentType.INPUT,
  'number': ComponentType.NUMBER,
}

type ListItem = { [key: string]: any }

const deduplication = <T extends ListItem>(name: keyof T, list: T[]) => list.reduce((acc, current) => {
  const x = acc.find(item => item?.[name] === current?.[name]);
  if (!x) {
    acc.push(current);
  }
  return acc;
}, [] as T[])

const hasTargetPattern = (str: string) => {
  const pattern = /^(\s*\|\s*)?"[\w\s]+"(\s*\|\s*"[\w\s]+")*$/;
  const patternOther = /^\s*\|\s*"[a-zA-Z0-9-]+"(\s*\|\s*"[a-zA-Z0-9-]+")*\s*$/
  return pattern.test(str) || patternOther.test(str)
}

const extractValues = (str: string) => {
  const cleanedStr = str.replace(/\"/g, '').replace(/\s*\|\s*/g, '|').trim().replace(/^\|/, '');
  const values = cleanedStr.split('|').filter(Boolean)
  
  return values;
}

const defaultValueMap: Partial<Record<ComponentType, any>> = {
  [ComponentType.NUMBER]: (str: string) => Number(str),
  [ComponentType.SWITCH]: (str: string) => str === 'true' ? true : false,
}

const collocatorProperties = (list: any[], name: string, title: string) => list.map((item: any) => {
  if (filterApiList.includes(item.name) || collocatorPreset?.[name]?.[title]?.exclude?.includes(item.name)) return

  const originType = (item.type as string).trim()

  let type: ComponentType
  let value: (string | boolean)[]
  let defaultValue: string | boolean | number | undefined

  if (typeMap[originType]) {
    type = typeMap[originType]
    value = []
    defaultValue = item.tag.default ? (defaultValueMap[type] ? defaultValueMap[type](item.tag.default) : item.tag.default) : undefined
  } else if (originType === 'string | number') {
    type = ComponentType.INPUTWITHNUMBER
    value = []
    defaultValue = item.tag.default || item.tag.default === 0 ? inputValueConvert(item.tag.default) : undefined
  } else if (originType === 'string | string[]') {
    type = ComponentType.INPUTWITHARRAY
    value = []
    defaultValue = item.tag.default && inputValueConvertByArray(item.tag.default)
  } else if (hasTargetPattern(originType)) {
    type = ComponentType.SELECT
    value = extractValues(originType)

    defaultValue = item.tag.default.replace(/"/g, '')
  } else {
    return
  }

  return ({
    name: item.name,
    type: type,
    defaultValue,
    value
  })
}).filter((item: IItem | undefined) => item !== undefined) as IItem[]

const extractItem = (str: string) => {
  const parts = str.split('.');
  return parts.length > 1 ? parts[1] : str;
}

export const apiConvert = (apis: any[], name: string) => {

  const convertApi = apis.reduce((acc, cur) => {
    if (collocatorPreset?.[name]?.[cur.title]?.hide) {
      return ({
        ...acc,
        [cur.title]: {
          hide: true
        }
      })
    }

    const properties: IItem[] = collocatorProperties(cur.properties, name, cur.title)

    const mergeProperties: IItem[] = deduplication('name', [
      ...collocatorPreset?.[name]?.[cur.title]?.properties || [],
      ...properties,
    ])

    return ({
      ...acc,
      [cur.title]: {
        configurationItemList: !(collocatorPreset?.[name]?.[cur.title]?.merge && collocatorPreset?.[name]?.[cur.title]?.merge.length) ? mergeProperties : collocatorPreset?.[name]?.[cur.title]?.merge.reduce((prev: Record<string, IItem[]>, now: string) => {          
          if (now === cur.title) return ({
            ...prev,
            [extractItem(now)]: mergeProperties
          })

          const item = deduplication('name', [
            ...collocatorPreset?.[name]?.[now]?.properties || [],
            ...collocatorProperties(apis.find(item => item.title === now)?.properties, name, now),
          ])
          return ({
            ...prev,
            [extractItem(now)]: item
          })
        }, {}),
        element: collocatorPreset?.[name]?.[cur.title]?.element,
        code: collocatorPreset?.[name]?.[cur.title]?.code,
        merge: collocatorPreset?.[name]?.[cur.title]?.merge && collocatorPreset?.[name]?.[cur.title]?.merge.length,
        hide: collocatorPreset?.[name]?.[cur.title]?.hide,
      }
    })
  }, {})

  return convertApi
}

export const childConvert = (children: string, code: string): string => {
  const pattern = /^<(\w+)([^>#]*)#([\w-]+)\s*\/>$/;
  const match = code.match(pattern);

  if (match) {
    const tagName = match[1];
    const attributes = match[2];
    const identifier = match[3];
    return `<${tagName}${attributes}#${identifier}>${children}</${tagName}>`;
  } else {
    throw new Error("Input string does not match the expected format.");
  }
}