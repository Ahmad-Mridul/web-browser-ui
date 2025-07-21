import { Box, InputAdornment, TextField } from "@mui/material";
import bgImage from "../../assets/Home.png";
import logo from "../../assets/logo.png";
import { MdSearch } from "react-icons/md";
import Shortcuts from "./Shortcuts/Shortcuts";

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
                <div className="searchBar">
                    <TextField
                        placeholder="enter address..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                            width: {
                                xs: "100%", // mobile
                                sm: "400px", // small screens
                                md: "500px", // medium+
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdSearch />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="shortcut flex items-center justify-center">
                    <Shortcuts />
                </div>
            </Box>
        </div>
    );
};
export default Home;
