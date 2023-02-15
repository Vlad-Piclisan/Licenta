import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddToCartButton } from "../../components/AddToCartButton";
import { CartContext } from "../../hooks/useCart";
import {
  getAllCategories,
  saveCategory,
  getCategoryByName,
  listenForCategories,
} from "../../services/category";
import { createFileURL } from "../../services/FileService";
import { listenForProducts, saveProduct } from "../../services/products";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../hooks/useAuth";
interface CategoryPayload {
  name: string;
}

const CategoryForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryPayload>();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = listenForCategories(setCategories);
    return unsubscribe;
    // getAllCategories().then(console.log)
    // getCategoryByName("Biciclete").then(console.log)
  }, []);
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(payload: CategoryPayload) {
    try {
      await saveCategory(payload.name);

      alert("Category Created");
      reset();
    } catch (error: any) {
      setError(error.toString());
    }
  }
  console.log({ categories });
  return (
    <Card>
      <CardContent>
        {/* <Box sx={{bgcolor:"black"}}> */}

        {categories.map((category) => {
          return (
            <Box key={category.name}>
              <Typography color="black">{category.name}</Typography>
            </Box>
          );
        })}
        {/* </Box> */}
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("name", {
              required: "Category Name is required",
            })}
            id="name"
            label="Name"
            name="name"
          // autoComplete="email"
          // autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {error && (
            <Alert sx={{ my: 2 }} severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export interface Product {
  name: string;
  price: number;
  description: string;
  photoURL: string;
  category: string;
  id: string;
}

export interface ProductPayload extends Product {
  photo: FileList;
}

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductPayload>();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = listenForCategories(setCategories);
    return unsubscribe;
    // getAllCategories().then(console.log)
    // getCategoryByName("Biciclete").then(console.log)
  }, []);
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(payload: ProductPayload) {
    try {
      if (payload.photo.length) {
        const photoURL = await createFileURL(payload.photo.item(0)!);
        const { photo, ...productPayload } = payload;
        const product = await saveProduct({
          ...productPayload,
          photoURL,
        });
        console.log({ payload, photoURL });
      }
      console.log({ payload });
      // await saveCategory(payload.name);
      alert("Product Created");
      reset();
    } catch (error: any) {
      setError(error.toString());
    }
  }
  return (
    <Card>
      <CardContent>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ width: 300 }}
            getOptionLabel={(category) => category.name}
            onChange={(_, category) => setValue("category", category.name)}
            // rende={category => category.name}
            renderInput={(props) => <TextField {...props} />}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("name", {
              required: "Product Name is required",
            })}
            id="name"
            label="Product Name"
            name="name"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            {...register("price", {
              valueAsNumber: true,
              required: "Product Price is required",
            })}
            id="price"
            label="Product Price"
            name="price"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("description", {
              required: "Product Description is required",
            })}
            id="description"
            label="Product Description"
            name="description"
          // autoComplete="email"
          // autoFocus
          />
          <input
            // ref={register as any}
            {...register("photo")}
            accept="image/*"
            id="raised-button-file"
            multiple
            type="file"
            hidden
            name="photo"
          />

          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          {watch("photo")?.length ? (
            <img
              src={URL.createObjectURL(watch("photo").item(0)!)}
              alt="Product Picture"
              style={{ height: 100, objectFit: "contain" }}
            />
          ) : (
            <></>
          )}
          <Typography>
            {watch("photo")?.length ? watch("photo").item(0)?.name : ""}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {error && (
            <Alert sx={{ my: 2 }} severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { cart, addToCart, deleteFromCart } = useContext(CartContext);
  console.log({ cart });
  const handleClose = () => {
    setOpen(false);
  };

  const [openProduct, setOpenProduct] = React.useState(false);

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setOpenProduct(false);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = listenForProducts(setProducts);
    return unsubscribe;
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Box>
      < Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <CategoryForm />
        <ProductForm />

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openProduct}
        onClose={handleCloseProduct}
      >
        {selectedProduct && (
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <Typography
                my={3.5}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {selectedProduct.name}
              </Typography>
            </Box>
            <Box style={{ display: "flex" }}>
              <img
                src={selectedProduct.photoURL}
                style={{ height: "50vh", width: "70%", objectFit: "contain" }}
              />
              <Box
                px={4}
                sx={{ width: "30%", display: "flex", flexDirection: "column" }}
              >
                <Typography sx={{ flex: 1 }}>
                  {selectedProduct.description}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>€{selectedProduct.price}</Typography>
                  {!userInfo ? <div></div> : <AddToCartButton
                    variant="contained"
                    onClick={() => {
                      addToCart(selectedProduct);
                    }}
                  />}
                  {/* <Button onClick={() => {
                    // deleteFromCart(selectedProduct);
                  }}>
                    Remove from cart
                  </Button> */}
                </Box>
              </Box>
            </Box>
            {/* <ProductCard product={selectedProduct} /> */}
          </Box>
        )}

        <DialogActions>
          <Button variant="contained" onClick={handleCloseProduct}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        {userInfo?.isAdmin && <Button
          variant="contained"
          sx={{ display: "flex", marginBottom: "1em" }}
          onClick={handleClickOpen}
        >
          Open Form
        </Button>}
      </Box>
      <Box px={16}>
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                onProductClicked={() => {
                  setSelectedProduct(product);
                  handleClickOpenProduct();
                  console.log(product.name);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
