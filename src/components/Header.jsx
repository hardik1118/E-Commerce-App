import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { countCartItems } from "../utils";
import { styled, alpha } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchAllCategories } from "../features/categorySlice";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@emotion/react";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchAllProducts } from "../features/productSlice";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { Menu } from "@mui/material";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: "100%",
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
    width: "100%",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

function SearchBar() {
  const categories = useSelector((state) => state.categories?.value);
  const products = useSelector((state) => state.products?.value);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");
  const searchTerm = searchParam.get("searchTerm") || selectedProduct;
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories?.length) {
      dispatch(fetchAllCategories());
    }
    if (!products?.length) {
      dispatch(fetchAllProducts());
    }
  });

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);

  useEffect(() => {
    if (searchTerm) setSelectedProduct(searchTerm);
  }, [searchTerm]);

  function handleCategoryChange(e) {
    const { value } = e.target;

    navigate(
      value === "all"
        ? `/${searchTerm ? "?searchTerm=" + searchTerm : ""}`
        : `?category=${value}${searchTerm ? "&searchTerm=" + searchTerm : ""}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchTerm=${searchText}`
          : `?category=${selectedCategory}&searchTerm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? "/" : `?category=${selectedCategory}`
      );
    }
  }

  return (
    <Search>
      <FormControl>
        <Select
          fullWidth
          id="selected-category-id"
          value={selectedCategory}
          onChange={handleCategoryChange}
          size="large"
          sx={{
            m: 1,
            textTransform: "capitalize",
            "&": {
              "::before": {
                ":hover": {
                  border: "none",
                },
              },
              "::before, &::after": {
                border: "none",
              },
              ".MuiSelect-standard": {
                color: "common.white",
              },
              ".MuiSelect-icon": {
                fill: theme.palette.common.white,
              },
            },
          }}
          variant="standard"
        >
          <MenuItem
            value={"all"}
            key={"all"}
            sx={{
              textTransform: "capitalize",
            }}
          >
            All
          </MenuItem>
          {categories?.map((cat) => {
            return (
              <MenuItem
                value={cat}
                key={cat}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {cat}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <StyleAutocomplete
        disablePortal
        freeSolo
        id="select-product"
        value={selectedProduct}
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products?.filter((prod) => selectedCategory === prod.category),
          (prod) => ({ id: prod?.id, label: prod.title })
        )}
        onChange={(e, value) => {
          handleSearchChange(value?.label);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

export default function Header() {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = countCartItems(cartItems);
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function logout() {
    await signOutUser();
    navigate("/login");
  }

  function navigateToCart() {
    navigate("/cart");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>LogOut</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky" sx={{ py: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="inherit">
          <StyledLink to="/">Ecom</StyledLink>
        </Typography>
        <SearchBar />
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton size="large" aria-label="cart" onClick={navigateToCart}>
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon fontSize="inherit" />
            </Badge>
          </IconButton>
        </Box>
        {user ? (
          <Button onClick={handleProfileMenuOpen} color="inherit">
            {user?.displayName || user?.email}
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} color="inherit">
            Login
          </Button>
        )}
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
}
