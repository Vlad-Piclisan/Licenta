import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BackArrow=()=>{

    return(
        <Link to="/" style={{ textDecoration: "none", color: "inherit", marginTop: 20 }}>
        <ArrowBackIcon>

        </ArrowBackIcon>
      </Link>
    )
}

export default BackArrow;