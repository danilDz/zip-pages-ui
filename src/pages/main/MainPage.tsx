import PagesTable from '../../components/pages-table/PagesTable';
import './MainPage.scss';

const MainPage: React.FunctionComponent = () => {
  return (
    <div className="mainPageDiv">
      <div className="sideDiv" />
      <div className="tableMainDiv">
        <PagesTable />
      </div>
    </div>
  );
};

export default MainPage;
