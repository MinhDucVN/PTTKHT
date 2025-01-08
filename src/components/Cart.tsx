import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { removeFromCart } from "../redux/cartSlice"; // Import action

const CartPage = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  // Xử lý khi người dùng xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (name: string) => {
    dispatch(removeFromCart(name)); // Gửi action để xóa sản phẩm khỏi giỏ hàng
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        cartItems.map((item: any) => (
          <Box key={item.name} p={2} borderBottom={1} width={300}>
            <Box>
            <img
                src={item.image}
                alt={item.name}
                style={{
                  height: "300px",
                  pointerEvents: "none",
                }}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body1">x{item.quantity}</Typography>
              </Box>
              <Typography variant="body2">${item.price}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleRemoveFromCart(item.name)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CartPage;
