import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListItemComponent from './listItem.component';
import ButtonItem from './buttonItem.component';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { logoutUser } from '../../features/user/userSlice';

const drawerWidth = 240;
const navItemsAuth = [ {item:'Home', route:'/home'},{item:'My Meetings',
route:'/meetings'},{item:'My Schedules',route:'/schedules'},{item:'Dashboard', route:'/dashboard'}];
const navItemsAuth2 = [ {item:'Home', route:'/home'},{item:'All Meetings',
route:'/allmeetings'},{item:'All Schedules',route:'/allschedules'},{item:'Dashboard', route:'/dashboard'}];
const navItemsNoAuth = [ {item:'Login', route:'/login'},{item:'Register', route:'/register'}];
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);
  const type = useSelector((store) => store.user.type);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 1.5 }}>
        Explore
      </Typography>
      <Divider />
      <List>
        {token ? <>{type==='exe'?<>{navItemsAuth.map((item) => (
          <ListItemComponent {...item} key={item.item}/>
        ))}</>:<>{navItemsAuth2.map((item) => (
          <ListItemComponent {...item} key={item.item}/>
        ))}</>}
        <ListItem key={'logout'} disablePadding>
            <ListItemButton onClick={()=>dispatch(logoutUser())}>
              <ListItemText primary="Logout" />
            </ListItemButton>
        </ListItem></>:<>{navItemsNoAuth.map((item) => (
         
            <ListItemComponent {...item} key={item.item}/>
          
        ))}</>}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
       <ThemeProvider theme={darkTheme}>
       <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display:'block' }}
          >
             TMS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {token?<>{type==='exe'?<>{navItemsAuth.map((item) => (
              <ButtonItem {...item} key={item.item}/>
            ))}</>:<>{navItemsAuth2.map((item) => (
              <ButtonItem {...item} key={item.item}/>
            ))}</> }
            <Button sx={{ color: '#fff'}} onClick={()=>dispatch(logoutUser())}>
            Logout
          </Button>
            </>:<>{navItemsNoAuth.map((item) => (
              <ButtonItem {...item} key={item.item}/>
            ))}</>}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      </ThemeProvider>
     
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;