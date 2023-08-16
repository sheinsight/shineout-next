import { cleanup, screen, waitFor, render, fireEvent } from '@testing-library/react';
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

const SO_PREFIX = 'image';
const imageUrl =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png';
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
const imgFitArray = ['center', 'stretch'];
const divFitArray = ['fill', 'fit'];
const shapeArray = ['rounded', 'circle', 'thumbnail'];
const targetNoPreArray = ['_blank', '_self'];
const targetArray = ['_modal', '_download', ...targetNoPreArray];
const height = 128;
const width = 128;
const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
];

afterEach(cleanup);
describe('Image[Base]', () => {
  mountTest(Image);
  displayTest(Image, 'ShineoutImage');
  imageSnapshotTest(<ImageBase />);
  imgFitArray.forEach((fit) => {
    test(`should render correct dom structure when set fit is ${fit}`, async () => {
      const { container } = renderImage(<Image fit={fit} src={imageUrl}></Image>);
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
      const { container } = renderImage(<Image fit={fit} src={imageUrl}></Image>);
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
  // TODO: error
  test('should render when image load error', async () => {
    renderImage(<Image fit='fill' width={128} height={128} src='error'></Image>, true);
    await waitFor(() => {});
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
      <Image shape={shape} fit='fill' width={width} height={height} src={imageUrl}></Image>,
      `about shape is ${shape}`,
    );
    test(`should render when set shape is ${shape}`, async () => {
      const { container } = renderImage(
        <Image shape={shape} fit='fill' width={width} height={height} src={imageUrl}></Image>,
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
      target={target}
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
  test('should wrap image use group', async () => {
    const { container } = renderImage(<ImageGroup />);
    await waitFor(() => {
      classLengthTest(container, 'a', images.length);
    });
  });
  test('should wrap image use group when set target in children', async () => {
    const { container } = renderImage(
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
            ></Image>
          );
        })}
      </Image.Group>,
    );
    await waitFor(() => {
      container.querySelectorAll('a').forEach((a: Element) => {
        attributesTest(a, 'target', '_modal');
      });
    });
  });
});
describe('Image[Pile]', () => {
  const imageGroup = (showCount: boolean = true, target?: string) => (
    <Image.Group fit='fill' pile showCount={showCount} target={target} lazy>
      {images.map((item, index) => {
        return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
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
    renderImage(<Image title={title} src={imageUrl} />);
    await waitFor(() => {
      screen.debug();
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
// TODO: lazy
describe('Image[Lazy]', () => {
  test('should render when set lazy', () => {});
});
