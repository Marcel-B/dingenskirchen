import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import TestErrors from '../../features/buchungen/errors/TestError';
import ServerError from '../../features/buchungen/errors/ServerError';
import MainContent from './MainContent';
import BuchungForm from '../../features/buchungen/form/BuchungForm';
import NotFound from '../../features/buchungen/errors/NotFound';
import { useAppDispatch, useAppSelector } from '../stores';
import { fetchUserAsync } from '../stores/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(store => store.user);

  useEffect(() => {
    dispatch(fetchUserAsync());
    if (token) {
    //   userStore.getUser().finally(() => commonStore.setAppLoaded());
    // } else {
    //   commonStore.setAppLoaded();
    }
  }, [dispatch, token]);

  // if (!commonStore.appLoaded)
  //   return <LoadingComponent status='Laden' />;

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/errors' element={<TestErrors />} />
        <Route path='/server-error' element={<ServerError />} />
        <Route path='app/*' element={<MainContent />} />
        <Route path='/abb/buchungen/:id' element={<BuchungForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
