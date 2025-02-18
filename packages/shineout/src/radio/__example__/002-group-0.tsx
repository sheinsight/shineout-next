/**
 * cn - 单选框组
 *    -- Radio.Group 通过数据来生成一组单选框
 * en - Group
 *    -- Radio.Group generate a group of radios from an array
 */
import React from 'react';
import { Radio } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    myRadioGroup: {
      '& .soui-radio': {
        marginBottom: 12
      },
    },
  },
  { name: 'example-radio-group-0' },
);


type RadioGroupItem = string;

const data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  const classes = useStyles();

  return <Radio.Group keygen data={data} defaultValue='blue' renderItem={(d) => d} className={classes.myRadioGroup} />;
};

export default App;
