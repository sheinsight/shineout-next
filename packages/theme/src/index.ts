import Common from './common';
import Button from './button';
import Radio from './radio';
import Input from './input';
import Dropdown from './dropdown';
import Icon from './icon';
import Image from './image';

import { CommonTokens } from './common/type';
import { ButtonTokens } from './button/type';
import { RadioTokens } from './radio/type';
import { InputTokens } from './input/type';
import { DropdownTokens } from './dropdown/type';
import { IconTokens } from './icon/type';
import { ImageTokens } from './image/type';

export type ThemeTokens = CommonTokens &
  ButtonTokens &
  RadioTokens &
  InputTokens &
  DropdownTokens &
  IconTokens &
  ImageTokens;

const Token: ThemeTokens = {
  ...Common,
  ...Button,
  ...Radio,
  ...Input,
  ...Dropdown,
  ...Icon,
  ...Image,
};

export default Token;
