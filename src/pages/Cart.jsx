import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { calculateTotal } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cart?.value);
  const dispatch = useDispatch();
  const totalAmount = calculateTotal(cartItems) || 0;
  const navigate = useNavigate();

  function updateQuantity(e, { product, quantity }) {
    const updatedQuantity = e.target.value;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  }

  return (
    <Container sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={9}>
          {cartItems?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;

            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      alignSelf: "center",
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      padding: theme.spacing(),
                    }}
                    image={image}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Rating value={rating?.rate} precision={0.5} readOnly />
                      <TextField
                        type="number"
                        size="small"
                        sx={{ width: theme.spacing(10) }}
                        inputProps={{
                          min: 0,
                          max: 10,
                        }}
                        label="Quantity"
                        variant="outlined"
                        value={quantity}
                        id={`${id}-product-id`}
                        onChange={(e) =>
                          updateQuantity(e, { product, quantity })
                        }
                      ></TextField>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Amount</Typography>
                      <Typography paragraph fontSize="large">
                        ${(price * quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          spacing={2}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ width: "100%", pt: theme.spacing(2), pl: theme.spacing(2) }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                gap: 2,
              }}
            >
              <Typography variant="h4">Total Amount</Typography>
              <Typography variant="h5">${totalAmount.toFixed(2)}</Typography>
              {totalAmount ? (
                <Button
                  variant="contained"
                  onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={() => navigate("/")}>
                  Shop Items
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
