import React, { useState } from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkbox from '..';
import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  classTest,
  snapshotTest,
  componentsClassTest,
  textContentTest,
  styleTest,
  classContentTest,
  childrenTest,
  displayTest,
  createClassName,
} from '../../tests/utils';
import CheckboxRawgroup from '../__example__/004-rawgroup';
import CheckboxGroup from '../__example__/005-group';
import CheckboxBlock from '../__example__/006-block';
import CheckboxDisabled from '../__example__/007-disabled-1';
import CheckboxDisabledByFunc from '../__example__/007-disabled-2';

const SO_PREFIX = 'checkbox';
const originClasses = ['wrapper', 'group'];
const originItemClasses = ['wrapperChecked', 'wrapperDisabled', 'groupBlock'];
const {
  wrapper: checkboxClassName,
  wrapperChecked: checkedClassName,
  group: checkboxGroupClassName,
  wrapperDisabled: checkboxDisabledClassName,
  groupBlock: checkboxGroupBlockClassName,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const dataRender: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
interface dataObjProps {
  id: number;
  color: string;
}
const dataObj: dataObjProps[] = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
];

afterEach(cleanup);
describe('CheckboxGroup[Base]', () => {
  mountTest(Checkbox.Group as React.ComponentType);
  childrenTest(Checkbox.Group, checkboxGroupClassName);
  displayTest(Checkbox.Group as React.FC, 'ShineoutCheckboxGroup');
  snapshotTest(<CheckboxRawgroup />, 'by CheckboxRawgroup');
  test('should render structor in CheckboxRawgroup', () => {
    const { container } = render(<CheckboxRawgroup />);
    const checkboxs = container.querySelectorAll(checkboxClassName);

    expect(checkboxs.length).toBe(dataObj.length);
    checkboxs.forEach((checkbox, index) => {
      textContentTest(checkbox, dataObj[index].color);
      if (![3, 5].includes(index + 1)) return;
      classTest(checkbox, checkedClassName);
    });
    fireEvent.click(checkboxs[0]);
    classTest(checkboxs[0], checkedClassName);
    fireEvent.click(checkboxs[2]);
    classTest(checkboxs[2], checkedClassName, false);
  });
  snapshotTest(<CheckboxGroup />, 'by CheckboxGroup');
  test('should render structor in CheckboxGroup', () => {
    const { container } = render(<CheckboxGroup />);
    const checkboxs = container.querySelectorAll(checkboxClassName);
    expect(checkboxs.length).toBe(dataRender.length);
    checkboxs.forEach((checkbox, index) => {
      styleTest(
        screen.getByText(dataRender[index]),
        `border-bottom: 1px solid ${dataRender[index]};`,
      );
      if (!['blue', 'cyan'].includes(dataRender[index])) return;
      classTest(checkbox, checkedClassName);
    });
  });
  snapshotTest(<CheckboxBlock />, 'by CheckboxBlock');
  test('should render when set block', () => {
    const { container } = render(
      <Checkbox.Group
        keygen={(c: any) => c}
        data={dataRender}
        defaultValue={['blue', 'cyan']}
        block
        style={{ marginTop: 32, display: 'inline-block' }}
      />,
    );
    classTest(container.querySelector(checkboxGroupClassName)!, checkboxGroupBlockClassName);
  });
  test('should render when set className and style', () => {
    const { container } = render(
      <Checkbox.Group
        keygen
        data={dataRender}
        className='demo'
        style={{ marginTop: 32, display: 'inline-block' }}
      />,
    );
    const checkboxGroup = container.querySelector(checkboxGroupClassName);
    classTest(checkboxGroup!, 'demo');
    styleTest(checkboxGroup!, 'margin-top: 32px; display: inline-block;');
  });
});
describe('CheckboxGroup[Value]', () => {
  test('should render when set value', () => {
    const selectValue = ['red', 'yellow'];
    const { container } = render(<Checkbox.Group keygen data={dataRender} value={selectValue} />);
    const checkboxs = container.querySelectorAll(checkboxClassName);
    const checkboxsTest = (bool: boolean) => {
      componentsClassTest(checkboxs, bool, checkedClassName, selectValue);
    };
    checkboxsTest(false);
    checkboxsTest(true);
    fireEvent.click(checkboxs[1]);
    checkboxsTest(false);
  });
});
describe('CheckboxGroup[Disabled]', () => {
  snapshotTest(<CheckboxDisabled />, 'by disabled-A');
  snapshotTest(<CheckboxDisabledByFunc />, 'by disabled-B');
  test('should render when set disabled', () => {
    const { container } = render(<CheckboxDisabled />);
    componentsClassTest(
      container.querySelectorAll(checkboxClassName),
      true,
      checkboxDisabledClassName,
    );
  });
  test('should render when set disabled by function', () => {
    const { container } = render(<CheckboxDisabledByFunc />);
    container.querySelectorAll(checkboxClassName).forEach((checkbox) => {
      if (checkbox.textContent !== 'yellow') return;
      classTest(checkbox, checkboxDisabledClassName);
      fireEvent.click(checkbox);
      classTest(checkbox, checkedClassName, false);
    });
  });
  test('should render when set disabled in form and checkboxGroup', () => {
    const changeFn = jest.fn();
    const { container } = render(
      <Form disabled={true}>
        <Checkbox.Group keygen data={dataRender} disabled={false} onChange={changeFn} />
      </Form>,
    );
    fireEvent.click(container.querySelectorAll(checkboxClassName)[0]);
    expect(changeFn.mock.calls.length).toBe(0);
  });
});
describe('Checkbox[Format]', () => {
  const RenderDemo = (props: { format: any }) => {
    const { format } = props;
    const [selected, setSelected] = useState([]);
    return (
      <>
        <Checkbox.Group
          keygen='id'
          data={dataObj}
          value={selected}
          onChange={setSelected}
          format={format}
          renderItem={'color'}
        />
        <div className='render'>{selected}</div>
      </>
    );
  };
  test('should render when set format', () => {
    const RenderTemp = () => {
      const [selected, setSelected] = useState([]);
      return (
        <>
          <Checkbox.Group
            keygen
            data={dataRender}
            value={selected}
            onChange={setSelected}
            format={(e: string) => e + '!'}
          />
          <div className='render'>{selected}</div>
        </>
      );
    };
    const { container } = render(<RenderTemp />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, 'yellow!');
  });
  test('should render when set format by string in obj data', () => {
    const { container } = render(<RenderDemo format='id' />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, '3');
  });
  test('should render when set format value is not in object keys', () => {
    const { container } = render(<RenderDemo format={'name' as 'id'} />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, '');
  });
  test('should render when set format bu function in obj data', () => {
    const { container } = render(<RenderDemo format={(e: dataObjProps) => e.id} />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, '3');
  });
});
describe('Checkbox[RenderItem]', () => {
  test('should render when set renderItem is string', () => {
    const { container } = render(<Checkbox.Group data={dataObj} keygen='id' renderItem='color' />);
    container.querySelectorAll(checkboxClassName).forEach((checkbox, index) => {
      textContentTest(checkbox, dataObj[index].color);
    });
  });
  test('should render when set renderItem is function', () => {
    const { container } = render(
      <Checkbox.Group data={dataObj} keygen='id' renderItem={(e: dataObjProps) => e.color + '!'} />,
    );
    container.querySelectorAll(checkboxClassName).forEach((checkbox, index) => {
      textContentTest(checkbox, dataObj[index].color + '!');
    });
  });
  test('should render when set renderItem is function that return undefined', () => {
    const { container } = render(
      <Checkbox.Group data={dataObj} keygen='id' renderItem={() => undefined} />,
    );
    container.querySelectorAll(checkboxClassName).forEach((checkbox) => {
      textContentTest(checkbox, '');
    });
  });
});
describe('Checkbox[Form]', () => {
  const FormDemo = (valueProps: any) => {
    const [value, setValue] = useState<any>({});
    return (
      <>
        <Form value={value} onChange={setValue}>
          <Form.Item label='demo'>
            <Checkbox.Group
              data={dataObj}
              keygen='id'
              name='selectValue'
              renderItem='color'
              format='id'
              value={valueProps}
            />
          </Form.Item>
        </Form>
        <div className='render'>{value?.selectValue}</div>
      </>
    );
  };
  test('should render in form', async () => {
    const { container } = render(<FormDemo />);
    fireEvent.click(screen.getByText('red'));
    await waitFor(() => {
      textContentTest(container.querySelector('.render')!, '1');
    });
  });
  test('should render in form when set value and name in checkbox', async () => {
    const { container } = render(<FormDemo valueProps={['2', '3']} />);
    const checkboxs =
      container.querySelectorAll(checkboxClassName) ||
      container.querySelectorAll(`.${SO_PREFIX}-wrapper-0-2-16`);
    checkboxs.forEach((checkbox) => {
      classContentTest(checkbox, 'checked', false);
    });
    fireEvent.click(screen.getByText('red'));
    await waitFor(() => {
      textContentTest(container.querySelector('.render')!, '1');
    });
  });
});
describe('Checkbox[Onchange/BeforeChange]', () => {
  test('should render when set onchange and beforeChange', () => {
    const RenderDemo = () => {
      const [selected, setSelected] = useState([]);
      return (
        <>
          <Checkbox.Group
            keygen='id'
            data={dataObj}
            value={selected}
            onChange={setSelected}
            format={'id'}
            renderItem={'color'}
            beforeChange={(e: any) => e + '1'}
          />
          <div className='render'>{selected}</div>
        </>
      );
    };
    const { container } = render(<RenderDemo />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, '31');
  });
});
describe('Checkbox[separator]', () => {
  test('should render when set separator', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const RenderDemo = () => {
      const [selected, setSelected] = useState([1]);
      return (
        <>
          <Checkbox.Group
            keygen='id'
            data={dataObj}
            value={selected}
            onChange={setSelected}
            format={'id'}
            renderItem={'color'}
            separator='-'
          />
          <div className='render'>{selected}</div>
        </>
      );
    };
    const { container } = render(<RenderDemo />);
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    textContentTest(container.querySelector('.render')!, '1-3');
    // error capture
    expect(errorSpy).toHaveBeenCalledWith(
      'use-list-select: separator is string, but value is not string',
    );
  });
});
describe('Checkbox[Prediction]', () => {
  test('should render when set prediction', () => {
    const RenderDemo = () => {
      const [selected, setSelected] = useState<string[] | number[]>(['red']);
      return (
        <>
          <Checkbox.Group
            keygen='id'
            data={dataObj}
            value={selected}
            onChange={setSelected}
            format={'id'}
            renderItem={'color'}
            prediction={(val: string | number, d: dataObjProps) => val === d.color}
          />
          <div className='render'>{selected}</div>
        </>
      );
    };
    const { container } = render(<RenderDemo />);
    const excludes = ['red'];
    const checkboxs = container.querySelectorAll(checkboxClassName);
    const componentsClassTestByBool = () => {
      componentsClassTest(checkboxs, true, checkedClassName, excludes);
      componentsClassTest(checkboxs, !false, checkedClassName, excludes);
    };
    componentsClassTestByBool();
    fireEvent.click(container.querySelectorAll(checkboxClassName)[2]);
    componentsClassTestByBool();
  });
});
