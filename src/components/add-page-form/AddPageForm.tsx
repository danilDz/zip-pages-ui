import { useEffect, useRef } from 'react';
import useApiService from '../../services/api.service';
import setContent from '../../utils/set-content';
import UploadFileSrc from '../../assets/upload-file.svg';
import './AddPageForm.scss';
import { useNavigate } from 'react-router-dom';

interface IViewProps {
  fileInputRef: React.MutableRefObject<null>;
  pageTitleRef: React.MutableRefObject<null>;
  fileLabelRef: React.MutableRefObject<null>;
  onFileInputChange: () => void;
  onFormSubmit: (event: React.MouseEvent) => void;
}

const AddPageForm: React.FunctionComponent = () => {
  const { uploadFile, createPage, process, setProcess } = useApiService();
  const pageTitleRef = useRef(null);
  const fileInputRef = useRef(null);
  const fileLabelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProcess('confirmed');
  }, []);

  const onFileInputChange = () => {
    let fileLabel: string;
    if ((fileInputRef.current! as HTMLInputElement).value)
      fileLabel = (fileInputRef.current! as HTMLInputElement).value.split('\\').pop()!;
    else fileLabel = 'Upload zip file';
    (fileLabelRef.current! as HTMLSpanElement).innerHTML = fileLabel;
  };

  const onFormSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    const file = (fileInputRef.current! as HTMLInputElement).files![0];
    const title = (pageTitleRef.current! as HTMLInputElement).value;
    const formData = new FormData();
    formData.append('file', file);
    const uploadedFile = await uploadFile(formData);
    if (uploadedFile.statusCode) return;
    const page = await createPage({
      title,
      path: uploadedFile.path,
      size: uploadedFile.size.toString(),
    });
    if (page.statusCode) return;
    navigate('/');
  };

  const validateForm = () => {
    (pageTitleRef.current! as HTMLInputElement).classList.remove('invalid');
    (fileLabelRef.current! as HTMLLabelElement).parentElement!.classList.remove('invalid');
    let flag = true;
    if (!(pageTitleRef.current! as HTMLInputElement).value) {
      flag = false;
      (pageTitleRef.current! as HTMLInputElement).classList.add('invalid');
    }
    if (!(fileInputRef.current! as HTMLInputElement).value) {
      flag = false;
      (fileLabelRef.current! as HTMLLabelElement).parentElement!.classList.add('invalid');
    }
    return flag;
  };

  return (
    <>
      {setContent(process, View, {
        pageTitleRef,
        fileInputRef,
        fileLabelRef,
        onFileInputChange,
        onFormSubmit,
      })}
    </>
  );
};

const View: React.FunctionComponent<IViewProps> = ({
  pageTitleRef,
  fileInputRef,
  fileLabelRef,
  onFileInputChange,
  onFormSubmit,
}) => {
  return (
    <form className="addPageForm" encType="multipart/form-data">
      <label htmlFor="title">Page Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className="pageTitle"
        placeholder="Enter page name"
        ref={pageTitleRef}
      />
      <input
        type="file"
        name="pageFile"
        id="pageFile"
        accept=".zip"
        className="pageFileInput"
        onChange={onFileInputChange}
        ref={fileInputRef}
      />
      <label htmlFor="pageFile" className="pageFileLabel">
        <img src={UploadFileSrc} alt="uploadFile" />
        <span ref={fileLabelRef}>Upload zip file</span>
      </label>
      <button className="button" onClick={onFormSubmit}>
        Add page
      </button>
    </form>
  );
};

export default AddPageForm;
