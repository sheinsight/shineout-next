import EditableArea from './editable-area';

type RefEditableArea = typeof EditableArea;

export interface EditableAreaComponent extends RefEditableArea {
  displayName: string;
}

const EditableAreaComp: EditableAreaComponent = EditableArea as EditableAreaComponent;

EditableAreaComp.displayName = 'ShineoutEditableArea';

export default EditableAreaComp;
