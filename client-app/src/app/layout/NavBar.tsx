import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { AppBar, Toolbar, Button, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { AccountCircle, AutoStories } from '@mui/icons-material';
import { useState } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const { userStore: { user, logout } } = useStore();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position='static' sx={{ mb: 4, bgcolor: 'primary.main' }}>
      <Toolbar>
        <IconButton aria-label='delete'
                    onClick={() => navigate('/')}>
          <AutoStories />
        </IconButton>
        <Button variant='text' onClick={() => navigate(`/app/buchungen`)}>
          <Typography variant='body1' sx={{ color: 'text.primary' }}>Buchungen</Typography>
        </Button>
        <Button variant='text' onClick={() => navigate(`/app/createBuchung`)}>
          <Typography variant='body1' sx={{ color: 'text.primary' }}>Buchung anlegen</Typography>
        </Button>
        <Button variant='text' onClick={() => navigate(`/app/createTag`)}>
          <Typography variant='body1' sx={{ color: 'text.primary' }}>Tag anlegen</Typography>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              onClick={handleMenu}
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate(`/profile/${user?.username}`)}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default observer(NavBar);
