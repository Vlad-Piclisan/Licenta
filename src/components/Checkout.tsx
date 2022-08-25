import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { CartContext } from "../hooks/useCart";
import { saveOrder } from "../services/orders";
const Checkout = () => {

    const { cart, emptyCart } = useContext(CartContext);

    const { user, userInfo } = useContext(AuthContext);
    const [value, setValue] = useState(userInfo?.address ? '1' : '2');
    const { register, handleSubmit } = useForm();
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = (event.target as HTMLInputElement).value;
        setValue(index);

    };

    async function agregateData(data: any) {
        const address = value === '1' ? userInfo?.address : data.address
        const cardInformation = {
            cardName: data.cardName,
            cardNumber: data.cardNumber,
            expDate: data.expDate,
            cvv: data.cvv,
        }
        const userID = user?.uid!
        const payload = {
            products: cart,
            address,
            cardInformation,
            userID
        }

        await saveOrder(payload);

        alert("Order Placed")
        emptyCart();

    }
    return (
        <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            justifyContent: "center",

        }}>
            <FormControl onSubmit={handleSubmit(agregateData)} component="form" sx={{
                m: 3,
                width: "30%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                bgcolor: "background.default",
                padding: 5,
                borderRadius: 2
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Select an Address
                </Typography>
                <RadioGroup aria-label="address-select" value={value} onChange={handleRadioChange} >

                    {userInfo?.address && <FormControlLabel value={"1"} control={<Radio color="primary" />} label={<Typography>{userInfo?.address}</Typography>} />}
                    <FormControlLabel value={"2"} control={<Radio color="primary" />} label={<Typography>Use a different address</Typography>} />
                    {value === "2" && <Box><TextField label={"Add your address"} {...register("address")}></TextField></Box>}

                </RadioGroup>
                <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
                    Payment method
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            label="Name on card"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            {...register("cardName")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            label="Card number"
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                            {...register("cardNumber")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="expDate"
                            label="Expiry date"
                            fullWidth
                            autoComplete="cc-exp"
                            variant="standard"
                            {...register("expDate")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            label="CVV"
                            helperText="Last three digits on the back"
                            fullWidth
                            autoComplete="cc-csc"
                            variant="standard"
                            {...register("cvv")}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" sx={{ mt: 4 }} variant="contained">Order</Button>
            </FormControl>

        </Box>
    )


}

export default Checkout;
