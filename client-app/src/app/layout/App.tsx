import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../stores/store';
import { LoadingComponent } from './LoadingComponent';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import TestErrors from '../../features/buchungen/errors/TestError';
import ServerError from '../../features/buchungen/errors/ServerError';
import MainContent from './MainContent';
import BuchungForm from '../../features/buchungen/form/BuchungForm';
import NotFound from '../../features/buchungen/errors/NotFound';

const App = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent/>;

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

export default observer(App);
