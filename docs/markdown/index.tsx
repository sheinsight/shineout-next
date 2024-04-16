import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import classnames from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useStyles } from './style';
const Md = (props: { children: string; className: string }) => {
  const { children: markdown, className } = props;
  const classes = useStyles();
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

export const MarkdownWrapper = (props: { children: string }) => {
  const { children: markdown } = props;
  const classes = useStyles();
  const headReg = /`````([\s\S]+)`````/;
  const match = markdown.match(headReg);
  const headContent = match ? match[1] : '';
  const bodyContent = markdown.replace(headReg, '');
  return (
    <>
      {headContent && <Md className={classes.head}>{headContent}</Md>}
      {bodyContent && <Md className={classes.body}>{bodyContent}</Md>}
    </>
  );
};

const Doc = () => {
  const params = useParams();
  const markdown = require(`!!raw-loader!./${params.comp}.md`).default;
  const classes = useStyles();
  return (
    <div className={classnames(classes.wrapper)}>
      <MarkdownWrapper>{markdown}</MarkdownWrapper>
    </div>
  );
};

export default Doc;
