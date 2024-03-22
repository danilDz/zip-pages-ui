import { Spinner } from "../components/spinner/Spinner";
import { Error as ErrorComponent } from "../components/error/Error";

export type ContentProcess = 'loading' | 'confirmed' | 'error';

const setContent = (
  process: ContentProcess,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.FunctionComponent<any>,
  data: object
) => {
  switch (process) {
    case 'loading':
      return <Spinner />;
    case 'confirmed':
      return <Component {...data} />;
    case 'error':
      return <ErrorComponent />;
    default:
      throw new Error('Unexpected process state!');
  }
};

export default setContent;
