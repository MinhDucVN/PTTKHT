import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Paper,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

const User: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // State để lưu đơn hàng được chọn
  const [editing, setEditing] = useState(false); // State để xác định trạng thái chỉnh sửa
  const [userInfo, setUserInfo] = useState({
    name: 'Trần Minh Đức',
    gender: 'Nam',
    birthDate: '01/01/2000',
    phone: '0123456789',
    address: 'Thanh Xuân, Hà Nội',
    email: 'abc@gmail.com',
  }); // State lưu thông tin người dùng

  const orders = useSelector((state: any) => state.order.orders);
  const dispatch = useDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order); // Lưu đơn hàng để hiển thị chi tiết
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null); // Đóng modal khi người dùng nhấn "Đóng"
  };

  const handleEditToggle = () => {
    setEditing(!editing); // Chuyển trạng thái chỉnh sửa
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setEditing(false);
    // Giả sử ta thực hiện dispatch để lưu thông tin chỉnh sửa lên state global (redux hoặc bất kỳ backend nào)
    // dispatch(updateUser(userInfo)); // Ví dụ là action dispatch để cập nhật thông tin người dùng
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Hồ sơ của tôi" />
        <Tab label="Đơn hàng của tôi" />
      </Tabs>

      {tab === 0 && (
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
              <Button variant="outlined" onClick={handleEditToggle}>
                {editing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa thông tin khách hàng'}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Họ và tên</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.name}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Giới tính</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.gender}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Ngày sinh</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="birthDate"
                  value={userInfo.birthDate}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.birthDate}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Số điện thoại</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.phone}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">Địa chỉ cá nhân</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.address}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">Địa chỉ email</Typography>
              {editing ? (
                <TextField
                  fullWidth
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography variant="h6">{userInfo.email}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {editing ? (
                <Button variant="contained" onClick={handleSaveChanges} sx={{ mr: 2 }}>
                  Lưu thay đổi
                </Button>
              ) : (
                <Button variant="outlined" color="error">
                  Xóa tài khoản
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}

      {tab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Đơn hàng của tôi
          </Typography>

          {orders.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="center">Ngày đặt</TableCell>
                    <TableCell align="center">Tổng tiền</TableCell>
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.id}
                      </TableCell>
                      <TableCell align="center">{order.date}</TableCell>
                      <TableCell align="center">{order.total} VND</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleViewOrderDetails(order)}
                        >
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Bạn chưa có đơn hàng nào.</Typography>
          )}
        </Paper>
      )}

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Dialog open={Boolean(selectedOrder)} onClose={handleCloseDetails}>
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Ngày đặt: {selectedOrder?.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tổng tiền: {selectedOrder?.total} VND
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Sản phẩm đã mua:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="center">Giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder?.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.price} VND</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.price * item.quantity} VND</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default User;
