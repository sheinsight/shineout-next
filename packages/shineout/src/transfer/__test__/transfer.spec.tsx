import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transfer from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import TransferBase from '../__example__/01-base';
import TransferSize from '../__example__/02-size';
import TransferSimple from '../__example__/03-simple';
import TransferFilter from '../__example__/04-filter';
import TransferCustomFilter from '../__example__/05-custom-filter';
import TransferCustomRender from '../__example__/06-custom-render';
import TransferLoading from '../__example__/07-loading';
import TransferLoadingControl from '../__example__/08-loading-control';
import TransferControl from '../__example__/09-control';
import TransferSelected from '../__example__/10-selected-control';
import TransferBigData from '../__example__/11-bigdata';

const SO_PREFIX = 'transfer';
const originClasses = [
  'transfer',
  'view',
  'operations',
  'header',
  'title',
  'list',
  'item',
  'itemWrapper',
  'checkbox',
  'empty',
  'count',
  'removeAll',
  'close',
  'input',
  'footer',
];
const originItemClasses = ['small', 'large', 'source', 'target', 'disabled'];
const {
  transfer,
  view,
  operations,
  source,
  target,
  header,
  title,
  list,
  item,
  itemWrapper,
  checkbox,
  empty,
  count,
  small,
  large,
  removeAll,
  // close,
  input,
  footer,
  disabled,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const { container: containerClassName, loading } = createClassName(
  'spin',
  ['container', 'loading'],
  [],
);
const {
  wrapper: checkboxWrapper,
  wrapperChecked,
  wrapperIndeterminate,
  desc: checkboxDesc,
  wrapperDisabled,
} = createClassName(
  'checkbox',
  ['desc'],
  ['wrapper', 'wrapperChecked', 'wrapperIndeterminate', 'wrapperDisabled'],
);
const {
  scroll: viretualScroll,
  container: virtualContainer,
  bar: viretualBar,
} = createClassName('virtual', ['scroll', 'container', 'bar'], []);
const { disabled: buttonDisabled } = createClassName('button', [], ['disabled']);

type dataType = { id: string; name: string };
const data: dataType[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

const TransferTest = (props?: any) => (
  <Transfer data={data} keygen='id' renderItem={'name'} {...props} />
);

afterEach(cleanup);
mountTest(<TransferTest />);

describe('Transfer[Base]', () => {
  displayTest(Transfer as React.FC, 'ShineoutTransfer');
  snapshotTest(<TransferBase />);
  snapshotTest(<TransferSize />, 'about size');
  snapshotTest(<TransferSimple />, 'about simple');
  snapshotTest(<TransferFilter />, 'about filter');
  snapshotTest(<TransferCustomFilter />, 'about customFilter');
  snapshotTest(<TransferCustomRender />, 'about custom render');
  snapshotTest(<TransferLoading />, 'about loading');
  snapshotTest(<TransferLoadingControl />, 'about loading control');
  snapshotTest(<TransferControl />, 'about control');
  snapshotTest(<TransferSelected />, 'about seleced');
  snapshotTest(<TransferBigData />, 'about bigdata');
  test('should render when set children', () => {
    const { container } = render(
      <Transfer data={data} keygen='id' renderItem={'name'}>
        {() => <div>{'test'}</div>}
      </Transfer>,
    );
    const containers = container.querySelectorAll(containerClassName);
    expect(containers.length).toBe(2);
    containers.forEach((item) => {
      textContentTest(item, 'test');
    });
  });
  test('should render when set className and style', () => {
    const { container } = render(
      <TransferTest className='demo' style={{ backgroundColor: 'red' }} />,
    );
    const transferWrapper = container.querySelector(transfer)!;
    classTest(transferWrapper, 'demo');
    styleTest(transferWrapper, 'background-color: red;');
  });
  test('should render default structure', () => {
    const { container } = render(<TransferTest />);
    const views = container.querySelectorAll(view);
    expect(views.length).toBe(2);
    const transferOperations = container.querySelector(operations);
    classTest(views[0], source);
    classTest(views[1], target);
    views.forEach((item) => {
      const itemHeader = item.querySelector(header)!;
      expect(itemHeader.querySelector(`.${checkboxWrapper}`)!).toBeInTheDocument();
      expect(itemHeader.querySelector(title)!).toBeInTheDocument();
      const transferContainer = item.querySelector(containerClassName)!;
      expect(transferContainer.querySelector(list)!).toBeInTheDocument();
    });
    const virtualScroll = views[0].querySelector(viretualScroll)!;
    const virtualContainers = virtualScroll.querySelector(virtualContainer)!;
    const items = virtualContainers.querySelectorAll(item);
    expect(items.length).toBe(10);
    items.forEach((item) => {
      const transferItemWrapper = item.querySelector(itemWrapper)!;
      classTest(transferItemWrapper.querySelector(checkbox)!, checkboxWrapper);
    });
    const transferEmpty = views[1].querySelector(empty)!;
    expect(transferEmpty).toBeInTheDocument();
    const buttons = transferOperations?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
    buttons?.forEach((item) => {
      classTest(item, buttonDisabled);
    });
  });
  test('should render default function', () => {
    const { container } = render(<TransferTest />);
    const transferOperations = container
      .querySelector(operations)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const rightHeaderCheckbox = views[1]
      .querySelector(header)
      ?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(leftHeaderCount!, '0/10');
    textContentTest(rightHeaderCount!, '0/0');
    transferOperations?.forEach((item) => {
      classTest(item, buttonDisabled);
    });
    const leftItems = views[0].querySelectorAll(item);
    fireEvent.click(leftItems[0].querySelector(checkbox)!);
    classTest(transferOperations[0], buttonDisabled, false);
    classTest(leftItems[0].querySelector(checkbox)!, wrapperChecked);
    classTest(leftHeaderCheckbox!, wrapperIndeterminate);
    fireEvent.click(transferOperations[0]);
    textContentTest(leftHeaderCount!, '0/9');
    expect(leftItems.length).toBe(10);
    textContentTest(rightHeaderCount!, '0/1');
    const rightItems = views[1].querySelectorAll(item);
    expect(rightItems.length).toBe(1);
    fireEvent.click(rightItems[0].querySelector(checkbox)!);
    fireEvent.click(transferOperations[1]);
    textContentTest(leftHeaderCount!, '0/10');
    textContentTest(rightHeaderCount!, '0/0');
    expect(rightItems.length).toBe(1);
    classTest(transferOperations[0], buttonDisabled);
  });
  test('should render default when click checkbox in header', () => {
    const { container } = render(<TransferTest />);
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    fireEvent.click(leftHeaderCheckbox!);
    textContentTest(leftHeaderCount!, '10/10');
    fireEvent.click(leftHeaderCheckbox!);
    textContentTest(leftHeaderCount!, '0/10');
    const leftItems = views[0].querySelectorAll(item);
    fireEvent.click(leftItems[0].querySelector(checkbox)!);
    textContentTest(leftHeaderCount!, '1/10');
    fireEvent.click(leftHeaderCheckbox!);
    textContentTest(leftHeaderCount!, '10/10');
    fireEvent.click(leftHeaderCheckbox!);
    textContentTest(leftHeaderCount!, '0/10');
  });
  test('should render default when click checkbox in simple header', () => {
    const { container } = render(<TransferTest simple />);
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    fireEvent.click(leftHeaderCheckbox!);
    textContentTest(leftHeaderCount!, '0/0');
  });
  const sizeClassNameMap: { [key: string]: string } = {
    small: small,
    large: large,
  };
  test.each(['small', 'large'])('should render when set size is %s', (type) => {
    const { container } = render(<TransferTest size={type} />);
    classTest(container.querySelector(transfer)!, sizeClassNameMap[type]);
  });
  test('should render when set listHeight', () => {
    const listHeight = 184;
    const { container } = render(<TransferTest listHeight={listHeight} />);
    const lists = container.querySelectorAll(list);
    lists.forEach((item) => {
      styleTest(item, `height: ${listHeight}px;`);
    });
  });
  test('should render when set empty', () => {
    const Empty = () => <div className='demo'>Demo</div>;
    const { container } = render(<TransferTest empty={<Empty />} />);
    const views = container.querySelectorAll(view);
    const transferEmpty = views[1].querySelector(empty)!;
    const emptyItem = transferEmpty.querySelector('.demo')!;
    textContentTest(emptyItem, 'Demo');
  });
  test('should render when set itemClass', () => {
    const { container } = render(<TransferTest itemClass='demo' />);
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      classTest(item, 'demo');
    });
  });
  // TODO: lineHeight
  test('should render when set listClassName', () => {
    const { container } = render(<TransferTest listClassName={'demo'} />);
    classTest(container.querySelector(list)!, 'demo');
  });
  test('should render when set listStyle', () => {
    const { container } = render(<TransferTest listStyle={{ color: 'red' }} />);
    styleTest(container.querySelector(list)!, 'color: red; height: 186px;');
  });
  test('should render when set operationIcon', () => {
    const { container } = render(<TransferTest operationIcon={false} />);
    const transferOperations = container
      .querySelector(operations)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    transferOperations.forEach((item) => {
      classLengthTest(item, 'svg', 0);
    });
  });
  test('should render when set onSearch', async () => {
    const searchFn = jest.fn();
    const handleFilter = (text: string, item: { id: string; name: string }) => {
      return item.name.indexOf(text) > -1;
    };
    const { container } = render(
      <TransferTest
        onSearch={searchFn}
        searchPlaceholder='Input search text'
        onFilter={handleFilter}
      />,
    );
    const views = container.querySelectorAll(view);
    const leftInput = views[0].querySelector(input)!;
    fireEvent.change(leftInput.querySelector('input')!, {
      target: {
        value: '2',
      },
    });
    await waitFor(async () => {
      await delay(500);
    });
    expect(searchFn.mock.calls.length).toBe(1);
  });
  test('should render when set renderItem is function', () => {
    const { container } = render(
      <TransferTest renderItem={(d: dataType) => `Function${d.name}`} />,
    );
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item, index) => {
      textContentTest(item, `Functionname-${index + 1}`);
    });
  });
});
describe('Transfer[Simple]', () => {
  test('should render when set simple', async () => {
    const { container } = render(<TransferTest simple />);
    classLengthTest(container, operations, 0);
    const views = container.querySelectorAll(view);
    const rightHeader = views[1].querySelector(header);
    expect(rightHeader?.querySelector(removeAll)).toBeInTheDocument();
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const rightHeaderCheckbox = views[1].querySelector(header)!;
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(leftHeaderCount!, '0/10');
    textContentTest(rightHeaderCount!, '0/0');
    const leftItems = views[0].querySelectorAll(item);
    fireEvent.click(leftItems[1].querySelector(checkbox)!);
    textContentTest(leftHeaderCount!, '0/9');
    textContentTest(rightHeaderCount!, '0/1');
    fireEvent.click(rightHeaderCheckbox.querySelector(removeAll)!);
    textContentTest(leftHeaderCount!, '0/10');
    textContentTest(rightHeaderCount!, '0/0');
  });
});
describe('Transfer[onFilter]', () => {
  test('should render when set onFilter', () => {
    const { container } = render(<TransferFilter />);
    const views = container.querySelectorAll(view);
    views.forEach((item) => {
      expect(item.querySelector(input)).toBeInTheDocument();
    });
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    textContentTest(leftHeaderCount!, '0/10');
    const leftInput = views[0].querySelector(input)!;
    attributesTest(leftInput.querySelector('input')!, 'placeholder', 'Input search text');
    fireEvent.change(leftInput.querySelector('input')!, {
      target: {
        value: '2',
      },
    });
  });
  test('should render when set renderFilter', () => {
    const { container } = render(<TransferCustomFilter />);
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    textContentTest(leftHeaderCount!, '0/10');
    const leftInput = views[0].querySelector(input)!;
    attributesTest(leftInput.querySelector('input')!, 'placeholder', 'Custom filter');
    fireEvent.change(leftInput.querySelector('input')!, {
      target: {
        value: '1',
      },
    });
    textContentTest(leftHeaderCount!, '0/2');
  });
});
describe('Transfer[Titles/Footers/Operations]', () => {
  test('should render when set titles/footers/operations', () => {
    const { container } = render(<TransferCustomRender />);
    const views = container.querySelectorAll(view);
    const leftHeader = views[0].querySelector(header);
    const rightHeader = views[1].querySelector(header);
    textContentTest(leftHeader?.querySelector(title) as Element, 'Source');
    textContentTest(rightHeader?.querySelector(title) as Element, 'Target');
    views.forEach((item) => {
      const itemFooter = item.querySelector(footer);
      textContentTest(itemFooter?.querySelector('button') as Element, 'Button');
    });
    const transferOperations = container
      .querySelector(operations)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    textContentTest(transferOperations[0], 'to right');
    textContentTest(transferOperations[1], 'to left');
  });
});
describe('Transfer[Loading]', () => {
  test('should render when set loading is boolean', () => {
    const { container } = render(<TransferLoading />);
    const views = container.querySelectorAll(view);
    views.forEach((item) => {
      classLengthTest(item.querySelector(containerClassName)!, loading, 1);
    });
  });
  test('should render when set loading is array', () => {
    const { container } = render(<TransferLoadingControl />);
    const views = container.querySelectorAll(view);
    classLengthTest(views[0].querySelector(containerClassName)!, loading, 1);
    classLengthTest(views[1].querySelector(containerClassName)!, loading, 0);
  });
});
describe('Transfer[DefaultValue/Value/OnChange/SelectedKeys/OnSelectChange/DefaultSelectedKeys/Format/BeforeChange]', () => {
  test('should render when set defaultValue without format', () => {
    const { container } = render(<TransferTest defaultValue={['id-7']} />);
    const views = container.querySelectorAll(view);
    const rightHeaderCheckbox = views[1].querySelector(header)!;
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(rightHeaderCount!, '0/0');
  });
  test('should render when set defaultValue with format', () => {
    const { container } = render(<TransferTest defaultValue={['id-7']} format='id' />);
    const views = container.querySelectorAll(view);
    const rightHeaderCheckbox = views[1].querySelector(header)!;
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(rightHeaderCount!, '0/1');
  });
  test('should render when set value and defaultValue', () => {
    const { container } = render(
      <TransferTest value={['id-7']} format='id' defaultValue={['id-7', 'id-6']} />,
    );
    const views = container.querySelectorAll(view);
    const rightHeaderCheckbox = views[1].querySelector(header)!;
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(rightHeaderCount!, '0/1');
  });
  test('should render when set value and onChange', () => {
    const { container } = render(<TransferControl />);
    const transferOperations = container
      .querySelector(operations)
      ?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const rightHeaderCheckbox = views[1]
      .querySelector(header)
      ?.querySelector(`.${checkboxWrapper}`);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(leftHeaderCount!, '0/10');
    textContentTest(rightHeaderCount!, '0/0');
    const leftItems = views[0].querySelectorAll(item);
    fireEvent.click(leftItems[0].querySelector(checkbox)!);
    fireEvent.click(transferOperations[0]);
    textContentTest(leftHeaderCount!, '0/9');
    textContentTest(rightHeaderCount!, '0/1');
  });
  test('should render when set defaultSelectedKeys', () => {
    const { container } = render(<TransferTest defaultSelectedKeys={['id-7']} />);
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      if (item.querySelector(checkboxDesc)?.textContent !== 'name-8') return;
      classTest(item.querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set selectedKeys', () => {
    const { container } = render(
      <TransferTest defaultSelectedKeys={['id-5', 'id-6']} selectedKeys={['id-7']} />,
    );
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      if (item.querySelector(checkboxDesc)?.textContent !== 'name-8') return;
      classTest(item.querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set selectedKeys and keygen is true', () => {
    const { container } = render(<TransferTest keygen selectedKeys={['id-7']} />);
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      classTest(item.querySelector(checkbox)!, wrapperChecked, false);
    });
  });
  test('should render when set selectedKeys and value', () => {
    const { container } = render(<TransferTest selectedKeys={['id-7']} value={['id-7']} />);
    const views = container.querySelectorAll(view);
    const rightItems = views[1].querySelectorAll(item);
    rightItems.forEach((item) => {
      if (item.querySelector(checkboxDesc)?.textContent !== 'name-8') return;
      classTest(item.querySelector(checkbox)!, wrapperChecked);
    });
  });
  test('should render when set selectedKeys and onSelectedChange', () => {
    const { container } = render(<TransferSelected />);
    const views = container.querySelectorAll(view);
    const leftHeaderCheckbox = views[0].querySelector(header)?.querySelector(`.${checkboxWrapper}`);
    const leftItems = views[0].querySelectorAll(item);
    const leftHeaderCount = leftHeaderCheckbox?.querySelector(count);
    fireEvent.click(leftItems[1].querySelector(checkbox)!);
    textContentTest(leftHeaderCount as Element, '1/10');
  });
  test('should render when set simple and selectedKeys or onSelectedChange', () => {
    const onSelectedChangeFn = jest.fn();
    const { container } = render(
      <TransferTest simple selectedKeys={['id-7']} onSelectedChange={onSelectedChangeFn} />,
    );
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      classTest(item.querySelector(checkbox)!, wrapperChecked, false);
    });
    fireEvent.click(leftItems[1].querySelector(checkbox)!);
    expect(onSelectedChangeFn.mock.calls.length).toBe(0);
  });
  test('should render when set format is function', () => {
    const { container } = render(
      <TransferTest format={(d: dataType) => `Function${d.id}`} value={['Functionid-0']} />,
    );
    const views = container.querySelectorAll(view);
    const rightHeaderCheckbox = views[1].querySelector(header)!;
    const rightHeaderCount = rightHeaderCheckbox?.querySelector(count);
    textContentTest(rightHeaderCount!, '0/1');
  });
});
describe('Transfer[VirtualScroll]', () => {
  test('should render default virtual scroll', () => {
    const { container } = render(<TransferBigData />);
    const scrollContainer = container.querySelectorAll(view)[0].querySelector(virtualContainer)!;
    classLengthTest(scrollContainer, item, 20);
    fireEvent.wheel(scrollContainer, { deltaY: 100 });
    classLengthTest(scrollContainer, item, 20);
    const bar = container.querySelector(viretualScroll)?.querySelector(viretualBar)?.parentElement;
    fireEvent.mouseEnter(bar!);
    fireEvent.scroll(bar!, {
      target: {
        scrollTop: 100,
      },
    });
    classLengthTest(scrollContainer, item, 20);
  });
  test('should render when set rowsInView', () => {
    const { container } = render(<TransferTest rowsInView={5} />);
    const scrollContainer = container.querySelectorAll(view)[0].querySelector(virtualContainer)!;
    classLengthTest(scrollContainer, item, 5);
  });
});
describe('Transfer[Disable]', () => {
  test('should render when set disabled is boolean', () => {
    const { container } = render(<TransferTest disabled />);
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      classTest(item, disabled);
      classTest(item.querySelector(checkbox)!, wrapperDisabled);
    });
  });
  test('should render when set disabled is function', () => {
    const { container } = render(<TransferTest disabled={(d: dataType) => d.id === 'id-0'} />);
    const views = container.querySelectorAll(view);
    const leftItems = views[0].querySelectorAll(item);
    leftItems.forEach((item) => {
      if (item.querySelector(checkboxDesc)?.textContent !== 'name-1') return;
      classTest(item, disabled);
      classTest(item.querySelector(checkbox)!, wrapperDisabled);
    });
  });
});
