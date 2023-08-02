import { useImageMagnify } from '@sheinx/hooks';
import { ImageMagnifyProps } from './image.type';

const ImageMagnify = (props: ImageMagnifyProps) => {
  const { className, src, ...rest } = props;
  const { loading, status, maxWidth, maxHeight, getRootProps } = useImageMagnify(rest);

  const rootProps = getRootProps();

  const renderLoading = () => {
    return <div>Loading...</div>;
  };

  const rootStyle = {
    maxWidth,
    maxHeight,
    overflow: status === 1 ? 'scroll' : undefined,
  };

  const imgStyle = {
    maxWidth: status === 1 ? undefined : maxWidth,
    maxHeight: status === 1 ? undefined : maxHeight,
  };

  return (
    <div className={className} style={rootStyle} {...rootProps}>
      <img style={imgStyle} src={src} alt='' />
      {loading && renderLoading()}
    </div>
  );
};

export default ImageMagnify;
