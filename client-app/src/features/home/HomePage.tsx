import { Link, Outlet, useNavigate } from 'react-router-dom';

import LoginForm from '../users/LoginForm';
import React from 'react';
import RegisterForm from '../users/RegisterForm';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Button } from '@mui/material';

const HomePage = () => {
  const { userStore, modalStore } = useStore();
  const navigate = useNavigate();
  return (
    <>
      <div className={`masthead`}>
        <h1 style={{ textAlign: 'center', paddingTop: '3rem', marginBottom: '3rem', fontSize: '6rem' }}>Haushaltsbuch</h1>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <img
            width='120rem'
            src='/assets/offenes-buch.png'
            alt={`logo`}
            style={{ marginBottom: '2rem', marginTop: '2rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {userStore.isLoggedIn ? (
            <div>

              <h2 style={{marginBottom: '2rem'}}>Willkommen im Haushaltsbuch</h2>
              <div style={{ display:'flex', justifyContent: 'center' }}>
                <Button
                  variant={'contained'}
                  onClick={() => navigate(`/app/buchungen`)}>
                  Zu den Buchungen
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Button
                  variant={'contained'}
                  style={{ margin: '1rem' }}
                  onClick={() => modalStore.openModal(<LoginForm />)}>
                  Einloggen!
                </Button>
              </div>
              <div>
                <Button
                  variant={'contained'}
                  style={{ margin: '1rem' }}
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                >
                  Registrieren!
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default observer(HomePage);
