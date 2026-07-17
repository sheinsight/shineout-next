import type { CSSProperties } from 'react';
import type { WatermarkContent, WatermarkFont } from './watermark.type';

export interface WatermarkContentLine {
  text: string;
  font: Required<WatermarkFont>;
}

interface WatermarkTile {
  dataURL: string;
  width: number;
  height: number;
}

export const FontGap = 3;
const DefaultImageWidth = 120;
const DefaultImageHeight = 64;

export function getCanvasFont(font: Required<WatermarkFont>, ratio = 1): string {
  const fontStyle = font.fontStyle === 'none' ? 'normal' : font.fontStyle;
  return `${fontStyle} normal ${font.fontWeight} ${font.fontSize * ratio}px ${font.fontFamily}`;
}

function measureLine(
  context: CanvasRenderingContext2D,
  line: WatermarkContentLine,
  ratio = 1,
): { width: number; height: number } {
  context.font = getCanvasFont(line.font, ratio);
  const textMetrics = context.measureText(line.text);
  const measuredHeight = textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
  const fallbackHeight = line.font.fontSize * ratio;

  return {
    width: Number.isFinite(textMetrics.width) && textMetrics.width > 0 ? textMetrics.width : 0,
    height:
      Number.isFinite(measuredHeight) && measuredHeight > 0
        ? measuredHeight
        : Number.isFinite(fallbackHeight) && fallbackHeight > 0
        ? fallbackHeight
        : 0,
  };
}

export function mergeFont(
  font: Required<WatermarkFont>,
  customFont?: WatermarkFont,
): Required<WatermarkFont> {
  if (!customFont) return font;

  return Object.entries(customFont).reduce(
    (merged, [key, value]) => (value === undefined ? merged : { ...merged, [key]: value }),
    { ...font },
  );
}

export function getContentLines(
  content: WatermarkContent | WatermarkContent[] | undefined,
  font: Required<WatermarkFont>,
): WatermarkContentLine[] {
  if (content === undefined || content === null) return [];

  const lines = Array.isArray(content) ? content : [content];

  return lines.map((line) => {
    if (typeof line === 'string') return { text: line, font };
    if (!line || typeof line !== 'object') return { text: '', font };
    return {
      text: typeof line.text === 'string' ? line.text : '',
      font: mergeFont(font, line.font),
    };
  });
}

export function getMarkSize(
  context: CanvasRenderingContext2D,
  content: WatermarkContentLine[],
  image: string | undefined,
  width?: number,
  height?: number,
): [number, number] {
  if (image) {
    return [width ?? DefaultImageWidth, height ?? DefaultImageHeight];
  }

  const metrics = content.map((line) => measureLine(context, line));
  const measuredWidth = metrics.reduce((max, metric) => Math.max(max, metric.width), 0);
  const measuredHeight = metrics.reduce(
    (total, metric, index) => total + metric.height + (index === 0 ? 0 : FontGap),
    0,
  );

  return [width ?? measuredWidth, height ?? measuredHeight];
}

interface PreparedCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  realWidth: number;
  realHeight: number;
}

const GeometryEpsilon = 1e-10;

function prepareCanvas(width: number, height: number, ratio = 1): PreparedCanvas | null {
  const realWidth = Math.ceil(width * ratio);
  const realHeight = Math.ceil(height * ratio);

  if (
    !Number.isFinite(realWidth) ||
    !Number.isFinite(realHeight) ||
    realWidth <= 0 ||
    realHeight <= 0
  ) {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = realWidth;
  canvas.height = realHeight;
  const context = canvas.getContext('2d');
  context?.save();

  return { canvas, context, realWidth, realHeight };
}

function snapToInteger(value: number): number {
  const integer = Math.round(value);
  return Math.abs(value - integer) < GeometryEpsilon ? integer : value;
}

function getRotatePosition(x: number, y: number, angle: number): [number, number] {
  return [
    snapToInteger(x * Math.cos(angle) - y * Math.sin(angle)),
    snapToInteger(x * Math.sin(angle) + y * Math.cos(angle)),
  ];
}

function getRotatedSize(width: number, height: number, angle: number): [number, number] {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const points = [
    getRotatePosition(-halfWidth, -halfHeight, angle),
    getRotatePosition(halfWidth, -halfHeight, angle),
    getRotatePosition(halfWidth, halfHeight, angle),
    getRotatePosition(-halfWidth, halfHeight, angle),
  ];
  const xCoordinates = points.map(([x]) => x);
  const yCoordinates = points.map(([, y]) => y);

  return [
    snapToInteger(Math.max(...xCoordinates) - Math.min(...xCoordinates)),
    snapToInteger(Math.max(...yCoordinates) - Math.min(...yCoordinates)),
  ];
}

export function drawWatermark(
  content: WatermarkContentLine[] | HTMLImageElement,
  rotate: number,
  ratio: number,
  width: number,
  height: number,
  gapX: number,
  gapY: number,
): WatermarkTile | null {
  if (![rotate, ratio, width, height, gapX, gapY].every(Number.isFinite)) return null;
  if (ratio <= 0 || width <= 0 || height <= 0) return null;

  const contentCanvas = prepareCanvas(width, height, ratio);
  if (!contentCanvas?.context) return null;

  const { canvas, context, realWidth, realHeight } = contentCanvas;
  if (Array.isArray(content)) {
    context.textBaseline = 'top';
    let top = 0;

    content.forEach((line) => {
      const lineSize = measureLine(context, line, ratio);
      context.fillStyle = line.font.color;
      context.textAlign = line.font.textAlign;

      let textLeft = realWidth / 2;
      if (line.font.textAlign === 'left' || line.font.textAlign === 'start') textLeft = 0;
      if (line.font.textAlign === 'right' || line.font.textAlign === 'end') {
        textLeft = realWidth;
      }

      context.fillText(line.text, textLeft, top);
      top += lineSize.height + FontGap * ratio;
    });
  } else {
    context.drawImage(content, 0, 0, realWidth, realHeight);
  }

  const angle = (Math.PI * rotate) / 180;
  const [rotatedWidth, rotatedHeight] = getRotatedSize(realWidth, realHeight, angle);
  const rotatedCanvas = prepareCanvas(rotatedWidth, rotatedHeight);
  if (!rotatedCanvas?.context) return null;

  const {
    canvas: markCanvas,
    context: markContext,
    realWidth: markWidth,
    realHeight: markHeight,
  } = rotatedCanvas;
  markContext.translate(markWidth / 2, markHeight / 2);
  markContext.rotate(angle);
  markContext.drawImage(
    canvas,
    0,
    0,
    realWidth,
    realHeight,
    -realWidth / 2,
    -realHeight / 2,
    realWidth,
    realHeight,
  );

  const realGapX = gapX * ratio;
  const realGapY = gapY * ratio;
  const tileWidth = (markWidth + realGapX) * 2;
  const tileHeight = markHeight + realGapY;
  if (
    !Number.isFinite(tileWidth) ||
    !Number.isFinite(tileHeight) ||
    tileWidth <= 0 ||
    tileHeight <= 0
  ) {
    return null;
  }

  const tileCanvas = prepareCanvas(tileWidth, tileHeight);
  if (!tileCanvas?.context) return null;

  const drawMark = (targetX: number, targetY: number) => {
    tileCanvas.context!.drawImage(
      markCanvas,
      0,
      0,
      markWidth,
      markHeight,
      targetX,
      targetY,
      markWidth,
      markHeight,
    );
  };
  const markLeft = (tileCanvas.realWidth / 2 - markWidth) / 2;
  const markTop = (tileCanvas.realHeight - markHeight) / 2;
  const secondColumnLeft = markLeft + tileCanvas.realWidth / 2;
  drawMark(markLeft, markTop);
  drawMark(secondColumnLeft, markTop - tileCanvas.realHeight / 2);
  drawMark(secondColumnLeft, markTop + tileCanvas.realHeight / 2);

  return {
    dataURL: tileCanvas.canvas.toDataURL(),
    width: tileCanvas.realWidth / ratio,
    height: tileCanvas.realHeight / ratio,
  };
}

export function getStyleString(style: CSSProperties): string {
  return Object.entries(style)
    .map(([key, value]) => {
      let property = key.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
      if (property.startsWith('ms-')) property = `-${property}`;
      return `${property}: ${value};`;
    })
    .join(' ');
}
