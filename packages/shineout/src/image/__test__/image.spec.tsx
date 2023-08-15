import { cleanup, screen, waitFor } from '@testing-library/react';
import Image from '..';
import mountTest from '../../tests/mountTest';
import renderImage, { imageSnapshotTest } from '../../tests/renderTest';
import { styleTest, classTest, attributesTest } from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import { displayTest } from '../../tests/utils';
import ImageBase from '../__example__/s-001-base';

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
const imgFitArray = ['center', 'stretch'];
const divFitArray = ['fill', 'fit'];

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
});
