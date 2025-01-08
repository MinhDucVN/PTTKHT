import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <span style={{ margin: "0 15px" }}></span>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Trang chủ
          </Link>
          <span style={{ margin: "0 15px" }}></span>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Sản phẩm
          </Link>
        </Typography>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Box>
          <Button component={Link} to="/cart" variant="contained">
            Giỏ hàng
          </Button>
          <IconButton component={Link} to="/cart" aria-label="cart">
            <Badge
              badgeContent={cartItems.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0
              )}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/user" color="inherit">
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
