import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import AccountInfoField from "../../components/AccountInfoField";
import { AuthContext } from "../../hooks/useAuth";
import { updateUser } from "../../services/users";
import {  UserInfo } from "../../models/Users";
const Account = () => {
    const { user, userInfo } = useContext(AuthContext);

    function updateUserField(key: keyof UserInfo, value:any){
        if (user) {
            updateUser(user.uid, {[key]:value});
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

            <AccountInfoField onChange={(newValue) => updateUserField("firstName",newValue)} label="First Name" value={userInfo?.firstName}></AccountInfoField>
            <AccountInfoField onChange={(newValue) => updateUserField("lastName",newValue)} label="Last Name" value={userInfo?.lastName}></AccountInfoField>
            <AccountInfoField onChange={(newValue) => updateUserField("email",newValue)} label="E-mail" value={userInfo?.email}></AccountInfoField>
            <AccountInfoField onChange={(newValue) => updateUserField("address",newValue)} label="Address" value={userInfo?.address}></AccountInfoField>
        </Box>
    )
}

export default Account