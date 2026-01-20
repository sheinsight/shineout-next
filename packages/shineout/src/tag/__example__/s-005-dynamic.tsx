/**
 * cn - 可删除和添加标签
 *    -- 通过数组生成tags，动态增改
 * en - Delete and add tags
 *    -- Generate tags through arrays, dynamically increase and change
 */

import { useState } from 'react';
import { Tag, Modal } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles(
  {
    addTag: {
      '&:hover': {
        borderColor: 'var(--soui-tag-info-outline-border-color,var(--soui-brand-6,#197AFA))',
        color: 'var(--soui-tag-info-outline-font-color,var(--soui-brand-6,#197AFA))',
      },
    },
  },
  { name: 'custom-tag' },
);

const plusIcon = (
  <svg
    viewBox='0 0 24 24'
    width='12px'
    height='12px'
    fill='currentColor'
    style={{ display: 'block' }}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.8185 2.09595C12.3708 2.09595 12.8185 2.54366 12.8185 3.09595V10.8181H20.9041C21.4564 10.8181 21.9041 11.2658 21.9041 11.8181C21.9041 12.3704 21.4564 12.8181 20.9041 12.8181H12.8185V20.904C12.8185 21.4563 12.3708 21.904 11.8185 21.904C11.2662 21.904 10.8185 21.4563 10.8185 20.904V12.8181H3.10059C2.5483 12.8181 2.10059 12.3704 2.10059 11.8181C2.10059 11.2658 2.5483 10.8181 3.10059 10.8181H10.8185V3.09595C10.8185 2.54366 11.2662 2.09595 11.8185 2.09595Z'
    ></path>
  </svg>
);

export default () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);

  const classes = useStyle();

  const remove = (removedTag: string) => {
    const t = tags.filter((tag: string) => tag !== removedTag);
    setTags(t);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputBlur = (value: string) => {
    let newTags = tags;
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value];
    }
    setTags(newTags);
    setInputVisible(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
        {tags.map((a) => (
          <Tag
            key={a}
            disabled={a === 'Tag 3' ? true : false}
            onClose={() => {
              return new Promise((resolve, reject) => {
                Modal.confirm({
                  title: '确认删除',
                  content: `确定要删除标签 "${a}" 吗？`,
                  onOk: () => {
                    remove(a);
                    resolve(true);
                  },
                  onCancel: () => {
                    reject();
                  },
                });
              });
            }}
          >
            {a}
          </Tag>
        ))}

        {inputVisible ? (
          <Tag.Input style={{ width: 100, marginLeft: 8 }} onBlur={handleInputBlur} size='small' />
        ) : (
          <Tag
            style={{ cursor: 'pointer', borderStyle: 'dashed' }}
            onClick={showInput}
            mode='outline'
            className={classes.addTag}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginInlineEnd: 4 }}>{plusIcon}</div>
              <div>Add Tag</div>
            </div>
          </Tag>
        )}
      </div>
    </div>
  );
};
