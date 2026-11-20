// 原示例的数据来自 @sheinx/mock（含随机和网络模拟），横评里换成确定性的本地数据，避免随机和异步引入噪声
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  country: string;
}

const POSITIONS = ['Marketing Designer', 'Financial Controller', 'Development Lead', 'Developer'];
const COUNTRIES = ['Reunion', 'Syrian Arab Republic', 'Peru', 'Peru'];

export const makePeople = (n: number, offset = 0): Person[] =>
  Array.from({ length: n }, (_, i) => {
    const id = offset + i + 1;
    return {
      id,
      firstName: `First${id}`,
      lastName: `Last${id}`,
      position: POSITIONS[id % 4],
      country: COUNTRIES[id % 4],
    };
  });

export const PEOPLE4 = makePeople(4);

export const STRINGS = Array.from({ length: 4 }, () => 'This is a long list of contents');

export interface DynamicItem {
  id: number;
  name: string;
  content: string;
}
// 原示例用 Math.random 决定每条内容的重复次数，这里改成按 id 取模，每次渲染一致
export const DYNAMIC: DynamicItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  content: `This is the content for item ${i}. `.repeat((i % 10) + 1),
}));
