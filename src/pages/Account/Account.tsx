import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import AccountInfoField from "./AccountInfoField";
import { AuthContext } from "../../hooks/useAuth";
import { updateUser } from "../../services/users";
import { UserInfo } from "../../models/Users";
const Account = () => {
    const { user, userInfo } = useContext(AuthContext);

    function updateUserField(key: keyof UserInfo, value: any) {
        if (user) {
            updateUser(user.uid, { [key]: value });
        }
    }
    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

            }}>

            <Paper sx={{ padding: 2,m:2 }} elevation={24}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Account Information
                </Typography>
                <AccountInfoField onChange={(newValue) => updateUserField("firstName", newValue)} label="First Name" value={userInfo?.firstName}></AccountInfoField>
                <AccountInfoField onChange={(newValue) => updateUserField("lastName", newValue)} label="Last Name" value={userInfo?.lastName}></AccountInfoField>
            </Paper>
            <Paper sx={{ padding: 2,m:2 }} elevation={24}>
                <Typography variant="h6" sx={{ mb: 2 }} >
                    E-mail Information
                </Typography>
                <AccountInfoField onChange={(newValue) => updateUserField("email", newValue)} label="E-mail" value={userInfo?.email}></AccountInfoField>
            </Paper>
            <Paper sx={{ padding: 2,m:2 }} elevation={24}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Address Information
                </Typography>
                <AccountInfoField onChange={(newValue) => updateUserField("address", newValue)} label="Address" value={userInfo?.address}></AccountInfoField>
            </Paper>
            
        </Box>
    )
}

export default Account