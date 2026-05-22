import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export const getResponseHeaders = (
  meta: FetchBaseQueryMeta | undefined,
  headerType: string,
): string | undefined => {
  if (meta) {
    return meta.response?.headers.get(headerType) ?? undefined;
  }
  return undefined;
};
