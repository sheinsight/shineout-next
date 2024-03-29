import { Tokens as TokenType } from './token/type';
import Token from './token/token';
import setToken from './utils/token-setter';
import { setConfig } from './config';

import Alert from './alert';
import { AlertTokens } from './alert/type';

import Breadcrumb from './breadcrumb';
import { BreadcrumbTokens } from './breadcrumb/type';

import Button from './button';
import { ButtonTokens } from './button/type';

import Card from './card';
import { CardTokens } from './card/type';

import CardGroup from './card-group';
import { CardGroupTokens } from './card-group/type';

import Carousel from './carousel';
import { CarouselTokens } from './carousel/type';

import Cascader from './cascader';
import { CascaderTokens } from './cascader/type';

import Checkbox from './checkbox';
import { CheckboxTokens } from './checkbox/type';

import Collapse from './collapse';
import { CollapseTokens } from './collapse/type';

import Common from './common';
import { CommonTokens } from './common/type';

import DatePicker from './date-picker';
import { DatePickerTokens } from './date-picker/type';

import Descriptions from './descriptions';
import { DescriptionsTokens } from './descriptions/type';

import Divider from './divider';
import { DividerTokens } from './divider/type';

import Dropdown from './dropdown';
import { DropdownTokens } from './dropdown/type';

import EditableArea from './editable-area';
import { EditableAreaTokens } from './editable-area/type';

import Empty from './empty';
import { EmptyTokens } from './empty/type';

import Form from './form';
import { FormTokens } from './form/type';

import Icon from './icon';
import { IconTokens } from './icon/type';

import Image from './image';
import { ImageTokens } from './image/type';

import Input from './input';
import { InputTokens } from './input/type';

import List from './list';
import { ListTokens } from './list/type';

import Menu from './menu';
import { MenuTokens } from './menu/type';

import Message from './message';
import { MessageTokens } from './message/type';

import Modal from './modal';
import { ModalTokens } from './modal/type';

import Pagination from './pagination';
import { PaginationTokens } from './pagination/type';

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

import Slider from './slider';
import { SliderTokens } from './slider/type';

import Spin from './spin';
import { SpinTokens } from './spin/type';

import Steps from './steps';
import { StepsTokens } from './steps/type';

import Sticky from './sticky';
import { StickyTokens } from './sticky/type';

import Switch from './switch';
import { SwitchTokens } from './switch/type';

import Table from './table';
import { TableTokens } from './table/type';

import Tabs from './tabs';
import { TabsTokens } from './tabs/type';

import Tag from './tag';
import { TagTokens } from './tag/type';

import Textarea from './textarea';
import { TextareaTokens } from './textarea/type';

import Tooltip from './tooltip';
import { TooltipTokens } from './tooltip/type';

import Transfer from './transfer';
import { TransferTokens } from './transfer/type';

import Tree from './tree';
import { TreeTokens } from './tree/type';

import TreeSelect from './tree-select';
import { TreeSelectTokens } from './tree-select/type';

import Upload from './upload';
import { UploadTokens } from './upload/type';

export type ThemeTokens = AlertTokens &
  BreadcrumbTokens &
  ButtonTokens &
  CardTokens &
  CardGroupTokens &
  CarouselTokens &
  CascaderTokens &
  CheckboxTokens &
  CollapseTokens &
  CommonTokens &
  DatePickerTokens &
  DescriptionsTokens &
  DividerTokens &
  DropdownTokens &
  EditableAreaTokens &
  EmptyTokens &
  FormTokens &
  IconTokens &
  ImageTokens &
  InputTokens &
  ListTokens &
  MenuTokens &
  MessageTokens &
  ModalTokens &
  PaginationTokens &
  PopoverTokens &
  ProgressTokens &
  RadioTokens &
  RateTokens &
  SelectTokens &
  SliderTokens &
  SpinTokens &
  StepsTokens &
  StickyTokens &
  SwitchTokens &
  TableTokens &
  TabsTokens &
  TagTokens &
  TextareaTokens &
  TooltipTokens &
  TransferTokens &
  TreeTokens &
  TreeSelectTokens &
  UploadTokens;

const Tokens: ThemeTokens = {
  ...Alert,
  ...Breadcrumb,
  ...Button,
  ...Card,
  ...CardGroup,
  ...Carousel,
  ...Cascader,
  ...Checkbox,
  ...Collapse,
  ...Common,
  ...DatePicker,
  ...Descriptions,
  ...Divider,
  ...Dropdown,
  ...EditableArea,
  ...Empty,
  ...Form,
  ...Icon,
  ...Image,
  ...Input,
  ...List,
  ...Menu,
  ...Message,
  ...Modal,
  ...Pagination,
  ...Popover,
  ...Progress,
  ...Radio,
  ...Rate,
  ...Select,
  ...Slider,
  ...Spin,
  ...Steps,
  ...Sticky,
  ...Switch,
  ...Table,
  ...Tabs,
  ...Tag,
  ...Textarea,
  ...Tooltip,
  ...Transfer,
  ...Tree,
  ...TreeSelect,
  ...Upload,
};

export type { TokenType };
export * from './hooks';
export { Token, setToken, setConfig };

export default Tokens;
