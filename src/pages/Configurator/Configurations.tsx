import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { ConfigContext } from "../../hooks/useConfig";

const Configurations = () => {
  const { configs } = useContext(ConfigContext);
  return (
    <Box sx={{ display: "flex", gap: "1em", flexDirection: "column", alignItems: "center" }}>{configs.map((config, index) =>
      <Box sx={{ backgroundColor: "white", borderRadius: "1em", width: "50%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h5">Configuration {index + 1}:</Typography>
          <img src={config.url} style={{ width: "100%" }} />
        </Box>
        {console.log(configs)}
      </Box>
    )}</Box>
  )
}

export default Configurations