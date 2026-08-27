"use client"
import { createContext } from 'react';
import { AvatarGroupProps } from './avatar.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';
import type { AvatarSemanticKey } from './avatar.type';

export type AvatarContextProps = Pick<AvatarGroupProps, 'shape' | 'size'> & {
  semClass?: SemanticClassFn<AvatarSemanticKey>;
  semStyle?: SemanticStyleFn<AvatarSemanticKey>;
};

export const AvatarContext = createContext<AvatarContextProps>({});
