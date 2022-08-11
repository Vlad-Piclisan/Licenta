import type { ThemeOptions } from "@mui/material";

export const palette:ThemeOptions["palette"] & {
    background:{
        product:string;
    }
} = {
    primary:{
        main:"#240046",
        dark:"#10002B",
        light:"#C77DFF"
    },
    background:{
        //gray:" #3D3D3D"

        product: "#1F1F1F",
        // default:"#1F1F1F"
    }
}