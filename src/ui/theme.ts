import { red } from '@mui/material/colors';

export const defaultTheme = {
  palette: {
    // mode: 'light',
    primary: {
      main: '#02D1CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FDFDDC',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'hiragino',
      'Noto sans',
      '游ゴシック',
    ].join(','),
  }
};