import { ReactNode } from 'react';

import { ImageJssStyleType } from '../image/image.type';

export interface BaseItemProps {
  jssStyle?: BaseItemJssStyle;
  desc: string;
  title?: string;
  className?: string;
  extra?: ReactNode[];
  avatar: ReactNode | (() => ReactNode);
  content?: ReactNode | (() => ReactNode);
}

export interface BaseItemClasses {
  baseItem: string;
  baseItemMeta: string;
  baseItemMetaIncludes: string;
  baseItemMetaContainer: string;
  baseItemMetaMeta: string;
  baseItemMetaAvatar: string;
  baseItemMetaTitle: string;
  baseItemMetaDesc: string;
  baseItemMetaCenter: string;
  baseItemMetaContent: string;
  baseItemExtra: string;
  baseItemExtraSplit: string;
}

export interface BaseItemJssStyle extends ImageJssStyleType {
  list?: () => BaseItemClasses;
}

export interface MetaProps {
  jssStyle?: BaseItemJssStyle;
  avatar: ReactNode | (() => ReactNode);
  title?: string;
  desc: string;
  content?: ReactNode | (() => ReactNode);
  className?: string;
}

export interface ExtraProps {
  jssStyle?: BaseItemJssStyle;
  extra: ReactNode[];
}
