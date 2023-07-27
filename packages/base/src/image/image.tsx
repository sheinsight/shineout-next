// import { useImage } from '@sheinx/hooks';
// import classNames from 'classnames';
// import { ImageProps } from './image.type';

// const Image = (props: ImageProps) => {
//   const { width, height, style, className, href, ...rest } = props;

//   const rootProps = useImage(rest);

//   const rootClass = classNames([className]);
//   const Tag = href ? 'a' : 'div';

//   const rootStyle = Object.assign(style || {}, {
//     width,
//     height,
//   });

//   const imageInnerEl = <img src='' />;

//   return (
//     <Tag style={rootStyle} className={rootClass}>
//       {imageInnerEl}
//     </Tag>
//   );
// };

// export default Image;
