import Button from './button';
import { ButtonTokens } from './button/type';

import Checkbox from './checkbox';
import { CheckboxTokens } from './checkbox/type';

import Common from './common';
import { CommonTokens } from './common/type';

import Dropdown from './dropdown';
import { DropdownTokens } from './dropdown/type';

import Icon from './icon';
import { IconTokens } from './icon/type';

import Image from './image';
import { ImageTokens } from './image/type';

import Input from './input';
import { InputTokens } from './input/type';

import Popover from './popover';
import { PopoverTokens } from './popover/type';

import Radio from './radio';
import { RadioTokens } from './radio/type';

import Switch from './switch';
import { SwitchTokens } from './switch/type';

import Tabs from './tabs';
import { TabsTokens } from './tabs/type';

import Tag from './tag';
import { TagTokens } from './tag/type';

import Textarea from './textarea';
import { TextareaTokens } from './textarea/type';

export type ThemeTokens = ButtonTokens &
  CheckboxTokens &
  CommonTokens &
  DropdownTokens &
  IconTokens &
  ImageTokens &
  InputTokens &
  PopoverTokens &
  RadioTokens &
  SwitchTokens &
  TabsTokens &
  TagTokens &
  TextareaTokens;

const Token: ThemeTokens = {
  ...Button,
  ...Checkbox,
  ...Common,
  ...Dropdown,
  ...Icon,
  ...Image,
  ...Input,
  ...Popover,
  ...Radio,
  ...Switch,
  ...Tabs,
  ...Tag,
  ...Textarea,
};

export default Token;
