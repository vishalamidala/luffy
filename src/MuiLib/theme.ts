import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#ff9e80',
    },
    background: {
      default: '#33334c',
      paper: '#1a1a1a',
    },
    warning: {
      main: '#dce775',
    },
  },
  shadows: ['none'] as any,
});
