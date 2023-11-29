import {
  one,
  pick,
  pickDate,
  pickInteger,
  pickNumber,
  firstNames,
  lastNames,
  position,
  country,
  city,
} from './faker';

const totalCount = 10000;

let allData: Array<{
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  start: string;
  time: string;
  salary: number;
  country: string;
  office: string;
  office5: string;
  height: number;
  status?: boolean;
  age: number;
}> = [];
function init() {
  const offset = 5000 * 3600 * 24 * 1000;
  const c20 = pick(country, 20);
  const c30 = pick(city, 30);
  const c5 = pick(city, 5);
  for (let i = 1; i <= totalCount; i++) {
    allData.push({
      id: i,
      firstName: one(firstNames),
      lastName: one(lastNames),
      position: one(position),
      start: pickDate('YYYY-MM-DD', offset),
      time: pickDate('hh:mm'),
      salary: pickInteger(500000, 50000),
      country: one(c20),
      office: one(c30),
      office5: one(c5),
      height: pickNumber(80, 200),
      age: pickInteger(18, 100),
    });
  }

  const newFN = [];
  for (let i = 0; i <= firstNames.length; i += 3) {
    newFN.push(firstNames[i]);
  }
}

init();

export const all = (delay = 500) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(allData);
    }, delay);
  });

interface Sorter {
  name?: string;
  order?: 'asc' | 'desc' | string;
}
// eslint-disable-next-line
export function fetchSync(count = 100, start = 0, sorter: Sorter = {}, un?: string) {
  let username = un;
  const { name, order } = sorter;
  let sort: any;
  switch (name) {
    case 'id':
    case 'salary':
      if (order === 'asc') sort = (a: any, b: any) => a[name] - b[name];
      else sort = (a: any, b: any) => b[name] - a[name];
      break;
    default:
      if (name) {
        if (order === 'asc') sort = (a: any, b: any) => a[name].localeCompare(b[name]);
        else sort = (a: any, b: any) => b[name].localeCompare(a[name]);
      }
      break;
  }

  let data = sort ? [...allData].sort(sort) : allData;

  if (username) {
    username = username.toLocaleLowerCase();
    data = data.filter(
      (d) => `${d.firstName} ${d.lastName}`.toLocaleLowerCase().indexOf(username!) >= 0,
    );
  }

  return data.slice(start, start + count);
}

export const fetch = {
  // eslint-disable-next-line
  get(_src: any, { current = 1, pageSize = 100, sorter = {} as Sorter, username = '' }) {
    const start = (current - 1) * pageSize;
    const result = {
      status: 1,
      data: fetchSync(pageSize, start, sorter, username),
      current,
      pageSize,
      total: allData.length,
    };
    return new Promise<typeof result>((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, pickInteger(500, 300));
    });
  },

  post(_src: any, { op, ids }: any) {
    return new Promise((resolve) => {
      switch (op) {
        case 'delete':
          allData = allData.filter((d) => ids.indexOf(d.id) < 0);
          break;
        case 'on':
        case 'off':
          allData.forEach((d, i) => {
            if (ids.indexOf(d.id) >= 0) {
              allData[i] = { ...d, status: op === 'on' };
            }
          });
          break;
        default:
      }
      setTimeout(() => {
        resolve(true);
      }, pickInteger(200));
    });
  },
};
