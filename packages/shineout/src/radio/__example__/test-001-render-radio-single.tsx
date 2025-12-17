/**
 * cn - 单个Radio自定义渲染
 *    -- 验证单个 Radio 组件的 `renderWrapper` 功能
 * en - Single Radio Custom Render
 *    -- Verify `renderWrapper` functionality for single Radio component
 */
import React from 'react';
import { Radio } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    customRadio: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      border: '1px solid #e8e8e8',
      borderRadius: 4,
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#d9d9d9',
      },
    },
    customRadioChecked: {
      borderColor: 'var(--soui-brand-6,#197AFA)',
      borderWidth: 2,
      padding: '11px 15px',
      '&:hover': {
        borderColor: 'var(--soui-brand-6,#197AFA)',
      },
    },
  },
  { name: 'example-radio-render-single' },
);

const App: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <Radio
        checked={checked}
        onChange={() => setChecked(!checked)}
        renderWrapper={({ indicator, wrapperProps, checked, children }) => {
          const customClassName = `${classes.customRadio} ${
            checked ? classes.customRadioChecked : ''
          }`;

          return (
            <div
              {...wrapperProps}
              className={`${wrapperProps.className} ${customClassName}`}
            >
              {indicator}
              <span>{children}</span>
            </div>
          );
        }}
      >
        Custom Radio Option
      </Radio>
    </div>
  );
};

export default App;
