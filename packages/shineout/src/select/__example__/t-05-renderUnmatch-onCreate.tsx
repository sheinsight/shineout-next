/**
 * cn - renderUnmatch-onCreate
 *    -- 使用 `renderUnmatched` 和 `onCreate` 属性来处理未匹配的输入
 * en - renderUnmatch-onCreate
 *    -- use `renderUnmatched` and `onCreate` to handle unmatched input
 */
import React, { useEffect } from 'react';
import { Select } from 'shineout';

type DataItem = {
  id: string;
  name: string;
};

const data: DataItem[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

export default () => {
  const [selectValue, setSelectValue] = React.useState()

  // const dataObj = [{ postCode: "1111", postCodeId: 1 }];
  const dataObj = [];
  console.log('selectValue:>>>', selectValue)

  useEffect(() => {
    setSelectValue("1111")
  }, [])

  return (
    <div>
      <Select
        value={selectValue}
        onChange={setSelectValue}
        style={{ marginLeft: 24 }}
        width={300}
        data={dataObj}
        onCreate={(t) => ({
          postCodeId: dataObj.find(d => d.postCode === t)?.postCodeId ?? -1,
          postCode: t,
        })}
        filterDelay={0}
        trim
        format="postCode"
        renderItem="postCode"
        keygen="postCodeId"
        height={250}
        autoAdapt
        onFilter={(text) => (d) => {
          return d?.postCode?.indexOf(text) >= 0;
        }}
        renderUnmatched={() => undefined}
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};