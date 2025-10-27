export const getDataset = <T extends {}>(props?: T) => {
  if (!props) return {}
  const dataset: { [key: string]: T[keyof T] } = {}
  const keys = Object.keys(props) as Array<keyof T>
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as string
    if (key.startsWith('data-')) {
      dataset[key] = props[keys[i]]
    }
  }
  return dataset
}
