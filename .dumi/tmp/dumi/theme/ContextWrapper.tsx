// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React, { useState, useEffect, useRef } from 'react';
import { useOutlet, history } from 'dumi';
import { SiteContext } from '/Users/10038185/shineout-next-main/shineout-next/node_modules/.pnpm/dumi@2.1.21_@babel+core@7.22.5_@types+node@20.4.0_@types+react@18.2.0_eslint@8.23.0_jest@29.5_4p3h2tlfpdunpw7etllobps54m/node_modules/dumi/dist/client/theme-api/context.js';
import { demos, components } from '../meta';
import { locales } from '../locales/config';

const entryExports = {};

export default function DumiContextWrapper() {
  const outlet = useOutlet();
  const [loading, setLoading] = useState(true);
  const prev = useRef(history.location.pathname);

  useEffect(() => {
    return history.listen((next) => {
      if (next.location.pathname !== prev.current) {
        prev.current = next.location.pathname;

        // mark loading when route change, page component will set false when loaded
        setLoading(true);

        // scroll to top when route changed
        document.documentElement.scrollTo(0, 0);
      }
    });
  }, []);

  return (
    <SiteContext.Provider
      value={{
        pkg: {
          name: 'sheinx',
          description: 'A react library developed with dumi',
          version: '0.0.1',
          license: 'MIT',
          authors: ['chenlihao@shein.com'],
        },
        historyType: 'browser',
        entryExports,
        demos,
        components,
        locales,
        loading,
        setLoading,
        themeConfig: {
          footer:
            'Copyright © 2023 | Powered by <a href="https://d.umijs.org" target="_blank" rel="noreferrer">dumi</a>',
          prefersColor: { default: 'light', switch: true },
          name: 'soui',
          favicon: '/shine.svg',
          logo: '/shine.svg',
        },
      }}
    >
      {outlet}
    </SiteContext.Provider>
  );
}
