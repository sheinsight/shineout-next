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

import Progress from './progress';
import { ProgressTokens } from './progress/type';

import Radio from './radio';
import { RadioTokens } from './radio/type';

import Rate from './rate';
import { RateTokens } from './rate/type';

import Select from './select';
import { SelectTokens } from './select/type';

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

import Transfer from './transfer';
import { TransferTokens } from './transfer/type';

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
  ProgressTokens &
  RadioTokens &
  RateTokens &
  SelectTokens &
  SpinTokens &
  SwitchTokens &
  TabsTokens &
  TagTokens &
  TextareaTokens &
  TooltipTokens &
  UploadTokens &
  TransferTokens;

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
  ...Progress,
  ...Radio,
  ...Rate,
  ...Select,
  ...Spin,
  ...Switch,
  ...Tabs,
  ...Tag,
  ...Textarea,
  ...Tooltip,
  ...Upload,
  ...Transfer,
};

export type { TokenType };
export { Token };

export default Tokens;
