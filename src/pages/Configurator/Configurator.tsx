import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material"
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { AddToCartButton } from "../../components/AddToCartButton";
import { AuthContext } from "../../hooks/useAuth";
import { ConfigContext } from "../../hooks/useConfig";
import { getAllConfigs } from "../../services/configurations";
import ConfigSelector from "./ConfigSelector"
const Configurator = () => {

  const { isLoading, isError, data: configurations, error } = useQuery('configurations', getAllConfigs)

  const [configs, setConfigs] = useState([1, 1, 1]);
  const configText = ["Please choose a color:", "Please choose a wheel type:", "Please choose a seat type:"]
  const { addConfigs } = useContext(ConfigContext);
  const { userInfo } = useContext(AuthContext);
  const updateConfigsByIndex = (index: number, value: number) => {
    let items = [...configs];
    items[index] = value;
    setConfigs(items);
  }

  const image = useMemo(() => {
    const imageId = configs.reduce((acc, x) => acc + x, "");
    const configuration = configurations?.find(el => el.name === imageId);
    return configuration;
  }, [configs, configurations]);

  console.log({ configurations, isLoading });

  if (!image) {
    return <Box>
      <Typography>DEV: Configurare Invalida</Typography>

    </Box>
  }

  if (isLoading) {
    return <CircularProgress />
  }
  return (<Box sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
    <Box sx={{ width: "60%", height: "80%", display: 'flex' }}>
      <Grid container spacing={4} sx={{ flexGrow: 1 }} >
        <Grid item sm={9} xs={12}>
          <Paper sx={{ height: "100%" }} >
            <Box sx={{ height: "100%", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <img src={image.url} style={{ width: "100%" }} />
            </Box>

          </Paper>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            {configs.map((config, index) => {
              return <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }} >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography sx={{ mb: 1 }}>
                    {configText[index]}
                  </Typography>
                </Box>
                <ConfigSelector key={index} maxConfigs={3} value={config} onConfigChange={value => updateConfigsByIndex(index, value)} />

              </Box>
            })}
            {!userInfo ? <div></div> : <AddToCartButton variant="contained" onClick={() => { addConfigs(image) }} />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Box>)
}

export default Configurator