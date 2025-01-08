import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, subToCart, removeFromCart } from "../redux/cartSlice"; // Import action
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { addOrder } from '../redux/orderSlice';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);

  const calculateSubtotal = (): number => {
    return cartItems.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const dispatch = useDispatch();

  const handleShipping = () => {
    const newOrder = {
      id: "a", // Unique order ID
      items: cartItems,
      total: calculateSubtotal(),
      date: new Date().toISOString()
    };

    dispatch(addOrder(newOrder));
    // Xóa tất cả sản phẩm trong giỏ hàng
    cartItems.forEach((item: any) => {
      dispatch(removeFromCart(item.name)); // Gửi action để xóa từng sản phẩm khỏi giỏ hàng
    });
    alert('Order has been placed successfully!');
    // Bạn có thể điều hướng tới trang khác hoặc làm mới giỏ hàng tại đây
  };

  // Xử lý khi người dùng xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (name: string) => {
    dispatch(removeFromCart(name)); // Gửi action để xóa sản phẩm khỏi giỏ hàng
  };
  const handleAddToCart = (item: any) => {
    const newItem = {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    };
    dispatch(addToCart(newItem)); // Gửi action để thêm sản phẩm vào giỏ hàng
  };
  const handleSubToCart = (item: any) => {
    const newItem = {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    };
    dispatch(subToCart(newItem)); // Gửi action để thêm sản phẩm vào giỏ hàng
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thanh toán
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Information Section */}
        <Box component={Paper} elevation={3} sx={{ flex: 2, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin liên hệ
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            type="tel"
            margin="normal"
            required
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Địa chỉ giao hàng
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Họ" required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Tên" required />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Tỉnh/ Thành phố"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Quận/ Huyện"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phường/ Xã"
            margin="normal"
            required
          />
          <TextField fullWidth label="Tên đường, Tòa nhà, Số nhà" margin="normal" required />
        </Box>

        {/* Order Summary Section */}
        <Box component={Paper} elevation={3} sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Giỏ hàng của bạn
          </Typography>
          {cartItems.map((item: any) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Avatar
                src={item.image}
                alt={item.name}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Số lượng: {item.quantity}
                </Typography>

                <IconButton
                  color="inherit"
                  onClick={() => {
                    handleSubToCart(item);
                    if (item.quantity === 1) handleRemoveFromCart(item.name);
                  }}
                >
                  <Remove />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleAddToCart(item)}
                >
                  <Add />
                </IconButton>
              </Box>
              <Typography>{item.price}VND</Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Typography>Tổng cộng</Typography>
            <Typography>{calculateSubtotal()} VND</Typography>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 3 }}  
            onClick={handleShipping}>
            Đặt hàng
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
