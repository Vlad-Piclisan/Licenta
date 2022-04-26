import { Box, Typography,BoxProps } from "@mui/material";
import { FC } from "react";

const BigButton:FC<BoxProps> = ({children,...boxParameters}) => {
  return (
    <Box
        {...boxParameters}
      sx={{
        bgcolor: "primary.main",
        width:  300,
        height: 100,
        cursor: "pointer",
        borderRadius:'6px',
        transition:'all 300ms linear',
        '&:hover':{
            bgcolor:"primary.dark"
        },
        display:"grid",
        placeItems:"center"
      }}
    >
      <Typography
        sx={{
          color: "white",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default BigButton;
