import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Ecom
        </Typography>
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton size="large" aria-label="cart">
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon fontSize="inherit" />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
