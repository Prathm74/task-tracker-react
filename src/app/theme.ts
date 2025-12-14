import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      background: {
        default:
          mode === 'light'
            ? '#f7f9fc'
            : '#121212',
        paper:
          mode === 'light'
            ? '#ffffff'
            : '#1e1e1e',
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily:
        `'Inter', 'Roboto', 'Arial', sans-serif`,
      h4: { fontWeight: 600 },
      button: { textTransform: 'none' },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  })
