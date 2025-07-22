import { Box, InputAdornment, TextField } from "@mui/material";
import bgImage from "../../assets/Home.png";
import logo from "../../assets/logo.png";
import { MdSearch } from "react-icons/md";
import Shortcuts from "./Shortcuts/Shortcuts";
import SearchBar from "./SearhcBar/SearchBar";

const Home = () => {
    return (
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="home bg-cover bg-center h-screen flex items-center justify-center"
        >
            <Box
                sx={{ mt: -20 }}
                className="flex flex-col items-center content"
            >
                <div className="icon">
                    <img src={logo} alt="" className="" />
                </div>
                <SearchBar/>
                <div className="shortcut flex items-center justify-center">
                    <Shortcuts />
                </div>
            </Box>
        </div>
    );
};
export default Home;
