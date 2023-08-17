import { cleanup, screen, waitFor, render, fireEvent, act } from '@testing-library/react';
import Image from '..';
import mountTest from '../../tests/mountTest';
import renderImage, { imageSnapshotTest } from '../../tests/renderTest';
import { styleTest, classTest, attributesTest } from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import {
  displayTest,
  classContentTest,
  textContentTest,
  hasAttributesTest,
} from '../../tests/utils';
import ImageBase from '../__example__/s-001-base';
import ImageGroup from '../__example__/s-007-group-2';
import ImgaeLazy from '../__example__/s-008-lazy-1';

const SO_PREFIX = 'image';
const imageClassName = `.${SO_PREFIX}-image-0-2-6`;
const imageImgClassName = `${SO_PREFIX}-img-0-2-7`;
const imageInnerClassName = `.${SO_PREFIX}-inner-0-2-8`;
const imageCenterClassName = `${SO_PREFIX}-center-0-2-14`;
const imageStretchClassName = `${SO_PREFIX}-stretch-0-2-15`;
const imageFillClassName = `${SO_PREFIX}-fill-0-2-10`;
const imageFitClassName = `${SO_PREFIX}-fit-0-2-9`;
const imageRoundedClassName = `${SO_PREFIX}-rounded-0-2-17`;
const imageDefaultPlaceholderClassName = `.${SO_PREFIX}-defaultPlaceholder-0-2-20`;
const imagePlaceholderClassName = `.${SO_PREFIX}-placeholder-0-2-19`;
const imageHrefClassName = `${SO_PREFIX}-href-0-2-5`;
const imagePreviewClassName = `${SO_PREFIX}-preview-0-2-13`;
const imagePreviewMaskClassName = `.${SO_PREFIX}-previewMask-0-2-11`;
const imageDownloadClassName = `${SO_PREFIX}-download-0-2-12`;
const imageGroupClassName = `.${SO_PREFIX}-group-0-2-33`;
const imageGroupPileClassName = `${SO_PREFIX}-groupPile-0-2-34`;
const imageGroupPileItemClassName = `.${SO_PREFIX}-groupPileItem-0-2-35`;
const imageGroupCountClassName = `.${SO_PREFIX}-groupCount-0-2-36`;
const imageGalleryClassName = `${SO_PREFIX}-gallery-0-2-26`;
const imageDefaultErrorClassName = `.${SO_PREFIX}-defaultError-0-2-21`;
const imageErrorClassName = `.${SO_PREFIX}-error-0-2-22`;
const imgFitArray = ['center', 'stretch'];
const divFitArray = ['fill', 'fit'];
const shapeArray = ['rounded', 'circle', 'thumbnail'];
const targetNoPreArray = ['_blank', '_self'];
const targetArray = ['_modal', '_download', ...targetNoPreArray];
const height = 128;
const width = 128;
const imageUrl =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png';
const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
];
type ImageShapeType = 'rounded' | 'circle' | 'thumbnail';
type ImageFitType = 'fill' | 'center' | 'fit' | 'stretch';
type ImageTargetType = '_self' | '_blank' | '_modal' | '_download';

afterEach(cleanup);
describe('Image[Base]', () => {
  mountTest(Image);
  displayTest(Image, 'ShineoutImage');
  imageSnapshotTest(<ImageBase />);
  imgFitArray.forEach((fit) => {
    test(`should render correct dom structure when set fit is ${fit}`, async () => {
      const { container } = renderImage(<Image fit={fit as ImageFitType} src={imageUrl}></Image>);
      await waitFor(() => {
        const img = container.querySelector(imageClassName);
        expect(screen.getByRole('img')).toBeTruthy();
        const imgContent = img.querySelector(imageInnerClassName);
        expect(imgContent).toBeTruthy();
        classLengthTest(imgContent, 'img', 1);
        classTest(img, fit === 'center' ? imageCenterClassName : imageStretchClassName);
        classTest(img, imageRoundedClassName);
        styleTest(img, 'width: 100%; padding-bottom: 100%;');
        const imgMain = container.querySelector('img')!;
        attributesTest(imgMain, 'draggable', 'true');
        attributesTest(imgMain, 'class', imageImgClassName);
      });
    });
  });
  divFitArray.forEach((fit) => {
    test(`should render correct dom structure when set fit is ${fit}`, async () => {
      const { container } = renderImage(<Image fit={fit as ImageFitType} src={imageUrl}></Image>);
      await waitFor(() => {
        const img = container.querySelector(imageClassName);
        const imgContent = img.querySelector(imageInnerClassName);
        expect(imgContent).toBeTruthy();
        classTest(img, fit === 'fill' ? imageFillClassName : imageFitClassName);
        classTest(img, imageRoundedClassName);
        styleTest(img, 'width: 100%; padding-bottom: 100%;');
        styleTest(imgContent, `background-image: url(${imageUrl});`);
      });
    });
  });
  test('should render correct dom structure', async () => {
    const { container } = renderImage(<Image src={imageUrl} />);
    await waitFor(() => {
      const img = container.querySelector(imageClassName);
      const imgContent = img.querySelector(imageInnerClassName);
      classLengthTest(imgContent, 'img', 1);
    });
  });
  test('should set width and height if through', async () => {
    const { container } = renderImage(
      <Image fit='fill' width={width} height={height} src={imageUrl}></Image>,
    );
    await waitFor(() => {
      styleTest(
        container.querySelector(imageClassName),
        `width: ${width}px; padding-bottom: ${height}px;`,
      );
    });
  });
  test('should render when image load error (only set error alt)', async () => {
    const img: { onload?: () => void; onerror?: () => void } = {};
    window.Image = jest.fn().mockImplementation(() => img);
    const { container } = renderImage(
      <Image fit='fill' width={128} height={128} alt='error'></Image>,
      true,
    );
    await waitFor(() => {
      const image = container.querySelector(imageClassName);
      expect(image.querySelector(imageDefaultErrorClassName)).toBeTruthy();
      classLengthTest(image, 'svg', 1);
    });
  });
  test('should render default placeholder', () => {
    const { container } = render(
      <Image fit='fill' width={width} height={height} src={imageUrl}></Image>,
    );
    classLengthTest(container, imageDefaultPlaceholderClassName, 1);
    classLengthTest(container, 'svg', 1);
  });
  test('should render when set placeholder', () => {
    const placeholder = ' demo';
    const { container } = render(
      <Image
        fit='fill'
        width={width}
        height={height}
        src={imageUrl}
        placeholder={placeholder}
      ></Image>,
    );
    classLengthTest(container, imagePlaceholderClassName, 1);
    textContentTest(container.querySelector(imagePlaceholderClassName)!, placeholder);
  });
  test('should render when set style and className', async () => {
    const className = 'demo';
    const styleRender: string = 'background-color: red; width: 128px; padding-bottom: 128px;';
    const { container } = renderImage(
      <Image
        fit='fill'
        width={width}
        height={height}
        src={imageUrl}
        className={className}
        style={{ backgroundColor: 'red' }}
      ></Image>,
    );
    await waitFor(() => {
      const component = container.querySelector(imageClassName)!;
      classTest(component, className);
      styleTest(component, styleRender);
    });
  });
});
describe('Image[Shape]', () => {
  shapeArray.forEach((shape) => {
    imageSnapshotTest(
      <Image
        shape={shape as ImageShapeType}
        fit='fill'
        width={width}
        height={height}
        src={imageUrl}
      ></Image>,
      `about shape is ${shape}`,
    );
    test(`should render when set shape is ${shape}`, async () => {
      const { container } = renderImage(
        <Image
          shape={shape as ImageShapeType}
          fit='fill'
          width={width}
          height={height}
          src={imageUrl}
        ></Image>,
      );
      await waitFor(() => {
        classContentTest(container.querySelector(imageClassName), shape);
      });
    });
  });
});
describe('Image[Alt]', () => {
  test('should render when set alt', async () => {
    const { container } = renderImage(<Image width={200} height={125} alt={imageUrl} />);
    await waitFor(() => {
      const img = container.querySelector('img');
      attributesTest(img, 'alt', imageUrl);
      attributesTest(img, 'src', imageUrl);
    });
  });
});
describe('Image[Target]', () => {
  const imageTarget = (target: string, clickFn?: jest.Mock<any, any, any>) => (
    <Image
      fit='fill'
      width={128}
      height={128}
      target={target as ImageTargetType}
      src={imageUrl}
      href={imageUrl}
      onClick={clickFn}
    ></Image>
  );
  targetArray.forEach((target) => {
    test(`should render base dom structure when set href and target is ${target}`, async () => {
      const { container } = renderImage(imageTarget(target));
      await waitFor(() => {
        classLengthTest(container, 'a', 1);
        const a = container.querySelector('a')!;
        classTest(a, imageHrefClassName);
        classLengthTest(a, imageInnerClassName, 1);
      });
    });
  });
  targetNoPreArray.forEach((target) => {
    test(`should render when target is ${target}`, async () => {
      const clickFn = jest.fn();
      const { container } = renderImage(imageTarget(target, clickFn));
      await waitFor(() => {
        const a = container.querySelector('a')!;
        classTest(a, imagePreviewClassName, false);
        attributesTest(a, 'target', target);
        attributesTest(a, 'href', imageUrl);
        classLengthTest(a, imagePreviewMaskClassName, 0);
        fireEvent.click(a);
        expect(clickFn.mock.calls.length).toBe(1);
      });
    });
  });
  test('should render when target is _modal', async () => {
    const clickFn = jest.fn();
    const { container } = renderImage(imageTarget('_modal', clickFn));
    await waitFor(() => {
      const a = container.querySelector('a')!;
      classTest(a, imagePreviewClassName);
      attributesTest(a, 'target', '_modal');
      classLengthTest(a, imagePreviewMaskClassName, 1);
      classLengthTest(container, 'img', 0);
      fireEvent.click(container.querySelector(imagePreviewMaskClassName));
      expect(clickFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when target is _download', async () => {
    const clickFn = jest.fn();
    const { container } = renderImage(imageTarget('_download', clickFn));
    await waitFor(() => {
      const a = container.querySelector('a')!;
      classTest(a, imageDownloadClassName);
      hasAttributesTest(a, 'download');
      attributesTest(a, 'target', '_self');
      classLengthTest(a, imagePreviewMaskClassName, 1);
      classLengthTest(container, 'img', 0);
      fireEvent.click(container.querySelector(imagePreviewMaskClassName));
      expect(clickFn.mock.calls.length).toBe(1);
    });
  });
});
describe('Image[Group]', () => {
  imageSnapshotTest(<ImageGroup />, 'about group');
  const RenderImageGroup = (props?: any) => (
    <Image.Group fit='fill' target='_modal'>
      {images.map((item, index) => {
        return (
          <Image
            key={index}
            width={128}
            height={128}
            src={item}
            href={item}
            target='_self'
            {...props}
          ></Image>
        );
      })}
    </Image.Group>
  );
  test('should wrap image use group', async () => {
    const { container } = renderImage(<ImageGroup />);
    await waitFor(() => {
      classLengthTest(container, 'a', images.length);
    });
  });
  test('should wrap image use group when set target in children', async () => {
    const { container } = renderImage(<RenderImageGroup />);
    await waitFor(() => {
      container.querySelectorAll('a').forEach((a: Element) => {
        attributesTest(a, 'target', '_modal');
      });
    });
  });
  test('should render when set style and className in group', async () => {
    const className = 'demo';
    const styleRender: string = 'background-color: red; width: 128px; padding-bottom: 128px;';
    const { container } = renderImage(
      <RenderImageGroup className={className} style={{ backgroundColor: 'red' }} />,
    );
    await waitFor(() => {
      const groups = container.querySelectorAll(imageClassName);
      groups.forEach((image: Element) => {
        classTest(image, className);
        styleTest(image, styleRender);
      });
    });
  });
  test('should render when set children in group', async () => {
    const children = <div>demo</div>;
    const { container } = renderImage(
      <Image.Group fit='fill' target='_modal'>
        {children}
      </Image.Group>,
    );
    await waitFor(() => {
      textContentTest(container.querySelector(imageGroupClassName), 'demo');
      const content = screen.getByText('demo');
      attributesTest(content, 'fit', 'fill');
      attributesTest(content, 'target', '_modal');
    });
  });
});
describe('Image[Pile]', () => {
  const imageGroup = (showCount: boolean = true, target?: string, onClick?: () => void) => (
    <Image.Group fit='fill' pile showCount={showCount} target={target as ImageTargetType} lazy>
      {images.map((item, index) => {
        return (
          <Image
            key={index}
            width={128}
            height={128}
            src={item}
            href={item}
            onClick={onClick}
          ></Image>
        );
      })}
    </Image.Group>
  );
  imageSnapshotTest(imageGroup(), 'about pile');
  imageSnapshotTest(imageGroup(false), 'about pile without showCount');
  test('should pile while has pile group', async () => {
    const { container } = renderImage(imageGroup(false));
    await waitFor(() => {
      const groups = container.querySelector(imageGroupClassName);
      classTest(groups, imageGroupPileClassName);
      classLengthTest(groups, 'a', 1);
      const a = container.querySelector('a');
      classTest(a, imageHrefClassName);
      classTest(a, imagePreviewClassName);
      // if set pile, image group will set target is _modal
      attributesTest(a, 'target', '_modal');
      classLengthTest(a, imagePreviewMaskClassName, 1);
      classLengthTest(container, imageGroupPileItemClassName, 2);
    });
  });
  test('should render when click pile', async () => {
    const clickFn = jest.fn();
    const { container } = renderImage(imageGroup(true, '_modal', clickFn));
    await waitFor(() => {
      const pre = container.querySelector(imageClassName)!;
      fireEvent.click(pre);
      expect(document.getElementsByClassName(imageGalleryClassName).length).toBe(1);
      expect(clickFn.mock.calls.length).toBe(1);
    });
  });
  test('should render when set showCount', async () => {
    const { container } = renderImage(imageGroup());
    await waitFor(() => {
      classLengthTest(container, imageGroupCountClassName, 1);
      textContentTest(container.querySelector(imageGroupCountClassName), '5');
    });
  });
  test('should render when set other target in pile', async () => {
    const { container } = renderImage(imageGroup(true, '_self'));
    await waitFor(() => {
      const a = container.querySelector('a');
      attributesTest(a, 'target', '_modal');
    });
  });
});
// TODO: error
describe('Image[Title]', () => {
  test('should set title', async () => {
    const title = 'Hello';
    const { container } = renderImage(<Image title={title} alt={'error'} />, true);
    await waitFor(() => {
      const image = container.querySelector(imageClassName);
      expect(image.querySelector(imageDefaultErrorClassName)).toBeTruthy();
      classLengthTest(image, 'svg', 0);
      textContentTest(image, 'Hello');
    });
  });
});
describe('Image[Preview]', () => {
  test('should render when preview', async () => {
    const { container } = renderImage(
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src={imageUrl}
        href={imageUrl}
      ></Image>,
    );
    await waitFor(() => {
      const pre = container.querySelector('svg')!;
      fireEvent.click(pre);
      expect(document.getElementsByClassName(imageGalleryClassName).length).toBe(1);
    });
  });
});
describe('Image[Href]', () => {
  test('should render when set href only', async () => {
    const { container } = renderImage(<Image href={imageUrl} />);
    await waitFor(() => {
      const a = container.querySelector('a');
      expect(a).toBeTruthy();
      classTest(a, imageHrefClassName);
      expect(a.querySelector(imageDefaultErrorClassName)).toBeTruthy();
    });
  });
});
describe('Image[OnError]', () => {
  test('should render when set onError', async () => {
    const errorFn = jest.fn();
    renderImage(<Image onError={errorFn} alt={'error'} />, true);
    await waitFor(() => {
      expect(errorFn.mock.calls.length).toBe(1);
    });
  });
});
describe('Image[Error]', () => {
  test('should render when set error', async () => {
    const errorText = 'error';
    const { container } = renderImage(<Image error={errorText} alt={'error'} />, true);
    await waitFor(() => {
      const error = container.querySelector(imageErrorClassName);
      expect(error).toBeTruthy();
      textContentTest(error, errorText);
    });
  });
});
describe('Image[AutoSSL]', () => {
  test('should render when set autoSSL', async () => {
    const img: { onload?: () => void; src?: string } = {};
    window.Image = jest.fn().mockImplementation(() => img);
    render(<Image fit='center' width={128} height={128} src={imageUrl} autoSSL={true}></Image>);
    act(() => {
      img.onload?.();
    });
    await waitFor(() => {
      expect(img.src).toBe(imageUrl.slice(6));
    });
  });
});
// TODO: lazy
describe('Image[Lazy]', () => {
  const mockFn = jest.fn();
  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set: mockFn,
    });
    HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        bottom: -10,
      } as DOMRect);
  });
  test('should render when set lazy', async () => {
    const img: { onload?: () => void; onerror?: () => void } = {};
    window.Image = jest.fn().mockImplementation(() => img);
    const { container } = render(<ImgaeLazy />);
    act(() => {
      img.onload?.();
    });
    HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        bottom: 10,
      } as DOMRect);
    // simulate scroll event
    const event = new UIEvent('scroll');
    event.initUIEvent('scroll', false, true);
    document.dispatchEvent(event);
    await waitFor(() => {
      classLengthTest(container, imageClassName, 4);
    });
  });
});
describe('Image[Container]', () => {
  test('should set container', async () => {
    const { container } = renderImage(
      <div id='container'>
        <Image lazy src={imageUrl} container='#container' />
      </div>,
    );
    await waitFor(() => {
      classLengthTest(container, imageInnerClassName, 1);
    });
  });
});
describe('Image[NoImgDrag]', () => {
  test('should render default', async () => {
    const { container } = renderImage(<Image src={imageUrl} />);
    await waitFor(() => {
      attributesTest(container.querySelector('img'), 'draggable', 'true');
    });
  });
  test('should render when set noImgDrag', async () => {
    const { container } = renderImage(<Image src={imageUrl} noImgDrag />);
    await waitFor(() => {
      attributesTest(container.querySelector('img'), 'draggable', 'false');
    });
  });
});
