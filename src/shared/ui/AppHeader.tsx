import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useAuthStore } from '@/auth/useAuthStore'

type Props = {
  darkMode: boolean
  onToggleTheme: () => void
}

export default function AppHeader({
  darkMode,
  onToggleTheme,
}: Props) {
  const logout = useAuthStore((s) => s.logout)

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Task Tracker
        </Typography>

        <IconButton
          color="inherit"
          onClick={onToggleTheme}
        >
          {darkMode ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>

        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
