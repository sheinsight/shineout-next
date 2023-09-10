import Tag from './tag';
import TagInput from './tag-input';

type RefTag = typeof Tag;
export interface TagComponent extends RefTag {
  Input: typeof TagInput;
  displayName: string;
}

(Tag as TagComponent).displayName = 'ShineoutTag';
(Tag as TagComponent).Input = TagInput;

export default Tag as TagComponent;
