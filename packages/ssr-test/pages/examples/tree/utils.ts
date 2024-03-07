/**
 * 嵌套数据生成方法
 * [5,3,2] 代表 生成一个包含5条数据的数组，每条数据包含3条子数据，每条子数据包含2条子数据，以此类推
 */
export const createNestedArray = (numbers: number[]) => {
  let count = 0;
  const result = new Array(numbers[0])
    .fill(null)
    .map(() => ({ id: String(count++), children: [] }));

  let currList = result;

  for (let i = 1; i < numbers.length; i++) {
    const prevList = currList;
    currList = [];
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    prevList.forEach((el) => {
      for (let j = 0; j < numbers[i]; j++) {
        const elem = { id: `${el.id}-${j}`, children: [] };
        currList.push(elem);
        // @ts-ignore
        el.children.push(elem);
      }
    });
  }

  return result;
};

export const getIds = (array: any, res: any = []) => {
  if (array && array.length > 0) {
    array.forEach((item: any) => {
      res.push(item.id);
      if (item.children && item.children.length > 0) {
        getIds(item.children, res);
      }
    });
  }
  return res;
};
