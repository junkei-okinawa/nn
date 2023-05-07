import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  AppBar,
  Avatar,
  Toolbar,
  Tooltip,
  IconButton,
  Grid,
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

import Link from 'ui/Link';
import ThemeColorMode from 'ui/components/ThemeColorMode';

import { usePageTitle } from 'hooks/usePageTitle';

const defaultIcon = "https://static.wixstatic.com/media/419337_9e56d460d67b4b708252f32e8448c2ff~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/C3F%20(1).png"

function header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  /*
  * @params string => 渡した文字列がページタイトルとして設定される
  */
  const title = usePageTitle(router.pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // https://mui.com/material-ui/react-badge/#customization
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -15,
      top: 16,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const notificationNumber = 1;
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Badge badgeContent={notificationNumber} color="error" style={{ marginTop: '15px', marginLeft: '5px' }}>
        <Avatar src={defaultIcon} style={{ display: 'flax' }} />
      </Badge>
      <Typography variant="caption" display="block" sx={{ textAlign: 'left', marginLeft: '5px', marginTop: '2px' }} gutterBottom>@junkei_okinawa</Typography>
      <List sx={{ marginLeft: '5px' }}>
        <ListItem key="profile" component={Link} href="/" disablePadding>
          <AccountCircleIcon />
          <ListItemText primary="プロフィール" sx={{ marginLeft: '4px' }} />
        </ListItem>
        <Divider />
        <ListItem key="alert" disablePadding>
          <NotificationsNoneIcon />
          <StyledBadge badgeContent={notificationNumber} color="error">
            <ListItemText primary="通知" sx={{ marginLeft: '4px' }} />
          </StyledBadge>
        </ListItem>
        <Divider />
        <ListItem key="setting" disablePadding>
          <SettingsIcon />
          <ListItemText primary="設定" sx={{ marginLeft: '4px' }} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ fontFamily: 'hiragino' }}>
        <Toolbar>
          <Box component="span" sx={{ flexDirection: 'row-reverse' }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleDrawerToggle}>
                <Avatar src={defaultIcon} id="avatar" style={{ display: 'flax' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Grid container justifyContent="flex-end">
            <Link href="/" variant='h6' sx={{ color: 'white', textAlign: 'center', flexGrow: 1 }}>
              <strong>{title}</strong>
            </Link>
          </Grid>
          <ThemeColorMode />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default header;