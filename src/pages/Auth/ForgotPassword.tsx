import React from "react";

import { Box, TextField, Button, Typography } from "@mui/material";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useForm } from "react-hook-form";
import BackArrow from "../../components/BackArrow";

const ForgotPassword = () => {

    const [email, setEmail] = React.useState("");

    const [success, setSuccess] = React.useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Check your email!");
                setSuccess(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    };

    return <Box sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }}>


        {success ? <Box>
            <BackArrow />
            <Typography component="h1" variant="h5">
                Your password has been reset, please check your e-mail
            </Typography>
            

        </Box > : <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <BackArrow />
            <Typography component="h1" variant="h5">
                Please enter your e-mail:
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit">Reset Password</Button>
        </Box>}
    </Box>
}
export default ForgotPassword;