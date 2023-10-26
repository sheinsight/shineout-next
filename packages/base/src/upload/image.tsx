import Upload from './upload';
import { UploadImageProps } from './image.type';

const Image = <T,>(props: UploadImageProps<T>) => {
  return (
    <Upload
      {...props}
      listType={'image'}
      imageStyle={{ ...props.imageStyle, width: props.width, height: props.height }}
    />
  );
};

export default Image;
