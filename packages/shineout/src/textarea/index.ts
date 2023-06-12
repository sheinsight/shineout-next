import Textarea from './textarea';

type RefTextarea = typeof Textarea;
interface TextareaComponent extends RefTextarea {
  displayName: string;
}

(Textarea as TextareaComponent).displayName = 'ShineoutTextarea';
export default Textarea as TextareaComponent;
