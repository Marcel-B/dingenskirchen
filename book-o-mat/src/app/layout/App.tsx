import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const App = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  // if (!commonStore.appLoaded)
  //   return <LoadingComponent content={'Lade Haushaltsbuch ...'} />;

  return (
    <>
      {/* <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer /> */}
      <Routes>
        {/* <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/errors' element={<TestErrors />} />
        <Route path='/server-error' element={<ServerError />} />
        <Route path='app/*' element={<MainContent />} />
        <Route path='/abb/buchungen/:id' element={<BuchungForm />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default observer(App);
