import React from "react";
import Navbar from "../navbar/navbar";
import { Box } from "@mui/material";

const Layout = ({ children, onSearch }) => {
  return (
    <Box
      sx={{
        padding: 10,
      }}
    >
      <Navbar onSearch={onSearch} />
      <div>{children}</div>
    </Box>
  );
};

export default Layout;
