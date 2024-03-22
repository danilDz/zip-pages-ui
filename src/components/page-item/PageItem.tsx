import './PageItem.scss';

interface IPageItemProps {
  title: string;
  size: string;
}

const PageItem: React.FunctionComponent<IPageItemProps> = ({ title, size }) => {
  return (
    <div className="pageItemDiv">
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="size">
        <p>{size}</p>
      </div>
    </div>
  );
};

export default PageItem;
