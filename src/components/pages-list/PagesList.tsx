import PageItem from '../page-item/PageItem';
import ChevronSrc from '../../assets/chevron-down.svg';
import './PagesList.scss';
import { PageModel } from '../../models/page.model';

interface IPagesListProps {
  pagesList: PageModel[];
}

const PagesList: React.FunctionComponent<IPagesListProps> = ({ pagesList }) => {
  return (
    <>
      {pagesList.length ? (
        <div className="pagesListDiv">
          <div className="sortingControlsDiv">
            <div className="control">
              <p>Pages</p>
              <img src={ChevronSrc} alt="sortArrow" width="12px" />
            </div>
            <div className="control">
              <p>Size</p>
              <img src={ChevronSrc} alt="sortArrow" width="12px" />
            </div>
          </div>
          <div className="list">
            {pagesList.map((page) => (
              <PageItem title={page.title} size={page.size} key={page.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="pagesListDiv">
          <p>No pages were found!</p>
        </div>
      )}
    </>
  );
};

export default PagesList;
