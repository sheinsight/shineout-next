import Message from './message';

type RefMessage = typeof Message;

export interface MessageComponent extends RefMessage {
  displayName: string;
}

const MessageComp: MessageComponent = Message as MessageComponent;

MessageComp.displayName = 'ShineoutMessage';

export default MessageComp;
