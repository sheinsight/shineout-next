import { Input, getInputStyle } from '@soui/view';
import immer from 'immer';
const cs = getInputStyle((s) =>
  immer(s, (draft) => {
    draft.wrapper['& input'].color = 'red';
  }),
);
export default () => <Input customStyle={cs} placeholder='Label1' style={{ flex: 1 }} />;
