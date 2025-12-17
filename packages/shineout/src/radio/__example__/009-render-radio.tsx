/**
 * cn - 自定义渲染
 *    -- 使用 `renderWrapper` 自定义整个 radio 的渲染，可以自己组装 indicator，选中时显示高亮边框
 * en - Custom Render
 *    -- Use `renderWrapper` to customize the entire radio rendering by assembling indicator and children, with highlighted border when checked
 */
import React from 'react';
import { Radio, Tooltip, icons } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    customRadio: {
      display: 'flex',
      alignItems: 'center',
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
    customRadioDisabled: {
      cursor: 'not-allowed',
      opacity: 0.6,
      '&:hover': {
        borderColor: '#e8e8e8',
      },
    },
    group: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 12,
      '& .soui-radio-wrapper': {
        marginInlineEnd: 0,
      },
    },
  },
  { name: 'example-radio-render' },
);

interface RadioGroupItem {
  id: number;
  color: string;
}

const data: RadioGroupItem[] = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
];

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Radio.Group
      keygen='id'
      data={data}
      defaultValue={1}
      format="id"
      className={classes.group}
      disabled={(item) => item.id === 4}
      renderWrapper={({ indicator, wrapperProps, checked, disabled, item, index }) => {
        const customClassName = `${classes.customRadio} ${
          checked ? classes.customRadioChecked : ''
        } ${disabled ? classes.customRadioDisabled : ''}`;

        return (
          <div
            // 1. 必须传的 wrapperProps 和 wrapperProps.className
            {...wrapperProps}
            className={`${wrapperProps.className} ${customClassName}`}
            style={{ alignItems: 'flex-start' }}
          >
            {/* 2. 必须传的indicator */}
            {indicator}
            <span>
              {item.color}
              {item.id === 4 ? (
                <Tooltip tip='This option is disabled'>
                  <span
                    style={{
                      display: 'inline-flex',
                      marginLeft: 8,
                      width: 'var(--soui-font-12, 12px)',
                      verticalAlign: 'bottom',
                    }}
                  >
                    {icons.HelpCircleOutline}
                  </span>
                </Tooltip>
              ) : null}
              <div
                style={{ marginTop: 8, fontSize: 12, color: 'var(--soui-neutral-text-3,#999DA8)' }}
              >
                description for item-{index}...
              </div>
            </span>
          </div>
        );
      }}
    />
  );
};

export default App;
