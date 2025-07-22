import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Spin, Alert, Empty, Message, Tooltip, Card, Divider } from 'shineout';
import useStyles from './diff-content-style';

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
      setContent('请从左侧菜单选择版本和组件查看 Diff 报告');
      return;
    }

    const loadDiffContent = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Load diff report content based on version and component
        let markdown = '';
        
        // Import all diff reports statically
        if (component === 'alert') {
          if (version === '3.7.5-beta.10') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/alert/__diff__/3.7.5-beta.10/index.md').default;
          } else if (version === '3.7.0-beta.35') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/alert/__diff__/3.7.0-beta.35/index.md').default;
          } else if (version === '3.2.5') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/alert/__diff__/3.2.5/index.md').default;
          } else if (version === '3.1.31') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/alert/__diff__/3.1.31/index.md').default;
          }
        } else if (component === 'button') {
          if (version === '3.0.2') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/button/__diff__/3.0.2/index.md').default;
          } else if (version === '3.1.2') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/button/__diff__/3.1.2/index.md').default;
          } else if (version === '3.1.30') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/button/__diff__/3.1.30/index.md').default;
          } else if (version === '3.5.3') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/button/__diff__/3.5.3/index.md').default;
          } else if (version === '3.7.0-beta.24') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/button/__diff__/3.7.0-beta.24/index.md').default;
          }
        } else if (component === 'card') {
          if (version === '3.1.10') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/card/__diff__/3.1.10/index.md').default;
          } else if (version === '3.1.16') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/card/__diff__/3.1.16/index.md').default;
          } else if (version === '3.1.23') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/card/__diff__/3.1.23/index.md').default;
          } else if (version === '3.6.1-beta.8') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/card/__diff__/3.6.1-beta.8/index.md').default;
          }
        } else if (component === 'badge') {
          if (version === '3.5.2') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/badge/__diff__/3.5.2/index.md').default;
          }
        } else if (component === 'breadcrumb') {
          if (version === '3.7.6-beta.3') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/breadcrumb/__diff__/3.7.6-beta.3/index.md').default;
          }
        } else if (component === 'carousel') {
          if (version === '3.4.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/carousel/__diff__/3.4.0/index.md').default;
          } else if (version === '3.6.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/carousel/__diff__/3.6.0/index.md').default;
          } else if (version === '3.6.0-beta.1') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/carousel/__diff__/3.6.0-beta.1/index.md').default;
          } else if (version === '3.7.0-beta.37') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/carousel/__diff__/3.7.0-beta.37/index.md').default;
          } else if (version === '3.7.0-beta.38') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/carousel/__diff__/3.7.0-beta.38/index.md').default;
          }
        } else if (component === 'checkbox') {
          if (version === '3.3.7') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.3.7/index.md').default;
          } else if (version === '3.4.3') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.4.3/index.md').default;
          } else if (version === '3.5.6') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.5.6/index.md').default;
          } else if (version === '3.5.8') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.5.8/index.md').default;
          } else if (version === '3.6.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.6.0/index.md').default;
          } else if (version === '3.6.0-beta.1') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/checkbox/__diff__/3.6.0-beta.1/index.md').default;
          }
        } else if (component === 'collapse') {
          if (version === '3.6.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/collapse/__diff__/3.6.0/index.md').default;
          }
        } else if (component === 'date-picker') {
          if (version === '3.7.5-beta.5') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/date-picker/__diff__/3.7.5-beta.5/index.md').default;
          } else if (version === '3.7.4-beta.6') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/date-picker/__diff__/3.7.4-beta.6/index.md').default;
          } else if (version === '3.6.7-beta.6') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/date-picker/__diff__/3.6.7-beta.6/index.md').default;
          } else if (version === '3.6.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/date-picker/__diff__/3.6.0/index.md').default;
          } else if (version === '3.4.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/date-picker/__diff__/3.4.0/index.md').default;
          }
        } else if (component === 'input') {
          if (version === '3.5.7') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.5.7/index.md').default;
          } else if (version === '3.5.8') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.5.8/index.md').default;
          } else if (version === '3.6.0') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.6.0/index.md').default;
          } else if (version === '3.6.0-beta.22') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.6.0-beta.22/index.md').default;
          } else if (version === '3.7.3-beta.1') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.7.3-beta.1/index.md').default;
          } else if (version === '3.7.3-beta.4') {
            markdown = require('!!raw-loader!../../../packages/shineout/src/input/__diff__/3.7.3-beta.4/index.md').default;
          }
        }
        
        if (markdown) {
          setContent(markdown);
        } else {
          throw new Error('Diff report not found');
        }
      } catch (err) {
        setError(`无法加载 ${component} 组件 ${version} 版本的 Diff 报告`);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    loadDiffContent();
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