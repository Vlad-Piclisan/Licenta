import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";

type AccountInfoProps = {
    label: string;
    value?: string;
    onChange: (newText: string) => void
}

const AccountInfoField = (props: AccountInfoProps) => {

    const [editing, setEditing] = useState(false);

    const [newText, setNewText] = useState(props.value ?? "");

    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewText(e.target.value)
    }

    return (
        <Box sx={{
            display: "flex",
            padding: 2,
            backgroundColor: "white",
            alignItems: "baseline",
            gap: 3,
            borderRadius: 2,
            mt: 2,
            width:350,
            bgcolor:"background.default",
            // color:"white"
        }}>
            {(editing || !props.value) ?
                <TextField  label={props.label} onChange={handleTextChange} defaultValue={props.value} />
                :
                <Typography >
                    {props.label}: {props.value}
                </Typography>}
            <div style={{flex:1}}></div>
            <Button type="button" variant="contained" onClick={() => {
                if (props.value) {
                    setEditing(!editing);
                }
                if (editing || !props.value) {
                    props.onChange(newText);
                }
            }}>{props.value ? (editing ? "Save" : "Edit") : "Add"}</Button>
        </Box>
    )

}


export default AccountInfoField