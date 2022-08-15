import { Button, ButtonGroup } from "@mui/material"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";

export type ConfigSelectorProps = {
    maxConfigs: number
    onConfigChange:(value:number) => void
    value: number;
}

const ConfigSelector = (props: ConfigSelectorProps) => {
    // const [counter,setCounter] = useState(1);



    function incremet(){
        if(props.value < props.maxConfigs){
            props.onConfigChange(props.value + 1);
        }
    }
    function decrement(){
        if(props.value > 1){
            props.onConfigChange(props.value - 1);
        }
    }
    return <ButtonGroup variant="contained" >
                <Button
            size="small"
            onClick={decrement}
        >
            <ArrowBackIosIcon />
        </Button>
        <Button
        sx={{cursor:"initial"}}
        // disabled
        disableRipple
        disableTouchRipple
         style={{flex:1}}>{props.value}</Button>
        <Button
            size="small"
            onClick={incremet}
        >
            <ArrowForwardIosIcon />
        </Button>
    </ButtonGroup>


}

export default ConfigSelector