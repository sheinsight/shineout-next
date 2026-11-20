/** 本地 mock：不走网络，延迟 ms 后直接成功。参数形状按各库的 request / customRequest 约定 */
export const soRequest = (ms = 0) => (options: any) => {
  const { onLoad } = options;
  const done = () => onLoad?.({ status: 200, statusText: 'OK', responseText: '{}', response: {} });
  // ms=0 时同步完成，不引入额外的宏任务，让结果尽量落在同一帧里
  if (ms === 0) done();
  else setTimeout(done, ms);
  return undefined;
};

export const antdRequest = (ms = 0) => (options: any) => {
  setTimeout(() => options.onSuccess?.({}, new XMLHttpRequest()), ms);
  return { abort() {} };
};
