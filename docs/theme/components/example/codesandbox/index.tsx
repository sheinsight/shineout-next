import { Tooltip } from 'shineout';
import { Link } from 'react-router-dom';
import { strFromU8, strToU8, zlibSync, unzlibSync } from 'fflate'
import { useMemo } from 'react';

export const utoa = (data: string) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

interface CodesandboxProps {
  code: string
}

const Codesandbox = (props: CodesandboxProps) => {
  const { code } = props

  const importMap = `
{
  "react": "18.3.1",
  "react-dom/client": "react-dom@18.3.1",
  "shineout": "laster",
  "@sheinx/mock": "laster"
}  
`
  const main = `import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`

  const codeUrl = useMemo(() => {
    
    const files = {
      'import-map.json': {
        language: 'json',
        name: 'import-map.json',
        value: importMap, 
      },
      'index.tsx': {
        name: 'index.tsx',
        value: code,
        language: 'typescript'
      },
      'main.tsx': {
        name: "main.tsx",
        language: 'typescript',
        value: main
      }
    }
    return encodeURIComponent(utoa(JSON.stringify(files)))
  }, [code])

  return (
    <div className='iconbox'>
      <Tooltip tip='在 Shineout-Playground 打开' trigger='hover' position='top'>
        <Link to={`http://shineout-playground.sheincorp.cn/#/playground?code=${codeUrl}`} target="_blank" rel="noopener noreferrer" >
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
