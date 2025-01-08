import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Grid2,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
  IconButton,
  Modal,
  Slider,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import { addToCart } from "../redux/cartSlice"; // Import action

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  gender: string; // Giới tính
  description: string; // Mô tả
  primaryColor: string; // Màu sắc chính
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000000]); // Khoảng giá (0 đến 5 triệu)
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Sắp xếp theo giá (asc: tăng dần, desc: giảm dần)

  const loadExcelFile = async () => {
    const response = await fetch("/product.xlsx");
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: Product[] = XLSX.utils.sheet_to_json(worksheet);
    setProducts(jsonData);
    setFilteredProducts(jsonData);
  };

  useEffect(() => {
    loadExcelFile();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Lọc theo giá
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Lọc theo màu sắc
    if (selectedColor.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColor.includes(product.primaryColor)
      );
    }

    // Lọc theo giới tính
    if (selectedGender.length > 0) {
      filtered = filtered.filter((product) => selectedGender.includes(product.gender));
    }

    // Sắp xếp theo giá
    if (sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [priceRange, selectedColor, selectedGender, sortOrder, products]);

  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    const newItem = {
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    dispatch(addToCart(newItem));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  // Hàm xử lý thay đổi khoảng giá
  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Hàm xử lý thay đổi lựa chọn màu sắc
  const handleColorChange = (color: string) => {
    setSelectedColor((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Hàm xử lý thay đổi lựa chọn giới tính
  const handleGenderChange = (gender: string) => {
    setSelectedGender((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // Hàm xử lý thay đổi sắp xếp theo giá
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value);
  };

  return (
    <Container>
      <Box>
        <Box display="flex" justifyContent="flex-end" p={2}></Box>
      </Box>

      {/* Header */}
      <Box my={4}>
        <Typography variant="h5" fontWeight="bold">
          SẢN PHẨM
        </Typography>
        {/* Thanh tìm kiếm */}
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm..."
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Body */}
      <Grid2 container spacing={3}>
        {/* Sidebar Filters */}
        <Grid2 size={{ xs: 3 }} sx={{ position: "sticky", top: 0 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Bộ lọc
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Price Filter */}
            <Typography variant="subtitle2">Khoảng giá</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} VND`}
              min={0}
              max={5000000}
              step={10000}
              sx={{ mt: 1 }}
            />

            {/* Color Filter */}
            <Typography variant="subtitle2" sx={{ mt: 3 }}>
              Màu sắc
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {["Black", "Beige", "Pink", "Blue", "White", "Brown", "Burgundy", "Red", "Green", "Maroon", "Navy", "Gold"].map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      checked={selectedColor.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                  }
                  label={color}
                />
              ))}
            </Box>

            {/* Gender Filter */}
            <Typography variant="subtitle2" sx={{ mt: 3 }}>
              Giới tính
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              {["Unisex", "Men", "Women"].map((gender) => (
                <FormControlLabel
                  key={gender}
                  control={
                    <Checkbox
                      checked={selectedGender.includes(gender)}
                      onChange={() => handleGenderChange(gender)}
                    />
                  }
                  label={gender}
                />
              ))}
            </Box>

            {/* Sort By Price */}
            <FormControl component="fieldset" sx={{ mt: 3 }}>
              <FormLabel component="legend">Sắp xếp theo giá</FormLabel>
              <RadioGroup value={sortOrder} onChange={handleSortChange}>
                <FormControlLabel value="asc" control={<Radio />} label="Từ thấp đến cao" />
                <FormControlLabel value="desc" control={<Radio />} label="Từ cao đến thấp" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid2>

        {/* Product List */}
        <Grid2 size={{ xs: 9 }}>
          <Grid2 container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} height="415px" key={product.id}>
                <Paper elevation={2}>
                  <Box
                    style={{ cursor: "pointer", position: "relative" }}
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "300px",
                        pointerEvents: "none",
                      }}
                    />
                    <Box p={2} textAlign="center">
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        {product.name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {product.price} VND
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Modal xem chi tiết sản phẩm */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            width: "400px",
          }}
        >
          {selectedProduct && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Chi Tiết Sản Phẩm
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Giá: {selectedProduct.price} VND
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Giới tính: {selectedProduct.gender}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Màu sắc: {selectedProduct.primaryColor}
              </Typography>
              <Typography variant="body2" paragraph>
                Mô tả: {selectedProduct.description}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(selectedProduct)}>
                  Thêm vào giỏ
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                  Đóng
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Products;
