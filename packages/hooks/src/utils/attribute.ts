export const getDataAttribute = (attrs: Record<string, string>) => {
  return Object.keys(attrs).reduce((acc, key) => {
    const ns = `data-soui-${key}`;
    acc[ns] = attrs[key];
    return acc;
  }, {} as Record<string, string>);
};
