// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          padding: "10px",
          fontSize: "16px",
          height: "40px",
          borderColor: "#EBEBEF",
          "&:hover": {
            backgroundColor: "#f8f8f8",
            padding: "10px",
            fontSize: "16px",
            height: "40px",
            borderColor: "#C69EFF",
          },
        },
      },
    },
  },
});

export default theme;
