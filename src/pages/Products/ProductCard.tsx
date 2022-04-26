import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "./Products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: "background.default" }}>
      <CardMedia sx={{ margin:"auto"}}component="img" height="140" image={product.photoURL} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {product.name}
        </Typography>
        <Typography variant="body2" color="white">
          {product.description}
        </Typography>
        <Typography variant="body2" color="white">
        €{product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
