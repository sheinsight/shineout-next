import { Tokens as TokenType } from './token/type';
import Token from './token/token';

import Alert from './alert';
import { AlertTokens } from './alert/type';

import Button from './button';
import { ButtonTokens } from './button/type';

import Carousel from './carousel';
import { CarouselTokens } from './carousel/type';

import Checkbox from './checkbox';
import { CheckboxTokens } from './checkbox/type';

import Common from './common';
import { CommonTokens } from './common/type';

import DatePicker from './date-picker';
import { DatePickerTokens } from './date-picker/type';

import Divider from './divider';
import { DividerTokens } from './divider/type';

import Dropdown from './dropdown';
import { DropdownTokens } from './dropdown/type';

import EditableArea from './editable-area';
import { EditableAreaTokens } from './editable-area/type';

import Empty from './empty';
import { EmptyTokens } from './empty/type';

import Icon from './icon';
import { IconTokens } from './icon/type';

import Image from './image';
import { ImageTokens } from './image/type';

import Input from './input';
import { InputTokens } from './input/type';

import Message from './message';
import { MessageTokens } from './message/type';

import Popover from './popover';
import { PopoverTokens } from './popover/type';

import Radio from './radio';
import { RadioTokens } from './radio/type';

import Spin from './spin';
import { SpinTokens } from './spin/type';

import Switch from './switch';
import { SwitchTokens } from './switch/type';

import Tabs from './tabs';
import { TabsTokens } from './tabs/type';

import Tag from './tag';
import { TagTokens } from './tag/type';

import Textarea from './textarea';
import { TextareaTokens } from './textarea/type';

import Tooltip from './tooltip';
import { TooltipTokens } from './tooltip/type';

import Upload from './upload';
import { UploadTokens } from './upload/type';

export type ThemeTokens = AlertTokens &
  ButtonTokens &
  CarouselTokens &
  CheckboxTokens &
  CommonTokens &
  DatePickerTokens &
  DividerTokens &
  DropdownTokens &
  EditableAreaTokens &
  EmptyTokens &
  IconTokens &
  ImageTokens &
  InputTokens &
  MessageTokens &
  PopoverTokens &
  RadioTokens &
  SpinTokens &
  SwitchTokens &
  TabsTokens &
  TagTokens &
  TextareaTokens &
  TooltipTokens &
  UploadTokens;

const Tokens: ThemeTokens = {
  ...Alert,
  ...Button,
  ...Carousel,
  ...Checkbox,
  ...Common,
  ...DatePicker,
  ...Divider,
  ...Dropdown,
  ...EditableArea,
  ...Empty,
  ...Icon,
  ...Image,
  ...Input,
  ...Message,
  ...Popover,
  ...Radio,
  ...Spin,
  ...Switch,
  ...Tabs,
  ...Tag,
  ...Textarea,
  ...Tooltip,
  ...Upload,
};

export type { TokenType };
export { Token };

export default Tokens;
