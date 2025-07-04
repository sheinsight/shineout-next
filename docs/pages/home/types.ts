export interface IEcologyListItem {
  title: React.ReactNode,
  icon?: React.ReactNode
  target?: string
  onClick?: () => void
}

export interface IEcologyList {
  title: React.ReactNode,
  list: IEcologyListItem[]
}