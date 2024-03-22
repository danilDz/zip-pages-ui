import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageModel } from '../../models/page.model';
import useApiService from '../../services/api.service';
import setContent from '../../utils/set-content';
import PagesList from '../pages-list/PagesList';
import ArrowSrc from '../../assets/arrow-left.svg';
import './PagesTable.scss';

interface IViewProps {
  pagesList: null | PageModel[];
}

const PagesTable: React.FunctionComponent = () => {
  const { process, setProcess, clearError, getManyPages } = useApiService();
  const [pagesList, setPagesList] = useState<null | PageModel[]>(null);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function fetchPagesList() {
      clearError();
      const fetchedPagesList = await getManyPages(offset, limit);
      if (fetchedPagesList.statusCode) return;
      setPagesList(fetchedPagesList);
      setProcess('confirmed');
    }

    fetchPagesList();
  }, []);

  return <div className="pagesTableDiv">{setContent(process, View, { pagesList })}</div>;
};

const View: React.FunctionComponent<IViewProps> = ({ pagesList }) => {
  return (
    <>
      <div className="tableDiv">
        <div className="header">
          <p className="title">Pages</p>
          <Link to="/add-page" className="button desktopButton">
            + Add Page
          </Link>
          <Link to="/add-page" className="button mobileButton">
            +
          </Link>
        </div>
        <div className="pagesList">
          <PagesList pagesList={pagesList!} />
        </div>
      </div>
      {pagesList!.length ? (
        <div className="paginationDiv">
          <p>1-10 of 388</p>
          <div className="controls">
            <div className="perPageDiv">
              <label htmlFor="perPage">Rows per page:</label>
              <select name="perPage" id="perPage">
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="navigation">
              <button className="navigationControl">
                <img src={ArrowSrc} alt="arrowLeft" className="arrowLeft" />
              </button>
              <button className="navigationControl">
                <img src={ArrowSrc} alt="arrowRight" className="arrowRight" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PagesTable;
