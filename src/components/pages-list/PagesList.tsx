import PageItem from '../page-item/PageItem';
import ChevronSrc from '../../assets/chevron-down.svg';
import './PagesList.scss';
import { PageModel } from '../../models/page.model';
import { ISortObject } from '../pages-table/PagesTable';

interface IPagesListProps {
  pagesList: PageModel[];
  sortObject: ISortObject;
  onSortChange: (object: ISortObject) => void;
}

const PagesList: React.FunctionComponent<IPagesListProps> = ({
  pagesList,
  sortObject,
  onSortChange,
}) => {
  return (
    <>
      {pagesList.length ? (
        <div className="pagesListDiv">
          <div className="sortingControlsDiv">
            <div
              className="control"
              onClick={() =>
                onSortChange({
                  field: 'title',
                  order:
                    sortObject.field === 'size'
                      ? 'DESC'
                      : sortObject.order === 'DESC'
                      ? 'ASC'
                      : 'DESC',
                })
              }
            >
              <p>Pages</p>
              <img
                src={ChevronSrc}
                style={{
                  transform:
                    sortObject.field === 'title' && sortObject.order === 'DESC'
                      ? 'rotate(180deg)'
                      : 'none',
                }}
                alt="sortArrow"
                width="12px"
              />
            </div>
            <div
              className="control"
              onClick={() =>
                onSortChange({
                  field: 'size',
                  order:
                    sortObject.field === 'title'
                      ? 'DESC'
                      : sortObject.order === 'DESC'
                      ? 'ASC'
                      : 'DESC',
                })
              }
            >
              <p>Size</p>
              <img
                src={ChevronSrc}
                style={{
                  transform:
                    sortObject.field === 'size' && sortObject.order === 'DESC'
                      ? 'rotate(180deg)'
                      : 'none',
                }}
                alt="sortArrow"
                width="12px"
              />
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
