import Upload from './upload';
import UploadImage from './image';
import UploadButton from './button';

type RefUpload = typeof Upload;
type RefUploadImage = typeof UploadImage;
type RefUploadButton = typeof UploadButton;

export interface UploadComponent extends RefUpload {
  displayName: string;
  Image: UploadImageComponent;
  Button: UploadButtonComponent;
}

export interface UploadImageComponent extends RefUploadImage {
  displayName: string;
}

export interface UploadButtonComponent extends RefUploadButton {
  displayName: string;
}

const UploadImageComp: UploadImageComponent = UploadImage as UploadImageComponent;
UploadImageComp.displayName = 'ShineoutUploadImage';

const UploadButtonComp: UploadButtonComponent = UploadButton as UploadButtonComponent;
UploadButtonComp.displayName = 'ShineoutUploadButton';

const UploadComp: UploadComponent = Upload as UploadComponent;

UploadComp.displayName = 'ShineoutUpload';
UploadComp.Image = UploadImageComp;
UploadComp.Button = UploadButtonComp;

export default UploadComp;
