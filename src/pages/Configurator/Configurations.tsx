import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { ConfigContext } from "../../hooks/useConfig";

const Configurations = () => {
    const { configs } = useContext(ConfigContext);
    return (
        <Typography>{configs.map(config => <Box sx={{ height: "100%",justifyContent:"center",alignItems:"center",display:"flex" }}>
            <img src={config.url} style={{width:"100%"}}/>
    </Box>
)}</Typography>
    )
}

export default Configurations