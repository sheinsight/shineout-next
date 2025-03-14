import Upload from './upload';
import UploadImage from './image';
import UploadButton from './button';
import UploadDragger from './dragger';

type RefUpload = typeof Upload;
type RefUploadImage = typeof UploadImage;
type RefUploadButton = typeof UploadButton;
type RefUploadDragger = typeof UploadDragger;

export interface UploadComponent extends RefUpload {
  displayName: string;
  Image: UploadImageComponent;
  Button: UploadButtonComponent;
  Dragger: UploadDraggerComponent;
}

export interface UploadImageComponent extends RefUploadImage {
  displayName: string;
}

export interface UploadButtonComponent extends RefUploadButton {
  displayName: string;
}

export interface UploadDraggerComponent extends RefUploadDragger {
  displayName: string;
}


const UploadImageComp: UploadImageComponent = UploadImage as UploadImageComponent;
UploadImageComp.displayName = 'ShineoutUploadImage';

const UploadButtonComp: UploadButtonComponent = UploadButton as UploadButtonComponent;
UploadButtonComp.displayName = 'ShineoutUploadButton';

const UploadComp: UploadComponent = Upload as UploadComponent;
UploadComp.displayName = 'ShineoutUpload';

const UploadDraggerComp: UploadDraggerComponent = UploadDragger as UploadDraggerComponent;
UploadDraggerComp.displayName = 'ShineoutUploadDragger';

UploadComp.Image = UploadImageComp;
UploadComp.Button = UploadButtonComp;
UploadComp.Dragger = UploadDraggerComp;

export default UploadComp;
