import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "./Products";

const ProductCard = ({ product, onProductClicked }: { product: Product,onProductClicked?:() => void }) => {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: "background.product", cursor:"pointer"}} onClick={onProductClicked}>
      <CardMedia
        sx={{ margin: "auto" }}
        component="img"
        height="200"
        image={product.photoURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {product.name}
        </Typography>
        <Box
          sx={{
            boxSizing: " border-box",
            margin: 0,
            outline: "none",
            padding: 0,
            height:"70px",
            textRendering: "geometricPrecision",
          }}
        >
          <Typography
            variant="body2"
            color="white"
            sx={{
              textOverflow: "inherit",
              overflow: "hidden",
              whiteSpace: "break-spaces",
              maxHeight: "60px",
              display: "-webkit-box",
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
            }}
          >
            {product.description}
          </Typography>
        </Box>
        <Typography variant="body2" color="white">
          €{product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
