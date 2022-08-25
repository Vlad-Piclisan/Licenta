import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { CartContext } from "../hooks/useCart";
import { Badge } from "@mui/material";

const pages = ["Products", "Configurator"];
const settings = ["Cart","Configurations", "Account", "Logout"];

const NavBar = () => {
  const { user, userInfo } = React.useContext(AuthContext);
  const { cart, addToCart } = React.useContext(CartContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (menu: string) => {
    setAnchorElNav(null);
    switch (menu) {
      case "Products":
        navigateToProducts();
        break;
      case "Configurator":
        navigateToConfig();
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    const auth = getAuth();
    switch (setting) {
      case "Logout":
        signOut(auth);
        break;
      case "Cart":
        navigate("/Cart");
        break;
      case "Account":
        navigate("/Account");
        break;
        case "Configurations":
        navigate("/Configurations");
        break;
      default:
        break;
    }
  };
  const navigate = useNavigate();
  const createAccountHandler = () => {
    navigate("/Sign-Up");
  };

  const signInHandler = () => {
    navigate("/Sign-In");
  };
  const navigateToProducts = () => {
    navigate("/Products");
  };
  const navigateToConfig = () => {
    navigate("/Configurator");
  }


  return (
    <AppBar position="static">
      <Box sx={{ px: 4 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              ViTM Bikes
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Badge badgeContent={cart.length} color="secondary">
                    <Avatar
                      alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                      src="/static/images/avatar/2.jpg"
                    />
                  </Badge>
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
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    {setting === "Cart" ? (
                      <Box display="flex" >
                        <Typography mr={0.5}>
                          Cart
                        </Typography>
                        <Typography sx={{ bgcolor: "secondary.main", borderRadius: "50%", color: "white", padding: "0px 7px" }} >
                          {cart.length}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography textAlign="center">{setting}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
              <Button
                color="secondary"
                onClick={signInHandler}
                variant="contained"
              >
                Sign In
              </Button>
              <Button
                color="secondary"
                onClick={createAccountHandler}
                variant="contained"
              >
                Create an Account
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default NavBar;
