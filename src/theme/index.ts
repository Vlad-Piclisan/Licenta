import { createTheme } from "@mui/material";
import {palette} from "./pallete";
import {typography} from "./typography";
export const theme = createTheme({
    palette,
    typography,
    // components:{
    //     MuiTextField:{
    //         defaultProps:{
    //             InputProps:{
    //                 style:{
    //                     color:"white",
    //                     borderColor:"white"
    //                 }
    //             }
    //         },
    //     }
    // }
});