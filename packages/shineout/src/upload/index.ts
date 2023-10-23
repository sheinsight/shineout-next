import Upload from './upload';

type RefUpload = typeof Upload;

export interface UploadComponent extends RefUpload {
  displayName: string;
}

const UploadComp: UploadComponent = Upload as UploadComponent;

UploadComp.displayName = 'ShineoutUpload';

export default UploadComp;
