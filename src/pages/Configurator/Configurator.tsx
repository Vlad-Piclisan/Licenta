import { Box, Grid, Paper } from "@mui/material"
import { useMemo, useState } from "react";
import ConfigSelector from "./ConfigSelector"
const Configurator = () => {

    const [configs, setConfigs] = useState([1, 1, 1]);

    const updateConfigsByIndex = (index: number, value: number) => {
        let items = [...configs];
        items[index] = value;
        setConfigs(items);
    }

    const image = useMemo(() => {
        const imageId = configs.reduce((acc, x) => acc + x, "");
        return `image${imageId}`;
    }, [configs]);

    console.log(image);

    return (<Box sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <Box sx={{ width: "60%", height: "80%", display: 'flex' }}>
            <Grid container spacing={4} sx={{ flexGrow: 1 }} >
                <Grid item sm={9} xs={12}>
                    <Paper sx={{ height: "100%" }} >
                        Poze
                    </Paper>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                        {configs.map((config, index) => {
                            return <ConfigSelector key={index} maxConfigs={3} value={config} onConfigChange={value => updateConfigsByIndex(index, value)} />
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Box>)
}

export default Configurator