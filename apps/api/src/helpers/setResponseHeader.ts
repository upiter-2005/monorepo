import { Response } from 'express';

export const setResponseHeader = (response: Response, headerType: string, value: string): void => {
  response.setHeader('x-access-token', value);
};
