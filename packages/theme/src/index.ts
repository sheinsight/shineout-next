import { Tokens as TokenType } from './token/type';
import CommonTokenMap, { CommonToken } from './token/token';
import setToken from './utils/token-setter';
import { setConfig } from './config';

import Alert, { Alert as defaultAlert } from './alert';
import { AlertTokens } from './alert/type';

import Avatar, { Avatar as defaultAvatar } from './avatar';
import { AvatarTokens } from './avatar/type';

import Badge, { Badge as defaultBadge } from './badge';
import { BadgeTokens } from './badge/type';

import Breadcrumb, { Breadcrumb as defaultBreadcrumb } from './breadcrumb';
import { BreadcrumbTokens } from './breadcrumb/type';

import Button, { Button as defaultButton } from './button';
import { ButtonTokens } from './button/type';

import Card, { Card as defaultCard } from './card';
import { CardTokens } from './card/type';

import CardGroup, { CardGroup as defaultCardGroup } from './card-group';
import { CardGroupTokens } from './card-group/type';

import Carousel, { Carousel as defaultCarousel } from './carousel';
import { CarouselTokens } from './carousel/type';

import Cascader, { Cascader as defaultCascader } from './cascader';
import { CascaderTokens } from './cascader/type';

import Checkbox, { Checkbox as defaultCheckbox } from './checkbox';
import { CheckboxTokens } from './checkbox/type';

import Collapse, { Collapse as defaultCollapse } from './collapse';
import { CollapseTokens } from './collapse/type';

import Common, { Common as defaultCommon } from './common';
import { CommonTokens } from './common/type';

import DatePicker, { DatePicker as defaultDatePicker } from './date-picker';
import { DatePickerTokens } from './date-picker/type';

import Descriptions, { Descriptions as defaultDescriptions } from './descriptions';
import { DescriptionsTokens } from './descriptions/type';

import Divider, { Divider as defaultDivider } from './divider';
import { DividerTokens } from './divider/type';

import Dropdown, { Dropdown as defaultDropdown } from './dropdown';
import { DropdownTokens } from './dropdown/type';

import EditableArea, { EditableArea as defaultEditableArea } from './editable-area';
import { EditableAreaTokens } from './editable-area/type';

import Empty, { Empty as defaultEmpty } from './empty';
import { EmptyTokens } from './empty/type';

import Form, { Form as defaultForm } from './form';
import { FormTokens } from './form/type';

import Icon, { Icon as defaultIcon } from './icon';
import { IconTokens } from './icon/type';

import Image, { Image as defaultImage } from './image';
import { ImageTokens } from './image/type';

import Input, { Input as defaultInput } from './input';
import { InputTokens } from './input/type';

import Link, { Link as defaultLink } from './link';
import { LinkTokens } from './link/type';

import List, { List as defaultList } from './list';
import { ListTokens } from './list/type';

import Menu, { Menu as defaultMenu } from './menu';
import { MenuTokens } from './menu/type';

import Message, { Message as defaultMessage } from './message';
import { MessageTokens } from './message/type';

import Modal, { Modal as defaultModal } from './modal';
import { ModalTokens } from './modal/type';

import Pagination, { Pagination as defaultPagination } from './pagination';
import { PaginationTokens } from './pagination/type';

import Popover, { Popover as defaultPopover } from './popover';
import { PopoverTokens } from './popover/type';

import Progress, { Progress as defaultProgress } from './progress';
import { ProgressTokens } from './progress/type';

import Radio, { Radio as defaultRadio } from './radio';
import { RadioTokens } from './radio/type';

import Rate, { Rate as defaultRate } from './rate';
import { RateTokens } from './rate/type';

import Select, { Select as defaultSelect } from './select';
import { SelectTokens } from './select/type';

import Skeleton, { Skeleton as defaultSkeleton } from './skeleton';
import { SkeletonTokens } from './skeleton/type';

import Slider, { Slider as defaultSlider } from './slider';
import { SliderTokens } from './slider/type';

import Spin, { Spin as defaultSpin } from './spin';
import { SpinTokens } from './spin/type';

import Steps, { Steps as defaultSteps } from './steps';
import { StepsTokens } from './steps/type';

import Sticky, { Sticky as defaultSticky } from './sticky';
import { StickyTokens } from './sticky/type';

import Switch, { Switch as defaultSwitch } from './switch';
import { SwitchTokens } from './switch/type';

import Table, { Table as defaultTable } from './table';
import { TableTokens } from './table/type';

import Tabs, { Tabs as defaultTabs } from './tabs';
import { TabsTokens } from './tabs/type';

import Tag, { Tag as defaultTag } from './tag';
import { TagTokens } from './tag/type';

import Textarea, { Textarea as defaultTextarea } from './textarea';
import { TextareaTokens } from './textarea/type';

import Tooltip, { Tooltip as defaultTooltip } from './tooltip';
import { TooltipTokens } from './tooltip/type';

import Transfer, { Transfer as defaultTransfer } from './transfer';
import { TransferTokens } from './transfer/type';

import Tree, { Tree as defaultTree } from './tree';
import { TreeTokens } from './tree/type';

import TreeSelect, { TreeSelect as defaultTreeSelect } from './tree-select';
import { TreeSelectTokens } from './tree-select/type';

import Upload, { Upload as defaultUpload } from './upload';
import { UploadTokens } from './upload/type';

export type ThemeTokens = AlertTokens &
  AvatarTokens &
  BadgeTokens &
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
  LinkTokens &
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
  SkeletonTokens &
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
  ...CommonTokenMap,
  ...Alert,
  ...Avatar,
  ...Badge,
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
  ...Link,
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
  ...Skeleton,
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

const ComponentTokenMap: ThemeTokens = {
  ...defaultAlert,
  ...defaultAvatar,
  ...defaultBadge,
  ...defaultBreadcrumb,
  ...defaultButton,
  ...defaultCard,
  ...defaultCardGroup,
  ...defaultCarousel,
  ...defaultCascader,
  ...defaultCheckbox,
  ...defaultCollapse,
  ...defaultCommon,
  ...defaultDatePicker,
  ...defaultDescriptions,
  ...defaultDivider,
  ...defaultDropdown,
  ...defaultEditableArea,
  ...defaultEmpty,
  ...defaultForm,
  ...defaultIcon,
  ...defaultImage,
  ...defaultInput,
  ...defaultLink,
  ...defaultList,
  ...defaultMenu,
  ...defaultMessage,
  ...defaultModal,
  ...defaultPagination,
  ...defaultPopover,
  ...defaultProgress,
  ...defaultRadio,
  ...defaultRate,
  ...defaultSelect,
  ...defaultSkeleton,
  ...defaultSlider,
  ...defaultSpin,
  ...defaultSteps,
  ...defaultSticky,
  ...defaultSwitch,
  ...defaultTable,
  ...defaultTabs,
  ...defaultTag,
  ...defaultTextarea,
  ...defaultTooltip,
  ...defaultTransfer,
  ...defaultTree,
  ...defaultTreeSelect,
  ...defaultUpload,
};

export type { TokenType };
export * from './hooks';
export { getTokenName } from './utils/css-var';
export * from './utils/css-var';
export { CommonToken, CommonTokenMap, ComponentTokenMap, setToken, setConfig };

export default Tokens;
