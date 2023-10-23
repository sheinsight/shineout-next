import Upload from './upload';
import UploadImage from './image';

type RefUpload = typeof Upload;
type RefUploadImage = typeof UploadImage;

export interface UploadComponent extends RefUpload {
  displayName: string;
  Image: UploadImageComponent;
}

export interface UploadImageComponent extends RefUploadImage {
  displayName: string;
}

const UploadImageComp: UploadImageComponent = UploadImage as UploadImageComponent;

UploadImageComp.displayName = 'ShineoutUploadImage';

const UploadComp: UploadComponent = Upload as UploadComponent;

UploadComp.displayName = 'ShineoutUpload';
UploadComp.Image = UploadImageComp;

export default UploadComp;
