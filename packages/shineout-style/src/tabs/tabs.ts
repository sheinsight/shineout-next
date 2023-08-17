// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TabsClass =
  | 'tabs'
  | 'panel'
  | 'tab'
  | 'header'
  | 'vertical'
  | 'verticalLeft'
  | 'verticalRight'
  | 'button'
  | 'line'
  | 'bordered'
  | 'card'
  | 'dash';

const tabsStyle: JsStyles<TabsClass> = {
  tabs: {},
  panel: {},
  tab: {
    display: 'inline-block',
  },
  header: {},
  vertical: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  verticalLeft: {},
  verticalRight: {},
  button: {},
  line: {},
  bordered: {},
  card: {},
  dash: {},
};

export default tabsStyle;
