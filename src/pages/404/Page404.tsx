import { Link } from 'react-router-dom';
import { Error } from '../../components/error/Error';
import './Page404.scss';

const Page404: React.FunctionComponent = () => {
  return (
    <div className="page404Div">
      <Error />
      <h2>This page doesn't exist!</h2>
      <Link className='link' to="/">Go to main page</Link>
    </div>
  );
};

export default Page404;
