import type { Breakpoint, BreakpointMap, ScreenMap, SubscribeFunc } from './responsiveObserve.type';

export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
  xxxl: '(min-width: 2000px)',
};

let subscribers: Array<{
  token: string;
  func: SubscribeFunc;
}> = [];

let subUid = -1;
let screens = {};

const responsiveObserve: {
  matchHandlers: any;
  dispatch: (screenMap: ScreenMap, breakpointChecked: Breakpoint) => boolean;
  register: () => void;
  subscribe: (func: SubscribeFunc) => string;
  unregister: () => void;
  unsubscribe: (token: string) => void;
} = {
  matchHandlers: {},
  dispatch(screenMap: ScreenMap, breakpointChecked: Breakpoint) {
    screens = screenMap;
    if (subscribers.length < 1) return false;
    subscribers.forEach((item) => item.func(screens, breakpointChecked));
    return true;
  },
  register() {
    Object.keys(responsiveMap).forEach((screen) => {
      const content = responsiveMap[screen as Breakpoint]!;
      const listener = ({ matches }: { matches: boolean }) =>
        this.dispatch(
          {
            ...screens,
            [screen]: matches,
          },
          screen as Breakpoint,
        );
      const status = window.matchMedia(content);
      status.addListener(listener);
      this.matchHandlers[content] = {
        status,
        listener,
      };
      listener(status);
    });
  },
  subscribe(func: SubscribeFunc) {
    if (subscribers.length === 0) this.register();
    const token = (++subUid).toString();
    subscribers.push({
      token,
      func,
    });
    func(screens);
    return token;
  },
  unregister() {
    Object.keys(responsiveMap).forEach((screen) => {
      const content = responsiveMap[screen as Breakpoint]!;
      const handler = this.matchHandlers[content];
      if (handler && handler.status && handler.listener)
        handler.status.removeListener(handler.listener);
    });
  },
  unsubscribe(token: string) {
    subscribers = subscribers.filter((item) => item.token !== token);
    if (subscribers.length === 0) this.unregister();
  },
};

export default responsiveObserve;
