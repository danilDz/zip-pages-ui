import { ContentProcess } from '../../utils/set-content';

export interface IHttpHookReturnValue {
  loading: boolean;
  error: null | string;
  process: ContentProcess;
  setProcess: (value: ContentProcess) => void;
  request: (
    url: string,
    returnType: 'string' | 'json',
    method?: string,
    body?: object,
    headers?: object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  clearError: () => void;
}
