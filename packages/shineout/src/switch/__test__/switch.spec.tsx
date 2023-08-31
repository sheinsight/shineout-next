import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  classTest,
  displayTest,
  hasAttributesTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import SwitchBase from '../__example__/01-basic';
import SwitchStatus from '../__example__/02-status';
import SwitchSize from '../__example__/03-size';
import SwitchLoading from '../__example__/04-loading';

const SO_PREFIX = 'switch';
const switchClassName = `${SO_PREFIX}-wrapper-0-2-2`;
const switchCheckedClassName = `${SO_PREFIX}-wrapperChecked-0-2-3`;
const switchIndicatorClassName = `.${SO_PREFIX}-indicator-0-2-6`;
const switchContentClassName = `.${SO_PREFIX}-content-0-2-7`;
const switchDisabledClassName = `${SO_PREFIX}-wrapperDisabled-0-2-8`;
const switchSmallClassName = `${SO_PREFIX}-wrapperSmall-0-2-4`;
const switchLargeClassName = `${SO_PREFIX}-wrapperLarge-0-2-5`;
const switchLoadingClassName = `.${SO_PREFIX}-loading-0-2-9`;
const sizeClasses = [switchSmallClassName, '', switchLargeClassName];

const uncheckedText = '1';
const unchecked = <span>{uncheckedText}</span>;
const checkedText = '2';
const checked = <span>{checkedText}</span>;

afterEach(cleanup);
mountTest(<Switch />);
describe('Switch[Base]', () => {
  displayTest(Switch, 'ShineoutSwitch');
  baseTest(Switch, '.' + switchClassName);
  snapshotTest(<SwitchBase />);
  snapshotTest(<SwitchStatus />, 'about status');
  snapshotTest(<SwitchSize />, 'about size');
  snapshotTest(<SwitchLoading />, 'about loading');
  test('should render default', () => {
    render(<Switch />);
    const switchs = screen.getByRole('switch');
    expect(switchs).toBeInTheDocument();
    classTest(switchs, switchClassName);
    attributesTest(switchs, 'type', 'button');
    classLengthTest(switchs, 'input', 1);
    classLengthTest(switchs, switchIndicatorClassName, 1);
    classLengthTest(switchs, switchContentClassName, 1);
    const input = switchs.querySelector('input')!;
    styleTest(input, 'display: none;');
    attributesTest(input, 'type', 'checkbox');
  });
  test('should onClick', () => {
    const clickFn = jest.fn();
    render(<Switch onClick={clickFn} />);
    const switchs = screen.getByRole('switch');
    fireEvent.click(switchs);
    classTest(switchs, switchCheckedClassName);
    expect(clickFn.mock.calls.length).toBe(1);
  });
});
describe('Switch[Content]', () => {
  test('should render when set content is element', () => {
    render(<Switch content={[checked, unchecked]} />);
    const switchs = screen.getByRole('switch');
    const content = switchs.querySelector(switchContentClassName)!;
    textContentTest(content, uncheckedText);
    fireEvent.click(switchs);
    textContentTest(content, checkedText);
    fireEvent.click(switchs);
    textContentTest(content, uncheckedText);
  });
});
describe('Switch[value/DefaultValue/Checked]', () => {
  const valueTest = (text: string, bool?: boolean) => {
    const switchs = screen.getByRole('switch');
    const content = switchs.querySelector(switchContentClassName)!;
    classTest(switchs, switchCheckedClassName, bool);
    textContentTest(content, text);
  };
  test('should render when set value', () => {
    const { rerender } = render(<Switch value={true} />);
    const switchs = screen.getByRole('switch');
    classTest(switchs, switchCheckedClassName);
    rerender(<Switch value={false} />);
    classTest(switchs, switchCheckedClassName, false);
  });
  test('should render when set defaultValue is true', () => {
    render(<Switch defaultValue={true} content={[checked, unchecked]} />);
    valueTest(checkedText);
  });
  test('should render when set defaultValue is false', () => {
    render(<Switch defaultValue={false} content={[checked, unchecked]} />);
    valueTest(uncheckedText, false);
  });
  test('should render when set value and defaultValue at the same time', () => {
    render(<Switch value={true} defaultValue={false} content={[checked, unchecked]} />);
    valueTest(checkedText);
  });
  test('should render when set checked', () => {
    const { rerender } = render(<Switch content={[checked, unchecked]} checked />);
    const switchs = screen.getByRole('switch');
    classTest(switchs, switchCheckedClassName);
    rerender(<Switch checked={false} />);
    classTest(switchs, switchCheckedClassName, false);
  });
  test('should render when set checked and value at the same time', () => {
    render(<Switch content={[checked, unchecked]} checked={true} value={false} />);
    const switchs = screen.getByRole('switch');
    classTest(switchs, switchCheckedClassName);
  });
});
describe('Switch[Disabled]', () => {
  test('should render when set disabled', () => {
    const clickFn = jest.fn();
    render(<Switch disabled onClick={clickFn} />);
    const switchs = screen.getByRole('switch');
    classTest(switchs, switchDisabledClassName);
    hasAttributesTest(switchs.querySelector('input')!, 'disabled');
    fireEvent.click(switchs);
    expect(clickFn.mock.calls.length).toBe(0);
  });
});
describe('Switch[onChange/BeforeChange]', () => {
  test('should onChange', () => {
    const onChangeFn = jest.fn();
    render(<Switch onChange={onChangeFn} />);
    const switchs = screen.getByRole('switch');
    fireEvent.click(switchs);
    expect(onChangeFn.mock.calls[0][0]).toBe(true);
  });
  test('should render when set beforeChange', () => {
    const beforeChangeFn = jest.fn();
    render(<Switch beforeChange={beforeChangeFn} content={[checked, unchecked]} />);
    const switchs = screen.getByRole('switch');
    fireEvent.click(switchs);
    expect(beforeChangeFn.mock.calls.length).toBe(1);
  });
});
describe('Switch[Size]', () => {
  test('should render when set size', () => {
    render(<SwitchSize />);
    const switchs = screen.getAllByRole('switch');
    switchs.forEach((item, index) => {
      if (index === 1) return;
      classTest(item, sizeClasses[index]);
    });
  });
});
describe('Switch[Loading]', () => {
  test('should render when set loading', () => {
    const clickFn = jest.fn();
    render(<Switch loading onClick={clickFn} />);
    const switchs = screen.getByRole('switch');
    classTest(switchs, switchDisabledClassName);
    classLengthTest(switchs, switchLoadingClassName, 1);
    fireEvent.click(switchs);
    expect(clickFn.mock.calls.length).toBe(0);
  });
});
