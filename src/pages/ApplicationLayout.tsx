import React from "react";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";

const ApplicationLayout: React.FC = ({ children }) => {
    return <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}>
        <nav>
            <NavBar />
        </nav>
        <main style={{
            flex: 1,
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background1.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            {children}
        </main>
    </Box >
}
export default ApplicationLayout