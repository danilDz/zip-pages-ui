import { Link } from 'react-router-dom';
import AddPageForm from '../../components/add-page-form/AddPageForm';
import ArrowSrc from '../../assets/arrow-left.svg';
import './AddPagePage.scss';

const AddPagePage: React.FunctionComponent = () => {
  return (
    <div className="addPagePageDiv">
      <Link to="/" className="button">
        <img src={ArrowSrc} alt="arrowLeft" /> Main Page
      </Link>
      <h1>Add page form</h1>
      <AddPageForm />
    </div>
  );
};

export default AddPagePage;
