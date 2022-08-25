import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { saveUserToDatabase } from "../../services/users";
import { SignUpPayload } from "../../models/Users";
import BackArrow from "../../components/BackArrow";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpPayload>();

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(payload: SignUpPayload) {
    setError(null);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      console.log(userCredential);
      await saveUserToDatabase(userCredential.user.uid, payload);
      navigate("/");
    } catch (error: any) {
      console.log({ error });
      let errorMessage = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
      }
      setError(errorMessage ?? error.message);
    }
  }
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   const payload = {
  //     email: data.get("email") as string,
  //     confirmEmail: data.get("confirm-email") as string,
  //     password: data.get("password") as string,
  //     confirmPassword: data.get("confirm-password") as string,
  //   };
  //   console.log(payload.password)
  //   console.log(payload.confirmPassword);
  //   console.log(payload.confirmEmail);
  //   if (!payload.email || !payload.password) {
  //     return;
  //   }

  //   if(payload.confirmEmail!=payload.email || payload.confirmPassword!=payload.password ){
  //     return;
  //   }

  //   const auth = getAuth();

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       payload.email,
  //       payload.password
  //     );
  //     navigate("/");
  //     alert("Bine " + userCredential.user.email);
  //   } catch (error: any) {
  //     alert("Probelmius" + error.message);
  //   }
  // };
  //todo: dupa ce merge signup-ul trimit pe pag princ +errors
  return (

    <Container component="main" maxWidth="xs">
      <BackArrow />
      <CssBaseline />
      <Box

        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Last Name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("confirmEmail", {
              required: "Email confirmation is required ",
              validate: (email) => email === watch("email"), //if not "Email is not matching"
            })}
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
            label="Confirm Email Address"
            autoComplete="confirm-email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password", {
              required: "Password is required",
            })}
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("confirmPassword", {
              required: "Confirming your password is required",
              validate: (password) => password === watch("password"), //if not "Password is not matching"
            })}
            label="Confirm Password"
            type="password"
            autoComplete="confirm-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          {error && (
            <Alert sx={{ my: 2 }} severity="error">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/Forgot-Password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/Sign-In">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>





    </Container>
  );
};

export default SignUp;
