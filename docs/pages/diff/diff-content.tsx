import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Spin, Alert, Empty, Message, Tooltip, Card, Divider } from 'shineout';
import useStyles from './diff-content-style';
import { diffReports } from './diff-imports';

interface DiffContentProps {
  version: string;
  component: string;
}

const DiffContent: React.FC<DiffContentProps> = ({ version, component }) => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!version || !component) {
      setContent('');
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    
    // Get content from imported data
    const key = `${component}/${version}`;
    const reportContent = diffReports[key];
    
    if (reportContent) {
      setContent(reportContent);
    } else {
      setError(`无法加载 ${component} 组件 ${version} 版本的 Diff 报告`);
      setContent('');
    }
    
    setLoading(false);
  }, [version, component]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <Spin size={40} type="ring" tip="加载中..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Alert type="danger" title="加载失败">
          {error}
        </Alert>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={classes.emptyContainer}>
        <Empty description="请从左侧菜单选择版本和组件查看 Diff 报告" />
      </div>
    );
  }

  // Function to copy text to clipboard
  const copyToClipboard = (text: string, event: React.MouseEvent) => {
    navigator.clipboard.writeText(text).then(() => {
      Message.success('路径已复制到剪贴板');
    }).catch((err) => {
      console.error('Failed to copy:', err);
      Message.error('复制失败，请重试');
    });
  };

  // Function to render file paths with copy functionality
  const renderFilePath = (path: string) => {
    return (
      <Tooltip tip="点击复制路径">
        <code 
          className={classes.filePath}
          onClick={(e) => copyToClipboard(path, e)}
        >
          {path}
        </code>
      </Tooltip>
    );
  };

  // Process content to replace file paths with clickable elements
  const processedContent = content.replace(
    /`(packages\/[^`]+)`/g,
    (match, path) => {
      return `<span class="file-path-wrapper" data-path="${path}"></span>`;
    }
  );

  return (
    <Card className={classes.contentCard}>
      <div className={classes.content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2({ node, children, ...props }) {
              return (
                <>
                  <Divider />
                  <h2 {...props}>{children}</h2>
                </>
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const childString = String(children);
              
              // Check if this is a file path
              if (inline && childString.startsWith('packages/')) {
                return renderFilePath(childString);
              }
              
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {childString.replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            span({ node, className, children, ...props }) {
              if (className === 'file-path-wrapper') {
                const path = (props as any)['data-path'];
                if (path) {
                  return renderFilePath(path);
                }
              }
              return <span className={className} {...props}>{children}</span>;
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </Card>
  );
};

export default DiffContent;