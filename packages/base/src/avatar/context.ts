import { createContext } from 'react';
import { AvatarGroupProps } from './avatar.type';

export type AvatarContextProps = Pick<AvatarGroupProps, 'shape' | 'size'>;

export const AvatarContext = createContext<AvatarContextProps>({});
