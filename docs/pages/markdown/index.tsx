import React, { useCallback, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import classnames from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useStyles } from './style';
// 解析 hash 后的查询参数
const parseHashQuery = () => {
  const fullHash = window.location.hash;
  const questionMarkIndex = fullHash.indexOf('?');

  if (questionMarkIndex === -1) return {};

  const queryString = fullHash.substring(questionMarkIndex + 1);
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

// 更新 hash 中的查询参数
const updateHashQuery = (params: Record<string, string>) => {
  // 直接从 window.location 获取当前的 hash，避免重复拼接
  const currentHash = window.location.hash;
  const questionMarkIndex = currentHash.indexOf('?');
  const basePath = questionMarkIndex === -1 ? currentHash : currentHash.substring(0, questionMarkIndex);

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

const Md = (props: { children: string; className: string; enableAnchor?: boolean }) => {
  const { children: markdown, className, enableAnchor = false } = props;
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const handleHeadingClick = useCallback((text: string) => {
    if (!enableAnchor) return;

    // 生成锚点ID，保留版本号中的点号
    const anchorId = text.toLowerCase().replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');

    // 滚动到对应元素
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 更新URL中的参数 - 这里假设版本号就是标题文本
    const versionMatch = text.match(/^\d+\.\d+\.\d+/);
    if (versionMatch) {
      const newHash = updateHashQuery({ version: versionMatch[0] });
      // 直接更新 window.location.hash，避免 React Router 的干扰
      window.location.hash = newHash;
    }
  }, [enableAnchor, location.hash, navigate]);

  // 每个Md组件渲染后尝试自动滚动
  useEffect(() => {
    if (!enableAnchor) return;

    const hashParams = parseHashQuery();
    const version = hashParams.version;

    if (version) {
      const anchorId = version.toLowerCase().replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [enableAnchor, location.hash, markdown]);

  return (
    <Markdown
      className={className}
      components={{
        table: ({ children, node: _node, ...rest }) => {
          return (
            // @ts-ignore
            <table {...rest}>{children}</table>
          );
        },
        h2: ({ children, node: _node, ...rest }) => {
          const text = children?.toString() || '';
          const isVersionTitle = enableAnchor && /^\d+\.\d+\.\d+/.test(text);

          if (!isVersionTitle) {
            return <h2 {...rest}>{children}</h2>;
          }

          const anchorId = text.toLowerCase().replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
          return (
            <h2
              {...rest}
              id={anchorId}
              data-clickable="true"
              onClick={() => handleHeadingClick(text)}
            >
              {children}
            </h2>
          );
        },
        code(props) {
          const { children, className, node: _node, ...rest } = props;

          if (className === 'language-js:react') {
            return <div className={classes.demo} dangerouslySetInnerHTML={{ __html: children }} />;
          }
          const match = /language-(\w+)/.exec(className || '');
          if (match) {
            return (
              //@ts-ignore
              <SyntaxHighlighter
                {...rest}
                style={{}}
                PreTag='div'
                language={match[1]}
                className={classes.code}
              >
                {children as string}
              </SyntaxHighlighter>
            );
          }
          return (
            <code {...rest} className={classnames(className, classes.tag)}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
    >
      {markdown}
    </Markdown>
  );
};

export const MarkdownWrapper = (props: { children: string; enableAnchor?: boolean }) => {
  const { children: markdown, enableAnchor = false } = props;
  const classes = useStyles();

  const headReg = /`````([\s\S]+)`````/;
  const match = markdown.match(headReg);
  const headContent = match ? match[1] : '';
  const bodyContent = markdown.replace(headReg, '');

  return (
    <>
      {headContent && <Md className={classes.head} enableAnchor={enableAnchor}>{headContent}</Md>}
      {bodyContent && <Md className={classes.body} enableAnchor={enableAnchor}>{bodyContent}</Md>}
    </>
  );
};

const Doc = () => {
  const params = useParams();
  const markdown =
    require(`!!raw-loader!../../markdown/${params.project}/${params.comp}.md`).default;
  const classes = useStyles();
  return (
    <div className={classnames(classes.wrapper)}>
      <MarkdownWrapper>{markdown}</MarkdownWrapper>
    </div>
  );
};

export default Doc;
