import { useMemo } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'shineout';
import { Link } from 'react-router-dom';
import { strFromU8, strToU8, zlibSync } from 'fflate'

export const utoa = (data: string) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

const useIncludes = (code: string, includes: string[]) => {
  const result = useMemo(() => {
    return includes.reduce((acc, include) => {
      acc[include] = code.includes(include);
      return acc;
    }, {} as Record<string, boolean>);
  }, [code, includes]);

  return result;
}

interface CodesandboxProps {
  code: string
  className?: string
  tip?: string
}

const Codesandbox = (props: CodesandboxProps) => {
  const { code, className, tip } = props

  const includes = useIncludes(code, ['@sheinx/mock', './static/icon', './utils', './static/mock', './static/code']);

  const { '@sheinx/mock': isMock, './static/icon': isIcon, './utils': isUtils, './static/mock': isSelectMock, './static/code': isCode } = includes;

  const importMapOrigin = {
    "react": "18.3.1",
    "react-dom/client": "react-dom@18.3.1",
    "react-router-dom": "6.11.2",
    "react-jss": "10.9.2",
    "shineout": "3.9.4",
    "classnames": "2.3.2",
    "immer": "10.0.2"
  }

  const importMap = JSON.stringify(isMock ? {
    ...importMapOrigin,
    "dayjs": "latest"
  } : importMapOrigin, null, 2)

  const main = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';

import App from './index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
`


  const codeUrl = useMemo(() => {
    const filesOrigin = {
      'import-map.json': {
        language: 'json',
        name: 'import-map.json',
        value: importMap,
      },
      'index.tsx': {
        name: 'index.tsx',
        value: isMock ? code.replace('@sheinx/mock', './mock') : code,
        language: 'typescript'
      },
      'main.tsx': {
        name: "main.tsx",
        language: 'typescript',
        value: main
      }
    }

    const files = {
      ...filesOrigin,
      ...(isMock ? {
        'mock.ts': {
          name: "mock.ts",
          language: 'typescript',
          value: require(`!!raw-loader!./mock.ts`).default
        },
        'faker.ts': {
          name: "faker.ts",
          language: 'typescript',
          value: require(`!!raw-loader!./faker.ts`).default
        },
        'faker-data.ts': {
          name: "faker-data.ts",
          language: 'typescript',
          value: require(`!!raw-loader!./faker-data.ts`).default
        }
      } : {}),
      ...(
        isIcon ? {
          'static/icon.tsx': {
            name: "static/icon.tsx",
            language: 'typescript',
            value: require(`!!raw-loader!./icon.tsx`).default
          }
        } : {}
      ),
      ...(
        isUtils ? {
          'utils.ts': {
            name: "utils.ts",
            language: 'typescript',
            value: require(`!!raw-loader!./utils.ts`).default
          }
        } : {}
      ),
      ...(
        isSelectMock ? {
          'static/mock.ts': {
            name: "static/mock.ts",
            language: 'typescript',
            value: require(`!!raw-loader!./select-mock.ts`).default
          }
        } : {}
      ),
      ...(
        isCode ? {
          'static/code.tsx': {
            name: "static/code.tsx",
            language: 'typescript',
            value: require(`!!raw-loader!./code.tsx`).default
          }
        } : {}
      )
    }

    return encodeURIComponent(utoa(JSON.stringify(files)))
  }, [code, isMock, isIcon, isUtils, isSelectMock, isCode])

  return (
    <div className={classNames('iconbox', className)}>
      <Tooltip tip={tip || '在 Shineout-Playground 打开'} trigger='hover' position='top'>
        <Link to={`https://shineout-playground.sheincorp.cn/#/playground?code=${codeUrl}`} target="_blank" rel="noopener noreferrer" style={{display: 'block'}}>
          <div className='icon' style={{ color: '#000' }}>
            <svg
              fill='none'
              stroke='currentColor'
              strokeWidth='4'
              viewBox='0 0 48 48'
              aria-hidden='true'
              focusable='false'
            >
              <path
                fill='currentColor'
                stroke='none'
                d='m25.002 1.6 17.9 10.3c.6.4 1 1 1 1.7v20.7c0 .7-.4 1.4-1 1.7l-17.9 10.4c-.6.4-1.4.4-2 0l-17.9-10.3c-.6-.4-1-1-1-1.7V13.7c0-.7.4-1.4 1-1.7l17.9-10.4c.6-.4 1.4-.4 2 0Zm13.5 12.4-7.9-4.5-6.6 4.5-6.5-4-7.3 4.3 13.8 8.7 14.5-9Zm-16.5 26.4V26.3l-14-8.9v7.9l8 5.5V37l6 3.4Zm4 0 6-3.5v-5.2l8-5.5v-8.9l-14 8.9v14.2Z'
              ></path>
            </svg>
          </div>
        </Link>
      </Tooltip>
    </div>
  );
};

export default Codesandbox;
