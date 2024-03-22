import { useHttp } from '../hooks/http.hook';
import { PageModel } from '../models/page.model';

const useApiService = () => {
  const { loading, error, process, setProcess, request, clearError } = useHttp();

  const baseUrl = import.meta.env.VITE_API_URL;

  const uploadFile = async (file: FormData) => {
    return await request(`${baseUrl}/api/pages/upload-file`, 'json', 'POST', file);
  };

  const createPage = async (page: Omit<PageModel, 'id'>) => {
    return await request(
      `${baseUrl}/api/pages/create`,
      'json',
      'POST',
      { ...page },
      {
        'Content-Type': 'application/json',
      }
    );
  };

  const getManyPages = async (offset: number, limit: number) => {
    return await request(`${baseUrl}/api/pages/get-many?offset=${offset}&limit=${limit}`, 'json');
  };

  return {
    loading,
    error,
    process,
    setProcess,
    clearError,
    uploadFile,
    createPage,
    getManyPages,
  };
};

export default useApiService;
