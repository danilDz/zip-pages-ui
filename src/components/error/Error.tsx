import errorSrc from '../../assets/error.png';

export const Error: React.FunctionComponent = () => {
  return (
    <div className="errorDiv">
      <img src={errorSrc} alt="error" style={{ width: '200px' }} />
    </div>
  );
};
