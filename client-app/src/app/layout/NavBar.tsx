import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

const NavBar = () => {
  const navigate = useNavigate();
  const { userStore: { user, logout }, modalStore: { openModal } } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position='static' sx={{ mb: 4, bgcolor: 'primary.main' }}>
      <Toolbar>
        <IconButton aria-label='delete'
          onClick={() => navigate('/')}>
          <DeleteIcon />
        </IconButton>
        <Button variant='text' onClick={() => navigate(`/app/buchungen`)}>
          <Typography variant='body1' sx={{ color: 'text.primary' }}>Buchungen</Typography>
        </Button>
        <Button variant='text' onClick={() => navigate(`/app/createBuchung`)}>
          <Typography variant='body1' sx={{ color: 'text.primary' }}>Buchung anlegen</Typography>
        </Button>

        {/*<Menu.Item onClick={() => openModal(<TagForm />)} name='Tags' />*/}
      </Toolbar>
    </AppBar>
    // <Menu inverted fixed='top'>
    //   <Container>
    //     <Menu.Item as={NavLink} to={`/`} header>
    //       <img
    //         src='/assets/offenes-buch.png'
    //         alt='logo'
    //         style={{ marginRight: 10 }}
    //       />
    //       Haushaltsbuch
    //     </Menu.Item>
    //     <Menu.Item as={NavLink} to={`/app/buchungen`} name='Buchungen' />
    //     <Menu.Item onClick={() => openModal(<TagForm />)} name='Tags' />
    //     <Menu.Item>
    //       <Button
    //         as={NavLink}
    //         to={`/app/createBuchung`}
    //         positive
    //         content='Buchung anlegen'
    //       />
    //     </Menu.Item>
    //     <Menu.Item position={'right'}>
    //       <Image
    //         src={user?.image || '/assets/user.png'}
    //         avatar
    //         spaced='right'
    //       />
    //       <Dropdown pointing='top left' text={user?.displayName}>
    //         <Dropdown.Menu>
    //           <Dropdown.Item
    //             as={Link}
    //             to={`/profile/${user?.username}`}
    //             text='Profil'
    //             icon='user'
    //           />
    //           <Dropdown.Item
    //             onClick={handleLogout}
    //             text='Logout'
    //             icon='power'
    //           />
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </Menu.Item>
    //   </Container>
    // </Menu>
  )
    ;
};

export default observer(NavBar);
