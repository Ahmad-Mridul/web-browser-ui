import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToolBar from "./components/ToolBar";
import Home from "./pages/Home";
import WindowControls from "./components/WindowControls";

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
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

			// Call a C++ slot from JS
			// window.bridge.log("Clicked");

			// Listen to a signal from C++
			window.bridge.notify.connect((msg) => {
				console.log("Received signal from C++:", msg);
			});
		});
	}, []);
	const [tabs, setTabs] = React.useState([
		{ label: "Item One", content: "Item One" },
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
				label: `Item ${newIndex + 1}`,
				content: `Content for Item ${newIndex + 1}`,
			},
		]);
		setValue(newIndex);
	};

	// const handleCloseTab = (indexToClose) => {
	// 	setTabs((prevTabs) => {
	// 		const newTabs = prevTabs.filter((_, i) => i !== indexToClose);
	// 		if (value === indexToClose) {
	// 			setValue(indexToClose === 0 ? 0 : indexToClose - 1);
	// 		} else if (value > indexToClose) {
	// 			setValue(value - 1);
	// 		}
	// 		return newTabs;
	// 	});
	// };
	const handleCloseTab = (indexToClose) => {
		if (tabs.length === 1) {
			// This is the last tab, trigger closeWindow
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
			{/* Tabs with Close and Add */}
			{/* Top Bar: Tabs + Window Controls */}
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
				{/* Tabs */}
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
									{tab.label}
									<IconButton
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											handleCloseTab(index);
										}}
										sx={{ ml: 1 }}
									>
										<CloseIcon fontSize="small" />
									</IconButton>
								</Box>
							}
						/>
					))}
					<Tab className="text-4xl" label="+" />
				</Tabs>

				{/* Window Control Buttons */}
				<Box sx={{ flexShrink: 0, pr: 1 }}>
					<WindowControls />
				</Box>
			</Box>

			{/* Navigation Bar */}
			<ToolBar />

			{/* Tab Panels */}
			{tabs.map((tab, index) => (
				<CustomTabPanel key={index} value={value} index={index}>
					<Home />
				</CustomTabPanel>
			))}
		</Box>
	);
}
