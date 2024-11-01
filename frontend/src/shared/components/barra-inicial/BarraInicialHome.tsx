import * as React from "react";
import Link from "next/link";  // Importa o Link do Next.js
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const menuItems = [
  { label: "Início", path: "/" },
  { label: "Músicos", path: "/Musicos/musicos" },
  { label: "Instrumentos", path: "/instrumentos" },
];

export const BarraInicialHome: React.VFC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        mx: 1,
        p: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {menuItems.map((item) => (
          <Link key={item.label} href={item.path} passHref>
            <Typography
              sx={{
                cursor: "pointer",
                color: item.path === "/" ? "#0d47a1" : "grey.700",
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
        ))}
      </Box>
      
      <Tooltip title="Configurações">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Logo"
            src="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2023/07/robo-humanoide-chines.png"
            sx={{ width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }}
          />
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
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Configurações</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
