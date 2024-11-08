import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import PerfilUsuario from "../perfil-usuario/PerfilUsuario";

const menuItems = [
  { label: "Início", path: "/" },
  { label: "Músicos", path: "/dashboard/Musicos/Musicos", requiresAdmin: true },
  { label: "Instrumentos", path: "/dashboard/Instrumentos/Instrumentos", requiresAdmin: true},
];

const settings = ["Perfil", "Sair"];

export const BarraInicialHome: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuthContext();
  const storedType = typeof window !== "undefined" ? localStorage.getItem('APP_ACCESS_USER_TYPE') : null;
  const storedID = typeof window !== "undefined" ? localStorage.getItem('APP_ACCESS_USER_ID') : null;
  const idUser = Number(storedID);
  const typeLimpo = localStorage.getItem('APP_ACCESS_USER_TYPE')?.replace(/['"]+/g, '');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenProfile = () => {
    setOpen(true);
    handleCloseUserMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserInitials = (fullName: string | null) => {
    if (!fullName) return '';
    const cleanedName = fullName.replace(/['"]+/g, '');
    const nameParts = cleanedName.split(' ');
    const initials = nameParts
      .slice(0, 2)  
      .map((part) => part.charAt(0).toUpperCase())  
      .join('');  
    return initials;
  };
  

  return (
    <Box
      sx={{
        mx: 1,
        p: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 0,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {menuItems.map((item) => {
          if (item.requiresAdmin && typeLimpo !== "admin") {
            return null; 
          }

          return (
            <Link key={item.label} href={item.path} passHref>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: item.path === "/" ? "#ff8c00" : "grey.700",
                  fontWeight: "bold",
                  textDecoration: item.path === "/" ? "underline" : "none",
                  "&:hover": {
                    textDecoration: item.path === "/" ? "underline" : "underline dotted",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Box>

      <Tooltip title="Sair">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Logo"
            sx={{
              width: { xs: 40, sm: 50 },
              height: { xs: 40, sm: 50 },
              backgroundColor: "#ff8c00", 
              fontSize: "20px",
            }}
          >
            {getUserInitials(localStorage.getItem('APP_ACCESS_USER_NAME'))}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => {
              if (setting === "Perfil") {
                handleOpenProfile();
              } else if (setting === "Sair") {
                handleLogout();
              }
            }}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <PerfilUsuario open={open} onClose={handleClose} idUser={idUser} />
    </Box>
  );
};
