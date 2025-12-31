// import clsx from 'clsx';
import React from 'react';
import Message from './message';
import { getDefaultContainer } from '../config';
import { util } from '@sheinx/hooks';
import { MessageProps } from './message.type';

let lastContainer: HTMLElement | null = null;
const elements = {} as { [type: string]: HTMLElement };
const components = {} as {
  [type: string]: Message | null;
};

const getContainer = (container?: (() => HTMLElement) | HTMLElement) => {
  let target = util.isFunc(container) ? container() : container;
  if (target instanceof HTMLElement) return target;
  return getDefaultContainer();
};

export const destroy = (position: string) => {
  const component = components[position];
  const element = elements[position];
  if (element) {
    util.ReactUnmount(element);
    if (element.parentNode) element.parentNode.removeChild(element);
    delete elements[position];
  }
  if (component) {
    delete components[position];
  }
};

interface Params {
  position: string;
  container?: (() => HTMLElement) | HTMLElement;
  rootClassName?: string;
  jssStyle: MessageProps['jssStyle'];
}
export function getComponent(params: Params) {
  const { position, container, rootClassName, jssStyle } = params;
  return new Promise<Message>((resolve) => {
    const target = getContainer(container);
    if (lastContainer && lastContainer !== target) {
      destroy(position);
    }
    lastContainer = target;
    const component = components[position!];
    if (component) {
      resolve(component);
    } else {
      const div = document.createElement('div');
      div.className = rootClassName || '';
      elements[position] = div;
      if (target) {
        target.appendChild(div);
      }
      util.ReactRender(
        <Message
          ref={(comp) => {
            if (!comp) return;
            components[position] = comp;
            resolve(comp!);
          }}
          position={position}
          onDestroy={destroy.bind(null, position)}
          jssStyle={jssStyle}
        />,
        div,
      );
    }
  });
}

export default Message;
