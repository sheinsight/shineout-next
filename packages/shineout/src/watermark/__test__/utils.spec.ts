import type { CSSProperties } from 'react';
import {
  FontGap,
  drawWatermark,
  getCanvasFont,
  getContentLines,
  getMarkSize,
  getStyleString,
  mergeFont,
} from '../../../../base/src/watermark/utils';
import { WatermarkFont } from '../../../../base/src/watermark/watermark.type';

const defaultFont: Required<WatermarkFont> = {
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

interface FillTextCall {
  text: string;
  x: number;
  y: number;
  textAlign: CanvasTextAlign;
}

interface CanvasContextMock extends CanvasRenderingContext2D {
  drawImage: jest.Mock;
  fillStyleAssignments: CanvasFillStrokeStyles['fillStyle'][];
  fillText: jest.Mock;
  fillTextCalls: FillTextCall[];
  fontAssignments: string[];
  rotate: jest.Mock;
}

interface CanvasRecord {
  canvas: HTMLCanvasElement;
  context: CanvasContextMock | null;
}

const createCanvasContext = (
  measureText = jest.fn(
    () =>
      ({
        width: 40,
        fontBoundingBoxAscent: 10,
        fontBoundingBoxDescent: 6,
      } as TextMetrics),
  ),
): CanvasContextMock => {
  const fillTextCalls: FillTextCall[] = [];
  const fillStyleAssignments: CanvasFillStrokeStyles['fillStyle'][] = [];
  const fontAssignments: string[] = [];
  let fillStyle: CanvasFillStrokeStyles['fillStyle'] = '';
  let font = '';
  let textAlign: CanvasTextAlign = 'start';
  const context = {
    get font() {
      return font;
    },
    set font(value: string) {
      font = value;
      fontAssignments.push(value);
    },
    fontAssignments,
    get fillStyle() {
      return fillStyle;
    },
    set fillStyle(value: CanvasFillStrokeStyles['fillStyle']) {
      fillStyle = value;
      fillStyleAssignments.push(value);
    },
    fillStyleAssignments,
    get textAlign() {
      return textAlign;
    },
    set textAlign(value: CanvasTextAlign) {
      textAlign = value;
    },
    textBaseline: 'alphabetic',
    fillText: jest.fn((text: string, x: number, y: number) => {
      fillTextCalls.push({ text, x, y, textAlign });
    }),
    fillTextCalls,
    measureText,
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
  };

  return context as unknown as CanvasContextMock;
};

const mockCanvasContexts = (nullContextAt: number[] = [], measureTexts: jest.Mock[] = []) => {
  const records: CanvasRecord[] = [];
  const nullContexts = new Set(nullContextAt);
  const getContext = jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(function (this: HTMLCanvasElement) {
      const context = nullContexts.has(records.length)
        ? null
        : createCanvasContext(measureTexts[records.length]);
      records.push({ canvas: this, context });
      return context;
    } as any);
  const toDataURL = jest
    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    .mockImplementation(function (this: HTMLCanvasElement) {
      return `data:image/png;${this.width}x${this.height}`;
    });

  return { getContext, records, toDataURL };
};

const getDrawImageDimensions = (call: unknown[]): number[] => {
  if (call.length === 3) {
    const source = call[0] as CanvasImageSource & { width: number; height: number };
    return [source.width, source.height];
  }
  if (call.length === 5) return call.slice(3, 5) as number[];
  if (call.length === 9) return [call[3], call[4], call[7], call[8]] as number[];
  return [Number.NaN];
};

const getDrawImageCalls = (records: CanvasRecord[]) =>
  records.flatMap((record) => record.context?.drawImage.mock.calls || []);

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Watermark utils', () => {
  test('should normalize string content to a line with the default font', () => {
    expect(getContentLines('Shineout', defaultFont)).toEqual([
      {
        text: 'Shineout',
        font: defaultFont,
      },
    ]);
    expect(getContentLines(undefined, defaultFont)).toEqual([]);
  });

  test('should normalize invalid runtime content without throwing', () => {
    expect(getContentLines(null as any, defaultFont)).toEqual([]);
    expect(getContentLines([null, {}, 42] as any, defaultFont)).toEqual([
      { text: '', font: defaultFont },
      { text: '', font: defaultFont },
      { text: '', font: defaultFont },
    ]);
  });

  test('should normalize arrays and merge each text line font', () => {
    expect(
      getContentLines(
        [
          'Shineout',
          { text: 'Watermark', font: { fontSize: 20, fontWeight: 'bold' } },
          { text: 'Fallback', font: { fontFamily: 'serif', fontSize: undefined } },
        ],
        defaultFont,
      ),
    ).toEqual([
      { text: 'Shineout', font: defaultFont },
      {
        text: 'Watermark',
        font: { ...defaultFont, fontSize: 20, fontWeight: 'bold' },
      },
      {
        text: 'Fallback',
        font: { ...defaultFont, fontFamily: 'serif' },
      },
    ]);
  });

  test('should merge only defined custom font values', () => {
    expect(
      mergeFont(defaultFont, {
        color: '#fff',
        fontSize: undefined,
        fontStyle: 'italic',
      }),
    ).toEqual({
      ...defaultFont,
      color: '#fff',
      fontStyle: 'italic',
    });
    expect(mergeFont(defaultFont)).toBe(defaultFont);
  });

  test('should build a canvas font with ratio-scaled size', () => {
    expect(getCanvasFont(defaultFont)).toBe('normal normal normal 16px sans-serif');
    expect(getCanvasFont({ ...defaultFont, fontStyle: 'none', fontWeight: 'bold' }, 2)).toBe(
      'normal normal bold 32px sans-serif',
    );
  });

  test('should measure multiline text with a three-pixel line gap and height fallback', () => {
    expect(FontGap).toBe(3);
    const context = {
      font: '',
      measureText: jest.fn(
        (text: string) =>
          ({
            width: text === 'Shineout' ? 80 : 40,
            fontBoundingBoxAscent: text === 'Shineout' ? 10 : 0,
            fontBoundingBoxDescent: text === 'Shineout' ? 2 : 0,
          } as TextMetrics),
      ),
    } as unknown as CanvasRenderingContext2D;
    const lines = getContentLines(
      ['Shineout', { text: 'Watermark', font: { fontSize: 20 } }],
      defaultFont,
    );

    expect(getMarkSize(context, lines, undefined)).toEqual([80, 35]);
  });

  test('should fall back to font size for non-finite text height', () => {
    const context = {
      font: '',
      measureText: jest.fn(
        () =>
          ({
            width: 50,
            fontBoundingBoxAscent: Number.NaN,
            fontBoundingBoxDescent: 2,
          } as TextMetrics),
      ),
    } as unknown as CanvasRenderingContext2D;

    expect(getMarkSize(context, getContentLines('Shineout', defaultFont), undefined)).toEqual([
      50, 16,
    ]);
  });

  test('should use default or explicit image dimensions', () => {
    const context = {} as CanvasRenderingContext2D;
    const image = 'watermark.png';

    expect(getMarkSize(context, [], image)).toEqual([120, 64]);
    expect(getMarkSize(context, [], image, 200, 100)).toEqual([200, 100]);
    expect(getMarkSize(context, [], image, 0, 0)).toEqual([0, 0]);
  });

  test.each([Number.NaN, Number.POSITIVE_INFINITY, -1])(
    'should treat invalid measured width %s as zero',
    (measuredWidth) => {
      const context = {
        font: '',
        measureText: jest.fn(
          () =>
            ({
              width: measuredWidth,
              fontBoundingBoxAscent: 10,
              fontBoundingBoxDescent: 2,
            } as TextMetrics),
        ),
      } as unknown as CanvasRenderingContext2D;

      expect(getMarkSize(context, getContentLines('Shineout', defaultFont), undefined)).toEqual([
        0, 12,
      ]);
    },
  );

  test('should return zero dimensions for empty text content', () => {
    const context = { measureText: jest.fn() } as unknown as CanvasRenderingContext2D;

    expect(getMarkSize(context, [], undefined)).toEqual([0, 0]);
    expect(context.measureText).not.toHaveBeenCalled();
  });

  test('should serialize camelCase style names as CSS declarations', () => {
    expect(
      getStyleString({
        backgroundColor: 'red',
        pointerEvents: 'none',
        WebkitMaskImage: 'none',
        zIndex: 9,
      }),
    ).toBe('background-color: red; pointer-events: none; -webkit-mask-image: none; z-index: 9;');
  });

  test('should preserve the leading hyphen for Microsoft CSS properties', () => {
    expect(getStyleString({ msOverflowStyle: 'none' } as CSSProperties)).toBe(
      '-ms-overflow-style: none;',
    );
  });

  test.each([
    ['left', 0],
    ['start', 0],
    ['center', 20],
    ['right', 40],
    ['end', 40],
  ] as const)('should draw %s-aligned text from the correct anchor', (textAlign, expectedX) => {
    const { records } = mockCanvasContexts();

    const tile = drawWatermark(
      [{ text: 'Shineout', font: { ...defaultFont, textAlign } }],
      0,
      1,
      40,
      20,
      10,
      10,
    );

    expect(tile).not.toBeNull();
    expect(records[0].context?.fillTextCalls).toEqual([
      { text: 'Shineout', x: expectedX, y: 0, textAlign },
    ]);
  });

  test('should advance multiline text using measured height and apply each line font', () => {
    const firstFont = { ...defaultFont, color: '#f00', fontSize: 10 };
    const secondFont = { ...defaultFont, color: '#00f', fontSize: 20 };
    const measureText = jest.fn(
      (text: string) =>
        ({
          width: 30,
          fontBoundingBoxAscent: text === 'First' ? 6 : 9,
          fontBoundingBoxDescent: text === 'First' ? 2 : 3,
        } as TextMetrics),
    );
    const { records } = mockCanvasContexts([], [measureText]);

    expect(
      drawWatermark(
        [
          { text: 'First', font: firstFont },
          { text: 'Second', font: secondFont },
        ],
        0,
        1,
        40,
        40,
        10,
        10,
      ),
    ).not.toBeNull();
    expect(measureText).toHaveBeenCalledTimes(2);
    expect(records[0].context?.fontAssignments).toEqual([
      getCanvasFont(firstFont),
      getCanvasFont(secondFont),
    ]);
    expect(records[0].context?.fillStyleAssignments).toEqual(['#f00', '#00f']);
    expect(records[0].context?.fillTextCalls.map(({ text, y }) => [text, y])).toEqual([
      ['First', 0],
      ['Second', 8 + FontGap],
    ]);
  });

  test('should size a 120-degree tile from all four rotated corners', () => {
    const { records } = mockCanvasContexts();

    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 120, 1, 40, 20, 10, 30),
    ).toEqual({
      dataURL: 'data:image/png;96x75',
      width: 96,
      height: 75,
    });
    expect(records.map(({ canvas }) => [canvas.width, canvas.height])).toEqual([
      [40, 20],
      [38, 45],
      [96, 75],
    ]);
    expect(records[1].context?.rotate).toHaveBeenCalledWith((Math.PI * 120) / 180);
    expect(records[2].context?.drawImage).toHaveBeenCalledTimes(3);
  });

  test.each([
    [0, 200, 100, 440, 140, 220, 70],
    [90, 100, 200, 240, 240, 120, 120],
    [180, 200, 100, 440, 140, 220, 70],
    [270, 100, 200, 240, 240, 120, 120],
    [360, 200, 100, 440, 140, 220, 70],
  ])(
    'should keep cardinal angle %i bitmap and CSS geometry stable',
    (
      rotate,
      markBitmapWidth,
      markBitmapHeight,
      tileBitmapWidth,
      tileBitmapHeight,
      cssWidth,
      cssHeight,
    ) => {
      const { records } = mockCanvasContexts();

      expect(
        drawWatermark([{ text: 'Shineout', font: defaultFont }], rotate, 2, 100, 50, 10, 20),
      ).toEqual({
        dataURL: `data:image/png;${tileBitmapWidth}x${tileBitmapHeight}`,
        width: cssWidth,
        height: cssHeight,
      });
      expect(records.map(({ canvas }) => [canvas.width, canvas.height])).toEqual([
        [200, 100],
        [markBitmapWidth, markBitmapHeight],
        [tileBitmapWidth, tileBitmapHeight],
      ]);
    },
  );

  test('should keep fractional-ratio canvas and drawImage bitmap dimensions integral', () => {
    const ratio = 1.5;
    const { records } = mockCanvasContexts();

    const tile = drawWatermark(
      [{ text: 'Shineout', font: defaultFont }],
      120,
      ratio,
      41,
      19,
      11.25,
      17.25,
    );

    expect(tile).not.toBeNull();
    expect(records.map(({ canvas }) => [canvas.width, canvas.height])).toEqual([
      [62, 29],
      [57, 69],
      [148, 95],
    ]);
    records.forEach(({ canvas }) => {
      expect(Number.isInteger(canvas.width)).toBe(true);
      expect(Number.isInteger(canvas.height)).toBe(true);
      expect(canvas.width).toBeGreaterThan(0);
      expect(canvas.height).toBeGreaterThan(0);
    });
    getDrawImageCalls(records).forEach((call) => {
      getDrawImageDimensions(call).forEach((dimension) => {
        expect(Number.isInteger(dimension)).toBe(true);
        expect(dimension).toBeGreaterThan(0);
      });
    });
    expect(tile!.width * ratio).toBe(records[2].canvas.width);
    expect(tile!.height * ratio).toBe(records[2].canvas.height);
    expect(tile!.dataURL).toBe('data:image/png;148x95');
    expect(records[2].context?.drawImage.mock.calls.map((call) => call.slice(5, 9))).toEqual([
      [8.5, 13, 57, 69],
      [82.5, -34.5, 57, 69],
      [82.5, 60.5, 57, 69],
    ]);
  });

  test('should draw an image at the requested bitmap dimensions', () => {
    const { records } = mockCanvasContexts();
    const image = document.createElement('img');

    expect(drawWatermark(image, 0, 1.5, 41, 19, 10, 10)).not.toBeNull();
    expect(records[0].context?.drawImage).toHaveBeenCalledWith(image, 0, 0, 62, 29);
  });

  test('should draw an image when the global HTMLImageElement constructor is unavailable', () => {
    const { records } = mockCanvasContexts();
    const image = document.createElement('img');
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'HTMLImageElement');
    Object.defineProperty(globalThis, 'HTMLImageElement', {
      configurable: true,
      value: undefined,
    });

    try {
      expect(() => drawWatermark(image, 0, 1, 40, 20, 10, 10)).not.toThrow();
      expect(records[0].context?.drawImage).toHaveBeenCalledWith(image, 0, 0, 40, 20);
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'HTMLImageElement', descriptor);
    }
  });

  test('should propagate canvas export errors', () => {
    const { toDataURL } = mockCanvasContexts();
    toDataURL.mockImplementation(() => {
      throw new Error('export failed');
    });

    expect(() =>
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, 1, 40, 20, 10, 10),
    ).toThrow('export failed');
  });

  test.each([
    ['ratio', 0, 40, 20],
    ['ratio', -1, 40, 20],
    ['width', 1, 0, 20],
    ['width', 1, -1, 20],
    ['height', 1, 40, 0],
    ['height', 1, 40, -1],
  ])('should reject a non-positive %s', (_parameter, ratio, width, height) => {
    const { records } = mockCanvasContexts();

    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, ratio, width, height, 10, 10),
    ).toBeNull();
    expect(records).toHaveLength(0);
  });

  test.each([Number.NaN, Number.POSITIVE_INFINITY])(
    'should reject %s in every numeric parameter',
    (invalidValue) => {
      const { records } = mockCanvasContexts();
      const validValues = [0, 1, 40, 20, 10, 10];

      validValues.forEach((_value, index) => {
        const values = [...validValues];
        values[index] = invalidValue;
        expect(
          drawWatermark(
            [{ text: 'Shineout', font: defaultFont }],
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5],
          ),
        ).toBeNull();
      });
      expect(records).toHaveLength(0);
    },
  );

  test('should allow a negative horizontal gap while the final tile remains positive', () => {
    const { records } = mockCanvasContexts();

    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, 1, 40, 20, -1, 10),
    ).not.toBeNull();
    expect(records[2].canvas.width).toBe(78);
    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, 1, 40, 20, -41, 10),
    ).toBeNull();
  });

  test.each([
    ['width', -40, 10],
    ['height', 10, -20],
  ])('should reject a non-positive final tile %s without zero-sized draws', (_axis, gapX, gapY) => {
    const { records } = mockCanvasContexts();

    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, 1, 40, 20, gapX, gapY),
    ).toBeNull();
    getDrawImageCalls(records).forEach((call) => {
      getDrawImageDimensions(call).forEach((dimension) => expect(dimension).toBeGreaterThan(0));
    });
  });

  test.each([0, 1, 2])('should return null when canvas context %i is unavailable', (index) => {
    const { records, toDataURL } = mockCanvasContexts([index]);

    expect(
      drawWatermark([{ text: 'Shineout', font: defaultFont }], 0, 1, 40, 20, 10, 10),
    ).toBeNull();
    expect(records[index].context).toBeNull();
    expect(toDataURL).not.toHaveBeenCalled();
  });
});
