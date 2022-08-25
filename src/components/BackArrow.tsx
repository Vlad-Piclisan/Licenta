import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
const BackArrow=()=>{
  const navigate = useNavigate();

  return(
    <IconButton onClick={() =>  navigate(-1)}>
        <ArrowBackIcon>

        </ArrowBackIcon>
    </IconButton>
    )

}

export default BackArrow;