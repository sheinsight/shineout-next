import en from './en-US';
import zh from './zh-CN';

interface DocLocales {
  locale: 'en' | 'zh';
}

const useDocsLocale = (props: DocLocales) => {
  const { locale } = props;
  return locale === 'en' ? en : zh;
};

export default useDocsLocale;
