import { Route, Routes } from 'react-router-dom';

import BuchungForm from '../../features/buchungen/form/BuchungForm';
import HomePage from '../../features/home/HomePage';
import { LoadingComponent } from './LoadingComponent';
import LoginForm from '../../features/users/LoginForm';
import MainContent from './MainContent';
import ModalContainer from '../common/modals/ModalContainer';
import NotFound from '../../features/buchungen/errors/NotFound';
import RegisterForm from '../../features/users/RegisterForm';
import ServerError from '../../features/buchungen/errors/ServerError';
import TestErrors from '../../features/buchungen/errors/TestError';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../stores/store';

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
    return <LoadingComponent content={'Lade Haushaltsbuch ...'} />;

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
