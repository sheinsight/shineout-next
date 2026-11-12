import type { LibKey } from '../core/types';

export const frameUrl = (lib: LibKey, caseId: string, extra: Record<string, string | number> = {}) => {
  const qs = new URLSearchParams({ lib, case: caseId });
  Object.entries(extra).forEach(([k, v]) => qs.set(k, String(v)));
  return `./frame.html?${qs.toString()}`;
};
