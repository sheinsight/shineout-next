import { generateUUID, docSize, devUseWarning } from '../utils';
import { getClosestPositionedContainer } from './dom/element';

type Timer = NodeJS.Timeout | null;

type LazyConfig = {
  container?: Element | null;
  element: Element;
  render: () => void;
  offscreen?: () => void;
  offset: number;
  noRemove?: boolean;
  observer?: IntersectionObserver;
};

const throttle = 80;
const components: { [x: string]: LazyConfig } = {};

let timeout: Timer = null;
let isLock = false;

const winHeight = docSize.height;

const getRect = (el: Element) => {
  // document or invalid element
  if (!el || !el.getBoundingClientRect) {
    if (el) {
      devUseWarning.error(`the ${el} is not a element`);
    }
    return { top: 0, bottom: winHeight };
  }

  return el.getBoundingClientRect();
};

export function dispatch() {
  if (isLock) return;
  isLock = true;

  // handle
  Object.keys(components).forEach((k) => {
    const { element, render, container, offset, noRemove } = components[k];
    const rect = element.getBoundingClientRect();
    const containerRect = getRect(container!);
    if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom)
      return;
    if (!noRemove) delete components[k];
    render();
  });

  isLock = false;
}

const handleScroll = () => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    dispatch();
    timeout = null;
  }, throttle);
};

export function removeStack(id?: string | null, removeListener?: boolean) {
  if (!id || !components[id]) return;
  const { observer, container } = components[id];
  const scrollEl = container || document;
  if (window.IntersectionObserver) {
    if (observer && observer.disconnect) observer.disconnect();
  } else if (removeListener) {
    scrollEl.removeEventListener('scroll', handleScroll);
  }
  delete components[id];
}

function getObserver(obj: LazyConfig, id: string) {
  const { container = null, element, offset, render, offscreen, noRemove } = obj;
  const fixedContainer = getClosestPositionedContainer(element, ['fixed', 'absolute']);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting || en.intersectionRatio > 0) {
          render();
          if (!noRemove) removeStack(id);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          offscreen && offscreen();
        }
      });
    },
    {
      root: fixedContainer || container,
      rootMargin: `${offset}px`,
    },
  );
  obj.observer = observer;
  return observer;
}

export function addStack(obj: LazyConfig) {
  const id = generateUUID();
  const scrollEl = obj.container || document;
  obj.offset = obj.offset || 0;
  if (window.IntersectionObserver) {
    components[id] = obj;
    const observer = getObserver(obj, id);
    observer.observe(obj.element);
    return id;
  }
  scrollEl.addEventListener('scroll', handleScroll, { passive: true });
  const rect = obj.element.getBoundingClientRect();
  const containerRect = getRect(obj.container!);

  if (
    rect.bottom + obj.offset < containerRect.top ||
    rect.top - obj.offset > containerRect.bottom
  ) {
    components[id] = obj;
    return id;
  }

  obj.render();
  if (obj.noRemove) {
    components[id] = obj;
    return id;
  }
  return null;
}
