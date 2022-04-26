import { Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import BigButton from "../components/BIGButton";
import { AuthContext } from "../hooks/useAuth";

const StartingPage = () => {
  const { user, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const productsButtonHandler=()=>{
        navigate("/Products");
  }
  const configuratorButtonHandler=()=>{
    navigate("/Configurator");
}
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography my={4} variant="h2" flexGrow={0.4} fontWeight={"bold"}>
        Welcome to Meche Bikes{userInfo ? `, ${userInfo.firstName}` : ""}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 30 }}>
        <BigButton
          onClick={productsButtonHandler}
        >
          Products
        </BigButton>
        <BigButton
          onClick={configuratorButtonHandler}
        >
          Configurator
        </BigButton>
      </Box>
    </Box>
  );
};

export default StartingPage;
