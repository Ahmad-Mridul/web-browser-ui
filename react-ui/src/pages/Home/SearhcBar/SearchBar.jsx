import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ onLoadUrl }) => {
    const [inputUrl, setInputUrl] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            let formatted = inputUrl.trim();
            if (!formatted.startsWith("http")) {
                formatted = "https://" + formatted;
            }
            onLoadUrl(formatted); // pass to App
            setInputUrl(""); // clear input
        }
    };
    return (
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
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default SearchBar;
