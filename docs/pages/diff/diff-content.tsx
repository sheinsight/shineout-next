import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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
        // Load the diff report file
        const response = await fetch(`/packages/shineout/src/${component}/__diff__/${version}/index.md`);
        if (!response.ok) {
          throw new Error('Diff report not found');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        try {
          // Try to load from the bundled files
          const markdown = require(`!!raw-loader!../../../../packages/shineout/src/${component}/__diff__/${version}/index.md`).default;
          setContent(markdown);
        } catch (innerErr) {
          setError(`无法加载 ${component} 组件 ${version} 版本的 Diff 报告`);
          setContent('');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDiffContent();
  }, [version, component, pr]);

  if (loading) {
    return <div className={classes.loading}>加载中...</div>;
  }

  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  if (!content) {
    return <div className={classes.empty}>请从左侧菜单选择版本和组件查看 Diff 报告</div>;
  }

  return (
    <div className={classes.content}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DiffContent;