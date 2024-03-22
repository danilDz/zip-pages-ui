import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageModel } from '../../models/page.model';
import useApiService from '../../services/api.service';
import setContent from '../../utils/set-content';
import PagesList from '../pages-list/PagesList';
import { rowsPerPage } from '../../constants';
import ArrowSrc from '../../assets/arrow-left.svg';
import './PagesTable.scss';

interface IViewProps {
  pagesList: PageModel[];
  pagesCount: number;
  offset: number;
  limit: number;
  onLimitChange: (event: React.ChangeEvent) => void;
  onPageChange: (page: 'next' | 'prev') => void;
}

const PagesTable: React.FunctionComponent = () => {
  const { process, setProcess, clearError, getManyPages } = useApiService();
  const [pagesList, setPagesList] = useState<null | PageModel[]>(null);
  const [pagesCount, setPagesCount] = useState<null | number>(null);
  const [limit, setLimit] = useState<number>(import.meta.env.VITE_DEFAULT_PAGES_LIMIT);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function fetchPagesList() {
      clearError();
      const fetchedPages = await getManyPages(offset, limit);
      if (fetchedPages.statusCode) return;
      setPagesList(fetchedPages.pagesList);
      setPagesCount(fetchedPages.count);
      setProcess('confirmed');
    }

    fetchPagesList();
  }, [limit, offset]);

  const onLimitChange = (event: React.ChangeEvent) => {
    const newLimit = parseInt((event.target as HTMLSelectElement).value);
    setLimit(newLimit);
  };

  const onPageChange = (page: 'next' | 'prev') => {
    if (page === 'next') setOffset((prev) => prev + limit);
    else setOffset((prev) => prev - limit);
  };

  return (
    <div className="pagesTableDiv">
      {setContent(process, View, {
        pagesList,
        pagesCount,
        offset,
        limit,
        onLimitChange,
        onPageChange,
      })}
    </div>
  );
};

const View: React.FunctionComponent<IViewProps> = ({
  pagesList,
  pagesCount,
  offset,
  limit,
  onLimitChange,
  onPageChange,
}) => {
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
          <PagesList pagesList={pagesList} />
        </div>
      </div>
      {pagesList.length ? (
        <div className="paginationDiv">
          <p>
            {offset + 1}-{offset + limit >= pagesCount ? pagesCount : offset + limit} of {pagesCount}
          </p>
          <div className="controls">
            <div className="perPageDiv">
              <label htmlFor="perPage">Rows per page:</label>
              <select name="perPage" id="perPage" value={limit} onChange={onLimitChange}>
                {rowsPerPage.map((rows) => (
                  <option key={rows} value={rows}>
                    {rows}
                  </option>
                ))}
              </select>
            </div>
            <div className="navigation">
              <button
                disabled={offset === 0}
                className={`navigationControl ${offset === 0 ? 'disabled' : ''}`}
                onClick={() => onPageChange('prev')}
              >
                <img src={ArrowSrc} alt="arrowLeft" className="arrowLeft" />
              </button>
              <button
                disabled={offset + limit >= pagesCount}
                className={`navigationControl ${offset + limit >= pagesCount ? 'disabled' : ''}`}
                onClick={() => onPageChange('next')}
              >
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
