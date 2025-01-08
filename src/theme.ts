// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#324C87",
    },
    error: {
      main: "#b3261e", // Màu cho trạng thái lỗi
    },
    success: {
      main: "#4CAF50", // Màu cho trạng thái thành công
    },
  },
  typography: {
    fontFamily: "Kanit, sans-serif", // Font chữ mặc định
  },
});

export default theme;
