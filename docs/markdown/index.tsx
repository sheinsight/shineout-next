import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const codeBg = 'rgb( 242,243,245 )';
const useStyles = createUseStyles(
  {
    wrapper: {
      maxWidth: '1100px',
      width: '100%',
      margin: '0 auto',
      padding: 20,
      '& h1,  & h2, & h3': {
        fontWeight: 500,
        color: 'rgb( 29,33,41 )',
      },
      '& h2': {
        margin: '32px 0 16px;',
      },
      '& strong': {
        fontWeight: 500,
      },
      '& p': {
        color: 'rgb(78,89,105)',
        fontSize: 14,
      },
      '& pre[class^=language-]': {
        borderRadius: 4,
      },
      '& table': {
        width: '100%',
        border: '1px solid #e5e6e8',
        textAlign: 'center',
        borderRadius: '4px',
        borderSpacing: 0,

        '& th': {
          backgroundColor: 'rgb( 242,243,245 )',
          padding: '8px',
          borderRight: '1px solid #e5e6e8',
        },
        '& th, & td': { padding: 10 },
      },
      '& li': {
        lineHeight: 2,
        color: 'rgb( 78,89,105 )',
      },
      '& ul': {
        paddingLeft: '24px',
        margin: 0,
        listStyle: 'circle',
        '& ul': {
          marginBottom: 0,
          marginTop: 0,
          listStyleType: 'disc',
          '& ul': {
            listStyleType: 'square',
          },
        },
      },
      '& code, & $tag': {
        fontFamily: 'Menlo, Consola',
        fontSize: '12px',
        borderRadius: '4px',
      },
    },
    noPadding: {
      padding: 0,
    },
    head: {
      borderBottom: '1px solid rgb(229, 230, 235)',
      paddingBottom: 20,
    },
    body: {},
    demo: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      padding: '1em',
      backgroundColor: codeBg,
    },
    tag: {
      padding: '2px 8px',
      borderRadius: '2px',
      margin: '0 4px',
      color: 'rgb( 78,89,105 )',
      border: `1px solid ${codeBg}!important`,
      backgroundColor: codeBg,
    },
    code: {
      borderRadius: '4px!important',
      border: `1px solid ${codeBg}!important`,
      backgroundColor: `${codeBg}!important`,
    },
  },
 
  { name: 'Doc' },
);

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

export const MarkdownWrapper = (props: { children: string; noPadding?: boolean }) => {
  const { children: markdown, noPadding } = props;
  const classes = useStyles();
  const headReg = /`````([\s\S]+)`````/;
  const match = markdown.match(headReg);
  const headContent = match ? match[1] : '';
  const bodyContent = markdown.replace(headReg, '');
  return (
    <div className={classnames(classes.wrapper, noPadding && classes.noPadding)}>
      {headContent && <Md className={classes.head}>{headContent}</Md>}
      {bodyContent && <Md className={classes.body}>{bodyContent}</Md>}
    </div>
  );
};

const Doc = () => {
  const params = useParams();
  const markdown = require(`!!raw-loader!./${params.comp}.md`).default;
  return <MarkdownWrapper>{markdown}</MarkdownWrapper>;
};

export default Doc;
