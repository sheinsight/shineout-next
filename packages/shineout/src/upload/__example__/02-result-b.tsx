/**
 * cn -
 *    -- 设置 `customResult` 属性可以自定义上传结果展示
 * en -
 *    -- Set the `customResult` property to customize the upload result display

 */
import React from 'react';
import { Button, Upload, Link, icons } from 'shineout';
import { UploadIcon, FilePdfIcon, FielWordIcon, FileIcon, ImageIcon } from './static/icon';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '4px 8px',
      gap: 4,
      marginTop: 2,
      '&:hover': {
        borderRadius: 2,
        backgroundColor: 'var(---Neutral-fill-2-, #F4F5F8)',
      },
      '& svg': {
        width: 14,
        flexShrink: 0,
        lineHeight: '22px',
        height: 22,
      }
    },
    btn: {
      display: 'flex',
      marginLeft: 'auto',
      flexShrink: 0,
      height: 22,
    }
  },
  { name: 'upload-custom' },
);


interface FileItem {
  name: string;
}
const df = [
  {
    name: '文件名称.doc',
  },
  {
    name: '文件名称.pdf',
  },
  {
    name: '文件名称.txt',
  },
  {
    name: '文件名称.png',
  },
  {
    name: '文件名称.gif',
  },
];

// 根据文件名获取文件图标
const renderFileIcon = (name: string) => {
  const ext = name.split('.').pop();
  if (ext === 'pdf') {
    return <FilePdfIcon fontSize={14} />;
  }
  if (ext === 'doc') {
    return <FielWordIcon fontSize={14} />;
  }
  if(ext === 'png' || ext === 'gif') {
    return <ImageIcon fontSize={14} />
  }
  return <FileIcon fontSize={14} />;
}

interface CustomResultProps {
  value: FileItem[];
  files: any;
  onValueRemove: (index: number) => void;
  onFileRemove: (id: string) => void;
  recoverValue: any;
  onValueRecover: (index: number) => void;
}

const App: React.FC = () => {
  const [value, setValue] = React.useState<FileItem[]>(df);

  const classnames = useStyles();

  const customResult = (options: CustomResultProps) => {
    const { value, onValueRemove } = options;
    return value.map((item, index) => {

      return <div key={item.name} className={classnames.item} style={index === 0 ? { marginTop: 12 } : {}}>
        {renderFileIcon(item.name)}
        {item.name}
        <Link type="secondary" onClick={() => onValueRemove(index)} style={{width: 14}} className={classnames.btn}>
          {icons.Delete}
        </Link>
      </div>
    }) as any;
  }
  return (
    <Upload
      accept='*'
      value={value}
      htmlName='file'
      customResult={customResult}
      onSuccess={(_res, file) => ({
        name: file.name,
      })}
      onChange={(v) => {
        setValue(v);
      }}
      style={{ width: 400 }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};

export default App;
