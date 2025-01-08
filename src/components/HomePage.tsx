import React from "react";
import {
  IconButton,
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Main Section */}
      <Container>
        <Box mt={5}>
          <Typography variant="h4" fontWeight="bold">
            Bộ sưu tập mới
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mùa hè 2024
          </Typography>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{ mb: 3 }}
            component={Link} to="/products"
          >
            Đi tới Shop
          </Button>
        </Box>

        {/* Search Bar */}
        <Box display="flex" alignItems="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm..."
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color="disabled" />,
            }}
          />
        </Box>

        {/* Images */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box
                component="img"
                src="https://cdn-app.kiotviet.vn/sample/fashion/38.png" // Thay thế với hình thực tế
                alt="Product 1"
                sx={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Box
                component="img"
                src="https://cdn-app.kiotviet.vn/sample/fashion/13.png" // Thay thế với hình thực tế
                alt="Product 2"
                sx={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Navigation Arrows */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>

      {/* Footer */}
      <Box mt={5} py={2} bgcolor="#f8f8f8" textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © 2024 — copyright | privacy
        </Typography>
        <Typography variant="caption" display="block">
          Địa chỉ / Chứng chỉ / Liên hệ
        </Typography>
        <Typography variant="caption">
          Ngôn ngữ: ENG / VNM / RUP
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
