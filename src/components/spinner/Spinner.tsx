import spinnerSrc from '../../assets/spinner.gif';

export const Spinner: React.FunctionComponent = () => {
  return (
    <div className="spinnerDiv">
      <img src={spinnerSrc} alt="spinner" />
    </div>
  );
};
