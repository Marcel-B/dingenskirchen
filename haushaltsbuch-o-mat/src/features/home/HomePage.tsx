import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/stores';
import { openModal } from '../../app/stores/modalSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state => state.user);

  const navigate = useNavigate();
  return (
    <>
      <div className={`masthead`}>
        <h1
          style={{ textAlign: 'center', paddingTop: '3rem', marginBottom: '3rem', fontSize: '6rem' }}>Haushaltsbuch</h1>
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
          {isLoggedIn ? (
            <div>

              <h2 style={{ marginBottom: '2rem' }}>Willkommen im Haushaltsbuch</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  onClick={() => dispatch(openModal('loginForm'))}>
                  Einloggen!
                </Button>
              </div>
              <div>
                <Button
                  variant={'contained'}
                  style={{ margin: '1rem' }}
                  onClick={() => dispatch(openModal('registerForm'))}
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

export default HomePage;
