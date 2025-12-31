import { useImageMagnify } from '@sheinx/hooks';
import { ImageMagnifyProps } from './image.type';
import clsx from 'clsx';

const ImageMagnify = (props: ImageMagnifyProps) => {
  const { jssStyle, ...rest } = props;
  const { loading, status, src, maxWidth, maxHeight, getRootProps } = useImageMagnify(rest);

  const rootProps = getRootProps();

  const galleryStyle = jssStyle?.image?.()

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
    <div className={clsx(galleryStyle?.magnify, status === 1 && galleryStyle?.magnifyZoomOut)} style={rootStyle} {...rootProps}>
      <img style={imgStyle} src={src} alt='' />
      {loading && renderLoading()}
    </div>
  );
};

export default ImageMagnify;
