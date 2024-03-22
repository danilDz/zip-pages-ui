import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Spinner } from './components/spinner/Spinner';
import './App.scss';

const MainPage = lazy(() => import('./pages/main/MainPage'));
const AddPagePage = lazy(() => import('./pages/add-page/AddPagePage'));
const Page404 = lazy(() => import('./pages/404/Page404'));

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/add-page" element={<AddPagePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
