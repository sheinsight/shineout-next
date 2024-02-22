export function compose(...funcs: any) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }
  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args: typeof last) =>
    rest.reduceRight((composed: any, f: any) => f(composed), last(...args));
}
