import { useImageMagnify } from '@sheinx/hooks';
import { ImageMagnifyProps } from './image.type';

const ImageMagnify = (props: ImageMagnifyProps) => {
  const { className, ...rest } = props;
  const { loading, status, src, maxWidth, maxHeight, getRootProps } = useImageMagnify(rest);

  const rootProps = getRootProps();

  const renderLoading = () => {
    return <div></div>;
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
