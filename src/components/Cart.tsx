import { useContext } from "react";

import { Box, Card, CardContent, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@mui/styled-engine";
import { CartContext, CartProduct } from "../hooks/useCart";

export const CustomCardContent = styled(CardContent)(({ theme }) => ({
  padding: 0,
  paddingBottom: "0 !important",
  // backgroundColor:"blue"
  // root:{
  // }
}));

function CartProductDisplay({ product }: { product: CartProduct }) {
  const { cart, deleteFromCart, remove, addToCart} = useContext(CartContext);
  return (
    <div style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
      <Card>
        <CustomCardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={product.photoURL ?? ""}
              alt={product.name}
              style={{
                objectFit: "cover",
                width: "30%",
                height: "200px",
              }}
            />
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
                width: "100%",
                flexDirection: "column",
                marginRight: "50px",
              }}
            >
              <div
                style={{ display: "flex", marginLeft: "20px", width: "100%" }}
              >
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    userSelect: "none",
                    fontWeight: "bold",
                  }}
                >
                  {product.name}
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <div>
                  <IconButton
                    title="Remove item from cart"
                    size="medium"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                      deleteFromCart(product);
                      // setUndoProduct(product);
                      // cart.deleteFromCart(product);
                      // handleClick();
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
              <div
                style={{ display: "flex", marginLeft: "20px", width: "100%" }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    minWidth: "100%",
                  }}
                >
                  <div
                    style={{
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        if (product.count > 1) {
                          // cart.remove(product);
                          remove(product);
                        }
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography style={{ fontSize: "16px" }}>
                      {product.count}
                    </Typography>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        // cart.add(product);
                        addToCart(product);
                      }}
                    >
                      <AddIcon fontSize="medium" />
                    </IconButton>
                  </div>
                  <div style={{ flexGrow: 1 }}></div>
                  <Typography variant="h5">
                    {Math.round(product.price * product.count * 100) / 100}€
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CustomCardContent>
      </Card>
    </div>
  );
}

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <Box>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cart.map((product, i) => (
          <div key={i} style={{ margin: "20px", width: "100%" }}>
            <CartProductDisplay key={product.name} product={product} />
          </div>
        ))}
      </div>
      <Box  style={{background:"white"}}>
        <Typography style={{ display:"flex", justifyContent:"flex-end", paddingRight:"5px",fontSize: "25px",fontWeight:"bold" }}>
            Total Amount: {`${Math.round(cart.reduce((sum, current) => sum + current.price  * current.count, 0) * 100) / 100} €`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
