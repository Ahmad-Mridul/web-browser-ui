import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToolBar from "./components/ToolBar";
import Home from "./pages/Home/Home";
import WindowControls from "./components/WindowControls";
import logo from "./assets/logo.png"; // <-- Import your logo here
import "./index.css";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
    React.useEffect(() => {
        if (typeof QWebChannel === "undefined") {
            console.error(
                "QWebChannel is not defined — make sure qwebchannel.js is loaded!"
            );
            return;
        }
        new QWebChannel(qt.webChannelTransport, (channel) => {
            window.bridge = channel.objects.bridge;

            window.bridge.notify.connect((msg) => {
                console.log("Received signal from C++:", msg);
            });
        });
    }, []);

    // Your tabs hold objects, currently only label & content
    // Add url property; if no url, show "New Tab" + logo icon
    const [tabs, setTabs] = React.useState([
        { label: "", content: "Item One", url: "" },
    ]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        if (newValue === tabs.length) {
            handleAddTab();
        } else {
            setValue(newValue);
        }
    };

    const handleAddTab = () => {
        const newIndex = tabs.length;
        setTabs((prev) => [
            ...prev,
            {
                label: "",
                content: `Content for Item ${newIndex + 1}`,
                url: "",
            },
        ]);
        setValue(newIndex);
    };

    const handleCloseTab = (indexToClose) => {
        if (tabs.length === 1) {
            if (
                window.bridge &&
                typeof window.bridge.closeWindow === "function"
            ) {
                window.bridge.closeWindow();
            } else {
                console.warn("window.bridge.closeWindow is not available");
            }
            return;
        }

        setTabs((prevTabs) => {
            const newTabs = prevTabs.filter((_, i) => i !== indexToClose);

            if (value === indexToClose) {
                setValue(indexToClose === 0 ? 0 : indexToClose - 1);
            } else if (value > indexToClose) {
                setValue(value - 1);
            }

            return newTabs;
        });
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Tabs */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs with add and close"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ flexGrow: 1 }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {/* Larger icon */}
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight: 6,
                                        }}
                                    />
                                    {/* Smaller text */}
                                    <Box
                                        component="span"
                                        sx={{
                                            fontSize: "0.75rem",
                                            lineHeight: 1,
                                        }}
                                    >
                                        New Tab
                                    </Box>
                                    {/* Close button */}
                                    <Box
                                        component="span"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseTab(index);
                                        }}
                                        sx={{
                                            ml: 1,
                                            cursor: "pointer",
                                            borderRadius: "50%",
                                            padding: "2px",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0", // Light gray on hover
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Box>
                                </Box>
                            }
                        />
                    ))}
                    <Tab
                        className="text-4xl"
                        label="+"
                        sx={{
                            fontSize: "1.5rem",
                            minWidth: "40px",
                            "&:hover": {
                                backgroundColor: "#e0e0e0", // light gray background on hover
                                borderRadius: "6px",
                            },
                        }}
                    />
                </Tabs>

                <Box sx={{ flexShrink: 0, pr: 1 }}>
                    <WindowControls />
                </Box>
            </Box>

            {/* Toolbar */}
            <ToolBar />

            {/* Tab content */}
            {tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {/* Pass url or other props if needed */}
                    <Home />
                </CustomTabPanel>
            ))}
        </Box>
    );
}
