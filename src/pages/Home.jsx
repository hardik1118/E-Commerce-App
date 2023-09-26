import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { fetchAllProducts } from "../features/productSlice";
import { useSearchParams } from "react-router-dom";

function Home() {
  const allProducts = useSelector((state) => state.products);
  const { value: products, loading } = allProducts ?? {};
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");
  const searchTerm = searchParam.get("searchTerm");
  // const navigate = useNavigate();

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchAllProducts());
    }
  });

  function addProductToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== "all"
      ? products?.filter((prod) => prod.category === category)
      : products;


  filteredProducts = searchTerm
    ? filteredProducts?.filter((prod) => {
        return prod.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : filteredProducts;


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, price, description, rating, image }) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      alignSelf: "center",
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      paragraph
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography paragraph fontSize="large">
                      ${price}
                    </Typography>
                    <Rating value={rating?.rate} precision={0.5} readOnly />
                  </CardContent>
                  <CardActions sx={{ alignSelf: "center" }}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() =>
                        addProductToCart({
                          title,
                          id,
                          price,
                          description,
                          rating,
                          image,
                        })
                      }
                    >
                      <AddShoppingCartIcon /> Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        )}
      </Grid>
    </Container>
  );
}

export default Home;
