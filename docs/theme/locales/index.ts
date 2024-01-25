import en from './en-US';
import cn from './zh-CN';

interface DocLocales {
  locale: 'cn' | 'en';
}

const getDocsLocale = (props: DocLocales) => {
  const { locale } = props;
  return locale === 'en' ? en : cn;
};

export default getDocsLocale;
