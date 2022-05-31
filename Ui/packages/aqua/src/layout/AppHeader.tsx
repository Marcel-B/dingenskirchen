import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import SetMealIcon from '@mui/icons-material/SetMeal';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { duenger } from "../features/duengung/duengungStyle";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addDuengung } from "../features/duengung/duengungSlice";
import { notiz } from "../features/notiz/notizStyle";
import { addNotiz } from "../features/notiz/notizSlice";
import { messung } from "../features/messung/messungStyle";
import { addMessung } from "../features/messung/messungSlice";
import { addFisch } from "../features/fisch/fischSlice";
import { fisch } from "../features/fisch/fischStyle";
import { aquarium } from "../features/aquarium/aquariumStyle";
import { addAquarium } from "../features/aquarium/aquariumSlice";
import { getCurrentUserAsync, logout, setLoginUser } from "../common/user/userSlice";
import React, { useEffect } from "react";
import { clearFeed } from "../features/feed/feedSlice";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const {isLoggedIn, user} = useAppSelector(state => state.user);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUser = () => {
    dispatch(clearFeed());
    dispatch(logout());
  }
  return (
    <AppBar sx={{
      position: 'sticky',
      mb: 2
    }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fishbook
          </Typography>
          <Box sx={{flexGrow: 1, display: 'flex'}}>
            {isLoggedIn ? (<>
                <MenuItem onClick={() => dispatch(addNotiz())}>
                  <StickyNote2Icon sx={{
                    color: notiz,
                    mr: 1
                  }}/>
                  <Typography>Notiz</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(addDuengung())}>
                  <ScienceIcon sx={{
                    color: duenger,
                    mr: 1
                  }}/>
                  <Typography>Düngung</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(addMessung())}>
                  <DeviceThermostatIcon sx={{
                    color: messung,
                    mr: 1
                  }}/>
                  <Typography>Messung</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(addFisch())}>
                  <SetMealIcon sx={{
                    color: fisch,
                    mr: 1
                  }}/>
                  <Typography>Fisch</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(addAquarium())}
                >
                  <LocalDrinkIcon sx={{
                    color: aquarium,
                    mr: 1
                  }}/>
                  <Typography>Aquarium</Typography>
                </MenuItem>
              </>
            ) : <></>}
          </Box>
          <Box sx={{flexGrow: 0}}>
            {isLoggedIn ? (
                <Box>
                  <MenuItem onClick={handleOpenUserMenu}>
                    {user!.displayName}
                  </MenuItem>
                  <Menu
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    anchorEl={anchorElUser}
                    onClose={handleCloseUserMenu}
                    open={Boolean(anchorElUser)}
                    keepMounted>
                    <MenuItem onClick={() => dispatch(logout())}>
                      <PersonOutlineIcon/>
                      <Typography sx={{ml: 1}} textAlign='center'>Info</Typography>
                    </MenuItem>
                    <MenuItem>
                      <AdminPanelSettingsIcon/>
                      <Link to="/admin"><Typography sx={{ml: 1}} textAlign='center'>Admin</Typography></Link>
                    </MenuItem>
                    <MenuItem onClick={() => handleLogoutUser()}>
                      <LogoutIcon/>
                      <Typography sx={{ml: 1}} textAlign='center'>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) :
              (<IconButton onClick={() => dispatch(setLoginUser(true))}>
                <LoginIcon/>
              </IconButton>)
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>)
}

export default AppHeader;