import { Params } from '@org/types';

export function concatQueryString(params: Params): string {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();
}
