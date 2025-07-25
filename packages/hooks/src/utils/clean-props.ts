import { produce } from './immer';

const names: string[] = [
  'delay',
  'onDatumBind',
  'rules',
  'formDatum',
  'forceChange',
  'trim',
  'beforeChange',
  'validateHook',
  'innerFormNamePath',
  'fieldSetValidate',
  'combineRules',
  'popoverProps',
  'inputFocus',
  'placeTitle',
  'cancelChange',
  'integerLimit',
  'autoSelect',
  'autoFix',
  'numType',
];

/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 * @returns {Produced<*, *>}
 */
export function cleanProps(props: { [x: string]: any }) {
  return produce(props, (draft) => {
    names.forEach((p) => delete draft[p]);
  });
}
