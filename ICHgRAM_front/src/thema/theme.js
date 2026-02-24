import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
     palette,

  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Roboto, Inter, sans-serif',

     h6: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '20px',
    },