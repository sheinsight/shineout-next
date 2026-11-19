// table 各用例共用的确定性数据。原示例用 @sheinx/mock 的随机数据，这里换成按下标生成的固定数据，四个库同一份
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  position: string;
  office: string;
  start: string;
  salary: number;
  age: number;
}

const FIRST = ['Ephraim', 'Osvaldo', 'Dylan', 'Shaniya', 'Kyler', 'Blanca', 'Deondre', 'Brett', 'Luz', 'Geovany'];
const LAST = ['Wisozk', 'Beer', 'Ratke', 'Jacobs', 'Corkery', 'Beatty', 'Steuber', 'Harvey', 'Homenick', 'Gulgowski'];
const COUNTRY = ['Reunion', 'Peru', 'Bulgaria', 'Ghana', 'Botswana', 'Norfolk Island', 'Hong Kong'];
const POSITION = ['Marketing Designer', 'Financial Controller', 'Development Lead', 'Developer', 'Systems Administrator', 'Accountant'];
const OFFICE = ['Miami', 'San Paulo', 'Boston', 'Chengdu', 'Accra', 'Qingdao', 'London'];

const pad = (n: number) => String(n).padStart(2, '0');

export const makePeople = (n: number): Person[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    firstName: FIRST[i % FIRST.length],
    lastName: LAST[(i * 3) % LAST.length],
    country: COUNTRY[(i * 3) % COUNTRY.length],
    position: POSITION[(i * 5) % POSITION.length],
    office: OFFICE[(i * 11) % OFFICE.length],
    start: `20${pad(10 + (i % 12))}-${pad(1 + (i % 12))}-${pad(1 + ((i * 7) % 28))}`,
    salary: 100000 + ((i * 7919) % 400000),
    // 第一行不是最小值也不是最大值，升序、降序、取消排序三种状态下第一行都不同，排序场景才能靠首行内容判断「排序生效了」
    age: 20 + ((i * 17 + 13) % 40),
  }));

export const fmtSalary = (n: number) => n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

export const fullName = (d: Person) => `${d.firstName} ${d.lastName}`;

export interface TreeNode {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  position: string;
  office: string;
  children?: TreeNode[];
}

// 6 个根节点，每个根下 2 个子节点，第一个子节点下再挂 1 个孙节点（共 6 + 12 + 6 = 24 行，全部展开时）
export const makeTree = (): TreeNode[] => {
  let id = 1;
  const node = (): TreeNode => {
    const i = id++;
    return {
      id: i,
      firstName: FIRST[i % FIRST.length],
      lastName: LAST[(i * 3) % LAST.length],
      country: COUNTRY[(i * 3) % COUNTRY.length],
      position: POSITION[(i * 5) % POSITION.length],
      office: OFFICE[(i * 11) % OFFICE.length],
    };
  };
  return Array.from({ length: 6 }, () => {
    const root = node();
    const a = node();
    a.children = [node()];
    root.children = [a, node()];
    return root;
  });
};
